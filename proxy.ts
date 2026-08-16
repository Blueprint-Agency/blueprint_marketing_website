import { NextResponse, type NextRequest } from "next/server";

/**
 * Passcode gate for /proposals/*.
 *
 * Next 16 renamed this file convention from middleware.ts to proxy.ts; the
 * behaviour is the same and it still runs before rewrites.
 *
 * WHAT THIS IS FOR
 * ----------------
 * A proposal link gets forwarded. It carries another company's pricing and,
 * in Bangkok Thai's case, a demo login. The gate stops a forwarded link from
 * being readable by whoever it reaches, and stops anything that crawls a URL
 * out of a chat log from getting a document back.
 *
 * WHAT IT IS NOT
 * --------------
 * It is not secrecy. Anyone who has the passcode has the document, and can
 * save it or pass it on. Treat it as the lock on an office door, not as
 * encryption.
 *
 * WHERE THE PASSCODE COMES FROM
 * -----------------------------
 * PROPOSAL_PASSCODE if it is set, and the fallback below if it is not.
 *
 * The fallback exists because the alternative was worse in practice: an
 * environment-only passcode meant every proposal link on the live site
 * answered "no passcode is configured" until somebody opened the hosting
 * dashboard, which is a step that gets forgotten at exactly the moment a
 * link is being sent to a client.
 *
 * The cost of the fallback is that it is readable in this repository,
 * which is public. That is a smaller loss than it sounds: the proposal
 * itself is committed here too, so anyone reading the repo already has the
 * document and does not need the passcode. What the gate is actually for
 * is a forwarded link, and a forwarded link does not come with a pointer
 * to the source.
 *
 * To make it a real secret, set PROPOSAL_PASSCODE in the host environment.
 * It takes precedence, no code change needed, and the value here stops
 * mattering.
 *
 * The gate covers both /proposals/bangkok-thai and the .html the rewrite in
 * next.config.ts points at, because the matcher runs before rewrites.
 */

const COOKIE = "bp_proposal";

/** Used only when PROPOSAL_PASSCODE is unset. See the note above. */
const FALLBACK_PASSCODE = "bangkokthai";

/** The cookie holds a digest, never the passcode itself. */
async function token(passcode: string): Promise<string> {
  const data = new TextEncoder().encode(`bp:${passcode}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Length-independent compare, so the response time says nothing useful. */
function sameToken(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function lockedPage(wrong: boolean, configured: boolean): string {
  const message = !configured
    ? `<p class="note">This link is not available. No passcode is configured on the server.</p>
       <p class="note zh">此链接暂不可用，服务器尚未设置密码。</p>`
    : wrong
      ? `<p class="note err">That passcode is not right. Try again.</p>
         <p class="note err zh">密码不正确，请重试。</p>`
      : `<p class="note">This proposal is private. Enter the passcode you were given.</p>
         <p class="note zh">本方案为非公开文件，请输入你收到的密码。</p>`;

  const form = configured
    ? `<form method="GET" autocomplete="off">
         <label for="pw">Passcode <span class="zh">密码</span></label>
         <input id="pw" name="pw" type="password" autofocus required
                aria-label="Passcode" />
         <button type="submit">Unlock <span class="zh">解锁</span></button>
       </form>`
    : "";

  return `<!doctype html>
<html lang="en-MY"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Private proposal</title>
<style>
  :root{--paper:#fcfcfd;--ink:#0b0c0e;--mute:#5f646c;--line:#d2d6dc;--brand:#1e4fe0}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:26px;
       background:#000;color:#fff;
       font-family:"Schibsted Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif}
  .card{width:100%;max-width:420px}
  .mark{font-weight:800;letter-spacing:-.03em;font-size:1.22rem;margin-bottom:34px}
  .mark span{color:#3b7dff}
  h1{font-size:2rem;line-height:1.05;letter-spacing:-.028em;font-weight:640;margin:0 0 18px}
  .note{margin:0 0 6px;color:rgba(255,255,255,.72);font-size:15px;line-height:1.55}
  .note.err{color:#ff9b7a}
  .zh{font-family:"PingFang SC","Microsoft YaHei","Noto Sans SC",sans-serif}
  form{margin-top:26px;display:flex;flex-direction:column;gap:10px}
  label{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10.5px;
        letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.62)}
  input{width:100%;padding:14px;font-size:16px;color:#fff;background:transparent;
        border:1px solid rgba(255,255,255,.22)}
  input:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
  button{margin-top:8px;padding:14px 18px;cursor:pointer;border:0;background:#fff;color:#000;
         font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11.5px;
         letter-spacing:.12em;text-transform:uppercase}
</style></head>
<body><div class="card">
  <div class="mark">Blueprint<span>.</span></div>
  <h1>Private proposal</h1>
  ${message}
  ${form}
</div></body></html>`;
}

export async function proxy(req: NextRequest) {
  const passcode = process.env.PROPOSAL_PASSCODE || FALLBACK_PASSCODE;
  const expected = await token(passcode);

  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && sameToken(cookie, expected)) return NextResponse.next();

  /* Submitted from the form. On success drop the passcode from the address
     bar, so the unlocked link the reader then copies does not carry it. */
  const given = req.nextUrl.searchParams.get("pw");
  if (given !== null) {
    if (given === passcode) {
      const clean = req.nextUrl.clone();
      clean.searchParams.delete("pw");
      const res = NextResponse.redirect(clean);
      res.cookies.set(COOKIE, expected, {
        httpOnly: true,
        sameSite: "lax",
        secure: req.nextUrl.protocol === "https:",
        path: "/proposals",
        maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    }
    return new NextResponse(lockedPage(true, true), {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(lockedPage(false, true), {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const config = {
  matcher: ["/proposals/:path*"],
};
