import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  localStorage helpers
// ─────────────────────────────────────────────────────────────────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN CREDENTIALS  (change these to your own secure values)
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_USER = "trpharmacy_admin";
const ADMIN_PASS = "TRPharma@2026";
const SESSION_KEY = "trp_admin_session";

// Validate session — checks localStorage token
function isSessionValid() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!s) return false;
    // Session expires after 8 hours
    return s.token === btoa(ADMIN_USER + ADMIN_PASS) && Date.now() - s.at < 8 * 60 * 60 * 1000;
  } catch { return false; }
}
function createSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token: btoa(ADMIN_USER + ADMIN_PASS), at: Date.now() }));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─────────────────────────────────────────────────────────────────────────────
//  DEFAULT DATA  (used only on first ever load — after that localStorage wins)
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_MEDS = [
  { id:1,  name:"Paracetamol 500mg",    category:"Tablets",       price:32,   desc:"Fever & pain relief",      emoji:"💊", tag:"Best Seller", img:null },
  { id:2,  name:"Amoxicillin 250mg",    category:"Capsules",      price:85,   desc:"Antibiotic capsules",       emoji:"💉", tag:"Rx",          img:null },
  { id:3,  name:"Cough Syrup 100ml",    category:"Syrups",        price:65,   desc:"Dry & wet cough relief",    emoji:"🧴", tag:"OTC",         img:null },
  { id:4,  name:"Vitamin C 1000mg",     category:"Supplements",   price:120,  desc:"Immunity booster",          emoji:"🍊", tag:"Popular",     img:null },
  { id:5,  name:"Cetrizine 10mg",       category:"Tablets",       price:28,   desc:"Allergy & cold relief",     emoji:"💊", tag:"OTC",         img:null },
  { id:6,  name:"Omeprazole 20mg",      category:"Capsules",      price:55,   desc:"Acidity & gastric relief",  emoji:"💉", tag:"Rx",          img:null },
  { id:7,  name:"Multivitamin Syrup",   category:"Syrups",        price:95,   desc:"Daily nutrition",           emoji:"🧴", tag:"Popular",     img:null },
  { id:8,  name:"Omega-3 Softgels",     category:"Supplements",   price:180,  desc:"Heart & brain health",      emoji:"🐟", tag:"Premium",     img:null },
  { id:9,  name:"Digital BP Monitor",   category:"Devices",       price:1499, desc:"Accurate BP readings",      emoji:"🩺", tag:"Device",      img:null },
  { id:10, name:"Glucometer Kit",       category:"Devices",       price:999,  desc:"Blood sugar monitor",       emoji:"🔬", tag:"Device",      img:null },
  { id:11, name:"Sunscreen SPF50",      category:"Personal Care", price:220,  desc:"UV protection cream",       emoji:"☀️", tag:"Care",        img:null },
  { id:12, name:"Hand Sanitizer 500ml", category:"Personal Care", price:75,   desc:"99.9% germ protection",     emoji:"🧼", tag:"Care",        img:null },
];
const DEFAULT_SERVICES = [
  { id:1, icon:"🩺", title:"BP Monitoring",       desc:"Free blood pressure check with digital monitors for accurate readings." },
  { id:2, icon:"🩸", title:"Diabetes Care",       desc:"Complete range of diabetes management products and glucometers." },
  { id:3, icon:"💬", title:"Health Consultation", desc:"Expert pharmacist consultation for medication queries & guidance." },
  { id:4, icon:"📋", title:"Prescription Supply", desc:"All scheduled & OTC medicines with genuine quality assurance." },
  { id:5, icon:"🩹", title:"First Aid Products",  desc:"Complete first aid kits, bandages, antiseptics & wound care." },
  { id:6, icon:"🚚", title:"Home Delivery",       desc:"Fast and reliable medicine delivery to your doorstep." },
];
const DEFAULT_TESTIMONIALS = [
  { id:1, name:"Priya Sharma",       loc:"Jankipuram, Lucknow",  text:"TR Pharmacy is my go-to for medicines. Staff is knowledgeable and medicines always genuine. Great service!" },
  { id:2, name:"Rahul Verma",        loc:"Sector G, Lucknow",    text:"Very professional pharmacy. Got prescription medicines quickly and at affordable prices. Highly recommended!" },
  { id:3, name:"Sunita Singh",       loc:"Lucknow",              text:"Excellent! The pharmacist gave detailed guidance about my medications. Trustworthy and reliable pharmacy." },
  { id:4, name:"Amit Gupta",         loc:"Jankipuram Extension", text:"Best pharmacy in the area. Clean, organized, staff always helpful. Quick delivery service too!" },
  { id:5, name:"Verified Customer",  loc:"Lucknow",              text:"Fast service, knowledgeable staff, well-stocked inventory, and helpful, polite interactions. Highly recommend TR Pharmacy!" },
];
const DEFAULT_FAQS = [
  { id:1, q:"Do you deliver medicines at home?",        a:"Yes, we provide home delivery within Jankipuram and nearby areas in Lucknow." },
  { id:2, q:"Can I upload my prescription online?",     a:"Absolutely! Use our online prescription upload feature. We'll prepare your order and confirm via call." },
  { id:3, q:"Are all medicines genuine and certified?", a:"Yes, TR Pharmacy sources all medicines directly from authorized distributors. Every medicine is 100% genuine." },
  { id:4, q:"What are your opening hours?",             a:"We are open 9:00 AM to 9:00 PM, Monday to Saturday. Sunday timings may vary." },
  { id:5, q:"Do you offer discounts on bulk orders?",   a:"Yes, we offer special discounts on bulk purchases and for regular customers." },
  { id:6, q:"Can I get health consultation?",           a:"Our licensed pharmacist is available for basic health consultations free of charge." },
];
const DEFAULT_CONTACT = {
  phone1:"6389482072", phone2:"8586098544",
  address:"Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow, U.P. — 226021",
  hours:"Mon–Sat: 9:00 AM – 9:00 PM",
  tagline:"Your Trusted Health Partner",
  about:"TR Pharmacy — Quality medicines, expert guidance & affordable healthcare for the Jankipuram community.",
};
const DEFAULT_CATS = ["All","Tablets","Capsules","Syrups","Supplements","Personal Care","Devices"];
const MAPS_URL = "https://www.google.com/maps/search/Janki+Plaza+Sector+G+Jankipuram+Lucknow";
const EMOJIS_MED = ["💊","💉","🧴","🍊","🔬","🩺","🧼","☀️","🐟","🌿","🫀","🩹","🏥","🧪","🌡️"];
const EMOJIS_SVC = ["🩺","🩸","💬","📋","🩹","🚚","🏥","💊","🧬","❤️","🦷","👁️","🧠","🫁","🦴"];
const DB = { prescriptions:[], contacts:[] };

