import{n as e,t}from"./appHandoff-KsAfQUe2.js";var n=`/wellmma-signin.html`,r=`https://www.gstatic.com/firebasejs/12.18.0`,i=`wellmma.browserSignIn`,a=9e5,o=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Wellmma sign-in</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0B1220;color:#E8EDF7;font-family:system-ui,sans-serif}
main{max-width:22rem;padding:1.5rem;text-align:center}h1{margin:0 0 .5rem}p{opacity:.8;line-height:1.5}
button,a{display:block;width:100%;box-sizing:border-box;font:inherit;font-weight:600;padding:.9rem 1.2rem;border-radius:999px;border:0;margin-top:.75rem;text-decoration:none}
button,a.primary{background:#F5C84C;color:#0B1220;border:0}button:disabled{opacity:.6}a{color:#E8EDF7;background:transparent;border:1px solid #33405A}
[hidden]{display:none!important}p.done{opacity:1;font-weight:600}</style></head>
<body><main><h1>Wellmma</h1><p id="msg">Sign in with your family's Google account.</p>
<button id="go">Continue with Google</button><a id="finish" class="primary" href="#" hidden>Finish signing in</a><a id="back" href="#">Back to the app</a></main>
<script type="module">
import { initializeApp } from "${r}/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, inMemoryPersistence, setPersistence } from "${r}/firebase-auth.js";
const msg = document.getElementById("msg"), go = document.getElementById("go"), back = document.getElementById("back"), finishLink = document.getElementById("finish");
const fromHash = new URLSearchParams(location.hash.slice(1)).get("state");
if (fromHash) sessionStorage.setItem("wellmma.state", fromHash);
const state = fromHash || sessionStorage.getItem("wellmma.state") || "";
const toApp = (q) => "intent://connect/signin?state=" + encodeURIComponent(state) + "&" + q + "#Intent;scheme=${e};package=${t};end";
back.href = toApp("error=cancelled");
const fail = (e) => { msg.textContent = (e && e.message) || "Sign-in didn't finish. Try again."; go.disabled = false; };
let auth, provider;
try {
  const cfg = await (await fetch("/__/firebase/init.json")).json();
  auth = getAuth(initializeApp(cfg));
  await setPersistence(auth, inMemoryPersistence).catch(() => {});
  provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
} catch (e) { fail(new Error("This family's sign-in page isn't ready. Open the app and try again.")); go.disabled = true; }
const finish = async (result) => {
  const cred = GoogleAuthProvider.credentialFromResult(result);
  if (!cred || !cred.idToken) throw new Error("Google didn't return a sign-in token. Try again.");
  await signOut(auth).catch(() => {});
  const link = toApp("id=" + encodeURIComponent(cred.idToken));
  // Only this link carries the sign-in back; hide "Back to the app" so it can't be tapped by mistake.
  go.hidden = true; back.hidden = true;
  finishLink.href = link; finishLink.hidden = false;
  msg.className = "done";
  msg.textContent = "Almost done! Tap “Continue” at the top of the screen, or the button below, to finish signing in to the app.";
  location.href = link;
};
if (auth) getRedirectResult(auth).then((r) => r && finish(r)).catch(fail);
go.onclick = async () => {
  if (!auth) return;
  go.disabled = true;
  try { await finish(await signInWithPopup(auth, provider)); }
  catch (e) {
    const code = (e && e.code) || "";
    if (/popup-blocked|operation-not-supported/.test(code)) { await signInWithRedirect(auth, provider); return; }
    if (/popup-closed|cancelled-popup/.test(code)) { go.disabled = false; return; }
    fail(e);
  }
};
<\/script></body></html>
`;function s(e,t){return`https://${e}.web.app${n}?v=3#state=${encodeURIComponent(t)}`}function c(e,t=Date.now()){let n=new Uint8Array(16);crypto.getRandomValues(n);let r=Array.from(n,e=>e.toString(16).padStart(2,`0`)).join(``);return e.setItem(i,JSON.stringify({state:r,expiresAt:t+a})),r}function l(e,t,n=Date.now()){if(!e)return null;let r;try{r=new URL(e)}catch{return null}if(r.protocol!==`wellmma:`||`${r.host}${r.pathname}`.replace(/^\/+/,``).replace(/\/+$/,``)!==`connect/signin`)return null;let a={};try{a=JSON.parse(t.getItem(i)??`{}`)}catch{a={}}let o=r.searchParams.get(`state`)??``;if(!a.state||a.state!==o||(a.expiresAt??0)<n)return null;if(t.removeItem(i),r.searchParams.get(`error`))return{cancelled:!0};let s=r.searchParams.get(`id`)??``;return s?{idToken:s}:null}var u=(e,t=3)=>t<=1?`wellmma.signinPage.${e}`:`wellmma.signinPage.v${t}.${e}`;export{o as SIGNIN_PAGE_HTML,n as SIGNIN_PAGE_PATH,c as beginBrowserSignIn,u as pageReadyKey,l as readBrowserSignInReturn,s as signInPageUrl};