// ─────────────────────────────────────────────────────────────────────────────
//  ICONS
// ─────────────────────────────────────────────────────────────────────────────
const CloseIcon  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SearchIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const CartIcon   = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const MoonIcon   = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
const SunIcon    = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const StarIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ChevronIcon= ({open}) => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{transform:open?"rotate(180deg)":"none",transition:"transform .3s",flexShrink:0}}><polyline points="6 9 12 15 18 9"/></svg>;
const PlusIcon   = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const MinusIcon  = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const TrashIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const EditIcon   = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const CameraIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const AdminIcon  = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const WAIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.028 7.808L0 32l8.404-2.004A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0z" fill="#25D366"/>
    <path d="M23 18.94c-.32-.16-1.9-.94-2.196-1.047-.295-.106-.51-.16-.724.16-.214.32-.83 1.047-1.018 1.26-.187.214-.375.24-.695.08-.32-.16-1.35-.498-2.572-1.588-.95-.848-1.592-1.895-1.78-2.215-.187-.32-.02-.493.14-.652.145-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.724-1.742-.99-2.388-.26-.627-.527-.54-.724-.55-.187-.01-.4-.012-.614-.012s-.56.08-.853.4c-.294.32-1.122 1.097-1.122 2.676 0 1.578 1.15 3.103 1.31 3.316.16.214 2.262 3.454 5.484 4.843.766.33 1.364.527 1.83.674.769.244 1.47.21 2.024.127.617-.092 1.9-.776 2.168-1.527.267-.75.267-1.393.187-1.527-.08-.134-.294-.214-.614-.374z" fill="#fff"/>
  </svg>
);
const HamburgerIcon = ({open}) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
//  STYLE HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const mkCard = () => ({ background:"var(--bg2)", borderRadius:18, padding:22, boxShadow:"var(--shd)", border:"1px solid var(--bdr)" });
const mkInp  = () => ({ width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid var(--bdr)", background:"var(--bg3)", color:"var(--text)", fontSize:13, outline:"none", boxSizing:"border-box", transition:"border-color .2s, box-shadow .2s" });
const mkBtn  = (v="p") => ({ padding:v==="sm"?"6px 14px":"11px 20px", borderRadius:50, fontWeight:700, fontSize:v==="sm"?12:13, cursor:"pointer", border:v==="out"?"2px solid #059669":"none", background:v==="out"?"transparent":v==="ghost"?"var(--bg3)":v==="red"?"#fee2e2":v==="wa"?"#25d366":"#059669", color:v==="out"?"#059669":v==="ghost"?"var(--text2)":v==="red"?"#dc2626":"#fff", display:"inline-flex", alignItems:"center", gap:5, whiteSpace:"nowrap", transition:"all .18s" });
const mkBdg  = c => ({ display:"inline-block", padding:"3px 12px", borderRadius:50, fontSize:11, fontWeight:700, marginBottom:10, background:c==="g"?"#d1fae5":"#e0f2fe", color:c==="g"?"#059669":"#0ea5e9" });
const mkTag  = c => ({ display:"inline-block", padding:"2px 9px", borderRadius:50, fontSize:10, fontWeight:700, background:c==="g"?"#d1fae5":c==="b"?"#e0f2fe":"#fef3c7", color:c==="g"?"#059669":c==="b"?"#0ea5e9":"#d97706" });
const mkHero = (a,b) => ({ background:`linear-gradient(135deg,${a},${b})`, padding:"clamp(40px,6vw,58px) 20px", textAlign:"center" });

function addRipple(e) {
  const btn = e.currentTarget;
  const r = document.createElement("span");
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();
  r.className = "ripple";
  r.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-rect.left-d/2}px;top:${e.clientY-rect.top-d/2}px`;
  btn.appendChild(r);
  setTimeout(() => r.remove(), 500);
}

// ─────────────────────────────────────────────────────────────────────────────
//  COUNTER
// ─────────────────────────────────────────────────────────────────────────────
function Counter({ target }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 55));
        const t = setInterval(() => { cur = Math.min(cur + step, target); setN(cur); if (cur >= target) clearInterval(t); }, 20);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{n}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────────────
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Nunito','Segoe UI',sans-serif;background:var(--bg);overflow-x:hidden;-webkit-tap-highlight-color:transparent;}
  @keyframes fadeUp   {from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn   {from{opacity:0}to{opacity:1}}
  @keyframes slideInR {from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInL {from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-12px) scaleY(.95)}to{opacity:1;transform:translateY(0) scaleY(1)}}
  @keyframes float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
  @keyframes waPulse  {0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5),0 6px 24px rgba(37,211,102,.4)}70%{box-shadow:0 0 0 14px rgba(37,211,102,0),0 6px 24px rgba(37,211,102,.4)}}
  @keyframes ripple   {from{transform:scale(0);opacity:.4}to{transform:scale(2.5);opacity:0}}
  @keyframes popIn    {0%{opacity:0;transform:scale(.82) translateY(8px)}70%{transform:scale(1.03)}100%{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes dotBlink {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
  @keyframes bNavPop  {0%{transform:scale(1)}40%{transform:translateY(-5px) scale(1.22)}100%{transform:translateY(0) scale(1)}}
  @keyframes cardReveal{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes adminPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}70%{box-shadow:0 0 0 8px rgba(99,102,241,0)}}

  .pg{animation:fadeUp .48s cubic-bezier(.22,1,.36,1) both;}
  .lift{transition:transform .26s cubic-bezier(.22,1,.36,1),box-shadow .26s ease,border-color .2s!important;will-change:transform;}
  .lift:hover{transform:translateY(-5px) scale(1.01)!important;box-shadow:0 18px 44px rgba(5,150,105,.18)!important;border-color:rgba(5,150,105,.22)!important;}
  .lift:active{transform:translateY(-1px) scale(.99)!important;}
  .hbtn{position:relative;overflow:hidden;transition:transform .2s cubic-bezier(.22,1,.36,1),filter .15s,box-shadow .2s!important;}
  .hbtn:hover{transform:scale(1.04)!important;filter:brightness(1.1);box-shadow:0 7px 22px rgba(5,150,105,.3)!important;}
  .hbtn:active{transform:scale(.97)!important;}
  .hbtn .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.32);transform:scale(0);animation:ripple .48s linear;pointer-events:none;}
  .float-anim{animation:float 4s ease-in-out infinite;}
  input:focus,textarea:focus,select:focus{border-color:#059669!important;box-shadow:0 0 0 3px rgba(5,150,105,.14)!important;outline:none;}
  .nav-link{position:relative;transition:color .2s,background .2s!important;}
  .mob-ham{transition:background .2s,transform .15s!important;}
  .mob-ham:hover{transform:scale(1.08)!important;}
  .mob-ham:active{transform:scale(.92)!important;}
  .mob-menu{display:none;flex-direction:column;background:var(--bg2);border-top:1px solid var(--bdr);padding:10px 14px 14px;box-shadow:0 12px 32px rgba(0,0,0,.12);}
  .mob-menu.open{display:flex;animation:slideDown .26s cubic-bezier(.22,1,.36,1) both;}
  .mob-menu button.nav-item{display:block;width:100%;text-align:left;padding:11px 15px;border-radius:11px;margin-bottom:3px;font-weight:700;font-size:13px;cursor:pointer;border:none;background:transparent;color:var(--text2);transition:background .16s,color .16s,padding-left .16s;}
  .mob-menu button.nav-item:hover{background:rgba(5,150,105,.1);color:#059669;padding-left:21px;}
  .mob-menu button.nav-item.active{background:linear-gradient(135deg,#059669,#0ea5e9);color:#fff;padding-left:19px;box-shadow:0 4px 12px rgba(5,150,105,.28);}
  .mob-menu.open button.nav-item{animation:slideInL .28s cubic-bezier(.22,1,.36,1) both;}
  .mob-menu button.nav-item:nth-child(1){animation-delay:.03s}.mob-menu button.nav-item:nth-child(2){animation-delay:.06s}.mob-menu button.nav-item:nth-child(3){animation-delay:.09s}.mob-menu button.nav-item:nth-child(4){animation-delay:.12s}.mob-menu button.nav-item:nth-child(5){animation-delay:.15s}.mob-menu button.nav-item:nth-child(6){animation-delay:.18s}.mob-menu button.nav-item:nth-child(7){animation-delay:.21s}
  .mob-bottom{display:flex;gap:8px;margin-top:10px;padding-top:12px;border-top:1px solid var(--bdr);}
  .mob-bottom a{flex:1;text-align:center;padding:10px 8px;border-radius:11px;background:linear-gradient(135deg,#059669,#047857);color:#fff;font-weight:700;font-size:13px;text-decoration:none;transition:transform .16s,box-shadow .16s;box-shadow:0 3px 10px rgba(5,150,105,.22);}
  .mob-bottom a:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(5,150,105,.32);}
  .mob-bottom a.wa{background:linear-gradient(135deg,#25d366,#128c5e);box-shadow:0 3px 10px rgba(37,211,102,.22);}
  .bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:150;background:var(--bg2);border-top:1px solid var(--bdr);box-shadow:0 -5px 20px rgba(0,0,0,.09);padding:4px 0 env(safe-area-inset-bottom,4px);backdrop-filter:blur(12px);}
  .bottom-nav-inner{display:flex;justify-content:space-around;align-items:center;}
  .bnav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 5px;border-radius:11px;border:none;background:transparent;cursor:pointer;color:var(--text2);font-size:9px;font-weight:700;transition:color .2s;min-width:48px;position:relative;}
  .bnav-btn .icon{font-size:20px;line-height:1;transition:transform .28s cubic-bezier(.22,1,.36,1);display:block;}
  .bnav-btn:hover .icon{transform:translateY(-3px) scale(1.1);}
  .bnav-btn.active{color:#059669;}
  .bnav-btn.active .icon{animation:bNavPop .38s cubic-bezier(.22,1,.36,1) both;}
  .bnav-btn.active::before{content:'';position:absolute;top:2px;left:50%;transform:translateX(-50%);width:26px;height:3px;border-radius:3px;background:linear-gradient(90deg,#059669,#0ea5e9);}
  .card-grid>*{animation:cardReveal .48s cubic-bezier(.22,1,.36,1) both;}
  .card-grid>*:nth-child(1){animation-delay:.04s}.card-grid>*:nth-child(2){animation-delay:.08s}.card-grid>*:nth-child(3){animation-delay:.12s}.card-grid>*:nth-child(4){animation-delay:.16s}.card-grid>*:nth-child(5){animation-delay:.20s}.card-grid>*:nth-child(6){animation-delay:.24s}.card-grid>*:nth-child(7){animation-delay:.28s}.card-grid>*:nth-child(8){animation-delay:.32s}
  .med-img-overlay{transition:opacity .2s!important;}
  .faq-btn{transition:background .16s!important;}
  .faq-btn:hover{background:rgba(5,150,105,.06)!important;}
  .faq-body{animation:fadeUp .22s ease both;overflow:hidden;}
  .toast-pop{animation:popIn .32s cubic-bezier(.22,1,.36,1) both;}
  .live-dot{animation:dotBlink 1.8s ease-in-out infinite;}
  .grad-text{background:linear-gradient(270deg,#4ade80,#38bdf8,#a78bfa,#4ade80);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradShift 5s ease infinite;}
  .wa-fab{transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s!important;animation:waPulse 2.5s cubic-bezier(.22,1,.36,1) infinite!important;}
  .wa-fab:hover{transform:scale(1.14) rotate(-5deg)!important;box-shadow:0 8px 30px rgba(37,211,102,.6)!important;}
  /* Admin edit overlay */
  .edit-overlay{position:absolute;inset:0;background:rgba(99,102,241,.12);border:2px dashed rgba(99,102,241,.4);border-radius:inherit;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;cursor:pointer;z-index:5;}
  .edit-overlay:hover{opacity:1;}
  .admin-badge{animation:adminPulse 2s infinite;}
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(5,150,105,.3);border-radius:3px;}
  ::-webkit-scrollbar-thumb:hover{background:rgba(5,150,105,.55);}
  ::selection{background:rgba(5,150,105,.18);}
  .hg{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
  .fg{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;}
  .cg{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  @media(max-width:1024px){.fg{grid-template-columns:repeat(2,1fr)!important;}.g4{grid-template-columns:repeat(2,1fr)!important;}}
  @media(max-width:768px){
    .desk-nav{display:none!important;}.mob-ham{display:flex!important;}
    .hg{grid-template-columns:1fr!important;gap:22px!important;}.fg{grid-template-columns:1fr 1fr!important;gap:18px!important;}.cg{grid-template-columns:1fr!important;gap:18px!important;}.g3{grid-template-columns:1fr 1fr!important;gap:12px!important;}.g4{grid-template-columns:1fr 1fr!important;gap:12px!important;}
    .bottom-nav{display:block;}.hide-mobile{display:none!important;}.page-content{padding-bottom:70px;}.wa-fab{bottom:78px!important;}
    .lift:hover{transform:translateY(-3px) scale(1.005)!important;}
  }
  @media(max-width:480px){.fg{grid-template-columns:1fr!important;}.g3{grid-template-columns:1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.hero-btns{flex-direction:column!important;}.hero-btns button,.hero-btns a{width:100%!important;justify-content:center!important;}}
  @media(max-width:360px){.g4{grid-template-columns:1fr!important;}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
`;
if (!document.getElementById("tr-global-css")) {
  const s = document.createElement("style");
  s.id = "tr-global-css"; s.textContent = globalCss;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────────────────────
//  INLINE EDITABLE FIELD  (click to edit any text in-place)
// ─────────────────────────────────────────────────────────────────────────────
function InlineEdit({ value, onChange, style={}, multiline=false, placeholder="Click to edit" }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const ref = useRef(null);

  useEffect(() => { setVal(value); }, [value]);
  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const commit = () => { setEditing(false); if (val.trim()) onChange(val.trim()); else setVal(value); };

  if (!editing) return (
    <span style={{ ...style, cursor:"pointer", borderBottom:"1.5px dashed rgba(5,150,105,.4)", paddingBottom:1 }}
      title="Click to edit" onClick={()=>setEditing(true)}>
      {val || placeholder}
    </span>
  );
  const shared = { ref, value:val, onChange:e=>setVal(e.target.value), onBlur:commit, onKeyDown:e=>{if(!multiline&&e.key==="Enter")commit();if(e.key==="Escape"){setVal(value);setEditing(false);}}, style:{ ...style, border:"2px solid #059669", borderRadius:6, padding:"2px 6px", outline:"none", background:"var(--bg2)", color:"var(--text)", width:"100%", boxSizing:"border-box", fontFamily:"inherit" }, autoFocus:true };
  return multiline ? <textarea {...shared} rows={3}/> : <input {...shared}/>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN LOGIN MODAL
// ─────────────────────────────────────────────────────────────────────────────
const AdminLoginModal = React.memo(function AdminLoginModal({ onSuccess, onClose }) {
  const [user, setUser]   = useState("");
  const [pass, setPass]   = useState("");
  const [err,  setErr]    = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const inp = mkInp();

  const handleLogin = () => {
    if (!user.trim() || !pass.trim()) { setErr("Please enter username and password."); return; }
    setLoading(true);
    setErr("");
    // Simulate async check (prevents brute-force timing)
    setTimeout(() => {
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        createSession();
        onSuccess();
      } else {
        setErr("❌ Invalid username or password.");
        setPass("");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div
      style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .2s ease" }}
      onClick={onClose}
    >
      <div
        style={{ background:"var(--bg2)",borderRadius:22,width:"min(400px,100%)",overflow:"hidden",animation:"popIn .3s cubic-bezier(.22,1,.36,1) both",boxShadow:"0 24px 64px rgba(0,0,0,.35)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#4f46e5,#059669)",padding:"28px 28px 22px",textAlign:"center",position:"relative" }}>
          <button onClick={onClose} style={{ position:"absolute",top:14,right:14,background:"rgba(255,255,255,.2)",border:"none",borderRadius:50,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff" }}><CloseIcon/></button>
          <div style={{ width:56,height:56,borderRadius:16,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:26 }}>🛡️</div>
          <h2 style={{ color:"#fff",fontWeight:900,fontSize:20,marginBottom:4 }}>Admin Login</h2>
          <p style={{ color:"rgba(255,255,255,.7)",fontSize:12 }}>TR Pharmacy — Secure Access</p>
        </div>

        {/* Form */}
        <div style={{ padding:"24px 26px 28px",display:"flex",flexDirection:"column",gap:14 }}>
          {err && (
            <div style={{ background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#dc2626",fontWeight:600,animation:"popIn .3s ease" }}>
              {err}
            </div>
          )}
          <div>
            <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block",color:"var(--text2)" }}>USERNAME</label>
            <input
              style={{ ...inp, fontSize:14 }}
              type="text"
              placeholder="Enter admin username"
              value={user}
              onChange={e => { setUser(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoComplete="off"
            />
          </div>
          <div>
            <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block",color:"var(--text2)" }}>PASSWORD</label>
            <div style={{ position:"relative" }}>
              <input
                style={{ ...inp, fontSize:14, paddingRight:42 }}
                type={showPw ? "text" : "password"}
                placeholder="Enter admin password"
                value={pass}
                onChange={e => { setPass(e.target.value); setErr(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                autoComplete="current-password"
              />
              <button
                onClick={() => setShowPw(s => !s)}
                style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text2)",fontSize:16,padding:0 }}
              >{showPw ? "🙈" : "👁️"}</button>
            </div>
          </div>

          <button
            style={{ ...mkBtn(),padding:"13px",fontSize:15,justifyContent:"center",width:"100%",opacity:loading?0.7:1,transition:"opacity .2s" }}
            className="hbtn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Verifying…" : "🔓 Login as Admin"}
          </button>

          <p style={{ textAlign:"center",fontSize:11,color:"var(--text2)",marginTop:2 }}>
            This area is restricted to authorised personnel only.
          </p>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN PANEL  (full management: medicines, services, testimonials, faqs, contact)
// ─────────────────────────────────────────────────────────────────────────────
const AdminPanel = React.memo(function AdminPanel({ meds, services, testimonials, faqs, contact, onClose, onToast, onUpdateMeds, onUpdateServices, onUpdateTestimonials, onUpdateFaqs, onUpdateContact, onUploadImg, onLogout }) {
  const [tab, setTab] = useState("meds");
  const card = mkCard();
  const btn  = mkBtn;
  const inp  = mkInp();

  // ── Medicine form ──────────────────────────────────────────
  const EMPTY_MED = { name:"", category:"Tablets", price:"", desc:"", emoji:"💊", tag:"New", img:null };
  const [medForm, setMedForm] = useState(EMPTY_MED);
  const [editMedId, setEditMedId] = useState(null);
  const updMed = (k,v) => setMedForm(p=>({...p,[k]:v}));

  const handleMedImg = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setMedForm(p=>({...p, img:e.target.result}));
    r.readAsDataURL(file);
  };

  const saveMed = () => {
    if (!medForm.name.trim()) { onToast("Medicine name required","err"); return; }
    if (!medForm.price || isNaN(medForm.price)) { onToast("Valid price required","err"); return; }
    const med = { ...medForm, price:Number(medForm.price) };
    if (editMedId !== null) {
      const updated = meds.map(m => m.id===editMedId ? {...m,...med} : m);
      onUpdateMeds(updated);
      onToast("Medicine updated ✅");
    } else {
      med.id = Date.now();
      onUpdateMeds([...meds, med]);
      onToast("Medicine added ✅");
    }
    setMedForm(EMPTY_MED); setEditMedId(null);
  };

  const startEditMed = (m) => { setMedForm({...m, price:String(m.price)}); setEditMedId(m.id); };
  const deleteMed = (id) => { onUpdateMeds(meds.filter(m=>m.id!==id)); onToast("Medicine deleted"); };

  // ── Service form ───────────────────────────────────────────
  const EMPTY_SVC = { icon:"🩺", title:"", desc:"" };
  const [svcForm, setSvcForm] = useState(EMPTY_SVC);
  const [editSvcId, setEditSvcId] = useState(null);
  const updSvc = (k,v) => setSvcForm(p=>({...p,[k]:v}));

  const saveSvc = () => {
    if (!svcForm.title.trim()) { onToast("Service title required","err"); return; }
    if (editSvcId !== null) {
      onUpdateServices(services.map(s => s.id===editSvcId ? {...s,...svcForm} : s));
      onToast("Service updated ✅");
    } else {
      onUpdateServices([...services, {...svcForm, id:Date.now()}]);
      onToast("Service added ✅");
    }
    setSvcForm(EMPTY_SVC); setEditSvcId(null);
  };
  const startEditSvc = (s) => { setSvcForm({icon:s.icon,title:s.title,desc:s.desc}); setEditSvcId(s.id); };
  const deleteSvc = (id) => { onUpdateServices(services.filter(s=>s.id!==id)); onToast("Service deleted"); };

  // ── Testimonial form ───────────────────────────────────────
  const EMPTY_TST = { name:"", loc:"", text:"" };
  const [tstForm, setTstForm] = useState(EMPTY_TST);
  const [editTstId, setEditTstId] = useState(null);
  const updTst = (k,v) => setTstForm(p=>({...p,[k]:v}));

  const saveTst = () => {
    if (!tstForm.name.trim() || !tstForm.text.trim()) { onToast("Name and review required","err"); return; }
    if (editTstId !== null) {
      onUpdateTestimonials(testimonials.map(t => t.id===editTstId ? {...t,...tstForm} : t));
      onToast("Review updated ✅");
    } else {
      onUpdateTestimonials([...testimonials, {...tstForm, id:Date.now()}]);
      onToast("Review added ✅");
    }
    setTstForm(EMPTY_TST); setEditTstId(null);
  };
  const startEditTst = (t) => { setTstForm({name:t.name,loc:t.loc,text:t.text}); setEditTstId(t.id); };
  const deleteTst = (id) => { onUpdateTestimonials(testimonials.filter(t=>t.id!==id)); onToast("Review deleted"); };

  // ── FAQ form ───────────────────────────────────────────────
  const EMPTY_FAQ = { q:"", a:"" };
  const [faqForm, setFaqForm] = useState(EMPTY_FAQ);
  const [editFaqId, setEditFaqId] = useState(null);
  const updFaq = (k,v) => setFaqForm(p=>({...p,[k]:v}));

  const saveFaq = () => {
    if (!faqForm.q.trim() || !faqForm.a.trim()) { onToast("Question and answer required","err"); return; }
    if (editFaqId !== null) {
      onUpdateFaqs(faqs.map(f => f.id===editFaqId ? {...f,...faqForm} : f));
      onToast("FAQ updated ✅");
    } else {
      onUpdateFaqs([...faqs, {...faqForm, id:Date.now()}]);
      onToast("FAQ added ✅");
    }
    setFaqForm(EMPTY_FAQ); setEditFaqId(null);
  };
  const startEditFaq = (f) => { setFaqForm({q:f.q,a:f.a}); setEditFaqId(f.id); };
  const deleteFaq = (id) => { onUpdateFaqs(faqs.filter(f=>f.id!==id)); onToast("FAQ deleted"); };

  // ── Contact form ───────────────────────────────────────────
  const [ctForm, setCtForm] = useState({...contact});
  const updCt = (k,v) => setCtForm(p=>({...p,[k]:v}));
  const saveCt = () => { onUpdateContact(ctForm); onToast("Contact details saved ✅"); };

  const TABS = [["meds","💊 Medicines"],["services","🩺 Services"],["testimonials","⭐ Reviews"],["faqs","❓ FAQs"],["contact","📞 Contact"]];

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:12,animation:"fadeIn .2s ease" }} onClick={onClose}>
      <div style={{ ...card,width:"min(820px,100%)",maxHeight:"92vh",display:"flex",flexDirection:"column",padding:0,overflow:"hidden",animation:"popIn .3s cubic-bezier(.22,1,.36,1)" }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#4f46e5,#059669)",padding:"16px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0 }}>
          <div>
            <div style={{ color:"#fff",fontWeight:900,fontSize:17,display:"flex",alignItems:"center",gap:8 }}><AdminIcon/> Admin Panel — TR Pharmacy</div>
            <div style={{ color:"rgba(255,255,255,.7)",fontSize:11,marginTop:1 }}>✅ Logged in as <b>trpharmacy_admin</b> · Session expires in 8h</div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <button onClick={onLogout} style={{ background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:8,padding:"5px 12px",cursor:"pointer",color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5 }}>⏻ Logout</button>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)",border:"none",borderRadius:50,width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff" }}><CloseIcon/></button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",overflowX:"auto",borderBottom:"1px solid var(--bdr)",flexShrink:0,background:"var(--bg2)" }}>
          {TABS.map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)} style={{ padding:"12px 18px",border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:tab===id?"var(--bg3)":"transparent",color:tab===id?"#059669":"var(--text2)",borderBottom:tab===id?"2px solid #059669":"2px solid transparent",whiteSpace:"nowrap",transition:"all .18s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ overflowY:"auto",flex:1,padding:"20px" }}>

          {/* ── MEDICINES ─────────────────────────────────────── */}
          {tab === "meds" && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Name *</label><input style={inp} placeholder="Paracetamol 500mg" value={medForm.name} onChange={e=>updMed("name",e.target.value)}/></div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Price ₹ *</label><input style={inp} type="number" placeholder="32" value={medForm.price} onChange={e=>updMed("price",e.target.value)}/></div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Category</label>
                  <select style={inp} value={medForm.category} onChange={e=>updMed("category",e.target.value)}>
                    {["Tablets","Capsules","Syrups","Supplements","Personal Care","Devices"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Tag</label>
                  <select style={inp} value={medForm.tag} onChange={e=>updMed("tag",e.target.value)}>
                    {["New","Best Seller","Popular","Premium","OTC","Rx","Care","Device"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn:"1/-1" }}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Description</label><input style={inp} placeholder="Short description" value={medForm.desc} onChange={e=>updMed("desc",e.target.value)}/></div>
                <div>
                  <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Icon</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {EMOJIS_MED.map(e=><button key={e} onClick={()=>updMed("emoji",e)} style={{ width:30,height:30,borderRadius:7,border:`2px solid ${medForm.emoji===e?"#059669":"var(--bdr)"}`,background:medForm.emoji===e?"#d1fae5":"var(--bg3)",cursor:"pointer",fontSize:15 }}>{e}</button>)}
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Photo</label>
                  <div style={{ border:"1.5px dashed var(--bdr)",borderRadius:10,height:64,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"var(--bg3)",overflow:"hidden" }}
                    onClick={()=>document.getElementById("admin-med-img").click()}>
                    <input id="admin-med-img" type="file" accept="image/*" style={{ display:"none" }} onChange={e=>handleMedImg(e.target.files[0])}/>
                    {medForm.img ? <img src={medForm.img} style={{ width:"100%",height:"100%",objectFit:"cover" }} alt=""/> : <span style={{ fontSize:11,color:"var(--text2)",fontWeight:600 }}>📷 Upload</span>}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:20 }}>
                <button style={{ ...btn(),flex:1,justifyContent:"center" }} className="hbtn" onClick={saveMed}>{editMedId?"✏️ Update Medicine":"➕ Add Medicine"}</button>
                {editMedId && <button style={btn("ghost")} onClick={()=>{setMedForm(EMPTY_MED);setEditMedId(null);}}>Cancel</button>}
              </div>

              <div style={{ fontSize:12,fontWeight:700,color:"var(--text2)",marginBottom:10 }}>ALL MEDICINES ({meds.length})</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {meds.map(m => (
                  <div key={m.id} style={{ ...card,padding:"12px 14px",display:"flex",gap:10,alignItems:"center",background:"var(--bg3)" }}>
                    <div style={{ width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,overflow:"hidden" }}>
                      {m.img ? <img src={m.img} style={{ width:"100%",height:"100%",objectFit:"cover" }} alt=""/> : m.emoji}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontWeight:800,fontSize:13 }}>{m.name}</div>
                      <div style={{ fontSize:11,color:"var(--text2)" }}>₹{m.price} · {m.category} · <span style={{ color:"#059669" }}>{m.tag}</span></div>
                    </div>
                    <div style={{ display:"flex",gap:6 }}>
                      <button onClick={()=>startEditMed(m)} style={{ ...btn("ghost"),padding:"5px 10px" }} className="hbtn"><EditIcon/></button>
                      <button
                        style={{ ...btn("ghost"),padding:"5px 10px" }}
                        className="hbtn"
                        onClick={() => document.getElementById(`adm-img-${m.id}`).click()}
                      ><CameraIcon/></button>
                      <input
                        id={`adm-img-${m.id}`}
                        type="file"
                        accept="image/*"
                        style={{ display:"none" }}
                        onChange={e => {
                          const f = e.target.files[0];
                          if (!f) return;
                          const r = new FileReader();
                          r.onload = ev => {
                            const updated = meds.map(x => x.id === m.id ? {...x, img: ev.target.result} : x);
                            onUpdateMeds(updated);
                          };
                          r.readAsDataURL(f);
                          onToast("Photo saved ✅");
                        }}
                      />
                      <button onClick={()=>deleteMed(m.id)} style={{ ...btn("red"),padding:"5px 10px" }} className="hbtn"><TrashIcon/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SERVICES ──────────────────────────────────────── */}
          {tab === "services" && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
                <div style={{ gridColumn:"1/-1" }}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Title *</label><input style={inp} placeholder="Service name" value={svcForm.title} onChange={e=>updSvc("title",e.target.value)}/></div>
                <div style={{ gridColumn:"1/-1" }}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Description</label><input style={inp} placeholder="Short description" value={svcForm.desc} onChange={e=>updSvc("desc",e.target.value)}/></div>
                <div>
                  <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Icon</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {EMOJIS_SVC.map(e=><button key={e} onClick={()=>updSvc("icon",e)} style={{ width:30,height:30,borderRadius:7,border:`2px solid ${svcForm.icon===e?"#059669":"var(--bdr)"}`,background:svcForm.icon===e?"#d1fae5":"var(--bg3)",cursor:"pointer",fontSize:15 }}>{e}</button>)}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:20 }}>
                <button style={{ ...btn(),flex:1,justifyContent:"center" }} className="hbtn" onClick={saveSvc}>{editSvcId?"✏️ Update Service":"➕ Add Service"}</button>
                {editSvcId && <button style={btn("ghost")} onClick={()=>{setSvcForm(EMPTY_SVC);setEditSvcId(null);}}>Cancel</button>}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {services.map(s => (
                  <div key={s.id} style={{ ...card,padding:"12px 14px",display:"flex",gap:10,alignItems:"center",background:"var(--bg3)" }}>
                    <div style={{ fontSize:26,flexShrink:0 }}>{s.icon}</div>
                    <div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:13 }}>{s.title}</div><div style={{ fontSize:11,color:"var(--text2)" }}>{s.desc}</div></div>
                    <div style={{ display:"flex",gap:6 }}>
                      <button onClick={()=>startEditSvc(s)} style={{ ...btn("ghost"),padding:"5px 10px" }} className="hbtn"><EditIcon/></button>
                      <button onClick={()=>deleteSvc(s.id)} style={{ ...btn("red"),padding:"5px 10px" }} className="hbtn"><TrashIcon/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TESTIMONIALS ──────────────────────────────────── */}
          {tab === "testimonials" && (
            <div>
              <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Customer Name *</label><input style={inp} placeholder="e.g. Ramesh Kumar" value={tstForm.name} onChange={e=>updTst("name",e.target.value)}/></div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Location</label><input style={inp} placeholder="e.g. Jankipuram, Lucknow" value={tstForm.loc} onChange={e=>updTst("loc",e.target.value)}/></div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Review *</label><textarea style={{ ...inp,height:72,resize:"vertical" }} placeholder="Customer review text..." value={tstForm.text} onChange={e=>updTst("text",e.target.value)}/></div>
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:20 }}>
                <button style={{ ...btn(),flex:1,justifyContent:"center" }} className="hbtn" onClick={saveTst}>{editTstId?"✏️ Update Review":"➕ Add Review"}</button>
                {editTstId && <button style={btn("ghost")} onClick={()=>{setTstForm(EMPTY_TST);setEditTstId(null);}}>Cancel</button>}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {testimonials.map(t => (
                  <div key={t.id} style={{ ...card,padding:"12px 14px",background:"var(--bg3)" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:800,fontSize:13 }}>{t.name} <span style={{ fontSize:11,color:"var(--text2)",fontWeight:400 }}>— {t.loc}</span></div>
                        <div style={{ fontSize:12,color:"var(--text2)",marginTop:3,lineHeight:1.5 }}>"{t.text}"</div>
                      </div>
                      <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                        <button onClick={()=>startEditTst(t)} style={{ ...btn("ghost"),padding:"5px 10px" }} className="hbtn"><EditIcon/></button>
                        <button onClick={()=>deleteTst(t.id)} style={{ ...btn("red"),padding:"5px 10px" }} className="hbtn"><TrashIcon/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQs ──────────────────────────────────────────── */}
          {tab === "faqs" && (
            <div>
              <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Question *</label><input style={inp} placeholder="e.g. Do you deliver at home?" value={faqForm.q} onChange={e=>updFaq("q",e.target.value)}/></div>
                <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Answer *</label><textarea style={{ ...inp,height:80,resize:"vertical" }} placeholder="Detailed answer..." value={faqForm.a} onChange={e=>updFaq("a",e.target.value)}/></div>
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:20 }}>
                <button style={{ ...btn(),flex:1,justifyContent:"center" }} className="hbtn" onClick={saveFaq}>{editFaqId?"✏️ Update FAQ":"➕ Add FAQ"}</button>
                {editFaqId && <button style={btn("ghost")} onClick={()=>{setFaqForm(EMPTY_FAQ);setEditFaqId(null);}}>Cancel</button>}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {faqs.map(f => (
                  <div key={f.id} style={{ ...card,padding:"12px 14px",background:"var(--bg3)" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:800,fontSize:13,marginBottom:3 }}>Q: {f.q}</div>
                        <div style={{ fontSize:12,color:"var(--text2)" }}>A: {f.a}</div>
                      </div>
                      <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                        <button onClick={()=>startEditFaq(f)} style={{ ...btn("ghost"),padding:"5px 10px" }} className="hbtn"><EditIcon/></button>
                        <button onClick={()=>deleteFaq(f.id)} style={{ ...btn("red"),padding:"5px 10px" }} className="hbtn"><TrashIcon/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CONTACT ───────────────────────────────────────── */}
          {tab === "contact" && (
            <div>
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {[["Phone 1","phone1","tel"],["Phone 2","phone2","tel"],["Working Hours","hours","text"],["Tagline","tagline","text"],["About / Description","about","text"]].map(([l,k,t]) => (
                  <div key={k}>
                    <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>{l}</label>
                    <input style={inp} type={t} value={ctForm[k]} onChange={e=>updCt(k,e.target.value)}/>
                  </div>
                ))}
                <div>
                  <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Full Address</label>
                  <textarea style={{ ...inp,height:80,resize:"vertical" }} value={ctForm.address} onChange={e=>updCt("address",e.target.value)}/>
                </div>
                <button style={{ ...btn(),padding:"13px",justifyContent:"center" }} className="hbtn" onClick={saveCt}>💾 Save Contact Details</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  SUBMISSIONS PANEL
// ─────────────────────────────────────────────────────────────────────────────
const DBPanel = React.memo(function DBPanel({ onClose }) {
  const card = mkCard();
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .2s ease" }} onClick={onClose}>
      <div style={{ ...card,width:"min(680px,100%)",maxHeight:"88vh",overflowY:"auto",padding:26 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
          <h2 style={{ fontWeight:900,fontSize:17 }}>📬 Form Submissions</h2>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)" }}><CloseIcon/></button>
        </div>
        <h3 style={{ fontWeight:800,color:"#059669",marginBottom:8,fontSize:14 }}>💊 Prescriptions ({DB.prescriptions.length})</h3>
        {DB.prescriptions.length === 0
          ? <p style={{ color:"var(--text2)",fontSize:13,marginBottom:16 }}>No submissions yet.</p>
          : DB.prescriptions.map((s,i) => (
            <div key={i} style={{ ...card,background:"var(--bg3)",padding:13,marginBottom:9,fontSize:13 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5 }}>
                <div><b>Name:</b> {s.name}</div><div><b>Phone:</b> {s.phone}</div>
                <div><b>Address:</b> {s.address||"—"}</div><div><b>Medicine:</b> {s.medicine||"—"}</div>
                <div style={{ gridColumn:"1/-1" }}><b>Note:</b> {s.note||"—"}</div>
                <div style={{ gridColumn:"1/-1",color:"var(--text2)",fontSize:11 }}>⏰ {s.time}</div>
                {s.preview && <img src={s.preview} alt="rx" style={{ gridColumn:"1/-1",width:"100%",maxHeight:130,objectFit:"cover",borderRadius:8,marginTop:5 }}/>}
              </div>
            </div>
          ))
        }
        <h3 style={{ fontWeight:800,color:"#0ea5e9",marginBottom:8,marginTop:14,fontSize:14 }}>📞 Contact Messages ({DB.contacts.length})</h3>
        {DB.contacts.length === 0
          ? <p style={{ color:"var(--text2)",fontSize:13 }}>No messages yet.</p>
          : DB.contacts.map((s,i) => (
            <div key={i} style={{ ...card,background:"var(--bg3)",padding:13,marginBottom:9,fontSize:13 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5 }}>
                <div><b>Name:</b> {s.name}</div><div><b>Phone:</b> {s.phone}</div>
                <div style={{ gridColumn:"1/-1" }}><b>Email:</b> {s.email||"—"}</div>
                <div style={{ gridColumn:"1/-1" }}><b>Message:</b> {s.msg}</div>
                <div style={{ gridColumn:"1/-1",color:"var(--text2)",fontSize:11 }}>⏰ {s.time}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  CART PANEL
// ─────────────────────────────────────────────────────────────────────────────
const CartPanel = React.memo(function CartPanel({ cart, cartStep, setCartStep, cartAddr, setCartAddr, payMode, setPayMode, onClose, onUpdQty, onRemCart, onGoPage, onToast }) {
  const total   = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count   = cart.reduce((s,i)=>s+i.qty,0);
  const deliv   = total>500||total===0 ? 0 : 30;
  const card=mkCard(); const btn=mkBtn; const inp=mkInp();

  const doOrder = () => {
    if (!cartAddr.name||!cartAddr.phone||!cartAddr.address) { onToast("Fill all delivery fields","err"); return; }
    setCartStep("payment");
  };
  const doPay = () => { onToast("✅ Order placed! We'll call to confirm."); setCartStep("success"); };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:300,display:"flex",justifyContent:"flex-end",animation:"fadeIn .2s ease" }} onClick={onClose}>
      <div style={{ width:"min(420px,100vw)",background:"var(--bg2)",height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",animation:"slideInR .3s cubic-bezier(.22,1,.36,1) both",boxShadow:"-6px 0 32px rgba(0,0,0,.18)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:"16px 20px",borderBottom:"1px solid var(--bdr)",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--bg2)",zIndex:2 }}>
          <div>
            <div style={{ fontWeight:900,fontSize:16,display:"flex",alignItems:"center",gap:7 }}>🛒 Cart{count>0&&<span style={{ background:"#059669",color:"#fff",borderRadius:9,padding:"1px 7px",fontSize:11 }}>{count}</span>}</div>
            <div style={{ fontSize:11,color:"var(--text2)",marginTop:1 }}>{cartStep==="items"?"Step 1/3 — Items":cartStep==="address"?"Step 2/3 — Delivery":"Step 3/3 — Payment"}</div>
          </div>
          <button onClick={onClose} style={{ background:"var(--bg3)",border:"1px solid var(--bdr)",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,color:"var(--text2)" }}><CloseIcon/></button>
        </div>
        {cartStep!=="success"&&<div style={{ padding:"8px 20px",display:"flex",gap:3,alignItems:"center" }}>
          {["items","address","payment"].map((s,i,arr)=>(
            <div key={s} style={{ display:"flex",alignItems:"center",flex:1 }}>
              <div style={{ width:20,height:20,borderRadius:10,background:arr.indexOf(cartStep)>=i?"#059669":"var(--bg3)",color:arr.indexOf(cartStep)>=i?"#fff":"var(--text2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0 }}>{i+1}</div>
              {i<2&&<div style={{ flex:1,height:2,background:arr.indexOf(cartStep)>i?"#059669":"var(--bdr)",margin:"0 3px" }}/>}
            </div>
          ))}
        </div>}
        <div style={{ flex:1,padding:"0 20px 20px" }}>
          {cartStep==="items"&&(count===0
            ?<div style={{ textAlign:"center",paddingTop:60 }}><div style={{ fontSize:50,marginBottom:12 }}>🛒</div><p style={{ fontWeight:800,marginBottom:5 }}>Cart is empty</p><button style={btn()} onClick={()=>{onGoPage("medicines");onClose();}}>Browse Medicines</button></div>
            :<>{cart.map(item=>(
                <div key={item.id} style={{ display:"flex",gap:9,padding:"11px 0",borderBottom:"1px solid var(--bdr)",alignItems:"center" }}>
                  <div style={{ width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,overflow:"hidden" }}>
                    {item.img?<img src={item.img} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:item.emoji}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}><div style={{ fontWeight:800,fontSize:13,marginBottom:1 }}>{item.name}</div><div style={{ color:"#059669",fontWeight:800,fontSize:13 }}>₹{item.price}</div></div>
                  <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:4,background:"var(--bg3)",borderRadius:7,padding:"3px 6px" }}>
                      <button onClick={()=>onUpdQty(item.id,-1)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)",display:"flex",padding:2 }}><MinusIcon/></button>
                      <span style={{ fontWeight:800,fontSize:13,minWidth:14,textAlign:"center" }}>{item.qty}</span>
                      <button onClick={()=>onUpdQty(item.id,1)} style={{ background:"none",border:"none",cursor:"pointer",color:"#059669",display:"flex",padding:2 }}><PlusIcon/></button>
                    </div>
                    <button onClick={()=>onRemCart(item.id)} style={{ background:"#fee2e2",border:"none",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",padding:5,color:"#dc2626" }}><TrashIcon/></button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12,padding:13,background:"var(--bg3)",borderRadius:11 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4 }}><span style={{ color:"var(--text2)" }}>Subtotal</span><span style={{ fontWeight:700 }}>₹{total}</span></div>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:deliv>0?6:0 }}><span style={{ color:"var(--text2)" }}>Delivery</span><span style={{ fontWeight:700,color:deliv===0?"#059669":"var(--text)" }}>{deliv===0?"FREE 🎉":`₹${deliv}`}</span></div>
                {deliv>0&&<div style={{ fontSize:11,color:"#059669",marginBottom:6 }}>Add ₹{500-total} more for free delivery!</div>}
                <div style={{ borderTop:"1px dashed var(--bdr)",paddingTop:7,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:15 }}><span>Total</span><span style={{ color:"#059669" }}>₹{total+deliv}</span></div>
              </div>
              <button style={{ ...btn(),width:"100%",padding:"12px",marginTop:10,justifyContent:"center" }} className="hbtn" onClick={()=>setCartStep("address")}>Proceed to Delivery →</button>
              <button style={{ ...btn("out"),width:"100%",padding:"10px",marginTop:7,justifyContent:"center" }} onClick={()=>{onGoPage("prescription");onClose();}}>Upload Prescription Instead</button>
            </>
          )}
          {cartStep==="address"&&<div style={{ paddingTop:8 }}>
            <h3 style={{ fontWeight:900,marginBottom:12,fontSize:15 }}>🏠 Delivery Details</h3>
            {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["Delivery Address *","address","text"],["Pincode","pincode","text"]].map(([l,k,t])=>(
              <div key={k} style={{ marginBottom:11 }}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>{l}</label><input style={inp} type={t} placeholder={l.replace(" *","")} value={cartAddr[k]} onChange={e=>setCartAddr(p=>({...p,[k]:e.target.value}))}/></div>
            ))}
            <button style={{ ...btn(),width:"100%",padding:"12px",marginTop:5,justifyContent:"center" }} className="hbtn" onClick={doOrder}>Continue to Payment →</button>
            <button style={{ ...btn("ghost"),width:"100%",padding:"10px",marginTop:7,justifyContent:"center" }} onClick={()=>setCartStep("items")}>← Back</button>
          </div>}
          {cartStep==="payment"&&<div style={{ paddingTop:8 }}>
            <h3 style={{ fontWeight:900,marginBottom:12,fontSize:15 }}>💳 Payment</h3>
            {[["cod","💵 Cash on Delivery","Pay when order arrives",true],["upi","📱 UPI / QR Code","GPay, PhonePe, Paytm",true],["card","💳 Card Payment","Credit/Debit card",false],["nb","🏦 Net Banking","All major banks",false]].map(([m,l,s,av])=>(
              <div key={m} onClick={()=>av&&setPayMode(m)} style={{ border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,borderRadius:11,padding:"11px 13px",marginBottom:8,cursor:av?"pointer":"not-allowed",background:payMode===m?"#d1fae5":"var(--bg3)",opacity:av?1:.5,transition:"all .18s" }}>
                <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                  <div style={{ width:16,height:16,borderRadius:8,border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,background:payMode===m?"#059669":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{payMode===m&&<div style={{ width:6,height:6,borderRadius:3,background:"#fff" }}/>}</div>
                  <div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:12 }}>{l}</div><div style={{ fontSize:11,color:"var(--text2)" }}>{s}</div></div>
                  {!av&&<span style={{ fontSize:10,background:"#fef3c7",color:"#d97706",padding:"2px 6px",borderRadius:50,fontWeight:700 }}>Soon</span>}
                </div>
                {payMode==="upi"&&m==="upi"&&<div style={{ marginTop:10,padding:10,background:"#fff",borderRadius:9,textAlign:"center" }}><div style={{ fontSize:10,color:"#64748b",marginBottom:4 }}>Scan to Pay</div><div style={{ width:90,height:90,background:"repeating-conic-gradient(#000 0% 25%,#fff 0% 50%) 0 0 / 7px 7px",margin:"0 auto",borderRadius:4 }}/><div style={{ marginTop:5,fontSize:11,fontWeight:700 }}>trpharmacy@paytm</div></div>}
              </div>
            ))}
            <button style={{ ...btn(),width:"100%",padding:"12px",justifyContent:"center" }} className="hbtn" onClick={doPay}>{payMode==="cod"?"✅ Place Order (COD)":"✅ Confirm Payment"}</button>
            <button style={{ ...btn("ghost"),width:"100%",padding:"10px",marginTop:7,justifyContent:"center" }} onClick={()=>setCartStep("address")}>← Back</button>
          </div>}
          {cartStep==="success"&&<div style={{ textAlign:"center",paddingTop:48 }}>
            <div style={{ fontSize:60,marginBottom:12,animation:"popIn .6s cubic-bezier(.22,1,.36,1) both" }}>🎉</div>
            <h2 style={{ fontWeight:900,fontSize:18,marginBottom:7 }}>Order Placed!</h2>
            <p style={{ color:"var(--text2)",fontSize:13,marginBottom:20 }}>Our team will call you within 30 min.</p>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center",width:"100%",padding:"11px" }}>💬 Track via WhatsApp</a>
            <button style={{ ...btn("ghost"),width:"100%",padding:"10px",marginTop:7,justifyContent:"center" }} onClick={()=>{onClose();setCartStep("items");}}>Continue Shopping</button>
          </div>}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  NAV
// ─────────────────────────────────────────────────────────────────────────────
const Nav = React.memo(function Nav({ dark, setDark, page, go, cartCount, onCartOpen, onDBOpen, onAdminOpen, isAdmin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = [["home","🏠 Home"],["about","ℹ️ About"],["medicines","💊 Medicines"],["prescription","📋 Rx Upload"],["services","🩺 Services"],["contact","📞 Contact"],["opening","✅ Grand Opening"]];
  const navGo = (p) => { go(p); setMenuOpen(false); };
  return (
    <nav style={{ position:"sticky",top:0,zIndex:200,background:dark?"rgba(15,23,42,.97)":"rgba(255,255,255,.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--bdr)",boxShadow:"0 2px 18px rgba(0,0,0,.06)",transition:"background .3s" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56 }}>
        <div onClick={()=>navGo("home")} style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer",flexShrink:0 }}>
          <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16,flexShrink:0,transition:"transform .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="rotate(15deg) scale(1.1)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";}}>✚</div>
          <div>
            <div style={{ fontSize:14,fontWeight:900,color:"#059669",letterSpacing:"-.4px",lineHeight:1 }}>TR Pharmacy</div>
            <div style={{ fontSize:9,color:"var(--text2)",marginTop:1 }}>Your Trusted Health Partner</div>
          </div>
        </div>
        <div style={{ display:"flex",gap:1,alignItems:"center" }} className="desk-nav">
          {pages.map(([p,l])=>(
            <button key={p} onClick={()=>navGo(p)} className="nav-link" style={{ padding:"5px 10px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:page===p?"#059669":"transparent",color:page===p?"#fff":"var(--text2)",whiteSpace:"nowrap",transition:"all .18s" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex",gap:5,alignItems:"center",flexShrink:0 }}>
          <button onClick={()=>setDark(d=>!d)} style={{ width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>{dark?<SunIcon/>:<MoonIcon/>}</button>
          <button onClick={onCartOpen} style={{ position:"relative",width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>
            <CartIcon/>{cartCount>0&&<span style={{ position:"absolute",top:-5,right:-5,width:16,height:16,borderRadius:8,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
          </button>
          {isAdmin && <button onClick={onDBOpen} title="Submissions" style={{ width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }} className="hbtn">📬</button>}
          {isAdmin ? (
            <div style={{ display:"flex",gap:5,alignItems:"center" }}>
              <button onClick={onAdminOpen} title="Admin Panel" style={{ height:32,padding:"0 12px",borderRadius:7,border:"1px solid rgba(99,102,241,.4)",background:"linear-gradient(135deg,#4f46e5,#059669)",cursor:"pointer",display:"flex",alignItems:"center",gap:5,color:"#fff",fontSize:12,fontWeight:700 }} className="hbtn admin-badge"><AdminIcon/><span className="hide-mobile">Admin</span></button>
              <button onClick={onLogout} title="Logout" style={{ height:32,padding:"0 10px",borderRadius:7,border:"1px solid #fca5a5",background:"#fee2e2",cursor:"pointer",display:"flex",alignItems:"center",gap:4,color:"#dc2626",fontSize:12,fontWeight:700 }} className="hbtn">⏻</button>
            </div>
          ) : (
            <button onClick={onAdminOpen} title="Admin Login" style={{ width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)",fontSize:14 }} className="hbtn">🔐</button>
          )}
          <button onClick={()=>setMenuOpen(o=>!o)} style={{ width:34,height:34,borderRadius:8,border:"1px solid var(--bdr)",background:menuOpen?"#059669":"var(--bg2)",cursor:"pointer",display:"none",alignItems:"center",justifyContent:"center",color:menuOpen?"#fff":"var(--text2)",transition:"all .2s" }} className="mob-ham" aria-label="Menu"><HamburgerIcon open={menuOpen}/></button>
        </div>
      </div>
      <div className={`mob-menu${menuOpen?" open":""}`}>
        {pages.map(([p,l])=>(<button key={p} onClick={()=>navGo(p)} className={`nav-item${page===p?" active":""}`}>{l}</button>))}
        {isAdmin ? (
          <div style={{ display:"flex",gap:7,padding:"6px 0 4px" }}>
            <button onClick={()=>{onAdminOpen();setMenuOpen(false);}} style={{ flex:1,padding:"10px 14px",borderRadius:11,fontWeight:700,fontSize:13,cursor:"pointer",border:"none",background:"rgba(79,70,229,.1)",color:"#4f46e5" }}>⚙️ Admin Panel</button>
            <button onClick={()=>{onLogout();setMenuOpen(false);}} style={{ padding:"10px 14px",borderRadius:11,fontWeight:700,fontSize:13,cursor:"pointer",border:"none",background:"#fee2e2",color:"#dc2626" }}>⏻ Logout</button>
          </div>
        ) : (
          <button onClick={()=>{onAdminOpen();setMenuOpen(false);}} style={{ display:"block",width:"100%",textAlign:"left",padding:"11px 15px",borderRadius:11,marginBottom:3,fontWeight:700,fontSize:13,cursor:"pointer",border:"none",background:"rgba(0,0,0,.04)",color:"var(--text2)" }}>🔐 Admin Login</button>
        )}
        <div className="mob-bottom">
          <a href="tel:6389482072">📞 Call Now</a>
          <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" className="wa">💬 WhatsApp</a>
        </div>
      </div>
    </nav>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE COMPONENTS  (all receive dynamic data via props)
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = React.memo(function HomePage({ go, meds, services, testimonials, faqs, contact, onAddCart, onToast, onUploadImg, onRemoveImg, isAdmin }) {
  const [tIdx, setTIdx] = useState(0);
  const [faq, setFaq]   = useState(null);
  const [nl, setNl]     = useState("");
  const card=mkCard(); const btn=mkBtn; const bdg=mkBdg; const tag=mkTag;

  useEffect(() => { const t=setInterval(()=>setTIdx(i=>(i+1)%testimonials.length),4500); return ()=>clearInterval(t); }, [testimonials.length]);

  return (
    <div className="pg">
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#064e3b 0%,#065f46 45%,#0c4a6e 100%)",padding:"clamp(44px,8vw,70px) 20px clamp(36px,6vw,58px)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(#fff 1px,transparent 1px),radial-gradient(rgba(14,165,233,.3) 2px,transparent 2px)",backgroundSize:"48px 48px,96px 96px",backgroundPosition:"0 0,24px 24px" }}/>
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative" }} className="hg">
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",borderRadius:50,padding:"5px 15px",fontSize:12,color:"#d1fae5",marginBottom:18,animation:"heroBadge 3s ease-in-out infinite" }}>
              <span className="live-dot" style={{ width:7,height:7,borderRadius:4,background:"#4ade80",display:"inline-block" }}/>Now Open — Jankipuram, Lucknow
            </div>
            <h1 style={{ fontSize:"clamp(26px,5vw,50px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:14 }}>
              Your Trusted<br/><span className="grad-text">Health Partner</span><br/>in Lucknow
            </h1>
            <p style={{ fontSize:14,color:"#a7f3d0",marginBottom:26,lineHeight:1.8 }}>{contact.about}</p>
            <div style={{ display:"flex",gap:9,flexWrap:"wrap" }} className="hero-btns">
              <button onClick={(e)=>{addRipple(e);go("medicines");}} className="hbtn" style={{ padding:"11px 22px",borderRadius:50,background:"#fff",color:"#059669",fontWeight:700,fontSize:13,border:"none",cursor:"pointer",boxShadow:"0 4px 18px rgba(255,255,255,.22)" }}>🛒 Order Medicine</button>
              <button onClick={()=>go("prescription")} className="hbtn" style={{ padding:"11px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:13,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📋 Upload Prescription</button>
              <button onClick={()=>go("contact")} className="hbtn" style={{ padding:"11px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:13,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📞 Contact Us</button>
            </div>
          </div>
          <div className="float-anim hide-mobile" style={{ background:"rgba(255,255,255,.1)",borderRadius:20,padding:24,backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.2)" }}>
            <div style={{ fontSize:52,textAlign:"center",marginBottom:12 }}>🏥</div>
            <h3 style={{ color:"#fff",fontSize:17,fontWeight:900,textAlign:"center",marginBottom:5 }}>TR Pharmacy</h3>
            <p style={{ color:"#a7f3d0",textAlign:"center",fontSize:11,marginBottom:16 }}>{contact.address}</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9 }}>
              {[["500+","Medicines"],["100%","Genuine"],["5★","Rated"],["Fast","Delivery"]].map(([n,l])=>(
                <div key={l} style={{ textAlign:"center",background:"rgba(255,255,255,.1)",borderRadius:10,padding:9 }}>
                  <div style={{ fontSize:18,fontWeight:900,color:"#fff" }}>{n}</div>
                  <div style={{ fontSize:9,color:"#a7f3d0" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ background:"#059669",padding:"12px 20px",overflowX:"auto" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap" }}>
          {["✅ 100% Genuine","🚚 Fast Delivery","👨‍⚕️ Expert Pharmacist","💰 Affordable Prices","🔒 Trusted & Safe"].map(t=>(
            <span key={t} style={{ color:"#fff",fontWeight:700,fontSize:12,whiteSpace:"nowrap" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ background:"var(--bg3)",padding:"clamp(28px,4vw,44px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }} className="g4 card-grid">
          {[[500,"Medicines","💊"],[1000,"Happy Customers","😊"],[100,"Quality %","✅"],[5,"Star Rating","⭐"]].map(([n,l,ic])=>(
            <div key={l} style={card} className="lift"><div style={{ fontSize:28,marginBottom:6,textAlign:"center" }}>{ic}</div><div style={{ fontSize:26,fontWeight:900,color:"#059669",textAlign:"center" }}><Counter target={n}/>{l.includes("%")?"%":l==="Star Rating"?"★":"+"}</div><div style={{ color:"var(--text2)",fontSize:11,fontWeight:600,textAlign:"center" }}>{l.replace(" %","")}</div></div>
          ))}
        </div>
      </section>

      {/* Featured Medicines */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <span style={bdg("g")}>Featured Products</span>
          <h2 style={{ fontSize:"clamp(18px,4vw,30px)",fontWeight:900,marginBottom:7 }}>Popular Medicines</h2>
          <p style={{ color:"var(--text2)",maxWidth:460,margin:"0 auto",fontSize:13 }}>Top-selling medicines trusted by thousands in Lucknow</p>
        </div>
        <div className="g4 card-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))" }}>
          {meds.slice(0,8).map(m=>(
            <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
              <div style={{ height:118,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,overflow:"hidden",position:"relative" }}>
                {m.img?<img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:m.emoji}
                {isAdmin && <>
                  <label htmlFor={`h-img-${m.id}`} className="med-img-overlay" style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",opacity:0,color:"#fff",gap:4 }} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}><CameraIcon/><span style={{ fontSize:9,fontWeight:700 }}>{m.img?"Change":"Upload"}</span></label>
                  <input id={`h-img-${m.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>onUploadImg(m.id,e.target.files[0])}/>
                  {m.img&&<button onClick={e=>{e.stopPropagation();onRemoveImg(m.id);}} style={{ position:"absolute",top:4,right:4,background:"rgba(239,68,68,.85)",border:"none",borderRadius:50,width:18,height:18,cursor:"pointer",color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>}
                </>}
              </div>
              <div style={{ padding:"11px 14px 14px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:10,color:"var(--text2)" }}>{m.category}</span></div>
                <h4 style={{ fontWeight:800,fontSize:12,marginBottom:3 }}>{m.name}</h4>
                <p style={{ fontSize:11,color:"var(--text2)",marginBottom:10 }}>{m.desc}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ fontSize:16,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
                  <button style={btn("sm")} className="hbtn" onClick={(e)=>{addRipple(e);onAddCart(m);}}>+ Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center",marginTop:24 }}>
          <button style={btn("out")} className="hbtn" onClick={()=>go("medicines")}>View All {meds.length} Medicines →</button>
        </div>
      </section>

      {/* Services */}
      <section style={{ background:"var(--bg3)",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:32 }}><span style={bdg("b")}>Our Services</span><h2 style={{ fontSize:"clamp(18px,4vw,30px)",fontWeight:900 }}>What We Offer</h2></div>
          <div className="g3 card-grid">
            {services.map(s=>(
              <div key={s.id} style={card} className="lift"><div style={{ fontSize:32,marginBottom:10 }}>{s.icon}</div><h3 style={{ fontWeight:800,fontSize:15,marginBottom:6 }}>{s.title}</h3><p style={{ color:"var(--text2)",fontSize:13,lineHeight:1.7 }}>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}><span style={bdg("g")}>Why Us</span><h2 style={{ fontSize:"clamp(18px,4vw,30px)",fontWeight:900 }}>Why Choose TR Pharmacy?</h2></div>
        <div className="g4 card-grid">
          {[["💊","Genuine Medicines","All medicines sourced from certified manufacturers."],["💰","Affordable Prices","Best prices with regular discounts and offers."],["👨‍⚕️","Expert Pharmacist","Free consultation and medicine guidance."],["⚡","Fast Service","Quick dispensing and reliable home delivery."]].map(([ic,t,d])=>(
            <div key={t} style={{ ...card,display:"flex",gap:11 }} className="lift"><div style={{ fontSize:28,flexShrink:0 }}>{ic}</div><div><h4 style={{ fontWeight:800,marginBottom:4,fontSize:13 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.7 }}>{d}</p></div></div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background:"var(--bg3)",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
          <span style={bdg("b")}>Reviews</span>
          <h2 style={{ fontSize:"clamp(18px,4vw,30px)",fontWeight:900,marginBottom:28 }}>What Customers Say</h2>
          {testimonials.length > 0 && (
            <div style={{ maxWidth:580,margin:"0 auto" }}>
              <div key={tIdx} style={{ ...card,padding:28,animation:"popIn .48s cubic-bezier(.22,1,.36,1) both" }}>
                <div style={{ display:"flex",justifyContent:"center",gap:3,marginBottom:12 }}>{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
                <p style={{ fontSize:14,lineHeight:1.8,color:"var(--text2)",fontStyle:"italic",marginBottom:16 }}>"{testimonials[tIdx].text}"</p>
                <div style={{ fontWeight:800,fontSize:14 }}>{testimonials[tIdx].name}</div>
                <div style={{ fontSize:12,color:"#059669" }}>{testimonials[tIdx].loc}</div>
              </div>
              <div style={{ display:"flex",justifyContent:"center",gap:7,marginTop:14 }}>
                {testimonials.map((_,i)=><button key={i} onClick={()=>setTIdx(i)} style={{ width:8,height:8,borderRadius:4,border:"none",cursor:"pointer",background:i===tIdx?"#059669":"var(--bdr)",transition:"all .2s" }}/>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}><span style={bdg("g")}>FAQ</span><h2 style={{ fontSize:"clamp(18px,4vw,30px)",fontWeight:900 }}>Frequently Asked Questions</h2></div>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          {faqs.map((f,i)=>(
            <div key={f.id} style={{ ...card,marginBottom:8,padding:0,overflow:"hidden" }}>
              <button onClick={()=>setFaq(faq===i?null:i)} className="faq-btn" style={{ width:"100%",padding:"14px 18px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"var(--text)",gap:9,borderRadius:"18px 18px 0 0" }}>
                <span style={{ fontWeight:700,fontSize:13,textAlign:"left" }}>{f.q}</span><ChevronIcon open={faq===i}/>
              </button>
              {faq===i&&<div className="faq-body" style={{ padding:"0 18px 14px",color:"var(--text2)",fontSize:13,lineHeight:1.7,borderTop:"1px solid var(--bdr)" }}><div style={{ paddingTop:10 }}>{f.a}</div></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div style={{ background:"linear-gradient(135deg,#059669,#0ea5e9)",padding:"48px 20px",textAlign:"center" }}>
        <h2 style={{ color:"#fff",fontSize:22,fontWeight:900,marginBottom:6 }}>Get Health Tips & Exclusive Offers</h2>
        <p style={{ color:"rgba(255,255,255,.8)",marginBottom:20,fontSize:13 }}>Subscribe for medicine reminders and special deals</p>
        <div style={{ display:"flex",gap:8,maxWidth:360,margin:"0 auto",flexWrap:"wrap",justifyContent:"center" }}>
          <input style={{ flex:1,minWidth:180,padding:"10px 13px",borderRadius:10,border:"1px solid rgba(255,255,255,.4)",background:"rgba(255,255,255,.2)",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box" }} placeholder="Your phone number" value={nl} onChange={e=>setNl(e.target.value)}/>
          <button style={{ ...btn(),background:"#fff",color:"#059669" }} className="hbtn" onClick={()=>{if(nl){onToast("Subscribed! 🎉");setNl("");}}}> Subscribe</button>
        </div>
      </div>
    </div>
  );
});

const AboutPage = React.memo(function AboutPage({ go, contact }) {
  const card=mkCard(); const btn=mkBtn; const bdg=mkBdg;
  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#065f46")}><h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:8 }}>About TR Pharmacy</h1><p style={{ color:"#a7f3d0",fontSize:15 }}>Trusted Healthcare Partner in Jankipuram, Lucknow</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div className="hg" style={{ alignItems:"start" }}>
          <div>
            <span style={bdg("g")}>Our Story</span>
            <h2 style={{ fontSize:26,fontWeight:900,marginBottom:12 }}>Your Neighbourhood Pharmacy Since 2026</h2>
            <p style={{ color:"var(--text2)",lineHeight:1.8,marginBottom:12 }}>TR Pharmacy was founded to provide people of Jankipuram with access to genuine, affordable medicines along with expert pharmaceutical care.</p>
            <p style={{ color:"var(--text2)",lineHeight:1.8,marginBottom:12 }}>Located in Sector G, Janki Plaza, we serve hundreds of families daily, ensuring every prescription is filled accurately.</p>
            <p style={{ color:"var(--text2)",lineHeight:1.8 }}>Our commitment goes beyond dispensing medicines — we believe in building a healthier community, one family at a time.</p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            {[["🎯","Mission","Most trusted pharmacy — genuine medicines and expert health guidance."],["👁️","Vision","A healthier Jankipuram where every family has quality healthcare."],["❤️","Values","Integrity, quality, affordability, and compassionate service."]].map(([ic,t,d])=>(
              <div key={t} style={{ ...card,display:"flex",gap:11 }}><div style={{ fontSize:24,flexShrink:0 }}>{ic}</div><div><h4 style={{ fontWeight:800,marginBottom:3,fontSize:13 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.6 }}>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background:"var(--bg3)",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
          <h2 style={{ fontSize:24,fontWeight:900,marginBottom:28 }}>Our Commitments</h2>
          <div className="g4 card-grid">
            {[["🔬","Authentic Medicines","Sourced from authorized distributors."],["💊","Quality Control","Strict checks on every medicine."],["🌡️","Safe Storage","Ideal temperature & humidity."],["👨‍⚕️","Expert Guidance","Licensed pharmacist always available."]].map(([ic,t,d])=>(
              <div key={t} style={card} className="lift"><div style={{ fontSize:30,marginBottom:9 }}>{ic}</div><h4 style={{ fontWeight:800,marginBottom:6,fontSize:13 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.6 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,58px) 20px" }}>
        <div style={{ ...card,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",border:"none",padding:32,textAlign:"center" }}>
          <div style={{ fontSize:44,marginBottom:10 }}>📍</div>
          <h3 style={{ fontSize:18,fontWeight:900,marginBottom:6 }}>Find Us</h3>
          <p style={{ color:"var(--text2)",marginBottom:16,fontSize:13 }}>{contact.address}</p>
          <div style={{ display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap" }}>
            <a href={`tel:${contact.phone1}`} style={{ ...btn(),textDecoration:"none" }}>📞 {contact.phone1}</a>
            <a href={`tel:${contact.phone2}`} style={{ ...btn(),background:"#0ea5e9",textDecoration:"none" }}>📞 {contact.phone2}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn("out"),textDecoration:"none" }}>🗺️ Get Directions</a>
          </div>
        </div>
      </section>
    </div>
  );
});

const MedicinesPage = React.memo(function MedicinesPage({ go, meds, onAddCart, onUploadImg, onRemoveImg, onAdminOpen, isAdmin }) {
  const [search, setSearch]     = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const card=mkCard(); const btn=mkBtn; const tag=mkTag;
  const cats = useMemo(() => ["All",...[...new Set(meds.map(m=>m.category))]], [meds]);
  const filtered = useMemo(() => meds.filter(m=>{
    const mc = catFilter==="All"||m.category===catFilter;
    const ms = m.name.toLowerCase().includes(search.toLowerCase())||m.category.toLowerCase().includes(search.toLowerCase());
    return mc&&ms;
  }), [meds,search,catFilter]);
  return (
    <div className="pg">
      <div style={mkHero("#0c4a6e","#064e3b")}>
        <h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:8 }}>Our Medicines</h1>
        <p style={{ color:"#a7f3d0",fontSize:13,marginBottom:22 }}>Browse {meds.length} genuine medicines & health products</p>
        <div style={{ position:"relative",maxWidth:440,margin:"0 auto" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search medicines..." style={{ width:"100%",padding:"10px 38px",borderRadius:10,border:"1px solid rgba(255,255,255,.3)",background:"rgba(255,255,255,.15)",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box" }}/>
          <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.7)",pointerEvents:"none" }}><SearchIcon/></span>
          {search&&<button onClick={()=>setSearch("")} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.22)",border:"none",borderRadius:50,width:18,height:18,cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10 }}>✕</button>}
        </div>
      </div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(32px,4vw,48px) 20px" }}>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,justifyContent:"center" }}>
          {cats.map(c=><button key={c} onClick={()=>setCatFilter(c)} style={{ padding:"6px 16px",borderRadius:50,fontWeight:700,fontSize:12,cursor:"pointer",border:catFilter===c?"none":"1.5px solid var(--bdr)",background:catFilter===c?"#059669":"var(--bg2)",color:catFilter===c?"#fff":"var(--text2)",transition:"all .18s" }}>{c}</button>)}
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8 }}>
          {search&&<div style={{ fontSize:12,color:"var(--text2)" }}>Showing <b style={{ color:"var(--text)" }}>{filtered.length}</b> result{filtered.length!==1?"s":""} for "<b>{search}</b>"</div>}
          {isAdmin && (
            <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
              <button style={{ ...btn(),fontSize:12,padding:"7px 16px",gap:6 }} className="hbtn" onClick={onAdminOpen}>➕ Add / Edit Medicine</button>
            </div>
          )}
        </div>
        {filtered.length===0
          ?<div style={{ textAlign:"center",padding:"50px 0" }}><div style={{ fontSize:44,marginBottom:12 }}>🔍</div><h3 style={{ fontWeight:800,marginBottom:6 }}>No medicines found</h3><button style={btn("out")} onClick={()=>{setSearch("");setCatFilter("All");}}>Clear Filters</button></div>
          :<div className="g4 card-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))" }}>
            {filtered.map(m=>(
              <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
                <div style={{ height:128,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,position:"relative",overflow:"hidden" }}>
                  {m.img?<img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:m.emoji}
                  {isAdmin && <>
                    <label htmlFor={`mi-${m.id}`} className="med-img-overlay" style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",opacity:0,color:"#fff",gap:4 }} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}><CameraIcon/><span style={{ fontSize:9,fontWeight:700 }}>{m.img?"Change":"Upload"}</span></label>
                    <input id={`mi-${m.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>onUploadImg(m.id,e.target.files[0])}/>
                    {m.img&&<button onClick={e=>{e.stopPropagation();onRemoveImg(m.id);}} style={{ position:"absolute",top:5,right:5,background:"rgba(239,68,68,.85)",border:"none",borderRadius:50,width:19,height:19,cursor:"pointer",color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>}
                  </>}
                </div>
                <div style={{ padding:"12px 14px 14px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:10,color:"var(--text2)" }}>{m.category}</span></div>
                  <h4 style={{ fontWeight:800,fontSize:12,marginBottom:3 }}>{m.name}</h4>
                  <p style={{ fontSize:11,color:"var(--text2)",marginBottom:10 }}>{m.desc}</p>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <span style={{ fontSize:16,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
                    <button style={btn("sm")} className="hbtn" onClick={(e)=>{addRipple(e);onAddCart(m);}}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        <div style={{ ...card,marginTop:28,background:"#e0f2fe",border:"none",padding:"14px 18px",display:"flex",gap:9,alignItems:"center",flexWrap:"wrap" }}>
          <span>ℹ️</span><p style={{ fontSize:12,color:"var(--text2)",flex:1 }}><b>Prescription Required:</b> "Rx" items need a valid prescription.</p>
          <button style={btn("sm")} onClick={()=>go("prescription")}>Upload Rx</button>
        </div>
      </section>
    </div>
  );
});

const PrescriptionPage = React.memo(function PrescriptionPage({ go, onToast }) {
  const [form, setForm] = useState({ name:"",phone:"",address:"",medicine:"",note:"",file:null,preview:null });
  const [done, setDone] = useState(false);
  const card=mkCard(); const btn=mkBtn; const inp=mkInp();
  const upd = useCallback((k,v)=>setForm(p=>({...p,[k]:v})),[]);
  const handleFile = useCallback(file=>{ if(!file)return; const r=new FileReader(); r.onload=e=>setForm(p=>({...p,file,preview:e.target.result})); r.readAsDataURL(file); },[]);
  const submit = useCallback(()=>{
    if(!form.name||!form.phone){onToast("Please fill Name and Phone","err");return;}
    DB.prescriptions.push({...form,time:new Date().toLocaleString("en-IN")});
    setDone(true); onToast("Prescription submitted! We'll call soon. ✅");
  },[form,onToast]);
  if(done) return <div style={{ textAlign:"center",padding:"80px 20px" }} className="pg"><div style={{ fontSize:64,marginBottom:16 }}>✅</div><h2 style={{ fontSize:24,fontWeight:900,marginBottom:8 }}>Prescription Submitted!</h2><p style={{ color:"var(--text2)",maxWidth:360,margin:"0 auto 20px",lineHeight:1.7,fontSize:13 }}>Our pharmacist will review and call you within 30 minutes.</p><div style={{ display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap" }}><button style={btn()} onClick={()=>go("home")}>Back to Home</button><button style={btn("out")} onClick={()=>{setDone(false);setForm({name:"",phone:"",address:"",medicine:"",note:"",file:null,preview:null});}}>Submit Another</button></div></div>;
  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#0c4a6e")}><h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:8 }}>Upload Prescription</h1><p style={{ color:"#a7f3d0",fontSize:14 }}>Send your prescription and we'll prepare your medicines</p></div>
      <section style={{ maxWidth:620,margin:"0 auto",padding:"clamp(24px,4vw,44px) 16px" }}>
        <div style={card}>
          <h3 style={{ fontSize:15,fontWeight:900,marginBottom:18 }}>📋 Prescription Details</h3>
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            {[["Patient Name *","name","text","Full name"],["Phone Number *","phone","tel","10-digit number"],["Delivery Address","address","text","Full delivery address"],["Medicine Name (optional)","medicine","text","List names if known"]].map(([l,k,t,ph])=>(
              <div key={k}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>{l}</label><input style={inp} type={t} placeholder={ph} value={form[k]} onChange={e=>upd(k,e.target.value)}/></div>
            ))}
            <div>
              <label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Upload Prescription Image</label>
              <div style={{ border:"2px dashed var(--bdr)",borderRadius:12,padding:form.preview?0:24,textAlign:"center",background:"var(--bg3)",cursor:"pointer",overflow:"hidden" }} onClick={()=>document.getElementById("rx-file").click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}}>
                <input id="rx-file" type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])}/>
                {form.preview?<div style={{ position:"relative" }}><img src={form.preview} alt="Prescription" style={{ width:"100%",maxHeight:190,objectFit:"cover",display:"block" }}/><div style={{ position:"absolute",top:7,right:7,background:"#059669",color:"#fff",borderRadius:50,padding:"2px 8px",fontSize:10,fontWeight:700 }}>✓</div></div>:<><div style={{ fontSize:28,marginBottom:5,color:"var(--text2)" }}>📷</div><p style={{ fontWeight:700,marginBottom:2,fontSize:12 }}>Drag & drop or click</p><p style={{ fontSize:11,color:"var(--text2)" }}>JPG, PNG, PDF</p></>}
              </div>
            </div>
            <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Additional Note</label><textarea style={{ ...inp,height:78,resize:"vertical" }} placeholder="Special instructions..." value={form.note} onChange={e=>upd("note",e.target.value)}/></div>
            <button style={{ ...btn(),padding:"12px",fontSize:14,justifyContent:"center",width:"100%" }} className="hbtn" onClick={submit}>📤 Submit Prescription</button>
          </div>
        </div>
        <div style={{ ...card,marginTop:16,background:"#d1fae5",border:"1px solid #a7f3d0" }}>
          <h4 style={{ fontWeight:800,marginBottom:8,fontSize:13 }}>📞 Prefer to Call or WhatsApp?</h4>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <a href="tel:6389482072" style={{ ...btn(),textDecoration:"none" }}>📞 6389482072</a>
            <a href="tel:8586098544" style={{ ...btn(),background:"#0ea5e9",textDecoration:"none" }}>📞 8586098544</a>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none" }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
});

const ServicesPage = React.memo(function ServicesPage({ go, services, onAdminOpen, isAdmin }) {
  const card=mkCard(); const btn=mkBtn; const tag=mkTag;
  return (
    <div className="pg">
      <div style={mkHero("#0c4a6e","#064e3b")}><h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:8 }}>Our Services</h1><p style={{ color:"#a7f3d0",fontSize:14 }}>Complete healthcare solutions for you and your family</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(32px,5vw,54px) 20px" }}>
        {isAdmin && (
          <div style={{ textAlign:"right",marginBottom:20 }}>
            <button style={{ ...btn(),fontSize:12,padding:"7px 16px" }} className="hbtn" onClick={onAdminOpen}>⚙️ Add / Edit Services</button>
          </div>
        )}
        <div className="g3 card-grid">
          {services.map(s=>(
            <div key={s.id} style={{ ...card,padding:28 }} className="lift">
              <div style={{ width:60,height:60,borderRadius:15,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,marginBottom:14 }}>{s.icon}</div>
              <h3 style={{ fontWeight:900,fontSize:16,marginBottom:8 }}>{s.title}</h3>
              <p style={{ color:"var(--text2)",lineHeight:1.7,marginBottom:12,fontSize:13 }}>{s.desc}</p>
              <span style={tag("g")}>Available In-Store</span>
            </div>
          ))}
        </div>
        <div style={{ ...card,marginTop:40,background:"linear-gradient(135deg,#064e3b,#065f46)",border:"none",padding:36,textAlign:"center" }}>
          <h2 style={{ color:"#fff",fontSize:22,fontWeight:900,marginBottom:8 }}>🏥 Visit TR Pharmacy</h2>
          <p style={{ color:"#a7f3d0",marginBottom:20,fontSize:13 }}>All services available at our store. Walk in anytime.</p>
          <div style={{ display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap" }}>
            <button style={{ ...btn(),background:"#fff",color:"#059669" }} onClick={()=>go("contact")}>📞 Contact Us</button>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none" }}>💬 WhatsApp Now</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"rgba(255,255,255,.18)",textDecoration:"none" }}>🗺️ Get Directions</a>
          </div>
        </div>
      </section>
    </div>
  );
});

const ContactPage = React.memo(function ContactPage({ onToast, contact, onAdminOpen, isAdmin }) {
  const [form, setForm] = useState({ name:"",email:"",phone:"",msg:"" });
  const [done, setDone] = useState(false);
  const card=mkCard(); const btn=mkBtn; const inp=mkInp();
  const upd = useCallback((k,v)=>setForm(p=>({...p,[k]:v})),[]);
  const send = useCallback(()=>{
    if(!form.name||!form.phone){onToast("Fill Name and Phone","err");return;}
    if(!form.msg){onToast("Write a message","err");return;}
    DB.contacts.push({...form,time:new Date().toLocaleString("en-IN")});
    setDone(true); onToast("Message sent! ✅");
  },[form,onToast]);
  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#0c4a6e")}><h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:8 }}>Contact Us</h1><p style={{ color:"#a7f3d0",fontSize:14 }}>We're here for all your healthcare needs</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(32px,5vw,54px) 20px" }}>
        {isAdmin && (
          <div style={{ textAlign:"right",marginBottom:16 }}>
            <button style={{ ...btn("ghost"),fontSize:12,padding:"6px 14px",border:"1px solid var(--bdr)" }} className="hbtn" onClick={onAdminOpen}>⚙️ Edit Contact Details</button>
          </div>
        )}
        <div className="cg">
          <div>
            <h3 style={{ fontSize:17,fontWeight:900,marginBottom:16 }}>Get In Touch</h3>
            {[["📍","Address",contact.address,MAPS_URL],["📞","Phone Numbers",`${contact.phone1}  |  ${contact.phone2}`,`tel:${contact.phone1}`],["🕐","Working Hours",contact.hours,null],["💬","WhatsApp","Chat for quick queries","https://wa.me/916389482072"]].map(([ic,t,i,l])=>(
              <div key={t} style={{ ...card,display:"flex",gap:11,marginBottom:10,cursor:l?"pointer":"default",transition:"all .2s" }} className={l?"lift":""} onClick={()=>l&&window.open(l,l.startsWith("tel")?"_self":"_blank")}>
                <div style={{ fontSize:22,flexShrink:0 }}>{ic}</div>
                <div><div style={{ fontWeight:800,marginBottom:2,fontSize:13 }}>{t}</div><div style={{ color:l?"#059669":"var(--text2)",fontSize:12,fontWeight:l?600:400 }}>{i}</div>{l&&<div style={{ fontSize:10,color:"var(--text2)",marginTop:1 }}>Click to open →</div>}</div>
              </div>
            ))}
            <div style={{ borderRadius:13,overflow:"hidden",border:"1px solid var(--bdr)",marginTop:14 }}>
              <iframe title="TR Pharmacy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57010!2d80.95!3d26.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdaa7c9af2ab%3A0x6c7c49cf6c81a2fc!2sJankipuram%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1" width="100%" height="180" style={{ border:"none",display:"block" }} allowFullScreen loading="lazy"/>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ display:"block",padding:"10px 14px",background:"#059669",color:"#fff",textAlign:"center",fontWeight:700,fontSize:12,textDecoration:"none" }}>🗺️ Open in Google Maps</a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize:17,fontWeight:900,marginBottom:16 }}>Send a Message</h3>
            {done
              ?<div style={{ ...card,textAlign:"center",padding:40 }}><div style={{ fontSize:52,marginBottom:12 }}>✅</div><h3 style={{ fontWeight:900,marginBottom:6,fontSize:16 }}>Message Received!</h3><p style={{ color:"var(--text2)",marginBottom:16,fontSize:13 }}>We'll call you back on <b>{form.phone}</b>.</p><button style={btn("out")} onClick={()=>{setDone(false);setForm({name:"",email:"",phone:"",msg:""});}}>Send Another</button></div>
              :<div style={card}>
                <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
                  {[["Your Name *","name","text"],["Email Address","email","email"],["Phone Number *","phone","tel"]].map(([l,k,t])=>(
                    <div key={k}><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>{l}</label><input style={inp} type={t} placeholder={l.replace(" *","")} value={form[k]} onChange={e=>upd(k,e.target.value)}/></div>
                  ))}
                  <div><label style={{ fontWeight:700,fontSize:11,marginBottom:4,display:"block" }}>Message *</label><textarea style={{ ...inp,height:95,resize:"vertical" }} placeholder="How can we help?" value={form.msg} onChange={e=>upd("msg",e.target.value)}/></div>
                  <button style={{ ...btn(),padding:"12px",fontSize:14,justifyContent:"center" }} className="hbtn" onClick={send}>📤 Send Message</button>
                </div>
              </div>
            }
            <a href={`https://wa.me/91${contact.phone1}?text=Hello%20TR%20Pharmacy%2C%20I%20need%20help`} target="_blank" rel="noreferrer" style={{ display:"flex",alignItems:"center",gap:11,padding:"15px 16px",background:"#dcfce7",borderRadius:13,marginTop:12,textDecoration:"none",border:"1.5px solid #bbf7d0" }} className="lift">
              <div style={{ width:40,height:40,borderRadius:11,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WAIcon/></div>
              <div><div style={{ fontWeight:900,color:"#166534",fontSize:13 }}>Chat on WhatsApp</div><div style={{ fontSize:11,color:"#15803d" }}>Quick replies available</div></div>
              <span style={{ marginLeft:"auto",fontSize:16,color:"#15803d" }}>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
});

const OpeningPage = React.memo(function OpeningPage({ contact, isAdmin }) {
  const [bannerVisible, setBannerVisible] = useState(()=>lsGet("trp_banner",true));
  const [photos, setPhotos] = useState(()=>lsGet("trp_opening_photos",[]));
  const [lightbox, setLightbox] = useState(null);
  const card=mkCard(); const btn=mkBtn;
  const dismiss = useCallback(()=>{ setBannerVisible(false); lsSet("trp_banner",false); },[]);
  const restore = useCallback(()=>{ setBannerVisible(true); lsSet("trp_banner",true); },[]);
  const handlePhotoUpload = useCallback(files=>{ if(!files||files.length===0)return; Array.from(files).forEach(file=>{ const r=new FileReader(); r.onload=e=>setPhotos(prev=>{ const updated=[...prev,{id:Date.now()+Math.random(),src:e.target.result,name:file.name,date:new Date().toLocaleDateString("en-IN")}]; lsSet("trp_opening_photos",updated); return updated; }); r.readAsDataURL(file); }); },[]);
  const deletePhoto = useCallback(id=>{ setPhotos(prev=>{ const updated=prev.filter(p=>p.id!==id); lsSet("trp_opening_photos",updated); return updated; }); setLightbox(null); },[]);
  const daysSince = useMemo(()=>Math.max(0,Math.floor((new Date()-new Date("2026-03-12"))/(1000*60*60*24))),[]);
  return (
    <div className="pg">
      <div style={{ background:"linear-gradient(270deg,#064e3b,#065f46,#0c4a6e,#064e3b)",backgroundSize:"200% 200%",padding:"clamp(44px,7vw,70px) 20px",textAlign:"center",position:"relative",overflow:"hidden",animation:"gradShift 8s ease infinite" }}>
        <div style={{ position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(#fff 1px,transparent 1px)",backgroundSize:"26px 26px" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:22,marginBottom:12 }}>🎉 🏥 🎊</div>
          <div style={{ display:"inline-block",background:"rgba(255,255,255,.15)",borderRadius:50,padding:"5px 18px",fontSize:12,color:"#a7f3d0",fontWeight:700,marginBottom:14 }}>✅ Grand Opening — Celebrated!</div>
          <h1 style={{ color:"#fff",fontSize:"clamp(24px,5vw,48px)",fontWeight:900,lineHeight:1.1,marginBottom:9 }}>TR Pharmacy<br/><span className="grad-text">Successfully Opened!</span></h1>
          <p style={{ color:"#a7f3d0",fontSize:14,marginBottom:5 }}>12 March 2026 · 3:00 PM · Jankipuram, Lucknow</p>
          <p style={{ color:"rgba(255,255,255,.55)",fontSize:12 }}>{daysSince===0?"Opened today! 🎊":`${daysSince} day${daysSince>1?"s":""} of serving Jankipuram`}</p>
        </div>
      </div>
      <section style={{ maxWidth:940,margin:"0 auto",padding:"clamp(32px,4vw,48px) 20px" }}>
        <div className="g4 card-grid" style={{ marginBottom:28 }}>
          {[["📅","Date","12 March 2026","Successfully celebrated"],["⏰","Time","3:00 PM Onwards","Opening ceremony done"],["📍","Venue","Janki Plaza, Sector G","Jankipuram, Lucknow"],["🎁","Highlights","Discounts & Lucky Draw","Customers loved it!"]].map(([ic,t,v,s])=>(
            <div key={t} style={{ ...card,textAlign:"center",padding:20 }} className="lift"><div style={{ fontSize:28,marginBottom:8 }}>{ic}</div><div style={{ fontSize:10,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:1 }}>{t}</div><div style={{ fontSize:14,fontWeight:900,color:"#059669",margin:"5px 0 3px" }}>{v}</div><div style={{ fontSize:10,color:"var(--text2)" }}>{s}</div></div>
          ))}
        </div>
        {bannerVisible
          ?<div style={{ ...card,background:"linear-gradient(135deg,#fdf4ff,#fce7f3)",border:"1.5px solid #f9a8d4",padding:"20px 22px",marginBottom:24,position:"relative",animation:"fadeUp .4s ease" }}>
            <button onClick={dismiss} style={{ position:"absolute",top:10,right:10,background:"rgba(0,0,0,.08)",border:"none",borderRadius:50,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontSize:11 }}>✕</button>
            <h3 style={{ fontWeight:900,fontSize:15,marginBottom:10 }}>🎊 Grand Opening — Highlights</h3>
            <div className="g3" style={{ gap:9 }}>
              {["🎁 Special Discounts","💊 Free Health Check","👨‍⚕️ Pharmacist Consultation","🎀 Lucky Draw","📋 Free Medicine Guidance","🏥 Full Medicine Stock"].map(item=>(
                <div key={item} style={{ background:"#fff",borderRadius:10,padding:"10px 9px",fontWeight:700,fontSize:12,boxShadow:"0 2px 7px rgba(0,0,0,.07)" }}>{item}</div>
              ))}
            </div>
            <p style={{ fontSize:11,color:"var(--text2)",marginTop:10 }}>Thank you to everyone who joined us on 12 March 2026! 💚</p>
          </div>
          :<div style={{ marginBottom:20,textAlign:"right" }}><button onClick={restore} style={{ ...btn("ghost"),fontSize:11,padding:"5px 12px",border:"1px solid var(--bdr)" }}>🎊 Show Opening Highlights</button></div>
        }
        {/* Photos */}
        <div style={card}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8 }}>
            <div><h3 style={{ fontWeight:900,fontSize:15,marginBottom:2 }}>📸 Grand Opening Photos</h3><p style={{ color:"var(--text2)",fontSize:11 }}>{photos.length===0?"Upload photos from the opening day":""+photos.length+" photo(s) saved permanently"}</p></div>
            {isAdmin && <>
              <label htmlFor="opening-photos" style={{ ...btn(),cursor:"pointer",fontSize:12,padding:"8px 16px" }}>📤 Upload Photos</label>
              <input id="opening-photos" type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e=>handlePhotoUpload(e.target.files)}/>
            </>}
          </div>
          {photos.length===0
            ?<label htmlFor="opening-photos" style={{ display:"block",cursor:"pointer" }}><div style={{ border:"2px dashed var(--bdr)",borderRadius:12,padding:"32px 20px",textAlign:"center",background:"var(--bg3)" }} onMouseEnter={e=>e.currentTarget.style.borderColor="#059669"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--bdr)"}><div style={{ fontSize:40,marginBottom:10 }}>📷</div><p style={{ fontWeight:700,fontSize:14,marginBottom:3 }}>Drop opening day photos here</p><p style={{ color:"var(--text2)",fontSize:11 }}>Multiple files · Saved permanently</p></div></label>
            :<div className="g4" style={{ gap:10 }}>
              {photos.map((p,idx)=>(
                <div key={p.id} style={{ borderRadius:11,overflow:"hidden",position:"relative",cursor:"pointer",boxShadow:"var(--shd)",border:"1px solid var(--bdr)" }} onClick={()=>setLightbox(idx)}>
                  <img src={p.src} alt={p.name} style={{ width:"100%",height:120,objectFit:"cover",display:"block" }}/>
                  <div style={{ padding:"5px 8px",fontSize:10,color:"var(--text2)",background:"var(--bg2)",fontWeight:600 }}>{p.date}</div>
                </div>
              ))}
              <label htmlFor="opening-photos" style={{ borderRadius:11,border:"2px dashed var(--bdr)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",height:140,background:"var(--bg3)",gap:6 }} onMouseEnter={e=>e.currentTarget.style.borderColor="#059669"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--bdr)"}><div style={{ fontSize:24 }}>➕</div><span style={{ fontSize:10,color:"var(--text2)",fontWeight:700 }}>Add More</span></label>
            </div>
          }
        </div>
        <div className="hg" style={{ gap:14,marginTop:20 }}>
          <div style={{ ...card,background:"#059669",color:"#fff",textAlign:"center",padding:24 }}>
            <div style={{ fontSize:34,marginBottom:8 }}>📍</div><h3 style={{ fontWeight:900,fontSize:14,marginBottom:6 }}>Our Location</h3>
            <p style={{ opacity:.88,fontSize:12,marginBottom:12,lineHeight:1.6 }}>{contact.address}</p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"#fff",color:"#059669",textDecoration:"none",justifyContent:"center" }}>🗺️ Get Directions</a>
          </div>
          <div style={{ ...card,background:"#0c4a6e",color:"#fff",textAlign:"center",padding:24 }}>
            <div style={{ fontSize:34,marginBottom:8 }}>📞</div><h3 style={{ fontWeight:900,fontSize:14,marginBottom:6 }}>Call / Visit Us</h3>
            <p style={{ opacity:.88,fontSize:12,marginBottom:12 }}>{contact.phone1}<br/>{contact.phone2}</p>
            <a href={`https://wa.me/91${contact.phone1}`} target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center" }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
      {lightbox!==null&&<div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:500,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:16 }} onClick={()=>setLightbox(null)}>
        <div style={{ position:"relative",maxWidth:800,width:"100%" }} onClick={e=>e.stopPropagation()}>
          {photos.length>1&&<><button onClick={()=>setLightbox((lightbox-1+photos.length)%photos.length)} style={{ position:"absolute",left:-44,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"none",borderRadius:50,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>‹</button><button onClick={()=>setLightbox((lightbox+1)%photos.length)} style={{ position:"absolute",right:-44,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"none",borderRadius:50,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>›</button></>}
          <img src={photos[lightbox].src} alt="" style={{ width:"100%",maxHeight:"72vh",objectFit:"contain",borderRadius:12,display:"block" }}/>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10,padding:"0 3px" }}>
            <span style={{ color:"rgba(255,255,255,.65)",fontSize:12 }}>📷 {photos[lightbox].name} · {photos[lightbox].date}</span>
            <div style={{ display:"flex",gap:8 }}>
              <span style={{ color:"rgba(255,255,255,.45)",fontSize:11 }}>{lightbox+1}/{photos.length}</span>
              {isAdmin && <button onClick={()=>deletePhoto(photos[lightbox].id)} style={{ background:"#ef4444",border:"none",borderRadius:7,cursor:"pointer",color:"#fff",padding:"5px 10px",fontSize:11,fontWeight:700 }}>🗑️ Delete</button>}
              <button onClick={()=>setLightbox(null)} style={{ background:"rgba(255,255,255,.15)",border:"none",borderRadius:7,cursor:"pointer",color:"#fff",padding:"5px 10px",fontSize:11,fontWeight:700 }}>✕</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
});

const Footer = React.memo(function Footer({ go, services, contact }) {
  return (
    <footer style={{ background:"#0f172a",color:"#94a3b8",padding:"44px 20px 20px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",marginBottom:32 }} className="fg">
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
            <div style={{ width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:15 }}>✚</div>
            <span style={{ color:"#fff",fontWeight:900,fontSize:15 }}>TR Pharmacy</span>
          </div>
          <p style={{ fontSize:12,lineHeight:1.8,marginBottom:13 }}>{contact.tagline}. {contact.about.split("—")[0]}</p>
          <div style={{ display:"flex",gap:7 }}>
            <a href={`https://wa.me/91${contact.phone1}`} target="_blank" rel="noreferrer" style={{ width:32,height:32,borderRadius:8,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}><WAIcon/></a>
            <a href={`tel:${contact.phone1}`} style={{ width:32,height:32,borderRadius:8,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#94a3b8",fontSize:14 }}>📞</a>
          </div>
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:11,fontSize:13 }}>Quick Links</h4>
          {[["home","Home"],["about","About Us"],["medicines","Medicines"],["prescription","Upload Rx"],["services","Services"],["contact","Contact"],["opening","Grand Opening"]].map(([p,l])=>(
            <div key={p} style={{ marginBottom:5 }}><button onClick={()=>go(p)} style={{ background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:12,padding:0 }}>→ {l}</button></div>
          ))}
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:11,fontSize:13 }}>Services</h4>
          {services.slice(0,6).map(s=><div key={s.id} style={{ fontSize:12,marginBottom:5 }}>✓ {s.title}</div>)}
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:11,fontSize:13 }}>Contact</h4>
          <div style={{ display:"flex",gap:6,marginBottom:8,fontSize:12,alignItems:"flex-start" }}><span>📍</span><a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color:"#94a3b8",textDecoration:"none" }}>{contact.address}</a></div>
          <div style={{ display:"flex",gap:6,marginBottom:5,fontSize:12 }}><span>📞</span><a href={`tel:${contact.phone1}`} style={{ color:"#94a3b8",textDecoration:"none" }}>{contact.phone1}</a></div>
          <div style={{ display:"flex",gap:6,marginBottom:12,fontSize:12 }}><span>📞</span><a href={`tel:${contact.phone2}`} style={{ color:"#94a3b8",textDecoration:"none" }}>{contact.phone2}</a></div>
          <div style={{ background:"#1e293b",borderRadius:10,padding:"10px 12px" }}>
            <div style={{ fontSize:10,color:"#475569",marginBottom:2,textTransform:"uppercase",letterSpacing:1 }}>Grand Opening</div>
            <div style={{ color:"#fff",fontWeight:800,fontSize:12 }}>12 March 2026</div>
            <div style={{ color:"#059669",fontSize:11 }}>{contact.hours}</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",borderTop:"1px solid #1e293b",paddingTop:18,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:7,fontSize:11 }}>
        <span>© 2026 TR Pharmacy, Jankipuram, Lucknow. All rights reserved.</span>
        <span style={{ color:"#059669",fontWeight:700 }}>"{contact.tagline}"</span>
      </div>
    </footer>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  APP  — central state + localStorage persistence
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,      setPage]     = useState("home");
  const [dark,      setDark]     = useState(false);
  const [cart,      setCart]     = useState([]);
  const [cartOpen,  setCartOpen] = useState(false);
  const [cartStep,  setCartStep] = useState("items");
  const [cartAddr,  setCartAddr] = useState({ name:"",phone:"",address:"",pincode:"" });
  const [payMode,   setPayMode]  = useState("cod");
  const [showDB,    setShowDB]   = useState(false);
  const [showAdmin, setShowAdmin]= useState(false);
  const [showLogin, setShowLogin]= useState(false);
  const [toast,     setToast]    = useState(null);

  // ── Admin auth — check saved session on load ───────────────────────────────
  const [isAdmin, setIsAdmin] = useState(() => isSessionValid());

  const handleAdminLogin = useCallback(() => {
    setIsAdmin(true);
    setShowLogin(false);
    setShowAdmin(true);
  }, []);

  const handleAdminLogout = useCallback(() => {
    clearSession();
    setIsAdmin(false);
    setShowAdmin(false);
    setShowLogin(false);
  }, []);

  // Guard: clicking admin open — show login if not authed
  const onAdminOpen = useCallback(() => {
    if (isSessionValid()) {
      setIsAdmin(true);
      setShowAdmin(true);
    } else {
      setIsAdmin(false);
      setShowLogin(true);
    }
  }, []);
  const onAdminClose = useCallback(() => setShowAdmin(false), []);

  // ── All dynamic data loaded from localStorage on first render ──────────────
  const [meds,         setMeds]         = useState(() => { const imgs=lsGet("trp_med_imgs",{}); const base=DEFAULT_MEDS.map(m=>({...m,img:imgs[m.id]||null})); const custom=lsGet("trp_custom_meds",[]).map(m=>({...m,img:imgs[m.id]||null})); return [...base,...custom]; });
  const [services,     setServices]     = useState(() => lsGet("trp_services",     DEFAULT_SERVICES));
  const [testimonials, setTestimonials] = useState(() => lsGet("trp_testimonials", DEFAULT_TESTIMONIALS));
  const [faqs,         setFaqs]         = useState(() => lsGet("trp_faqs",         DEFAULT_FAQS));
  const [contact,      setContact]      = useState(() => lsGet("trp_contact",      DEFAULT_CONTACT));

  // ── Persist helpers ────────────────────────────────────────────────────────
  const saveMeds = useCallback((updated) => {
    setMeds(updated);
    const imgMap={};
    updated.forEach(m=>{ if(m.img) imgMap[m.id]=m.img; });
    lsSet("trp_med_imgs", imgMap);
    lsSet("trp_custom_meds", updated.filter(m=>m.id>100).map(m=>({...m,img:null})));
  }, []);

  const saveServices     = useCallback(v=>{ setServices(v);     lsSet("trp_services",v);     },[]);
  const saveTestimonials = useCallback(v=>{ setTestimonials(v); lsSet("trp_testimonials",v); },[]);
  const saveFaqs         = useCallback(v=>{ setFaqs(v);         lsSet("trp_faqs",v);         },[]);
  const saveContact      = useCallback(v=>{ setContact(v);      lsSet("trp_contact",v);      },[]);

  // ── Theme ──────────────────────────────────────────────────────────────────
  const cssVars = useMemo(() => dark
    ? {"--bg":"#0f172a","--bg2":"#1e293b","--bg3":"#273549","--text":"#f1f5f9","--text2":"#94a3b8","--bdr":"#334155","--shd":"0 4px 24px rgba(0,0,0,.45)"}
    : {"--bg":"#f8fafc","--bg2":"#ffffff","--bg3":"#f1f5f9","--text":"#0f172a","--text2":"#64748b","--bdr":"#e2e8f0","--shd":"0 4px 20px rgba(0,0,0,.07)"}
  ,[dark]);

  // ── Stable callbacks ───────────────────────────────────────────────────────
  const go         = useCallback((p)=>{ setPage(p); window.scrollTo({top:0,behavior:"smooth"}); },[]);
  const showToast  = useCallback((msg,err)=>{ setToast({msg,err}); setTimeout(()=>setToast(null),3000); },[]);
  const onCartOpen  = useCallback(()=>{ setCartOpen(true); setCartStep("items"); },[]);
  const onCartClose = useCallback(()=>setCartOpen(false),[]);
  const onDBOpen    = useCallback(()=>setShowDB(true),[]);
  const onDBClose   = useCallback(()=>setShowDB(false),[]);


  const onAddCart  = useCallback((m)=>{ setCart(c=>{ const ex=c.find(i=>i.id===m.id); return ex?c.map(i=>i.id===m.id?{...i,qty:i.qty+1}:i):[...c,{...m,qty:1}]; }); showToast(`${m.name} added! 🛒`); },[showToast]);
  const onUpdQty   = useCallback((id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i)),[]);
  const onRemCart  = useCallback((id)=>setCart(c=>c.filter(i=>i.id!==id)),[]);
  const cartCount  = useMemo(()=>cart.reduce((s,i)=>s+i.qty,0),[cart]);

  const onUploadImg = useCallback((id,file)=>{ if(!file)return; const r=new FileReader(); r.onload=e=>{ saveMeds(meds.map(m=>m.id===id?{...m,img:e.target.result}:m)); showToast("Photo saved ✅"); }; r.readAsDataURL(file); },[meds,saveMeds,showToast]);
  const onRemoveImg = useCallback((id)=>{ saveMeds(meds.map(m=>m.id===id?{...m,img:null}:m)); showToast("Photo removed"); },[meds,saveMeds,showToast]);

  const rootStyle = useMemo(()=>({...cssVars,fontFamily:"'Nunito','Segoe UI',sans-serif",background:"var(--bg)",color:"var(--text)",minHeight:"100vh",transition:"background .3s,color .3s"}),[cssVars]);

  const renderPage = () => {
    const common = { go, onAddCart, onToast:showToast, contact, isAdmin };
    switch(page) {
      case "home":         return <HomePage         {...common} meds={meds} services={services} testimonials={testimonials} faqs={faqs} onUploadImg={onUploadImg} onRemoveImg={onRemoveImg}/>;
      case "about":        return <AboutPage        go={go} contact={contact}/>;
      case "medicines":    return <MedicinesPage    go={go} meds={meds} onAddCart={onAddCart} onUploadImg={onUploadImg} onRemoveImg={onRemoveImg} onAdminOpen={onAdminOpen} isAdmin={isAdmin}/>;
      case "prescription": return <PrescriptionPage go={go} onToast={showToast}/>;
      case "services":     return <ServicesPage     go={go} services={services} onAdminOpen={onAdminOpen} isAdmin={isAdmin}/>;
      case "contact":      return <ContactPage      onToast={showToast} contact={contact} onAdminOpen={onAdminOpen} isAdmin={isAdmin}/>;
      case "opening":      return <OpeningPage      contact={contact} isAdmin={isAdmin}/>;
      default:             return <HomePage         {...common} meds={meds} services={services} testimonials={testimonials} faqs={faqs} onUploadImg={onUploadImg} onRemoveImg={onRemoveImg}/>;
    }
  };

  return (
    <div style={rootStyle}>
      <Nav dark={dark} setDark={setDark} page={page} go={go} cartCount={cartCount} onCartOpen={onCartOpen} onDBOpen={onDBOpen} onAdminOpen={onAdminOpen} isAdmin={isAdmin} onLogout={handleAdminLogout}/>

      <div className="page-content">{renderPage()}</div>

      <Footer go={go} services={services} contact={contact}/>

      {/* WhatsApp */}
      <a href={`https://wa.me/91${contact.phone1}?text=Hello%20TR%20Pharmacy`} target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="wa-fab" style={{ position:"fixed",bottom:24,right:24,width:52,height:52,borderRadius:26,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",zIndex:999 }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12) rotate(-5deg)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}><WAIcon/></a>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {[["home","🏠","Home"],["medicines","💊","Medicines"],["prescription","📋","Rx Upload"],["contact","📞","Contact"],["opening","✅","Opening"]].map(([p,ic,l])=>(
            <button key={p} onClick={()=>go(p)} className={`bnav-btn${page===p?" active":""}`}><span className="icon">{ic}</span><span>{l}</span></button>
          ))}
        </div>
      </nav>

      {/* Toast */}
      {toast&&<div className="toast-pop" style={{ position:"fixed",bottom:88,right:20,background:toast.err?"#ef4444":"#059669",color:"#fff",padding:"11px 18px",borderRadius:13,fontWeight:700,fontSize:13,boxShadow:"0 6px 22px rgba(0,0,0,.22)",zIndex:1000,maxWidth:270,lineHeight:1.4 }}>{toast.msg}</div>}

      {/* Cart */}
      {cartOpen&&<CartPanel cart={cart} cartStep={cartStep} setCartStep={setCartStep} cartAddr={cartAddr} setCartAddr={setCartAddr} payMode={payMode} setPayMode={setPayMode} onClose={onCartClose} onUpdQty={onUpdQty} onRemCart={onRemCart} onGoPage={go} onToast={showToast}/>}

      {/* Submissions — admin only */}
      {showDB && isAdmin && <DBPanel onClose={onDBClose}/>}

      {/* Login modal */}
      {showLogin && !isAdmin && <AdminLoginModal onSuccess={handleAdminLogin} onClose={()=>setShowLogin(false)}/>}

      {/* Admin Panel — only when authenticated */}
      {showAdmin && isAdmin && <AdminPanel meds={meds} services={services} testimonials={testimonials} faqs={faqs} contact={contact} onClose={onAdminClose} onToast={showToast} onUpdateMeds={saveMeds} onUpdateServices={saveServices} onUpdateTestimonials={saveTestimonials} onUpdateFaqs={saveFaqs} onUpdateContact={saveContact} onUploadImg={onUploadImg} onLogout={handleAdminLogout}/>}
    </div>
  );
}