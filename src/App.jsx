// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// // ─────────────────────────────────────────────────────────────────────────────
// //  STATIC DATA  (module-level — never re-created)
// // ─────────────────────────────────────────────────────────────────────────────
// const INITIAL_MEDICINES = [
//   { id:1,  name:"Paracetamol 500mg",    category:"Tablets",       price:32,   desc:"Fever & pain relief",      emoji:"💊", tag:"Best Seller", img:null },
//   { id:2,  name:"Amoxicillin 250mg",    category:"Capsules",      price:85,   desc:"Antibiotic capsules",       emoji:"💉", tag:"Rx",          img:null },
//   { id:3,  name:"Cough Syrup 100ml",    category:"Syrups",        price:65,   desc:"Dry & wet cough relief",    emoji:"🧴", tag:"OTC",         img:null },
//   { id:4,  name:"Vitamin C 1000mg",     category:"Supplements",   price:120,  desc:"Immunity booster",          emoji:"🍊", tag:"Popular",     img:null },
//   { id:5,  name:"Cetrizine 10mg",       category:"Tablets",       price:28,   desc:"Allergy & cold relief",     emoji:"💊", tag:"OTC",         img:null },
//   { id:6,  name:"Omeprazole 20mg",      category:"Capsules",      price:55,   desc:"Acidity & gastric relief",  emoji:"💉", tag:"Rx",          img:null },
//   { id:7,  name:"Multivitamin Syrup",   category:"Syrups",        price:95,   desc:"Daily nutrition",           emoji:"🧴", tag:"Popular",     img:null },
//   { id:8,  name:"Omega-3 Softgels",     category:"Supplements",   price:180,  desc:"Heart & brain health",      emoji:"🐟", tag:"Premium",     img:null },
//   { id:9,  name:"Digital BP Monitor",   category:"Devices",       price:1499, desc:"Accurate BP readings",      emoji:"🩺", tag:"Device",      img:null },
//   { id:10, name:"Glucometer Kit",       category:"Devices",       price:999,  desc:"Blood sugar monitor",       emoji:"🔬", tag:"Device",      img:null },
//   { id:11, name:"Sunscreen SPF50",      category:"Personal Care", price:220,  desc:"UV protection cream",       emoji:"☀️", tag:"Care",        img:null },
//   { id:12, name:"Hand Sanitizer 500ml", category:"Personal Care", price:75,   desc:"99.9% germ protection",     emoji:"🧼", tag:"Care",        img:null },
// ];
// const TESTIMONIALS = [
//   { name:"Priya Sharma",  loc:"Jankipuram, Lucknow",    text:"TR Pharmacy is my go-to for medicines. Staff is knowledgeable and medicines always genuine. Great service!" },
//   { name:"Rahul Verma",   loc:"Sector G, Lucknow",      text:"Very professional pharmacy. Got prescription medicines quickly and at affordable prices. Highly recommended!" },
//   { name:"Sunita Singh",  loc:"Lucknow",                text:"Excellent! The pharmacist gave detailed guidance about my medications. Trustworthy and reliable pharmacy." },
//   { name:"Amit Gupta",    loc:"Jankipuram Extension",   text:"Best pharmacy in the area. Clean, organized, staff always helpful. Quick delivery service too!" },
// ];
// const FAQS = [
//   { q:"Do you deliver medicines at home?",        a:"Yes, we provide home delivery within Jankipuram and nearby areas in Lucknow. Contact us to place your order." },
//   { q:"Can I upload my prescription online?",     a:"Absolutely! Use our online prescription upload feature. We'll prepare your order and confirm via call." },
//   { q:"Are all medicines genuine and certified?", a:"Yes, TR Pharmacy sources all medicines directly from authorized distributors and manufacturers. Every medicine is 100% genuine." },
//   { q:"What are your opening hours?",             a:"We are open from 9:00 AM to 9:00 PM, Monday to Saturday. Sunday timings may vary. Contact us via WhatsApp anytime." },
//   { q:"Do you offer discounts on bulk orders?",   a:"Yes, we offer special discounts on bulk purchases and for regular customers. Contact us for details." },
//   { q:"Can I get health consultation?",           a:"Our experienced pharmacist is available for basic health consultations and guidance on medication usage, free of charge." },
// ];
// const SERVICES = [
//   { icon:"🩺", title:"BP Monitoring",       desc:"Free blood pressure check with digital monitors for accurate readings." },
//   { icon:"🩸", title:"Diabetes Care",       desc:"Complete range of diabetes management products and glucometers." },
//   { icon:"💬", title:"Health Consultation", desc:"Expert pharmacist consultation for medication queries & guidance." },
//   { icon:"📋", title:"Prescription Supply", desc:"All scheduled & OTC medicines with genuine quality assurance." },
//   { icon:"🩹", title:"First Aid Products",  desc:"Complete first aid kits, bandages, antiseptics & wound care." },
//   { icon:"🚚", title:"Home Delivery",       desc:"Fast and reliable medicine delivery to your doorstep." },
// ];
// const CATS = ["All","Tablets","Capsules","Syrups","Supplements","Personal Care","Devices"];
// const MAPS_URL = "https://www.google.com/maps/search/Janki+Plaza+Sector+G+Jankipuram+Lucknow";

// // Persistent submission store — module level, never resets
// const DB = { prescriptions:[], contacts:[] };

// // ─────────────────────────────────────────────────────────────────────────────
// //  ICONS  (module-level pure components — never re-created)
// // ─────────────────────────────────────────────────────────────────────────────
// const CloseIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
// const SearchIcon = () => <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
// const CartIcon = () => <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
// const MoonIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
// const SunIcon  = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
// const StarIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
// const ChevronIcon = ({ open }) => <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform:open?"rotate(180deg)":"none", transition:"transform .3s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>;
// const PlusIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
// const MinusIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
// const TrashIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
// const CameraIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
// const WAIcon = () => (
//   <svg viewBox="0 0 32 32" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
//     <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.028 7.808L0 32l8.404-2.004A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0z" fill="#25D366"/>
//     <path d="M23 18.94c-.32-.16-1.9-.94-2.196-1.047-.295-.106-.51-.16-.724.16-.214.32-.83 1.047-1.018 1.26-.187.214-.375.24-.695.08-.32-.16-1.35-.498-2.572-1.588-.95-.848-1.592-1.895-1.78-2.215-.187-.32-.02-.493.14-.652.145-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.724-1.742-.99-2.388-.26-.627-.527-.54-.724-.55-.187-.01-.4-.012-.614-.012s-.56.08-.853.4c-.294.32-1.122 1.097-1.122 2.676 0 1.578 1.15 3.103 1.31 3.316.16.214 2.262 3.454 5.484 4.843.766.33 1.364.527 1.83.674.769.244 1.47.21 2.024.127.617-.092 1.9-.776 2.168-1.527.267-.75.267-1.393.187-1.527-.08-.134-.294-.214-.614-.374z" fill="#fff"/>
//   </svg>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// //  SHARED STYLE HELPERS  (pure functions — defined once at module level)
// // ─────────────────────────────────────────────────────────────────────────────
// const mkCard  = () => ({ background:"var(--bg2)", borderRadius:18, padding:22, boxShadow:"var(--shd)", border:"1px solid var(--bdr)" });
// const mkInp   = () => ({ width:"100%", padding:"11px 14px", borderRadius:11, border:"1.5px solid var(--bdr)", background:"var(--bg3)", color:"var(--text)", fontSize:14, outline:"none", boxSizing:"border-box" });
// const mkBtn   = (v="p") => ({ padding:v==="sm"?"7px 15px":"12px 22px", borderRadius:50, fontWeight:700, fontSize:v==="sm"?12:14, cursor:"pointer", border:v==="out"?"2px solid #059669":"none", background:v==="out"?"transparent":v==="ghost"?"var(--bg3)":v==="wa"?"#25d366":"#059669", color:v==="out"?"#059669":v==="ghost"?"var(--text2)":"#fff", display:"inline-flex", alignItems:"center", gap:5, whiteSpace:"nowrap", transition:"all .18s" });
// const mkBdg   = c => ({ display:"inline-block", padding:"4px 14px", borderRadius:50, fontSize:12, fontWeight:700, marginBottom:12, background:c==="g"?"#d1fae5":"#e0f2fe", color:c==="g"?"#059669":"#0ea5e9" });
// const mkTag   = c => ({ display:"inline-block", padding:"2px 10px", borderRadius:50, fontSize:11, fontWeight:700, background:c==="g"?"#d1fae5":c==="b"?"#e0f2fe":"#fef3c7", color:c==="g"?"#059669":c==="b"?"#0ea5e9":"#d97706" });
// const mkHero  = (a,b) => ({ background:`linear-gradient(135deg,${a},${b})`, padding:"58px 24px", textAlign:"center" });

// // ─────────────────────────────────────────────────────────────────────────────
// //  ANIMATED COUNTER  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// function Counter({ target }) {
//   const [n, setN]   = useState(0);
//   const ref  = useRef(null);
//   const done = useRef(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting && !done.current) {
//         done.current = true;
//         let cur = 0;
//         const step = Math.max(1, Math.ceil(target / 55));
//         const t = setInterval(() => { cur = Math.min(cur + step, target); setN(cur); if (cur >= target) clearInterval(t); }, 20);
//         obs.disconnect();
//       }
//     });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [target]);
//   return <span ref={ref}>{n}</span>;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// //  GLOBAL CSS  (injected once — not inside any component)
// // ─────────────────────────────────────────────────────────────────────────────
// const globalCss = `
//   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
//   *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//   body { font-family:'Nunito','Segoe UI',sans-serif; background:var(--bg); overflow-x:hidden; }
//   @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes slideIn  { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
//   @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//   @keyframes waPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.45)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
//   .pg { animation: fadeUp .45s ease both; }
//   .lift:hover  { transform:translateY(-4px) !important; box-shadow:0 14px 36px rgba(5,150,105,.18) !important; }
//   .hbtn:hover  { filter:brightness(1.08); transform:scale(1.02); }
//   .float-anim  { animation:float 3s ease-in-out infinite; }
//   input:focus, textarea:focus { border-color:#059669 !important; box-shadow:0 0 0 3px rgba(5,150,105,.12); }
//   @media(max-width:860px) {
//     .desk-nav { display:none !important; }
//     .hg  { grid-template-columns:1fr !important; }
//     .fg  { grid-template-columns:1fr 1fr !important; }
//     .cg  { grid-template-columns:1fr !important; }
//   }
// `;
// // Inject once
// if (!document.getElementById("tr-global-css")) {
//   const s = document.createElement("style");
//   s.id = "tr-global-css";
//   s.textContent = globalCss;
//   document.head.appendChild(s);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// //  NAV  (module-level — receives only what it needs via props)
// // ─────────────────────────────────────────────────────────────────────────────
// const Nav = React.memo(function Nav({ dark, setDark, page, go, cartCount, onCartOpen, onDBOpen }) {
//   const pages = [["home","Home"],["about","About"],["medicines","Medicines"],["prescription","Rx Upload"],["services","Services"],["contact","Contact"],["opening","🎉 Grand Opening"]];
//   return (
//     <nav style={{ position:"sticky",top:0,zIndex:200,background:dark?"rgba(15,23,42,.97)":"rgba(255,255,255,.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--bdr)",boxShadow:"0 2px 14px rgba(0,0,0,.06)" }}>
//       <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 18px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60 }}>
//         <div onClick={()=>go("home")} style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer" }}>
//           <div style={{ width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:17 }}>✚</div>
//           <div>
//             <div style={{ fontSize:16,fontWeight:900,color:"#059669",letterSpacing:"-.4px",lineHeight:1 }}>TR Pharmacy</div>
//             <div style={{ fontSize:9,color:"var(--text2)",marginTop:1 }}>Your Trusted Health Partner</div>
//           </div>
//         </div>
//         <div style={{ display:"flex",gap:2,alignItems:"center" }} className="desk-nav">
//           {pages.map(([p,l]) => (
//             <button key={p} onClick={()=>go(p)} style={{ padding:"5px 11px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:page===p?"#059669":"transparent",color:page===p?"#fff":"var(--text2)",transition:"all .2s" }}>{l}</button>
//           ))}
//         </div>
//         <div style={{ display:"flex",gap:7,alignItems:"center" }}>
//           <button onClick={()=>setDark(d=>!d)} style={{ width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>
//             {dark ? <SunIcon/> : <MoonIcon/>}
//           </button>
//           <button onClick={onCartOpen} style={{ position:"relative",width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>
//             <CartIcon/>
//             {cartCount > 0 && <span style={{ position:"absolute",top:-5,right:-5,width:16,height:16,borderRadius:8,background:"#ef4444",color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
//           </button>
//           <button onClick={onDBOpen} title="View submissions" style={{ width:32,height:32,borderRadius:7,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>📬</button>
//         </div>
//       </div>
//     </nav>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  SUBMISSIONS PANEL  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const DBPanel = React.memo(function DBPanel({ onClose }) {
//   const card = mkCard();
//   return (
//     <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }} onClick={onClose}>
//       <div style={{ ...card,width:"min(680px,100%)",maxHeight:"85vh",overflowY:"auto",padding:28 }} onClick={e=>e.stopPropagation()}>
//         <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
//           <h2 style={{ fontWeight:900,fontSize:19 }}>📬 Form Submissions</h2>
//           <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)" }}><CloseIcon/></button>
//         </div>
//         <h3 style={{ fontWeight:800,color:"#059669",marginBottom:10 }}>💊 Prescriptions ({DB.prescriptions.length})</h3>
//         {DB.prescriptions.length === 0
//           ? <p style={{ color:"var(--text2)",fontSize:13,marginBottom:18 }}>No submissions yet.</p>
//           : DB.prescriptions.map((s,i) => (
//             <div key={i} style={{ ...card,background:"var(--bg3)",padding:14,marginBottom:10,fontSize:13 }}>
//               <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
//                 <div><b>Name:</b> {s.name}</div><div><b>Phone:</b> {s.phone}</div>
//                 <div><b>Address:</b> {s.address||"—"}</div><div><b>Medicine:</b> {s.medicine||"—"}</div>
//                 <div style={{ gridColumn:"1/-1" }}><b>Note:</b> {s.note||"—"}</div>
//                 <div style={{ gridColumn:"1/-1",color:"var(--text2)",fontSize:11 }}>⏰ {s.time}</div>
//                 {s.preview && <img src={s.preview} alt="rx" style={{ gridColumn:"1/-1",width:"100%",maxHeight:150,objectFit:"cover",borderRadius:8,marginTop:6 }}/>}
//               </div>
//             </div>
//           ))
//         }
//         <h3 style={{ fontWeight:800,color:"#0ea5e9",marginBottom:10,marginTop:16 }}>📞 Contact Messages ({DB.contacts.length})</h3>
//         {DB.contacts.length === 0
//           ? <p style={{ color:"var(--text2)",fontSize:13 }}>No messages yet.</p>
//           : DB.contacts.map((s,i) => (
//             <div key={i} style={{ ...card,background:"var(--bg3)",padding:14,marginBottom:10,fontSize:13 }}>
//               <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
//                 <div><b>Name:</b> {s.name}</div><div><b>Phone:</b> {s.phone}</div>
//                 <div style={{ gridColumn:"1/-1" }}><b>Email:</b> {s.email||"—"}</div>
//                 <div style={{ gridColumn:"1/-1" }}><b>Message:</b> {s.msg}</div>
//                 <div style={{ gridColumn:"1/-1",color:"var(--text2)",fontSize:11 }}>⏰ {s.time}</div>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  CART PANEL  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const CartPanel = React.memo(function CartPanel({ cart, cartStep, setCartStep, cartAddr, setCartAddr, payMode, setPayMode, onClose, onAddCart, onUpdQty, onRemCart, onGoPage, onToast }) {
//   const cartTotal  = cart.reduce((s,i) => s + i.price*i.qty, 0);
//   const cartCount  = cart.reduce((s,i) => s + i.qty, 0);
//   const delivery   = cartTotal > 500 || cartTotal === 0 ? 0 : 30;
//   const card = mkCard();
//   const btn  = mkBtn;
//   const inp  = mkInp();

//   const doOrder = () => {
//     if (!cartAddr.name || !cartAddr.phone || !cartAddr.address) { onToast("Fill all delivery fields","err"); return; }
//     setCartStep("payment");
//   };
//   const doPay = () => {
//     onToast("✅ Order placed! We'll call to confirm.");
//     setCartStep("success");
//     // clear cart via callback
//     cart.forEach(i => onRemCart(i.id, true));
//   };

//   return (
//     <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:300,display:"flex",justifyContent:"flex-end" }} onClick={onClose}>
//       <div style={{ width:"min(410px,100%)",background:"var(--bg2)",height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",animation:"slideIn .3s ease",boxShadow:"-6px 0 32px rgba(0,0,0,.2)" }} onClick={e=>e.stopPropagation()}>
//         {/* Header */}
//         <div style={{ padding:"18px 22px",borderBottom:"1px solid var(--bdr)",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--bg2)",zIndex:2 }}>
//           <div>
//             <div style={{ fontWeight:900,fontSize:17,display:"flex",alignItems:"center",gap:7 }}>
//               🛒 Cart
//               {cartCount > 0 && <span style={{ background:"#059669",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:11 }}>{cartCount}</span>}
//             </div>
//             <div style={{ fontSize:11,color:"var(--text2)",marginTop:1 }}>
//               {cartStep==="items"?"Step 1 of 3 — Items":cartStep==="address"?"Step 2 of 3 — Delivery":cartStep==="payment"?"Step 3 of 3 — Payment":""}
//             </div>
//           </div>
//           <button onClick={onClose} style={{ background:"var(--bg3)",border:"1px solid var(--bdr)",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,color:"var(--text2)" }}><CloseIcon/></button>
//         </div>

//         {/* Steps bar */}
//         {cartStep !== "success" && (
//           <div style={{ padding:"10px 22px",display:"flex",gap:3,alignItems:"center" }}>
//             {["items","address","payment"].map((s,i,arr) => (
//               <div key={s} style={{ display:"flex",alignItems:"center",flex:1 }}>
//                 <div style={{ width:22,height:22,borderRadius:11,background:arr.indexOf(cartStep)>=i?"#059669":"var(--bg3)",color:arr.indexOf(cartStep)>=i?"#fff":"var(--text2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0 }}>{i+1}</div>
//                 {i < 2 && <div style={{ flex:1,height:2,background:arr.indexOf(cartStep)>i?"#059669":"var(--bdr)",margin:"0 3px" }}/>}
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ flex:1,padding:"0 22px 22px" }}>
//           {/* STEP 1 — Items */}
//           {cartStep === "items" && (
//             cart.length === 0
//               ? <div style={{ textAlign:"center",paddingTop:70 }}>
//                   <div style={{ fontSize:54,marginBottom:14 }}>🛒</div>
//                   <p style={{ fontWeight:800,marginBottom:6 }}>Cart is empty</p>
//                   <p style={{ color:"var(--text2)",fontSize:13,marginBottom:18 }}>Add medicines to get started</p>
//                   <button style={btn()} onClick={()=>{onGoPage("medicines");onClose();}}>Browse Medicines</button>
//                 </div>
//               : <>
//                   {cart.map(item => (
//                     <div key={item.id} style={{ display:"flex",gap:10,padding:"12px 0",borderBottom:"1px solid var(--bdr)",alignItems:"center" }}>
//                       <div style={{ width:48,height:48,borderRadius:10,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,overflow:"hidden" }}>
//                         {item.img ? <img src={item.img} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : item.emoji}
//                       </div>
//                       <div style={{ flex:1,minWidth:0 }}>
//                         <div style={{ fontWeight:800,fontSize:13,marginBottom:2 }}>{item.name}</div>
//                         <div style={{ color:"#059669",fontWeight:800,fontSize:13 }}>₹{item.price}</div>
//                       </div>
//                       <div style={{ display:"flex",alignItems:"center",gap:6 }}>
//                         <div style={{ display:"flex",alignItems:"center",gap:5,background:"var(--bg3)",borderRadius:7,padding:"4px 7px" }}>
//                           <button onClick={()=>onUpdQty(item.id,-1)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)",display:"flex",padding:2 }}><MinusIcon/></button>
//                           <span style={{ fontWeight:800,fontSize:13,minWidth:14,textAlign:"center" }}>{item.qty}</span>
//                           <button onClick={()=>onUpdQty(item.id,1)} style={{ background:"none",border:"none",cursor:"pointer",color:"#059669",display:"flex",padding:2 }}><PlusIcon/></button>
//                         </div>
//                         <button onClick={()=>onRemCart(item.id)} style={{ background:"#fee2e2",border:"none",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",padding:6,color:"#dc2626" }}><TrashIcon/></button>
//                       </div>
//                     </div>
//                   ))}
//                   <div style={{ marginTop:14,padding:14,background:"var(--bg3)",borderRadius:12 }}>
//                     <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5 }}><span style={{ color:"var(--text2)" }}>Subtotal</span><span style={{ fontWeight:700 }}>₹{cartTotal}</span></div>
//                     <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8 }}><span style={{ color:"var(--text2)" }}>Delivery</span><span style={{ fontWeight:700,color:delivery===0?"#059669":"var(--text)" }}>{delivery===0?"FREE 🎉":`₹${delivery}`}</span></div>
//                     {delivery > 0 && <div style={{ fontSize:11,color:"#059669",marginBottom:8 }}>Add ₹{500-cartTotal} more for free delivery!</div>}
//                     <div style={{ borderTop:"1px dashed var(--bdr)",paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:16 }}><span>Total</span><span style={{ color:"#059669" }}>₹{cartTotal+delivery}</span></div>
//                   </div>
//                   <button style={{ ...btn(),width:"100%",padding:"13px",marginTop:12,justifyContent:"center",fontSize:14 }} className="hbtn" onClick={()=>setCartStep("address")}>Proceed to Delivery →</button>
//                   <button style={{ ...btn("out"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>{onGoPage("prescription");onClose();}}>Upload Prescription Instead</button>
//                 </>
//           )}

//           {/* STEP 2 — Address */}
//           {cartStep === "address" && (
//             <div style={{ paddingTop:8 }}>
//               <h3 style={{ fontWeight:900,marginBottom:14 }}>🏠 Delivery Details</h3>
//               {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["Delivery Address *","address","text"],["Pincode","pincode","text"]].map(([l,k,t]) => (
//                 <div key={k} style={{ marginBottom:12 }}>
//                   <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
//                   <input style={inp} type={t} placeholder={l.replace(" *","")} value={cartAddr[k]} onChange={e=>setCartAddr(p=>({...p,[k]:e.target.value}))}/>
//                 </div>
//               ))}
//               <button style={{ ...btn(),width:"100%",padding:"13px",marginTop:6,justifyContent:"center" }} className="hbtn" onClick={doOrder}>Continue to Payment →</button>
//               <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>setCartStep("items")}>← Back</button>
//             </div>
//           )}

//           {/* STEP 3 — Payment */}
//           {cartStep === "payment" && (
//             <div style={{ paddingTop:8 }}>
//               <h3 style={{ fontWeight:900,marginBottom:14 }}>💳 Payment Method</h3>
//               <div style={{ background:"var(--bg3)",borderRadius:12,padding:14,marginBottom:18 }}>
//                 <div style={{ fontWeight:800,marginBottom:7,fontSize:13 }}>Order Summary</div>
//                 {cart.map(i => <div key={i.id} style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3,color:"var(--text2)" }}><span>{i.name} ×{i.qty}</span><span>₹{i.price*i.qty}</span></div>)}
//                 <div style={{ borderTop:"1px dashed var(--bdr)",paddingTop:7,marginTop:7,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:15 }}><span>Total</span><span style={{ color:"#059669" }}>₹{cartTotal+delivery}</span></div>
//                 <div style={{ fontSize:11,color:"var(--text2)",marginTop:5 }}>📍 {cartAddr.address}{cartAddr.pincode?`, ${cartAddr.pincode}`:""}</div>
//               </div>
//               {[["cod","💵 Cash on Delivery","Pay when order arrives",true],["upi","📱 UPI / QR Code","GPay, PhonePe, Paytm",true],["card","💳 Card Payment","Credit/Debit card",false],["nb","🏦 Net Banking","All major banks",false]].map(([m,l,sub,av]) => (
//                 <div key={m} onClick={()=>av&&setPayMode(m)} style={{ border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,borderRadius:12,padding:"12px 14px",marginBottom:9,cursor:av?"pointer":"not-allowed",background:payMode===m?"#d1fae5":"var(--bg3)",opacity:av?1:.55,transition:"all .2s" }}>
//                   <div style={{ display:"flex",alignItems:"center",gap:10 }}>
//                     <div style={{ width:18,height:18,borderRadius:9,border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,background:payMode===m?"#059669":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
//                       {payMode===m && <div style={{ width:7,height:7,borderRadius:4,background:"#fff" }}/>}
//                     </div>
//                     <div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:13 }}>{l}</div><div style={{ fontSize:11,color:"var(--text2)" }}>{sub}</div></div>
//                     {!av && <span style={{ fontSize:10,background:"#fef3c7",color:"#d97706",padding:"2px 7px",borderRadius:50,fontWeight:700 }}>Soon</span>}
//                   </div>
//                   {payMode==="upi" && m==="upi" && (
//                     <div style={{ marginTop:12,padding:12,background:"#fff",borderRadius:10,textAlign:"center" }}>
//                       <div style={{ fontSize:11,color:"#64748b",marginBottom:5 }}>Scan to Pay</div>
//                       <div style={{ width:100,height:100,background:"repeating-conic-gradient(#000 0% 25%,#fff 0% 50%) 0 0 / 7px 7px",margin:"0 auto",borderRadius:4 }}/>
//                       <div style={{ marginTop:6,fontSize:12,fontWeight:700 }}>trpharmacy@paytm</div>
//                       <div style={{ fontSize:11,color:"#64748b" }}>₹{cartTotal+delivery}</div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <button style={{ ...btn(),width:"100%",padding:"14px",justifyContent:"center",fontSize:14 }} className="hbtn" onClick={doPay}>{payMode==="cod"?"✅ Place Order (COD)":"✅ Confirm Payment"}</button>
//               <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>setCartStep("address")}>← Back</button>
//             </div>
//           )}

//           {/* Success */}
//           {cartStep === "success" && (
//             <div style={{ textAlign:"center",paddingTop:52 }}>
//               <div style={{ fontSize:66,marginBottom:14 }}>🎉</div>
//               <h2 style={{ fontWeight:900,fontSize:20,marginBottom:8 }}>Order Placed!</h2>
//               <p style={{ color:"var(--text2)",fontSize:13,marginBottom:22 }}>Our team will call you within 30 min to confirm.</p>
//               <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center",width:"100%",padding:"12px" }}>💬 Track via WhatsApp</a>
//               <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>{onClose();setCartStep("items");}}>Continue Shopping</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: HOME  (module-level — receives only needed props)
// // ─────────────────────────────────────────────────────────────────────────────
// const HomePage = React.memo(function HomePage({ go, meds, onAddCart, onToast }) {
//   const [tIdx, setTIdx]     = useState(0);
//   const [faq, setFaq]       = useState(null);
//   const [newsletter, setNL] = useState("");
//   const card = mkCard();
//   const btn  = mkBtn;
//   const bdg  = mkBdg;
//   const tag  = mkTag;

//   useEffect(() => {
//     const t = setInterval(() => setTIdx(i => (i+1) % TESTIMONIALS.length), 4500);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="pg">
//       {/* Hero */}
//       <section style={{ background:"linear-gradient(135deg,#064e3b 0%,#065f46 45%,#0c4a6e 100%)",padding:"70px 24px 58px",position:"relative",overflow:"hidden" }}>
//         <div style={{ position:"absolute",inset:0,opacity:.04,backgroundImage:"radial-gradient(#fff 1px,transparent 1px)",backgroundSize:"48px 48px" }}/>
//         <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center",position:"relative" }} className="hg">
//           <div>
//             <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",borderRadius:50,padding:"5px 15px",fontSize:12,color:"#d1fae5",marginBottom:20 }}>
//               <span style={{ width:7,height:7,borderRadius:4,background:"#4ade80",display:"inline-block" }}/>
//               Now Open — Jankipuram, Lucknow
//             </div>
//             <h1 style={{ fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16 }}>
//               Your Trusted<br/>
//               <span style={{ background:"linear-gradient(90deg,#4ade80,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Health Partner</span><br/>
//               in Lucknow
//             </h1>
//             <p style={{ fontSize:15,color:"#a7f3d0",marginBottom:28,lineHeight:1.8 }}>TR Pharmacy — Quality medicines, expert guidance & affordable healthcare for the Jankipuram community.</p>
//             <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
//               <button onClick={()=>go("medicines")} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"#fff",color:"#059669",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>🛒 Order Medicine</button>
//               <button onClick={()=>go("prescription")} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:14,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📋 Upload Prescription</button>
//               <button onClick={()=>go("contact")} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:14,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📞 Contact Us</button>
//             </div>
//           </div>
//           <div className="float-anim" style={{ background:"rgba(255,255,255,.1)",borderRadius:22,padding:26,backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.2)" }}>
//             <div style={{ fontSize:56,textAlign:"center",marginBottom:14 }}>🏥</div>
//             <h3 style={{ color:"#fff",fontSize:18,fontWeight:900,textAlign:"center",marginBottom:6 }}>TR Pharmacy</h3>
//             <p style={{ color:"#a7f3d0",textAlign:"center",fontSize:12,marginBottom:18 }}>Shop No. 7, Janki Plaza, Sector G,<br/>Jankipuram, Lucknow</p>
//             <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
//               {[["500+","Medicines"],["100%","Genuine"],["5★","Rated"],["Fast","Delivery"]].map(([n,l]) => (
//                 <div key={l} style={{ textAlign:"center",background:"rgba(255,255,255,.1)",borderRadius:10,padding:10 }}>
//                   <div style={{ fontSize:20,fontWeight:900,color:"#fff" }}>{n}</div>
//                   <div style={{ fontSize:10,color:"#a7f3d0" }}>{l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust bar */}
//       <div style={{ background:"#059669",padding:"13px 24px",overflowX:"auto" }}>
//         <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",gap:32,justifyContent:"center",flexWrap:"wrap" }}>
//           {["✅ 100% Genuine","🚚 Fast Delivery","👨‍⚕️ Expert Pharmacist","💰 Affordable Prices","🔒 Trusted & Safe"].map(t => (
//             <span key={t} style={{ color:"#fff",fontWeight:700,fontSize:12,whiteSpace:"nowrap" }}>{t}</span>
//           ))}
//         </div>
//       </div>

//       {/* Stats */}
//       <section style={{ background:"var(--bg3)",padding:"44px 24px" }}>
//         <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:18 }}>
//           {[[500,"Medicines","💊"],[1000,"Happy Customers","😊"],[100,"Quality %","✅"],[5,"Star Rating","⭐"]].map(([n,l,ic]) => (
//             <div key={l} style={card} className="lift">
//               <div style={{ fontSize:30,marginBottom:7,textAlign:"center" }}>{ic}</div>
//               <div style={{ fontSize:28,fontWeight:900,color:"#059669",textAlign:"center" }}><Counter target={n}/>{l.includes("%")?"%":l==="Star Rating"?"★":"+"}</div>
//               <div style={{ color:"var(--text2)",fontSize:12,fontWeight:600,textAlign:"center" }}>{l.replace(" %","")}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Medicines */}
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
//         <div style={{ textAlign:"center",marginBottom:36 }}>
//           <span style={bdg("g")}>Featured Products</span>
//           <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900,marginBottom:8 }}>Popular Medicines</h2>
//           <p style={{ color:"var(--text2)",maxWidth:480,margin:"0 auto" }}>Top-selling medicines trusted by thousands in Lucknow</p>
//         </div>
//         <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20 }}>
//           {meds.slice(0,8).map(m => (
//             <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
//               <div style={{ height:126,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,overflow:"hidden" }}>
//                 {m.img ? <img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : m.emoji}
//               </div>
//               <div style={{ padding:"13px 16px 16px" }}>
//                 <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:11,color:"var(--text2)" }}>{m.category}</span></div>
//                 <h4 style={{ fontWeight:800,fontSize:13,marginBottom:3 }}>{m.name}</h4>
//                 <p style={{ fontSize:11,color:"var(--text2)",marginBottom:11 }}>{m.desc}</p>
//                 <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
//                   <span style={{ fontSize:17,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
//                   <button style={btn("sm")} className="hbtn" onClick={()=>onAddCart(m)}>+ Add</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{ textAlign:"center",marginTop:28 }}>
//           <button style={btn("out")} className="hbtn" onClick={()=>go("medicines")}>View All Medicines →</button>
//         </div>
//       </section>

//       {/* Services */}
//       <section style={{ background:"var(--bg3)",padding:"60px 24px" }}>
//         <div style={{ maxWidth:1200,margin:"0 auto" }}>
//           <div style={{ textAlign:"center",marginBottom:36 }}>
//             <span style={bdg("b")}>Our Services</span>
//             <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>What We Offer</h2>
//           </div>
//           <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20 }}>
//             {SERVICES.map(s => (
//               <div key={s.title} style={card} className="lift">
//                 <div style={{ fontSize:34,marginBottom:12 }}>{s.icon}</div>
//                 <h3 style={{ fontWeight:800,fontSize:16,marginBottom:7 }}>{s.title}</h3>
//                 <p style={{ color:"var(--text2)",fontSize:13,lineHeight:1.7 }}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose */}
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
//         <div style={{ textAlign:"center",marginBottom:36 }}>
//           <span style={bdg("g")}>Why Us</span>
//           <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>Why Choose TR Pharmacy?</h2>
//         </div>
//         <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18 }}>
//           {[["💊","Genuine Medicines","All medicines sourced from certified manufacturers and licensed distributors."],
//             ["💰","Affordable Prices","Best prices guaranteed with regular discounts and offers."],
//             ["👨‍⚕️","Expert Pharmacist","Licensed pharmacist provides free consultation and guidance."],
//             ["⚡","Fast Service","Quick dispensing and reliable home delivery."]].map(([ic,t,d]) => (
//             <div key={t} style={{ ...card,display:"flex",gap:12 }} className="lift">
//               <div style={{ fontSize:30,flexShrink:0 }}>{ic}</div>
//               <div><h4 style={{ fontWeight:800,marginBottom:5,fontSize:14 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.7 }}>{d}</p></div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section style={{ background:"var(--bg3)",padding:"60px 24px" }}>
//         <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
//           <span style={bdg("b")}>Reviews</span>
//           <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900,marginBottom:32 }}>What Customers Say</h2>
//           <div style={{ maxWidth:600,margin:"0 auto" }}>
//             <div key={tIdx} style={{ ...card,padding:32,animation:"fadeUp .5s ease" }}>
//               <div style={{ display:"flex",justifyContent:"center",gap:3,marginBottom:14 }}>{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
//               <p style={{ fontSize:15,lineHeight:1.8,color:"var(--text2)",fontStyle:"italic",marginBottom:18 }}>"{TESTIMONIALS[tIdx].text}"</p>
//               <div style={{ fontWeight:800 }}>{TESTIMONIALS[tIdx].name}</div>
//               <div style={{ fontSize:12,color:"#059669" }}>{TESTIMONIALS[tIdx].loc}</div>
//             </div>
//             <div style={{ display:"flex",justifyContent:"center",gap:7,marginTop:16 }}>
//               {TESTIMONIALS.map((_,i) => <button key={i} onClick={()=>setTIdx(i)} style={{ width:9,height:9,borderRadius:5,border:"none",cursor:"pointer",background:i===tIdx?"#059669":"var(--bdr)",transition:"all .2s" }}/>)}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
//         <div style={{ textAlign:"center",marginBottom:36 }}>
//           <span style={bdg("g")}>FAQ</span>
//           <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>Frequently Asked Questions</h2>
//         </div>
//         <div style={{ maxWidth:660,margin:"0 auto" }}>
//           {FAQS.map((f,i) => (
//             <div key={i} style={{ ...card,marginBottom:9,padding:0,overflow:"hidden" }}>
//               <button onClick={()=>setFaq(faq===i?null:i)} style={{ width:"100%",padding:"15px 20px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"var(--text)",gap:10 }}>
//                 <span style={{ fontWeight:700,fontSize:13,textAlign:"left" }}>{f.q}</span>
//                 <ChevronIcon open={faq===i}/>
//               </button>
//               {faq===i && <div style={{ padding:"0 20px 15px",color:"var(--text2)",fontSize:13,lineHeight:1.7,animation:"fadeUp .3s ease",borderTop:"1px solid var(--bdr)" }}><div style={{ paddingTop:12 }}>{f.a}</div></div>}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <div style={{ background:"linear-gradient(135deg,#059669,#0ea5e9)",padding:"50px 24px",textAlign:"center" }}>
//         <h2 style={{ color:"#fff",fontSize:24,fontWeight:900,marginBottom:7 }}>Get Health Tips & Exclusive Offers</h2>
//         <p style={{ color:"rgba(255,255,255,.8)",marginBottom:22 }}>Subscribe for medicine reminders and special deals</p>
//         <div style={{ display:"flex",gap:9,maxWidth:380,margin:"0 auto",flexWrap:"wrap",justifyContent:"center" }}>
//           <input style={{ flex:1,minWidth:190,padding:"11px 14px",borderRadius:11,border:"1px solid rgba(255,255,255,.4)",background:"rgba(255,255,255,.2)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box" }}
//             placeholder="Your phone number" value={newsletter} onChange={e=>setNL(e.target.value)}/>
//           <button style={{ ...btn(),background:"#fff",color:"#059669" }} className="hbtn"
//             onClick={()=>{ if(newsletter){ onToast("Subscribed! 🎉"); setNL(""); } }}>
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: ABOUT  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const AboutPage = React.memo(function AboutPage({ go }) {
//   const card = mkCard();
//   const btn  = mkBtn;
//   const bdg  = mkBdg;
//   return (
//     <div className="pg">
//       <div style={mkHero("#064e3b","#065f46")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>About TR Pharmacy</h1><p style={{ color:"#a7f3d0",fontSize:16 }}>Trusted Healthcare Partner in Jankipuram, Lucknow</p></div>
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
//         <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center" }} className="hg">
//           <div>
//             <span style={bdg("g")}>Our Story</span>
//             <h2 style={{ fontSize:28,fontWeight:900,marginBottom:14 }}>Your Neighbourhood Pharmacy Since 2026</h2>
//             {["TR Pharmacy was founded to provide people of Jankipuram with access to genuine, affordable medicines along with expert pharmaceutical care.",
//               "Located in Sector G, Janki Plaza, we serve hundreds of families daily, ensuring every prescription is filled accurately and every patient receives proper guidance.",
//               "Our commitment goes beyond dispensing medicines — we believe in building a healthier community, one family at a time."].map((t,i) => (
//               <p key={i} style={{ color:"var(--text2)",lineHeight:1.8,marginBottom:12 }}>{t}</p>
//             ))}
//           </div>
//           <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
//             {[["🎯","Mission","Most trusted pharmacy in Lucknow — genuine medicines and expert health guidance."],
//               ["👁️","Vision","A healthier Jankipuram where every family has quality, affordable healthcare."],
//               ["❤️","Values","Integrity, quality, affordability, and compassionate service to every customer."]].map(([ic,t,d]) => (
//               <div key={t} style={{ ...card,display:"flex",gap:12 }}>
//                 <div style={{ fontSize:26,flexShrink:0 }}>{ic}</div>
//                 <div><h4 style={{ fontWeight:800,marginBottom:4,fontSize:14 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:13,lineHeight:1.6 }}>{d}</p></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section style={{ background:"var(--bg3)",padding:"60px 24px" }}>
//         <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
//           <h2 style={{ fontSize:26,fontWeight:900,marginBottom:32 }}>Our Commitments</h2>
//           <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18 }}>
//             {[["🔬","Authentic Medicines","Sourced from authorized distributors with proper documentation."],
//               ["💊","Quality Control","Strict checks ensure only the best medicines reach our customers."],
//               ["🌡️","Safe Storage","Medicines stored under ideal temperature & humidity."],
//               ["👨‍⚕️","Expert Guidance","Licensed pharmacist answers all your health queries."]].map(([ic,t,d]) => (
//               <div key={t} style={card} className="lift">
//                 <div style={{ fontSize:34,marginBottom:11 }}>{ic}</div>
//                 <h4 style={{ fontWeight:800,marginBottom:7,fontSize:14 }}>{t}</h4>
//                 <p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.6 }}>{d}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
//         <div style={{ ...card,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",border:"none",padding:36,textAlign:"center" }}>
//           <div style={{ fontSize:48,marginBottom:12 }}>📍</div>
//           <h3 style={{ fontSize:20,fontWeight:900,marginBottom:7 }}>Find Us</h3>
//           <p style={{ color:"var(--text2)",marginBottom:18 }}>Shop No. 7, Janki Plaza Sector G, Jankipuram, Lucknow, U.P.</p>
//           <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
//             <a href="tel:6389482072" style={{ ...btn(),textDecoration:"none" }}>📞 6389482072</a>
//             <a href="tel:8586098544" style={{ ...btn(),background:"#0ea5e9",textDecoration:"none" }}>📞 8586098544</a>
//             <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn("out"),textDecoration:"none" }}>🗺️ Get Directions</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: MEDICINES  (module-level — search state is LOCAL here, not in App)
// // ─────────────────────────────────────────────────────────────────────────────
// const MedicinesPage = React.memo(function MedicinesPage({ go, meds, onAddCart, onUploadImg }) {
//   // Local state — only this component re-renders on search/filter change
//   const [search,    setSearch]    = useState("");
//   const [catFilter, setCatFilter] = useState("All");
//   const card = mkCard();
//   const btn  = mkBtn;
//   const tag  = mkTag;

//   const filtered = useMemo(() => meds.filter(m => {
//     const mc = catFilter === "All" || m.category === catFilter;
//     const ms = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
//     return mc && ms;
//   }), [meds, search, catFilter]);

//   return (
//     <div className="pg">
//       <div style={mkHero("#0c4a6e","#064e3b")}>
//         <h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Our Medicines</h1>
//         <p style={{ color:"#a7f3d0",fontSize:14,marginBottom:26 }}>Browse genuine medicines & health products</p>
//         <div style={{ position:"relative",maxWidth:460,margin:"0 auto" }}>
//           <input
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             placeholder="Search by medicine name or category..."
//             style={{ width:"100%",padding:"11px 42px 11px 42px",borderRadius:11,border:"1px solid rgba(255,255,255,.3)",background:"rgba(255,255,255,.15)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box" }}
//           />
//           <span style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.7)",pointerEvents:"none" }}><SearchIcon/></span>
//           {search && <button onClick={()=>setSearch("")} style={{ position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.25)",border:"none",borderRadius:50,width:20,height:20,cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11 }}>✕</button>}
//         </div>
//       </div>

//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"50px 24px" }}>
//         <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:32,justifyContent:"center" }}>
//           {CATS.map(c => (
//             <button key={c} onClick={()=>setCatFilter(c)} style={{ padding:"7px 18px",borderRadius:50,fontWeight:700,fontSize:12,cursor:"pointer",border:catFilter===c?"none":"1.5px solid var(--bdr)",background:catFilter===c?"#059669":"var(--bg2)",color:catFilter===c?"#fff":"var(--text2)",transition:"all .2s" }}>{c}</button>
//           ))}
//         </div>

//         {search && <div style={{ textAlign:"center",marginBottom:18,color:"var(--text2)",fontSize:13 }}>Showing <b style={{ color:"var(--text)" }}>{filtered.length}</b> result{filtered.length!==1?"s":""} for "<b style={{ color:"var(--text)" }}>{search}</b>"</div>}

//         {filtered.length === 0
//           ? <div style={{ textAlign:"center",padding:"60px 0" }}>
//               <div style={{ fontSize:48,marginBottom:14 }}>🔍</div>
//               <h3 style={{ fontWeight:800,marginBottom:7 }}>No medicines found</h3>
//               <p style={{ color:"var(--text2)",marginBottom:18 }}>Try a different name or category</p>
//               <button style={btn("out")} onClick={()=>{setSearch("");setCatFilter("All");}}>Clear Filters</button>
//             </div>
//           : <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20 }}>
//               {filtered.map(m => (
//                 <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
//                   <div style={{ height:136,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,position:"relative",overflow:"hidden" }}>
//                     {m.img ? <img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : m.emoji}
//                     <label htmlFor={`img-${m.id}`}
//                       style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.48)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",opacity:0,transition:"opacity .2s",color:"#fff",gap:5 }}
//                       onMouseEnter={e=>e.currentTarget.style.opacity="1"}
//                       onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
//                       <CameraIcon/><span style={{ fontSize:11,fontWeight:700 }}>{m.img?"Change Image":"Upload Image"}</span>
//                     </label>
//                     <input id={`img-${m.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>onUploadImg(m.id,e.target.files[0])}/>
//                     <div style={{ position:"absolute",bottom:6,right:6,background:"rgba(255,255,255,.9)",borderRadius:7,padding:"3px 7px",fontSize:10,fontWeight:700,color:m.img?"#059669":"#0ea5e9",display:"flex",alignItems:"center",gap:3 }}>
//                       <CameraIcon/>{m.img?"✓ Photo":"Add Photo"}
//                     </div>
//                   </div>
//                   <div style={{ padding:"13px 15px 16px" }}>
//                     <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:11,color:"var(--text2)" }}>{m.category}</span></div>
//                     <h4 style={{ fontWeight:800,fontSize:13,marginBottom:3 }}>{m.name}</h4>
//                     <p style={{ fontSize:11,color:"var(--text2)",marginBottom:11 }}>{m.desc}</p>
//                     <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
//                       <span style={{ fontSize:17,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
//                       <button style={btn("sm")} className="hbtn" onClick={()=>onAddCart(m)}>+ Add to Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//         }
//         <div style={{ ...card,marginTop:32,background:"#e0f2fe",border:"none",padding:"16px 20px",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
//           <span style={{ fontSize:20 }}>ℹ️</span>
//           <p style={{ fontSize:12,color:"var(--text2)",flex:1 }}><b>Prescription Required:</b> "Rx" items need a valid prescription.</p>
//           <button style={btn("sm")} onClick={()=>go("prescription")}>Upload Rx</button>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: PRESCRIPTION  (module-level — own local form state)
// // ─────────────────────────────────────────────────────────────────────────────
// const PrescriptionPage = React.memo(function PrescriptionPage({ go, onToast }) {
//   const [form, setForm]   = useState({ name:"", phone:"", address:"", medicine:"", note:"", file:null, preview:null });
//   const [done, setDone]   = useState(false);
//   const card = mkCard();
//   const btn  = mkBtn;
//   const inp  = mkInp();

//   const upd = useCallback((k, v) => setForm(p => ({ ...p, [k]:v })), []);

//   const handleFile = useCallback(file => {
//     if (!file) return;
//     const r = new FileReader();
//     r.onload = e => setForm(p => ({ ...p, file, preview:e.target.result }));
//     r.readAsDataURL(file);
//   }, []);

//   const submit = useCallback(() => {
//     if (!form.name || !form.phone) { onToast("Please fill Name and Phone","err"); return; }
//     DB.prescriptions.push({ ...form, time:new Date().toLocaleString("en-IN") });
//     setDone(true);
//     onToast("Prescription submitted! We'll call you soon. ✅");
//   }, [form, onToast]);

//   if (done) return (
//     <div style={{ textAlign:"center",padding:"90px 24px" }} className="pg">
//       <div style={{ fontSize:70,marginBottom:18 }}>✅</div>
//       <h2 style={{ fontSize:26,fontWeight:900,marginBottom:9 }}>Prescription Submitted!</h2>
//       <p style={{ color:"var(--text2)",maxWidth:380,margin:"0 auto 22px",lineHeight:1.7 }}>Our pharmacist will review and call you within 30 minutes.</p>
//       <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
//         <button style={btn()} onClick={()=>go("home")}>Back to Home</button>
//         <button style={btn("out")} onClick={()=>{ setDone(false); setForm({ name:"",phone:"",address:"",medicine:"",note:"",file:null,preview:null }); }}>Submit Another</button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="pg">
//       <div style={mkHero("#064e3b","#0c4a6e")}>
//         <h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Upload Prescription</h1>
//         <p style={{ color:"#a7f3d0",fontSize:15 }}>Send your prescription and we'll prepare your medicines</p>
//       </div>
//       <section style={{ maxWidth:640,margin:"0 auto",padding:"46px 24px" }}>
//         <div style={card}>
//           <h3 style={{ fontSize:17,fontWeight:900,marginBottom:20 }}>📋 Prescription Details</h3>
//           <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
//             {[["Patient Name *","name","text","Full name"],["Phone Number *","phone","tel","10-digit number"],["Delivery Address","address","text","Full delivery address"],["Medicine Name (optional)","medicine","text","List medicine names if known"]].map(([l,k,t,ph]) => (
//               <div key={k}>
//                 <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
//                 <input style={inp} type={t} placeholder={ph} value={form[k]} onChange={e=>upd(k,e.target.value)}/>
//               </div>
//             ))}

//             <div>
//               <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Upload Prescription Image</label>
//               <div style={{ border:"2px dashed var(--bdr)",borderRadius:13,padding:form.preview?0:28,textAlign:"center",background:"var(--bg3)",overflow:"hidden",cursor:"pointer" }}
//                 onClick={()=>document.getElementById("rx-file").click()}
//                 onDragOver={e=>e.preventDefault()}
//                 onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}}>
//                 <input id="rx-file" type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])}/>
//                 {form.preview
//                   ? <div style={{ position:"relative" }}>
//                       <img src={form.preview} alt="Prescription" style={{ width:"100%",maxHeight:210,objectFit:"cover",display:"block" }}/>
//                       <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:13 }}
//                         onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
//                         🔄 Click to change
//                       </div>
//                       <div style={{ position:"absolute",top:8,right:8,background:"#059669",color:"#fff",borderRadius:50,padding:"3px 9px",fontSize:11,fontWeight:700 }}>✓ Uploaded</div>
//                     </div>
//                   : <><div style={{ fontSize:32,marginBottom:7,color:"var(--text2)" }}>📷</div><p style={{ fontWeight:700,marginBottom:3,fontSize:13 }}>Drag & drop or click to upload</p><p style={{ fontSize:11,color:"var(--text2)" }}>JPG, PNG, PDF — Max 10MB</p></>
//                 }
//               </div>
//             </div>

//             <div>
//               <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Additional Note</label>
//               <textarea style={{ ...inp,height:85,resize:"vertical" }} placeholder="Special instructions..." value={form.note} onChange={e=>upd("note",e.target.value)}/>
//             </div>
//             <button style={{ ...btn(),padding:"13px",fontSize:14,justifyContent:"center",width:"100%" }} className="hbtn" onClick={submit}>📤 Submit Prescription</button>
//           </div>
//         </div>
//         <div style={{ ...card,marginTop:18,background:"#d1fae5",border:"1px solid #a7f3d0" }}>
//           <h4 style={{ fontWeight:800,marginBottom:9,fontSize:14 }}>📞 Prefer to Call or WhatsApp?</h4>
//           <div style={{ display:"flex",gap:9,flexWrap:"wrap" }}>
//             <a href="tel:6389482072" style={{ ...btn(),textDecoration:"none" }}>📞 6389482072</a>
//             <a href="tel:8586098544" style={{ ...btn(),background:"#0ea5e9",textDecoration:"none" }}>📞 8586098544</a>
//             <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none" }}>💬 WhatsApp</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: SERVICES  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const ServicesPage = React.memo(function ServicesPage({ go }) {
//   const card = mkCard();
//   const btn  = mkBtn;
//   const tag  = mkTag;
//   return (
//     <div className="pg">
//       <div style={mkHero("#0c4a6e","#064e3b")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Our Services</h1><p style={{ color:"#a7f3d0",fontSize:15 }}>Complete healthcare solutions for you and your family</p></div>
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px" }}>
//         <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:22 }}>
//           {SERVICES.map(s => (
//             <div key={s.title} style={{ ...card,padding:30 }} className="lift">
//               <div style={{ width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:16 }}>{s.icon}</div>
//               <h3 style={{ fontWeight:900,fontSize:17,marginBottom:9 }}>{s.title}</h3>
//               <p style={{ color:"var(--text2)",lineHeight:1.7,marginBottom:13,fontSize:13 }}>{s.desc}</p>
//               <span style={tag("g")}>Available In-Store</span>
//             </div>
//           ))}
//         </div>
//         <div style={{ ...card,marginTop:44,background:"linear-gradient(135deg,#064e3b,#065f46)",border:"none",padding:40,textAlign:"center" }}>
//           <h2 style={{ color:"#fff",fontSize:24,fontWeight:900,marginBottom:9 }}>🏥 Visit TR Pharmacy</h2>
//           <p style={{ color:"#a7f3d0",marginBottom:18,fontSize:14 }}>All services available at our store.</p>
//           <p style={{ color:"#d1fae5",marginBottom:22,fontSize:13 }}>Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow</p>
//           <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
//             <button style={{ ...btn(),background:"#fff",color:"#059669" }} onClick={()=>go("contact")}>📞 Contact Us</button>
//             <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none" }}>💬 WhatsApp Now</a>
//             <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"rgba(255,255,255,.18)",textDecoration:"none" }}>🗺️ Get Directions</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: CONTACT  (module-level — own local form state)
// // ─────────────────────────────────────────────────────────────────────────────
// const ContactPage = React.memo(function ContactPage({ onToast }) {
//   const [form, setForm] = useState({ name:"", email:"", phone:"", msg:"" });
//   const [done, setDone] = useState(false);
//   const card = mkCard();
//   const btn  = mkBtn;
//   const inp  = mkInp();

//   const upd = useCallback((k, v) => setForm(p => ({ ...p, [k]:v })), []);

//   const send = useCallback(() => {
//     if (!form.name || !form.phone) { onToast("Fill Name and Phone","err"); return; }
//     if (!form.msg) { onToast("Write a message","err"); return; }
//     DB.contacts.push({ ...form, time:new Date().toLocaleString("en-IN") });
//     setDone(true);
//     onToast("Message sent! We'll reply shortly. ✅");
//   }, [form, onToast]);

//   return (
//     <div className="pg">
//       <div style={mkHero("#064e3b","#0c4a6e")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Contact Us</h1><p style={{ color:"#a7f3d0",fontSize:15 }}>We're here for all your healthcare needs</p></div>
//       <section style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px" }}>
//         <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:36,alignItems:"start" }} className="cg">

//           {/* Info + Map */}
//           <div>
//             <h3 style={{ fontSize:18,fontWeight:900,marginBottom:18 }}>Get In Touch</h3>
//             {[["📍","Address","Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow, U.P. — 226021",MAPS_URL],
//               ["📞","Phone Numbers","6389482072  |  8586098544","tel:6389482072"],
//               ["🕐","Working Hours","Mon–Sat: 9:00 AM – 9:00 PM",null],
//               ["💬","WhatsApp","Chat for quick medicine queries","https://wa.me/916389482072"]].map(([ic,t,i,l]) => (
//               <div key={t} style={{ ...card,display:"flex",gap:12,marginBottom:12,cursor:l?"pointer":"default",transition:"all .2s" }} className={l?"lift":""}
//                 onClick={()=>l&&window.open(l,l.startsWith("tel")?"_self":"_blank")}>
//                 <div style={{ fontSize:24,flexShrink:0 }}>{ic}</div>
//                 <div>
//                   <div style={{ fontWeight:800,marginBottom:2,fontSize:14 }}>{t}</div>
//                   <div style={{ color:l?"#059669":"var(--text2)",fontSize:12,fontWeight:l?600:400 }}>{i}</div>
//                   {l && <div style={{ fontSize:10,color:"var(--text2)",marginTop:1 }}>Click to open →</div>}
//                 </div>
//               </div>
//             ))}
//             <div style={{ borderRadius:14,overflow:"hidden",border:"1px solid var(--bdr)",marginTop:18 }}>
//               <iframe title="TR Pharmacy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57010!2d80.95!3d26.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdaa7c9af2ab%3A0x6c7c49cf6c81a2fc!2sJankipuram%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1"
//                 width="100%" height="200" style={{ border:"none",display:"block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
//               <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ display:"block",padding:"11px 16px",background:"#059669",color:"#fff",textAlign:"center",fontWeight:700,fontSize:13,textDecoration:"none" }}>
//                 🗺️ Open in Google Maps — Get Directions
//               </a>
//             </div>
//           </div>

//           {/* Form */}
//           <div>
//             <h3 style={{ fontSize:18,fontWeight:900,marginBottom:18 }}>Send a Message</h3>
//             {done
//               ? <div style={{ ...card,textAlign:"center",padding:44 }}>
//                   <div style={{ fontSize:56,marginBottom:14 }}>✅</div>
//                   <h3 style={{ fontWeight:900,marginBottom:7 }}>Message Received!</h3>
//                   <p style={{ color:"var(--text2)",marginBottom:18,fontSize:13 }}>We'll call you back on <b>{form.phone}</b> within a few hours.</p>
//                   <button style={btn("out")} onClick={()=>{ setDone(false); setForm({ name:"",email:"",phone:"",msg:"" }); }}>Send Another</button>
//                 </div>
//               : <div style={card}>
//                   <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
//                     {[["Your Name *","name","text"],["Email Address","email","email"],["Phone Number *","phone","tel"]].map(([l,k,t]) => (
//                       <div key={k}>
//                         <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
//                         <input style={inp} type={t} placeholder={l.replace(" *","")} value={form[k]} onChange={e=>upd(k,e.target.value)}/>
//                       </div>
//                     ))}
//                     <div>
//                       <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Message *</label>
//                       <textarea style={{ ...inp,height:100,resize:"vertical" }} placeholder="How can we help you?" value={form.msg} onChange={e=>upd("msg",e.target.value)}/>
//                     </div>
//                     <button style={{ ...btn(),padding:"13px",fontSize:14,justifyContent:"center" }} className="hbtn" onClick={send}>📤 Send Message</button>
//                   </div>
//                 </div>
//             }
//             <a href="https://wa.me/916389482072?text=Hello%20TR%20Pharmacy%2C%20I%20need%20help" target="_blank" rel="noreferrer"
//               style={{ display:"flex",alignItems:"center",gap:12,padding:"16px 18px",background:"#dcfce7",borderRadius:14,marginTop:14,textDecoration:"none",border:"1.5px solid #bbf7d0",transition:"all .2s" }} className="lift">
//               <div style={{ width:44,height:44,borderRadius:12,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WAIcon/></div>
//               <div><div style={{ fontWeight:900,color:"#166534",fontSize:14 }}>Chat on WhatsApp</div><div style={{ fontSize:11,color:"#15803d" }}>Tap to chat — Quick replies</div></div>
//               <span style={{ marginLeft:"auto",fontSize:18,color:"#15803d" }}>→</span>
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAGE: GRAND OPENING  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const OpeningPage = React.memo(function OpeningPage() {
//   const card = mkCard();
//   const btn  = mkBtn;
//   return (
//     <div className="pg">
//       <div style={{ background:"linear-gradient(135deg,#7c3aed,#db2777,#ea580c)",padding:"76px 24px",textAlign:"center",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360 }}>
//         <div style={{ position:"absolute",inset:0,opacity:.07,backgroundImage:"radial-gradient(#fff 1px,transparent 1px)",backgroundSize:"26px 26px" }}/>
//         <div style={{ position:"relative" }}>
//           <div style={{ fontSize:26,marginBottom:14,letterSpacing:3 }}>🎉 🎊 🎉 🎊 🎉</div>
//           <div style={{ display:"inline-block",background:"rgba(255,255,255,.15)",borderRadius:50,padding:"6px 20px",fontSize:12,color:"#fde68a",fontWeight:700,marginBottom:18 }}>Grand Opening Announcement</div>
//           <h1 style={{ color:"#fff",fontSize:"clamp(28px,6vw,56px)",fontWeight:900,lineHeight:1.1,marginBottom:10 }}>🏥 TR Pharmacy<br/>Grand Opening!</h1>
//           <p style={{ color:"rgba(255,255,255,.92)",fontSize:18,fontWeight:600 }}>You're Invited!</p>
//         </div>
//       </div>
//       <section style={{ maxWidth:900,margin:"0 auto",padding:"52px 24px" }}>
//         <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:18,marginBottom:36 }}>
//           {[["📅","Date","12 March 2026","Mark your calendar"],["⏰","Time","3:00 PM Onwards","Opening ceremony"],["📍","Venue","Shop No. 7, Janki Plaza","Sector G, Jankipuram"],["🎁","Offer","Launch Discounts","First 100 customers"]].map(([ic,t,v,s]) => (
//             <div key={t} style={{ ...card,textAlign:"center",padding:24 }} className="lift">
//               <div style={{ fontSize:34,marginBottom:10 }}>{ic}</div>
//               <div style={{ fontSize:10,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:1 }}>{t}</div>
//               <div style={{ fontSize:17,fontWeight:900,color:"#059669",margin:"7px 0 3px" }}>{v}</div>
//               <div style={{ fontSize:11,color:"var(--text2)" }}>{s}</div>
//             </div>
//           ))}
//         </div>
//         <div style={{ ...card,background:"linear-gradient(135deg,#fdf4ff,#fce7f3)",border:"none",padding:32,textAlign:"center",marginBottom:24 }}>
//           <h2 style={{ fontSize:22,fontWeight:900,marginBottom:18 }}>🎊 What to Expect</h2>
//           <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12 }}>
//             {["🎁 Launch Discounts","💊 Free Health Check","👨‍⚕️ Pharmacist Consultation","🎀 Lucky Draw","📋 Free Medicine Guidance","🏥 Full Medicine Stock"].map(item => (
//               <div key={item} style={{ background:"#fff",borderRadius:11,padding:"12px 10px",fontWeight:700,fontSize:12,boxShadow:"0 2px 8px rgba(0,0,0,.07)" }}>{item}</div>
//             ))}
//           </div>
//         </div>
//         <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }} className="hg">
//           <div style={{ ...card,background:"#059669",color:"#fff",textAlign:"center",padding:28 }}>
//             <div style={{ fontSize:40,marginBottom:10 }}>📍</div>
//             <h3 style={{ fontWeight:900,fontSize:16,marginBottom:7 }}>Location</h3>
//             <p style={{ opacity:.88,fontSize:13,marginBottom:14 }}>Shop No. 7, Janki Plaza,<br/>Sector G, Jankipuram,<br/>Lucknow, U.P.</p>
//             <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"#fff",color:"#059669",textDecoration:"none",justifyContent:"center" }}>🗺️ Get Directions</a>
//           </div>
//           <div style={{ ...card,background:"#0c4a6e",color:"#fff",textAlign:"center",padding:28 }}>
//             <div style={{ fontSize:40,marginBottom:10 }}>📞</div>
//             <h3 style={{ fontWeight:900,fontSize:16,marginBottom:7 }}>RSVP / Enquiry</h3>
//             <p style={{ opacity:.88,fontSize:13,marginBottom:14 }}>6389482072<br/>8586098544</p>
//             <a href="https://wa.me/916389482072?text=I%20am%20coming%20to%20your%20Grand%20Opening!" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center" }}>💬 WhatsApp RSVP</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  FOOTER  (module-level)
// // ─────────────────────────────────────────────────────────────────────────────
// const Footer = React.memo(function Footer({ go }) {
//   return (
//     <footer style={{ background:"#0f172a",color:"#94a3b8",padding:"46px 24px 22px" }}>
//       <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:36,marginBottom:36 }} className="fg">
//         <div>
//           <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:13 }}>
//             <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16 }}>✚</div>
//             <span style={{ color:"#fff",fontWeight:900,fontSize:16 }}>TR Pharmacy</span>
//           </div>
//           <p style={{ fontSize:12,lineHeight:1.8,marginBottom:14 }}>Your Trusted Health Partner in Jankipuram, Lucknow. Quality medicines & expert care.</p>
//           <div style={{ display:"flex",gap:7 }}>
//             <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ width:34,height:34,borderRadius:8,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}><WAIcon/></a>
//             <a href="tel:6389482072" style={{ width:34,height:34,borderRadius:8,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#94a3b8",fontSize:15 }}>📞</a>
//           </div>
//         </div>
//         <div>
//           <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Quick Links</h4>
//           {[["home","Home"],["about","About Us"],["medicines","Medicines"],["prescription","Upload Rx"],["services","Services"],["contact","Contact"],["opening","Grand Opening"]].map(([p,l]) => (
//             <div key={p} style={{ marginBottom:6 }}><button onClick={()=>go(p)} style={{ background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:12,padding:0 }}>→ {l}</button></div>
//           ))}
//         </div>
//         <div>
//           <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Services</h4>
//           {["Prescription Medicines","OTC Medicines","Health Supplements","BP Monitoring","Diabetes Care","Home Delivery"].map(s => (
//             <div key={s} style={{ fontSize:12,marginBottom:6 }}>✓ {s}</div>
//           ))}
//         </div>
//         <div>
//           <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Contact</h4>
//           <div style={{ display:"flex",gap:7,marginBottom:9,fontSize:12,alignItems:"flex-start" }}>
//             <span>📍</span><a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color:"#94a3b8",textDecoration:"none" }}>Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow</a>
//           </div>
//           <div style={{ display:"flex",gap:7,marginBottom:6,fontSize:12 }}><span>📞</span><a href="tel:6389482072" style={{ color:"#94a3b8",textDecoration:"none" }}>6389482072</a></div>
//           <div style={{ display:"flex",gap:7,marginBottom:14,fontSize:12 }}><span>📞</span><a href="tel:8586098544" style={{ color:"#94a3b8",textDecoration:"none" }}>8586098544</a></div>
//           <div style={{ background:"#1e293b",borderRadius:11,padding:"11px 13px" }}>
//             <div style={{ fontSize:10,color:"#475569",marginBottom:2,textTransform:"uppercase",letterSpacing:1 }}>Grand Opening</div>
//             <div style={{ color:"#fff",fontWeight:800,fontSize:13 }}>12 March 2026</div>
//             <div style={{ color:"#059669",fontSize:12 }}>3:00 PM onwards</div>
//           </div>
//         </div>
//       </div>
//       <div style={{ maxWidth:1200,margin:"0 auto",borderTop:"1px solid #1e293b",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,fontSize:11 }}>
//         <span>© 2026 TR Pharmacy, Jankipuram, Lucknow. All rights reserved.</span>
//         <span style={{ color:"#059669",fontWeight:700 }}>"Your Trusted Health Partner"</span>
//       </div>
//     </footer>
//   );
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  APP  (only manages global state — no page JSX defined inside)
// // ─────────────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [page,      setPage]      = useState("home");
//   const [dark,      setDark]      = useState(false);
//   const [meds,      setMeds]      = useState(INITIAL_MEDICINES);
//   const [cart,      setCart]      = useState([]);
//   const [cartOpen,  setCartOpen]  = useState(false);
//   const [cartStep,  setCartStep]  = useState("items");
//   const [cartAddr,  setCartAddr]  = useState({ name:"", phone:"", address:"", pincode:"" });
//   const [payMode,   setPayMode]   = useState("cod");
//   const [showDB,    setShowDB]    = useState(false);
//   const [toast,     setToast]     = useState(null);

//   // CSS variables — only recalc when dark changes
//   const cssVars = useMemo(() => (
//     dark
//       ? { "--bg":"#0f172a","--bg2":"#1e293b","--bg3":"#273549","--text":"#f1f5f9","--text2":"#94a3b8","--bdr":"#334155","--shd":"0 4px 24px rgba(0,0,0,.45)" }
//       : { "--bg":"#f8fafc","--bg2":"#ffffff","--bg3":"#f1f5f9","--text":"#0f172a","--text2":"#64748b","--bdr":"#e2e8f0","--shd":"0 4px 20px rgba(0,0,0,.07)" }
//   ), [dark]);

//   // Stable callbacks — never re-created
//   const go        = useCallback((p) => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); }, []);
//   const showToast = useCallback((msg, err) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); }, []);
//   const onCartOpen = useCallback(() => { setCartOpen(true); setCartStep("items"); }, []);
//   const onDBOpen   = useCallback(() => setShowDB(true), []);
//   const onDBClose  = useCallback(() => setShowDB(false), []);
//   const onCartClose = useCallback(() => setCartOpen(false), []);

//   const onAddCart = useCallback((m) => {
//     setCart(c => { const ex = c.find(i=>i.id===m.id); return ex ? c.map(i=>i.id===m.id?{...i,qty:i.qty+1}:i) : [...c,{...m,qty:1}]; });
//     showToast(`${m.name} added! 🛒`);
//   }, [showToast]);

//   const onUpdQty = useCallback((id, d) => setCart(c => c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i)), []);

//   const onRemCart = useCallback((id, silent) => {
//     setCart(c => c.filter(i=>i.id!==id));
//   }, []);

//   const onClearCart = useCallback(() => setCart([]), []);

//   const onUploadImg = useCallback((id, file) => {
//     if (!file) return;
//     const r = new FileReader();
//     r.onload = e => setMeds(prev => prev.map(m => m.id===id ? {...m, img:e.target.result} : m));
//     r.readAsDataURL(file);
//     showToast("Image uploaded! ✅");
//   }, [showToast]);

//   const cartCount = useMemo(() => cart.reduce((s,i)=>s+i.qty,0), [cart]);

//   // Apply CSS vars to root div
//   const rootStyle = useMemo(() => ({
//     ...cssVars,
//     fontFamily:"'Nunito','Segoe UI',sans-serif",
//     background:"var(--bg)",
//     color:"var(--text)",
//     minHeight:"100vh",
//     transition:"background .3s,color .3s",
//   }), [cssVars]);

//   const renderPage = () => {
//     switch (page) {
//       case "home":         return <HomePage        go={go} meds={meds} onAddCart={onAddCart} onToast={showToast}/>;
//       case "about":        return <AboutPage        go={go}/>;
//       case "medicines":    return <MedicinesPage    go={go} meds={meds} onAddCart={onAddCart} onUploadImg={onUploadImg}/>;
//       case "prescription": return <PrescriptionPage go={go} onToast={showToast}/>;
//       case "services":     return <ServicesPage     go={go}/>;
//       case "contact":      return <ContactPage      onToast={showToast}/>;
//       case "opening":      return <OpeningPage/>;
//       default:             return <HomePage        go={go} meds={meds} onAddCart={onAddCart} onToast={showToast}/>;
//     }
//   };

//   return (
//     <div style={rootStyle}>
//       <Nav dark={dark} setDark={setDark} page={page} go={go} cartCount={cartCount} onCartOpen={onCartOpen} onDBOpen={onDBOpen}/>

//       {renderPage()}

//       <Footer go={go}/>

//       {/* WhatsApp floating */}
//       <a href="https://wa.me/916389482072?text=Hello%20TR%20Pharmacy%2C%20I%20need%20help" target="_blank" rel="noreferrer"
//         title="Chat on WhatsApp"
//         style={{ position:"fixed",bottom:24,right:24,width:54,height:54,borderRadius:27,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,.5),0 0 0 4px rgba(37,211,102,.15)",zIndex:999,animation:"waPulse 2.5s infinite",transition:"transform .2s" }}
//         onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
//         onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
//         <WAIcon/>
//       </a>

//       {/* Toast */}
//       {toast && (
//         <div style={{ position:"fixed",bottom:90,right:24,background:toast.err?"#ef4444":"#059669",color:"#fff",padding:"11px 18px",borderRadius:12,fontWeight:700,fontSize:13,boxShadow:"0 4px 18px rgba(0,0,0,.2)",zIndex:1000,animation:"fadeUp .3s ease",maxWidth:260,lineHeight:1.4 }}>
//           {toast.msg}
//         </div>
//       )}

//       {/* Cart panel */}
//       {cartOpen && (
//         <CartPanel
//           cart={cart}
//           cartStep={cartStep}
//           setCartStep={setCartStep}
//           cartAddr={cartAddr}
//           setCartAddr={setCartAddr}
//           payMode={payMode}
//           setPayMode={setPayMode}
//           onClose={onCartClose}
//           onAddCart={onAddCart}
//           onUpdQty={onUpdQty}
//           onRemCart={onRemCart}
//           onGoPage={go}
//           onToast={showToast}
//         />
//       )}

//       {/* Submissions panel */}
//       {showDB && <DBPanel onClose={onDBClose}/>}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  STATIC DATA  (module-level — never re-created)
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_MEDICINES = [
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
const TESTIMONIALS = [
  { name:"Priya Sharma",  loc:"Jankipuram, Lucknow",    text:"TR Pharmacy is my go-to for medicines. Staff is knowledgeable and medicines always genuine. Great service!" },
  { name:"Rahul Verma",   loc:"Sector G, Lucknow",      text:"Very professional pharmacy. Got prescription medicines quickly and at affordable prices. Highly recommended!" },
  { name:"Sunita Singh",  loc:"Lucknow",                text:"Excellent! The pharmacist gave detailed guidance about my medications. Trustworthy and reliable pharmacy." },
  { name:"Amit Gupta",    loc:"Jankipuram Extension",   text:"Best pharmacy in the area. Clean, organized, staff always helpful. Quick delivery service too!" },
];
const FAQS = [
  { q:"Do you deliver medicines at home?",        a:"Yes, we provide home delivery within Jankipuram and nearby areas in Lucknow. Contact us to place your order." },
  { q:"Can I upload my prescription online?",     a:"Absolutely! Use our online prescription upload feature. We'll prepare your order and confirm via call." },
  { q:"Are all medicines genuine and certified?", a:"Yes, TR Pharmacy sources all medicines directly from authorized distributors and manufacturers. Every medicine is 100% genuine." },
  { q:"What are your opening hours?",             a:"We are open from 9:00 AM to 9:00 PM, Monday to Saturday. Sunday timings may vary. Contact us via WhatsApp anytime." },
  { q:"Do you offer discounts on bulk orders?",   a:"Yes, we offer special discounts on bulk purchases and for regular customers. Contact us for details." },
  { q:"Can I get health consultation?",           a:"Our experienced pharmacist is available for basic health consultations and guidance on medication usage, free of charge." },
];
const SERVICES = [
  { icon:"🩺", title:"BP Monitoring",       desc:"Free blood pressure check with digital monitors for accurate readings." },
  { icon:"🩸", title:"Diabetes Care",       desc:"Complete range of diabetes management products and glucometers." },
  { icon:"💬", title:"Health Consultation", desc:"Expert pharmacist consultation for medication queries & guidance." },
  { icon:"📋", title:"Prescription Supply", desc:"All scheduled & OTC medicines with genuine quality assurance." },
  { icon:"🩹", title:"First Aid Products",  desc:"Complete first aid kits, bandages, antiseptics & wound care." },
  { icon:"🚚", title:"Home Delivery",       desc:"Fast and reliable medicine delivery to your doorstep." },
];
const CATS = ["All","Tablets","Capsules","Syrups","Supplements","Personal Care","Devices"];
const MAPS_URL = "https://www.google.com/maps/search/Janki+Plaza+Sector+G+Jankipuram+Lucknow";

// Persistent submission store — module level, never resets
const DB = { prescriptions:[], contacts:[] };

// ─────────────────────────────────────────────────────────────────────────────
//  ICONS  (module-level pure components — never re-created)
// ─────────────────────────────────────────────────────────────────────────────
const CloseIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SearchIcon = () => <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const CartIcon = () => <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const MoonIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
const SunIcon  = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const StarIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ChevronIcon = ({ open }) => <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform:open?"rotate(180deg)":"none", transition:"transform .3s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>;
const PlusIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const MinusIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const TrashIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const CameraIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const WAIcon = () => (
  <svg viewBox="0 0 32 32" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.494 2.028 7.808L0 32l8.404-2.004A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0z" fill="#25D366"/>
    <path d="M23 18.94c-.32-.16-1.9-.94-2.196-1.047-.295-.106-.51-.16-.724.16-.214.32-.83 1.047-1.018 1.26-.187.214-.375.24-.695.08-.32-.16-1.35-.498-2.572-1.588-.95-.848-1.592-1.895-1.78-2.215-.187-.32-.02-.493.14-.652.145-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.724-1.742-.99-2.388-.26-.627-.527-.54-.724-.55-.187-.01-.4-.012-.614-.012s-.56.08-.853.4c-.294.32-1.122 1.097-1.122 2.676 0 1.578 1.15 3.103 1.31 3.316.16.214 2.262 3.454 5.484 4.843.766.33 1.364.527 1.83.674.769.244 1.47.21 2.024.127.617-.092 1.9-.776 2.168-1.527.267-.75.267-1.393.187-1.527-.08-.134-.294-.214-.614-.374z" fill="#fff"/>
  </svg>
);


// ─── Ripple effect helper ─────────────────────────────────────────────────────
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
//  SHARED STYLE HELPERS  (pure functions — defined once at module level)
// ─────────────────────────────────────────────────────────────────────────────
const mkCard  = () => ({ background:"var(--bg2)", borderRadius:18, padding:22, boxShadow:"var(--shd)", border:"1px solid var(--bdr)" });
const mkInp   = () => ({ width:"100%", padding:"11px 14px", borderRadius:11, border:"1.5px solid var(--bdr)", background:"var(--bg3)", color:"var(--text)", fontSize:14, outline:"none", boxSizing:"border-box" });
const mkBtn   = (v="p") => ({ padding:v==="sm"?"7px 15px":"12px 22px", borderRadius:50, fontWeight:700, fontSize:v==="sm"?12:14, cursor:"pointer", border:v==="out"?"2px solid #059669":"none", background:v==="out"?"transparent":v==="ghost"?"var(--bg3)":v==="wa"?"#25d366":"#059669", color:v==="out"?"#059669":v==="ghost"?"var(--text2)":"#fff", display:"inline-flex", alignItems:"center", gap:5, whiteSpace:"nowrap", transition:"all .18s" });
const mkBdg   = c => ({ display:"inline-block", padding:"4px 14px", borderRadius:50, fontSize:12, fontWeight:700, marginBottom:12, background:c==="g"?"#d1fae5":"#e0f2fe", color:c==="g"?"#059669":"#0ea5e9" });
const mkTag   = c => ({ display:"inline-block", padding:"2px 10px", borderRadius:50, fontSize:11, fontWeight:700, background:c==="g"?"#d1fae5":c==="b"?"#e0f2fe":"#fef3c7", color:c==="g"?"#059669":c==="b"?"#0ea5e9":"#d97706" });
const mkHero  = (a,b) => ({ background:`linear-gradient(135deg,${a},${b})`, padding:"clamp(36px,6vw,58px) 20px", textAlign:"center" });

// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATED COUNTER  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
function Counter({ target }) {
  const [n, setN]   = useState(0);
  const ref  = useRef(null);
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
//  GLOBAL CSS  (injected once — not inside any component)
// ─────────────────────────────────────────────────────────────────────────────
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Nunito','Segoe UI',sans-serif; background:var(--bg); overflow-x:hidden; -webkit-tap-highlight-color:transparent; }

  /* ───── KEYFRAMES ───── */
  @keyframes fadeUp      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
  @keyframes slideInR    { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInL    { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideDown   { from{opacity:0;transform:translateY(-14px) scaleY(.95)} to{opacity:1;transform:translateY(0) scaleY(1)} }
  @keyframes float       { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(.5deg)} }
  @keyframes waPulse     { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5),0 6px 24px rgba(37,211,102,.4)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0),0 6px 24px rgba(37,211,102,.4)} }
  @keyframes ripple      { from{transform:scale(0);opacity:.4} to{transform:scale(2.5);opacity:0} }
  @keyframes shimmer     { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes popIn       { 0%{opacity:0;transform:scale(.8) translateY(8px)} 70%{transform:scale(1.04) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes glowPulse   { 0%,100%{filter:drop-shadow(0 0 0px #059669)} 50%{filter:drop-shadow(0 0 8px #059669)} }
  @keyframes bNavPop     { 0%{transform:translateY(0) scale(1)} 40%{transform:translateY(-6px) scale(1.25)} 70%{transform:translateY(1px) scale(.95)} 100%{transform:translateY(0) scale(1)} }
  @keyframes toastSlide  { from{opacity:0;transform:translateY(16px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes navUnder    { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes cardReveal  { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes heroBadge   { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
  @keyframes gradShift   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes dotBlink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }

  /* ───── PAGE ENTER ───── */
  .pg { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .pg > * { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .pg > *:nth-child(2) { animation-delay:.06s }
  .pg > *:nth-child(3) { animation-delay:.12s }
  .pg > *:nth-child(4) { animation-delay:.18s }

  /* ───── CARD HOVER ───── */
  .lift {
    transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease, border-color .2s ease !important;
    will-change: transform;
  }
  .lift:hover {
    transform: translateY(-6px) scale(1.01) !important;
    box-shadow: 0 20px 48px rgba(5,150,105,.2), 0 4px 12px rgba(0,0,0,.06) !important;
    border-color: rgba(5,150,105,.25) !important;
  }
  .lift:active { transform: translateY(-2px) scale(.99) !important; }

  /* ───── BUTTONS ───── */
  .hbtn {
    position: relative; overflow: hidden;
    transition: transform .22s cubic-bezier(.22,1,.36,1), filter .18s ease, box-shadow .22s ease !important;
  }
  .hbtn::after {
    content:''; position:absolute; inset:0;
    background: radial-gradient(circle, rgba(255,255,255,.28) 0%, transparent 70%);
    opacity:0; transition: opacity .2s;
    pointer-events:none;
  }
  .hbtn:hover { transform:scale(1.045) !important; filter:brightness(1.1); box-shadow:0 8px 24px rgba(5,150,105,.3) !important; }
  .hbtn:hover::after { opacity:1; }
  .hbtn:active { transform:scale(.97) !important; filter:brightness(.97); }

  /* Ripple effect on button click */
  .hbtn .ripple {
    position:absolute; border-radius:50%;
    background:rgba(255,255,255,.35);
    transform:scale(0); animation:ripple .5s linear;
    pointer-events:none;
  }

  /* ───── FLOAT HERO CARD ───── */
  .float-anim { animation: float 4s ease-in-out infinite; }

  /* ───── INPUT / TEXTAREA ───── */
  input, textarea, select {
    transition: border-color .2s ease, box-shadow .2s ease, transform .15s ease !important;
  }
  input:focus, textarea:focus {
    border-color: #059669 !important;
    box-shadow: 0 0 0 3px rgba(5,150,105,.14), 0 2px 8px rgba(5,150,105,.1) !important;
    transform: translateY(-1px);
    outline: none;
  }

  /* ───── NAV LINKS ───── */
  .nav-link {
    position: relative; transition: color .2s ease, background .2s ease !important;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:-2px; left:50%; right:50%;
    height:2px; background:#059669; border-radius:2px;
    transition: left .25s ease, right .25s ease;
  }
  .nav-link:hover::after { left:10%; right:10%; }
  .nav-link.active::after { left:8%; right:8%; }

  /* ───── HAMBURGER ───── */
  .mob-ham {
    transition: background .2s ease, transform .15s ease !important;
  }
  .mob-ham:hover { transform: scale(1.08) !important; }
  .mob-ham:active { transform: scale(.93) !important; }
  .mob-ham svg line {
    transition: transform .3s cubic-bezier(.22,1,.36,1), opacity .2s ease;
    transform-origin: center;
  }

  /* ───── MOBILE DROPDOWN ───── */
  .mob-menu {
    display: none; flex-direction: column;
    background: var(--bg2);
    border-top: 1px solid var(--bdr);
    padding: 10px 14px 14px;
    box-shadow: 0 12px 32px rgba(0,0,0,.12);
    transform-origin: top center;
  }
  .mob-menu.open {
    display: flex;
    animation: slideDown .28s cubic-bezier(.22,1,.36,1) both;
  }
  .mob-menu button.nav-item {
    display: block; width: 100%; text-align: left;
    padding: 12px 16px; border-radius: 12px; margin-bottom: 3px;
    font-weight: 700; font-size: 14px; cursor: pointer;
    border: none; background: transparent; color: var(--text2);
    transition: background .18s ease, color .18s ease, transform .15s ease, padding-left .18s ease;
    transform-origin: left center;
  }
  .mob-menu button.nav-item:hover {
    background: rgba(5,150,105,.1); color:#059669;
    padding-left: 22px;
  }
  .mob-menu button.nav-item.active {
    background: linear-gradient(135deg,#059669,#0ea5e9);
    color:#fff; padding-left:20px;
    box-shadow: 0 4px 14px rgba(5,150,105,.3);
  }
  .mob-menu button.nav-item:nth-child(1){animation-delay:.03s}
  .mob-menu button.nav-item:nth-child(2){animation-delay:.06s}
  .mob-menu button.nav-item:nth-child(3){animation-delay:.09s}
  .mob-menu button.nav-item:nth-child(4){animation-delay:.12s}
  .mob-menu button.nav-item:nth-child(5){animation-delay:.15s}
  .mob-menu button.nav-item:nth-child(6){animation-delay:.18s}
  .mob-menu button.nav-item:nth-child(7){animation-delay:.21s}
  .mob-menu.open button.nav-item {
    animation: slideInL .3s cubic-bezier(.22,1,.36,1) both;
  }
  .mob-bottom {
    display:flex; gap:8px; margin-top:10px; padding-top:12px;
    border-top:1px solid var(--bdr);
  }
  .mob-bottom a {
    flex:1; text-align:center; padding:11px 8px; border-radius:12px;
    background: linear-gradient(135deg,#059669,#047857);
    color:#fff; font-weight:700; font-size:13px; text-decoration:none;
    transition: transform .18s ease, box-shadow .18s ease;
    box-shadow: 0 3px 12px rgba(5,150,105,.25);
  }
  .mob-bottom a:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(5,150,105,.35); }
  .mob-bottom a.wa {
    background: linear-gradient(135deg,#25d366,#128c5e);
    box-shadow: 0 3px 12px rgba(37,211,102,.25);
  }
  .mob-bottom a.wa:hover { box-shadow:0 6px 20px rgba(37,211,102,.4); }

  /* ───── BOTTOM NAV ───── */
  .bottom-nav {
    display: none;
    position: fixed; bottom:0; left:0; right:0; z-index:150;
    background: var(--bg2);
    border-top: 1px solid var(--bdr);
    box-shadow: 0 -6px 24px rgba(0,0,0,.1);
    padding: 4px 0 env(safe-area-inset-bottom,4px);
    backdrop-filter: blur(12px);
  }
  .bottom-nav-inner { display:flex; justify-content:space-around; align-items:center; }
  .bnav-btn {
    display:flex; flex-direction:column; align-items:center;
    gap:2px; padding:5px 6px; border-radius:12px;
    border:none; background:transparent; cursor:pointer;
    color:var(--text2); font-size:9.5px; font-weight:700;
    transition: color .2s ease, background .2s ease;
    min-width:50px; position:relative;
  }
  .bnav-btn .icon {
    font-size:21px; line-height:1;
    transition: transform .3s cubic-bezier(.22,1,.36,1);
    display:block;
  }
  .bnav-btn:hover .icon { transform: translateY(-3px) scale(1.1); }
  .bnav-btn.active { color:#059669; }
  .bnav-btn.active .icon { animation: bNavPop .4s cubic-bezier(.22,1,.36,1) both; }
  .bnav-btn.active::before {
    content:''; position:absolute; top:3px; left:50%; transform:translateX(-50%);
    width:28px; height:3px; border-radius:3px;
    background:linear-gradient(90deg,#059669,#0ea5e9);
  }

  /* ───── CARDS staggered reveal ───── */
  .card-grid > * {
    animation: cardReveal .5s cubic-bezier(.22,1,.36,1) both;
  }
  .card-grid > *:nth-child(1){animation-delay:.04s}
  .card-grid > *:nth-child(2){animation-delay:.08s}
  .card-grid > *:nth-child(3){animation-delay:.12s}
  .card-grid > *:nth-child(4){animation-delay:.16s}
  .card-grid > *:nth-child(5){animation-delay:.20s}
  .card-grid > *:nth-child(6){animation-delay:.24s}
  .card-grid > *:nth-child(7){animation-delay:.28s}
  .card-grid > *:nth-child(8){animation-delay:.32s}

  /* ───── MED CARD image overlay ───── */
  .med-img-overlay {
    transition: opacity .22s ease !important;
  }

  /* ───── FAQ ACCORDION ───── */
  .faq-body {
    animation: fadeUp .25s ease both;
    overflow: hidden;
  }
  .faq-btn {
    transition: background .18s ease, color .18s ease !important;
  }
  .faq-btn:hover { background: rgba(5,150,105,.06) !important; }

  /* ───── TOAST ───── */
  .toast-pop { animation: toastSlide .35s cubic-bezier(.22,1,.36,1) both; }

  /* ───── HERO LIVE DOT ───── */
  .live-dot { animation: dotBlink 1.8s ease-in-out infinite; }

  /* ───── HERO BADGE ───── */
  .hero-badge { animation: heroBadge 3s ease-in-out infinite; }

  /* ───── ANIMATED GRADIENT TEXT ───── */
  .grad-text {
    background: linear-gradient(270deg,#4ade80,#38bdf8,#a78bfa,#4ade80);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradShift 5s ease infinite;
  }

  /* ───── WA FAB ───── */
  .wa-fab {
    transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease !important;
    animation: waPulse 2.5s cubic-bezier(.22,1,.36,1) infinite !important;
  }
  .wa-fab:hover {
    transform: scale(1.15) rotate(-5deg) !important;
    box-shadow: 0 8px 32px rgba(37,211,102,.6), 0 0 0 6px rgba(37,211,102,.15) !important;
  }

  /* ───── SCROLLBAR ───── */
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(5,150,105,.35); border-radius:3px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(5,150,105,.6); }

  /* ───── SELECTION ───── */
  ::selection { background:rgba(5,150,105,.2); color:inherit; }

  /* ───── RESPONSIVE GRIDS ───── */
  .hg  { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
  .fg  { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
  .cg  { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
  .g3  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .g4  { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }

  @media(max-width:1024px) {
    .fg { grid-template-columns:repeat(2,1fr) !important; }
    .g4 { grid-template-columns:repeat(2,1fr) !important; }
  }
  @media(max-width:768px) {
    .desk-nav { display:none !important; }
    .mob-ham  { display:flex !important; }
    .hg  { grid-template-columns:1fr !important; gap:24px !important; }
    .fg  { grid-template-columns:1fr 1fr !important; gap:20px !important; }
    .cg  { grid-template-columns:1fr !important; gap:20px !important; }
    .g3  { grid-template-columns:1fr 1fr !important; gap:14px !important; }
    .g4  { grid-template-columns:1fr 1fr !important; gap:14px !important; }
    .bottom-nav { display:block; }
    .hide-mobile { display:none !important; }
    .page-content { padding-bottom:72px; }
    .wa-fab { bottom:80px !important; }
    .lift:hover { transform:translateY(-3px) scale(1.005) !important; }
  }
  @media(max-width:480px) {
    .fg  { grid-template-columns:1fr !important; }
    .g3  { grid-template-columns:1fr !important; }
    .g4  { grid-template-columns:1fr 1fr !important; }
    .hero-btns { flex-direction:column !important; }
    .hero-btns button, .hero-btns a { width:100% !important; justify-content:center !important; }
  }
  @media(max-width:360px) {
    .g4 { grid-template-columns:1fr !important; }
  }
  @media(prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
  }
`;
// Inject once
if (!document.getElementById("tr-global-css")) {
  const s = document.createElement("style");
  s.id = "tr-global-css";
  s.textContent = globalCss;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────────────────────
//  NAV  (module-level — receives only what it needs via props)
// ─────────────────────────────────────────────────────────────────────────────
// Hamburger icon
const HamburgerIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    {open
      ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
      : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
    }
  </svg>
);

const Nav = React.memo(function Nav({ dark, setDark, page, go, cartCount, onCartOpen, onDBOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = [
    ["home","🏠 Home"],["about","ℹ️ About"],["medicines","💊 Medicines"],
    ["prescription","📋 Rx Upload"],["services","🩺 Services"],
    ["contact","📞 Contact"],["opening","✅ Grand Opening"]
  ];
  const navGo = (p) => { go(p); setMenuOpen(false); };

  return (
    <nav style={{ position:"sticky",top:0,zIndex:200,background:dark?"rgba(15,23,42,.97)":"rgba(255,255,255,.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--bdr)",boxShadow:"0 2px 20px rgba(0,0,0,.07)",transition:"background .3s ease,box-shadow .3s ease" }}>
      {/* Main bar */}
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:58 }}>
        {/* Logo */}
        <div onClick={()=>navGo("home")} style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer",flexShrink:0 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:17,flexShrink:0,transition:"transform .2s ease,box-shadow .2s ease",cursor:"pointer" }} onMouseEnter={e=>{e.currentTarget.style.transform="rotate(15deg) scale(1.12)";e.currentTarget.style.boxShadow="0 4px 16px rgba(5,150,105,.4)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>✚</div>
          <div>
            <div style={{ fontSize:15,fontWeight:900,color:"#059669",letterSpacing:"-.4px",lineHeight:1 }}>TR Pharmacy</div>
            <div style={{ fontSize:9,color:"var(--text2)",marginTop:1 }}>Your Trusted Health Partner</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display:"flex",gap:2,alignItems:"center" }} className="desk-nav">
          {pages.map(([p,l]) => (
            <button key={p} onClick={()=>navGo(p)} className={`nav-link${page===p?" active":""}`} style={{ padding:"5px 10px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:11.5,background:page===p?"#059669":"transparent",color:page===p?"#fff":"var(--text2)",whiteSpace:"nowrap" }}>{l}</button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
          {/* Dark mode */}
          <button onClick={()=>setDark(d=>!d)} style={{ width:34,height:34,borderRadius:8,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>
            {dark ? <SunIcon/> : <MoonIcon/>}
          </button>
          {/* Cart */}
          <button onClick={onCartOpen} style={{ position:"relative",width:34,height:34,borderRadius:8,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)" }}>
            <CartIcon/>
            {cartCount > 0 && <span style={{ position:"absolute",top:-5,right:-5,width:17,height:17,borderRadius:9,background:"#ef4444",color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
          </button>
          {/* Submissions — hide on mobile */}
          <button onClick={onDBOpen} title="Submissions" style={{ width:34,height:34,borderRadius:8,border:"1px solid var(--bdr)",background:"var(--bg2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15 }} className="hide-mobile">📬</button>
          {/* Hamburger — mobile only */}
          <button onClick={()=>setMenuOpen(o=>!o)} style={{ width:36,height:36,borderRadius:8,border:"1px solid var(--bdr)",background:menuOpen?"#059669":"var(--bg2)",cursor:"pointer",display:"none",alignItems:"center",justifyContent:"center",color:menuOpen?"#fff":"var(--text2)",transition:"all .2s" }} className="mob-ham" aria-label="Menu">
            <HamburgerIcon open={menuOpen}/>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mob-menu${menuOpen?" open":""}`}>
        {pages.map(([p,l]) => (
          <button key={p} onClick={()=>navGo(p)} className={`nav-item${page===p?" active":""}`}>{l}</button>
        ))}
        <div className="mob-bottom">
          <a href="tel:6389482072">📞 Call Now</a>
          <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" className="wa">💬 WhatsApp</a>
        </div>
      </div>
    </nav>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  SUBMISSIONS PANEL  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
const DBPanel = React.memo(function DBPanel({ onClose }) {
  const card = mkCard();
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }} onClick={onClose}>
      <div style={{ ...card,width:"min(680px,100%)",maxHeight:"85vh",overflowY:"auto",padding:28 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
          <h2 style={{ fontWeight:900,fontSize:19 }}>📬 Form Submissions</h2>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)" }}><CloseIcon/></button>
        </div>
        <h3 style={{ fontWeight:800,color:"#059669",marginBottom:10 }}>💊 Prescriptions ({DB.prescriptions.length})</h3>
        {DB.prescriptions.length === 0
          ? <p style={{ color:"var(--text2)",fontSize:13,marginBottom:18 }}>No submissions yet.</p>
          : DB.prescriptions.map((s,i) => (
            <div key={i} style={{ ...card,background:"var(--bg3)",padding:14,marginBottom:10,fontSize:13 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                <div><b>Name:</b> {s.name}</div><div><b>Phone:</b> {s.phone}</div>
                <div><b>Address:</b> {s.address||"—"}</div><div><b>Medicine:</b> {s.medicine||"—"}</div>
                <div style={{ gridColumn:"1/-1" }}><b>Note:</b> {s.note||"—"}</div>
                <div style={{ gridColumn:"1/-1",color:"var(--text2)",fontSize:11 }}>⏰ {s.time}</div>
                {s.preview && <img src={s.preview} alt="rx" style={{ gridColumn:"1/-1",width:"100%",maxHeight:150,objectFit:"cover",borderRadius:8,marginTop:6 }}/>}
              </div>
            </div>
          ))
        }
        <h3 style={{ fontWeight:800,color:"#0ea5e9",marginBottom:10,marginTop:16 }}>📞 Contact Messages ({DB.contacts.length})</h3>
        {DB.contacts.length === 0
          ? <p style={{ color:"var(--text2)",fontSize:13 }}>No messages yet.</p>
          : DB.contacts.map((s,i) => (
            <div key={i} style={{ ...card,background:"var(--bg3)",padding:14,marginBottom:10,fontSize:13 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
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
//  CART PANEL  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
const CartPanel = React.memo(function CartPanel({ cart, cartStep, setCartStep, cartAddr, setCartAddr, payMode, setPayMode, onClose, onAddCart, onUpdQty, onRemCart, onGoPage, onToast }) {
  const cartTotal  = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const cartCount  = cart.reduce((s,i) => s + i.qty, 0);
  const delivery   = cartTotal > 500 || cartTotal === 0 ? 0 : 30;
  const card = mkCard();
  const btn  = mkBtn;
  const inp  = mkInp();

  const doOrder = () => {
    if (!cartAddr.name || !cartAddr.phone || !cartAddr.address) { onToast("Fill all delivery fields","err"); return; }
    setCartStep("payment");
  };
  const doPay = () => {
    onToast("✅ Order placed! We'll call to confirm.");
    setCartStep("success");
    // clear cart via callback
    cart.forEach(i => onRemCart(i.id, true));
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:300,display:"flex",justifyContent:"flex-end",animation:"fadeIn .2s ease" }} onClick={onClose}>
      <div style={{ width:"min(420px,100vw)",background:"var(--bg2)",height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",animation:"slideInR .32s cubic-bezier(.22,1,.36,1) both",boxShadow:"-8px 0 40px rgba(0,0,0,.18)" }} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:"18px 22px",borderBottom:"1px solid var(--bdr)",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--bg2)",zIndex:2 }}>
          <div>
            <div style={{ fontWeight:900,fontSize:17,display:"flex",alignItems:"center",gap:7 }}>
              🛒 Cart
              {cartCount > 0 && <span style={{ background:"#059669",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:11 }}>{cartCount}</span>}
            </div>
            <div style={{ fontSize:11,color:"var(--text2)",marginTop:1 }}>
              {cartStep==="items"?"Step 1 of 3 — Items":cartStep==="address"?"Step 2 of 3 — Delivery":cartStep==="payment"?"Step 3 of 3 — Payment":""}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"var(--bg3)",border:"1px solid var(--bdr)",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,color:"var(--text2)" }}><CloseIcon/></button>
        </div>

        {/* Steps bar */}
        {cartStep !== "success" && (
          <div style={{ padding:"10px 22px",display:"flex",gap:3,alignItems:"center" }}>
            {["items","address","payment"].map((s,i,arr) => (
              <div key={s} style={{ display:"flex",alignItems:"center",flex:1 }}>
                <div style={{ width:22,height:22,borderRadius:11,background:arr.indexOf(cartStep)>=i?"#059669":"var(--bg3)",color:arr.indexOf(cartStep)>=i?"#fff":"var(--text2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0 }}>{i+1}</div>
                {i < 2 && <div style={{ flex:1,height:2,background:arr.indexOf(cartStep)>i?"#059669":"var(--bdr)",margin:"0 3px" }}/>}
              </div>
            ))}
          </div>
        )}

        <div style={{ flex:1,padding:"0 22px 22px" }}>
          {/* STEP 1 — Items */}
          {cartStep === "items" && (
            cart.length === 0
              ? <div style={{ textAlign:"center",paddingTop:70 }}>
                  <div style={{ fontSize:54,marginBottom:14 }}>🛒</div>
                  <p style={{ fontWeight:800,marginBottom:6 }}>Cart is empty</p>
                  <p style={{ color:"var(--text2)",fontSize:13,marginBottom:18 }}>Add medicines to get started</p>
                  <button style={btn()} onClick={()=>{onGoPage("medicines");onClose();}}>Browse Medicines</button>
                </div>
              : <>
                  {cart.map(item => (
                    <div key={item.id} style={{ display:"flex",gap:10,padding:"12px 0",borderBottom:"1px solid var(--bdr)",alignItems:"center" }}>
                      <div style={{ width:48,height:48,borderRadius:10,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,overflow:"hidden" }}>
                        {item.img ? <img src={item.img} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : item.emoji}
                      </div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontWeight:800,fontSize:13,marginBottom:2 }}>{item.name}</div>
                        <div style={{ color:"#059669",fontWeight:800,fontSize:13 }}>₹{item.price}</div>
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:5,background:"var(--bg3)",borderRadius:7,padding:"4px 7px" }}>
                          <button onClick={()=>onUpdQty(item.id,-1)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)",display:"flex",padding:2 }}><MinusIcon/></button>
                          <span style={{ fontWeight:800,fontSize:13,minWidth:14,textAlign:"center" }}>{item.qty}</span>
                          <button onClick={()=>onUpdQty(item.id,1)} style={{ background:"none",border:"none",cursor:"pointer",color:"#059669",display:"flex",padding:2 }}><PlusIcon/></button>
                        </div>
                        <button onClick={()=>onRemCart(item.id)} style={{ background:"#fee2e2",border:"none",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",padding:6,color:"#dc2626" }}><TrashIcon/></button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:14,padding:14,background:"var(--bg3)",borderRadius:12 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5 }}><span style={{ color:"var(--text2)" }}>Subtotal</span><span style={{ fontWeight:700 }}>₹{cartTotal}</span></div>
                    <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8 }}><span style={{ color:"var(--text2)" }}>Delivery</span><span style={{ fontWeight:700,color:delivery===0?"#059669":"var(--text)" }}>{delivery===0?"FREE 🎉":`₹${delivery}`}</span></div>
                    {delivery > 0 && <div style={{ fontSize:11,color:"#059669",marginBottom:8 }}>Add ₹{500-cartTotal} more for free delivery!</div>}
                    <div style={{ borderTop:"1px dashed var(--bdr)",paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:16 }}><span>Total</span><span style={{ color:"#059669" }}>₹{cartTotal+delivery}</span></div>
                  </div>
                  <button style={{ ...btn(),width:"100%",padding:"13px",marginTop:12,justifyContent:"center",fontSize:14 }} className="hbtn" onClick={()=>setCartStep("address")}>Proceed to Delivery →</button>
                  <button style={{ ...btn("out"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>{onGoPage("prescription");onClose();}}>Upload Prescription Instead</button>
                </>
          )}

          {/* STEP 2 — Address */}
          {cartStep === "address" && (
            <div style={{ paddingTop:8 }}>
              <h3 style={{ fontWeight:900,marginBottom:14 }}>🏠 Delivery Details</h3>
              {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["Delivery Address *","address","text"],["Pincode","pincode","text"]].map(([l,k,t]) => (
                <div key={k} style={{ marginBottom:12 }}>
                  <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
                  <input style={inp} type={t} placeholder={l.replace(" *","")} value={cartAddr[k]} onChange={e=>setCartAddr(p=>({...p,[k]:e.target.value}))}/>
                </div>
              ))}
              <button style={{ ...btn(),width:"100%",padding:"13px",marginTop:6,justifyContent:"center" }} className="hbtn" onClick={doOrder}>Continue to Payment →</button>
              <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>setCartStep("items")}>← Back</button>
            </div>
          )}

          {/* STEP 3 — Payment */}
          {cartStep === "payment" && (
            <div style={{ paddingTop:8 }}>
              <h3 style={{ fontWeight:900,marginBottom:14 }}>💳 Payment Method</h3>
              <div style={{ background:"var(--bg3)",borderRadius:12,padding:14,marginBottom:18 }}>
                <div style={{ fontWeight:800,marginBottom:7,fontSize:13 }}>Order Summary</div>
                {cart.map(i => <div key={i.id} style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3,color:"var(--text2)" }}><span>{i.name} ×{i.qty}</span><span>₹{i.price*i.qty}</span></div>)}
                <div style={{ borderTop:"1px dashed var(--bdr)",paddingTop:7,marginTop:7,display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:15 }}><span>Total</span><span style={{ color:"#059669" }}>₹{cartTotal+delivery}</span></div>
                <div style={{ fontSize:11,color:"var(--text2)",marginTop:5 }}>📍 {cartAddr.address}{cartAddr.pincode?`, ${cartAddr.pincode}`:""}</div>
              </div>
              {[["cod","💵 Cash on Delivery","Pay when order arrives",true],["upi","📱 UPI / QR Code","GPay, PhonePe, Paytm",true],["card","💳 Card Payment","Credit/Debit card",false],["nb","🏦 Net Banking","All major banks",false]].map(([m,l,sub,av]) => (
                <div key={m} onClick={()=>av&&setPayMode(m)} style={{ border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,borderRadius:12,padding:"12px 14px",marginBottom:9,cursor:av?"pointer":"not-allowed",background:payMode===m?"#d1fae5":"var(--bg3)",opacity:av?1:.55,transition:"all .2s" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:18,height:18,borderRadius:9,border:`2px solid ${payMode===m?"#059669":"var(--bdr)"}`,background:payMode===m?"#059669":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {payMode===m && <div style={{ width:7,height:7,borderRadius:4,background:"#fff" }}/>}
                    </div>
                    <div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:13 }}>{l}</div><div style={{ fontSize:11,color:"var(--text2)" }}>{sub}</div></div>
                    {!av && <span style={{ fontSize:10,background:"#fef3c7",color:"#d97706",padding:"2px 7px",borderRadius:50,fontWeight:700 }}>Soon</span>}
                  </div>
                  {payMode==="upi" && m==="upi" && (
                    <div style={{ marginTop:12,padding:12,background:"#fff",borderRadius:10,textAlign:"center" }}>
                      <div style={{ fontSize:11,color:"#64748b",marginBottom:5 }}>Scan to Pay</div>
                      <div style={{ width:100,height:100,background:"repeating-conic-gradient(#000 0% 25%,#fff 0% 50%) 0 0 / 7px 7px",margin:"0 auto",borderRadius:4 }}/>
                      <div style={{ marginTop:6,fontSize:12,fontWeight:700 }}>trpharmacy@paytm</div>
                      <div style={{ fontSize:11,color:"#64748b" }}>₹{cartTotal+delivery}</div>
                    </div>
                  )}
                </div>
              ))}
              <button style={{ ...btn(),width:"100%",padding:"14px",justifyContent:"center",fontSize:14 }} className="hbtn" onClick={doPay}>{payMode==="cod"?"✅ Place Order (COD)":"✅ Confirm Payment"}</button>
              <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>setCartStep("address")}>← Back</button>
            </div>
          )}

          {/* Success */}
          {cartStep === "success" && (
            <div style={{ textAlign:"center",paddingTop:52 }}>
              <div style={{ fontSize:66,marginBottom:14,animation:"popIn .6s cubic-bezier(.22,1,.36,1) both" }}>🎉</div>
              <h2 style={{ fontWeight:900,fontSize:20,marginBottom:8 }}>Order Placed!</h2>
              <p style={{ color:"var(--text2)",fontSize:13,marginBottom:22 }}>Our team will call you within 30 min to confirm.</p>
              <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center",width:"100%",padding:"12px" }}>💬 Track via WhatsApp</a>
              <button style={{ ...btn("ghost"),width:"100%",padding:"11px",marginTop:8,justifyContent:"center" }} onClick={()=>{onClose();setCartStep("items");}}>Continue Shopping</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: HOME  (module-level — receives only needed props)
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = React.memo(function HomePage({ go, meds, onAddCart, onToast }) {
  const [tIdx, setTIdx]     = useState(0);
  const [faq, setFaq]       = useState(null);
  const [newsletter, setNL] = useState("");
  const card = mkCard();
  const btn  = mkBtn;
  const bdg  = mkBdg;
  const tag  = mkTag;

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i+1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pg">
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#064e3b 0%,#065f46 45%,#0c4a6e 100%)",padding:"clamp(40px,8vw,70px) 20px clamp(36px,6vw,58px)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(#fff 1px,transparent 1px),radial-gradient(rgba(14,165,233,.3) 2px,transparent 2px)",backgroundSize:"48px 48px, 96px 96px",backgroundPosition:"0 0, 24px 24px" }}/>
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",alignItems:"center" }} className="hg">
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",borderRadius:50,padding:"5px 15px",fontSize:12,color:"#d1fae5",marginBottom:20,animation:"heroBadge 3s ease-in-out infinite" }}>
              <span className="live-dot" style={{ width:7,height:7,borderRadius:4,background:"#4ade80",display:"inline-block" }}/>
              Now Open — Jankipuram, Lucknow
            </div>
            <h1 style={{ fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16 }}>
              Your Trusted<br/>
              <span className="grad-text">Health Partner</span><br/>
              in Lucknow
            </h1>
            <p style={{ fontSize:15,color:"#a7f3d0",marginBottom:28,lineHeight:1.8 }}>TR Pharmacy — Quality medicines, expert guidance & affordable healthcare for the Jankipuram community.</p>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap" }} className="hero-btns">
              <button onClick={(e)=>{addRipple(e);go("medicines");}} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"#fff",color:"#059669",fontWeight:700,fontSize:14,border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(255,255,255,.25)" }}>🛒 Order Medicine</button>
              <button onClick={()=>go("prescription")} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:14,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📋 Upload Prescription</button>
              <button onClick={()=>go("contact")} className="hbtn" style={{ padding:"12px 22px",borderRadius:50,background:"transparent",color:"#fff",fontWeight:700,fontSize:14,border:"2px solid rgba(255,255,255,.5)",cursor:"pointer" }}>📞 Contact Us</button>
            </div>
          </div>
          <div className="float-anim hide-mobile" style={{ background:"rgba(255,255,255,.1)",borderRadius:22,padding:26,backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.2)" }}>
            <div style={{ fontSize:56,textAlign:"center",marginBottom:14 }}>🏥</div>
            <h3 style={{ color:"#fff",fontSize:18,fontWeight:900,textAlign:"center",marginBottom:6 }}>TR Pharmacy</h3>
            <p style={{ color:"#a7f3d0",textAlign:"center",fontSize:12,marginBottom:18 }}>Shop No. 7, Janki Plaza, Sector G,<br/>Jankipuram, Lucknow</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {[["500+","Medicines"],["100%","Genuine"],["5★","Rated"],["Fast","Delivery"]].map(([n,l]) => (
                <div key={l} style={{ textAlign:"center",background:"rgba(255,255,255,.1)",borderRadius:10,padding:10 }}>
                  <div style={{ fontSize:20,fontWeight:900,color:"#fff" }}>{n}</div>
                  <div style={{ fontSize:10,color:"#a7f3d0" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ background:"#059669",padding:"13px 24px",overflowX:"auto" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap" }}>
          {["✅ 100% Genuine","🚚 Fast Delivery","👨‍⚕️ Expert Pharmacist","💰 Affordable Prices","🔒 Trusted & Safe"].map(t => (
            <span key={t} style={{ color:"#fff",fontWeight:700,fontSize:12,whiteSpace:"nowrap" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ background:"var(--bg3)",padding:"clamp(28px,4vw,44px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }} className="g4 card-grid">
          {[[500,"Medicines","💊"],[1000,"Happy Customers","😊"],[100,"Quality %","✅"],[5,"Star Rating","⭐"]].map(([n,l,ic]) => (
            <div key={l} style={card} className="lift">
              <div style={{ fontSize:30,marginBottom:7,textAlign:"center" }}>{ic}</div>
              <div style={{ fontSize:28,fontWeight:900,color:"#059669",textAlign:"center" }}><Counter target={n}/>{l.includes("%")?"%":l==="Star Rating"?"★":"+"}</div>
              <div style={{ color:"var(--text2)",fontSize:12,fontWeight:600,textAlign:"center" }}>{l.replace(" %","")}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Medicines */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <span style={bdg("g")}>Featured Products</span>
          <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900,marginBottom:8 }}>Popular Medicines</h2>
          <p style={{ color:"var(--text2)",maxWidth:480,margin:"0 auto" }}>Top-selling medicines trusted by thousands in Lucknow</p>
        </div>
        <div className="g4 card-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))" }}>
          {meds.slice(0,8).map(m => (
            <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
              <div style={{ height:126,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,overflow:"hidden" }}>
                {m.img ? <img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : m.emoji}
              </div>
              <div style={{ padding:"13px 16px 16px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:11,color:"var(--text2)" }}>{m.category}</span></div>
                <h4 style={{ fontWeight:800,fontSize:13,marginBottom:3 }}>{m.name}</h4>
                <p style={{ fontSize:11,color:"var(--text2)",marginBottom:11 }}>{m.desc}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ fontSize:17,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
                  <button style={btn("sm")} className="hbtn" onClick={(e)=>{addRipple(e);onAddCart(m);}}>+ Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center",marginTop:28 }}>
          <button style={btn("out")} className="hbtn" onClick={()=>go("medicines")}>View All Medicines →</button>
        </div>
      </section>

      {/* Services */}
      <section style={{ background:"var(--bg3)",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <span style={bdg("b")}>Our Services</span>
            <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>What We Offer</h2>
          </div>
          <div className="g3 card-grid">
            {SERVICES.map(s => (
              <div key={s.title} style={card} className="lift">
                <div style={{ fontSize:34,marginBottom:12 }}>{s.icon}</div>
                <h3 style={{ fontWeight:800,fontSize:16,marginBottom:7 }}>{s.title}</h3>
                <p style={{ color:"var(--text2)",fontSize:13,lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <span style={bdg("g")}>Why Us</span>
          <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>Why Choose TR Pharmacy?</h2>
        </div>
        <div className="g4 card-grid">
          {[["💊","Genuine Medicines","All medicines sourced from certified manufacturers and licensed distributors."],
            ["💰","Affordable Prices","Best prices guaranteed with regular discounts and offers."],
            ["👨‍⚕️","Expert Pharmacist","Licensed pharmacist provides free consultation and guidance."],
            ["⚡","Fast Service","Quick dispensing and reliable home delivery."]].map(([ic,t,d]) => (
            <div key={t} style={{ ...card,display:"flex",gap:12 }} className="lift">
              <div style={{ fontSize:30,flexShrink:0 }}>{ic}</div>
              <div><h4 style={{ fontWeight:800,marginBottom:5,fontSize:14 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.7 }}>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background:"var(--bg3)",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
          <span style={bdg("b")}>Reviews</span>
          <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900,marginBottom:32 }}>What Customers Say</h2>
          <div style={{ maxWidth:600,margin:"0 auto" }}>
            <div key={tIdx} style={{ ...card,padding:32,animation:"popIn .5s cubic-bezier(.22,1,.36,1) both" }}>
              <div style={{ display:"flex",justifyContent:"center",gap:3,marginBottom:14 }}>{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
              <p style={{ fontSize:15,lineHeight:1.8,color:"var(--text2)",fontStyle:"italic",marginBottom:18 }}>"{TESTIMONIALS[tIdx].text}"</p>
              <div style={{ fontWeight:800 }}>{TESTIMONIALS[tIdx].name}</div>
              <div style={{ fontSize:12,color:"#059669" }}>{TESTIMONIALS[tIdx].loc}</div>
            </div>
            <div style={{ display:"flex",justifyContent:"center",gap:7,marginTop:16 }}>
              {TESTIMONIALS.map((_,i) => <button key={i} onClick={()=>setTIdx(i)} style={{ width:9,height:9,borderRadius:5,border:"none",cursor:"pointer",background:i===tIdx?"#059669":"var(--bdr)",transition:"all .2s" }}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <span style={bdg("g")}>FAQ</span>
          <h2 style={{ fontSize:"clamp(20px,4vw,32px)",fontWeight:900 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth:660,margin:"0 auto" }}>
          {FAQS.map((f,i) => (
            <div key={i} style={{ ...card,marginBottom:9,padding:0,overflow:"hidden" }}>
              <button onClick={()=>setFaq(faq===i?null:i)} className="faq-btn" style={{ width:"100%",padding:"15px 20px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"var(--text)",gap:10,borderRadius:"18px 18px 0 0" }}>
                <span style={{ fontWeight:700,fontSize:13,textAlign:"left" }}>{f.q}</span>
                <ChevronIcon open={faq===i}/>
              </button>
              {faq===i && <div className="faq-body" style={{ padding:"0 20px 15px",color:"var(--text2)",fontSize:13,lineHeight:1.7,borderTop:"1px solid var(--bdr)" }}><div style={{ paddingTop:12 }}>{f.a}</div></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div style={{ background:"linear-gradient(135deg,#059669,#0ea5e9)",padding:"clamp(32px,5vw,50px) 20px",textAlign:"center" }}>
        <h2 style={{ color:"#fff",fontSize:24,fontWeight:900,marginBottom:7 }}>Get Health Tips & Exclusive Offers</h2>
        <p style={{ color:"rgba(255,255,255,.8)",marginBottom:22 }}>Subscribe for medicine reminders and special deals</p>
        <div style={{ display:"flex",gap:9,maxWidth:380,margin:"0 auto",flexWrap:"wrap",justifyContent:"center" }}>
          <input style={{ flex:1,minWidth:190,padding:"11px 14px",borderRadius:11,border:"1px solid rgba(255,255,255,.4)",background:"rgba(255,255,255,.2)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box" }}
            placeholder="Your phone number" value={newsletter} onChange={e=>setNL(e.target.value)}/>
          <button style={{ ...btn(),background:"#fff",color:"#059669" }} className="hbtn"
            onClick={()=>{ if(newsletter){ onToast("Subscribed! 🎉"); setNL(""); } }}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: ABOUT  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
const AboutPage = React.memo(function AboutPage({ go }) {
  const card = mkCard();
  const btn  = mkBtn;
  const bdg  = mkBdg;
  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#065f46")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>About TR Pharmacy</h1><p style={{ color:"#a7f3d0",fontSize:16 }}>Trusted Healthcare Partner in Jankipuram, Lucknow</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center" }} style={{ alignItems:"start" }} className="hg">
          <div>
            <span style={bdg("g")}>Our Story</span>
            <h2 style={{ fontSize:28,fontWeight:900,marginBottom:14 }}>Your Neighbourhood Pharmacy Since 2026</h2>
            {["TR Pharmacy was founded to provide people of Jankipuram with access to genuine, affordable medicines along with expert pharmaceutical care.",
              "Located in Sector G, Janki Plaza, we serve hundreds of families daily, ensuring every prescription is filled accurately and every patient receives proper guidance.",
              "Our commitment goes beyond dispensing medicines — we believe in building a healthier community, one family at a time."].map((t,i) => (
              <p key={i} style={{ color:"var(--text2)",lineHeight:1.8,marginBottom:12 }}>{t}</p>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {[["🎯","Mission","Most trusted pharmacy in Lucknow — genuine medicines and expert health guidance."],
              ["👁️","Vision","A healthier Jankipuram where every family has quality, affordable healthcare."],
              ["❤️","Values","Integrity, quality, affordability, and compassionate service to every customer."]].map(([ic,t,d]) => (
              <div key={t} style={{ ...card,display:"flex",gap:12 }}>
                <div style={{ fontSize:26,flexShrink:0 }}>{ic}</div>
                <div><h4 style={{ fontWeight:800,marginBottom:4,fontSize:14 }}>{t}</h4><p style={{ color:"var(--text2)",fontSize:13,lineHeight:1.6 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background:"var(--bg3)",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",textAlign:"center" }}>
          <h2 style={{ fontSize:26,fontWeight:900,marginBottom:32 }}>Our Commitments</h2>
          <div className="g4 card-grid">
            {[["🔬","Authentic Medicines","Sourced from authorized distributors with proper documentation."],
              ["💊","Quality Control","Strict checks ensure only the best medicines reach our customers."],
              ["🌡️","Safe Storage","Medicines stored under ideal temperature & humidity."],
              ["👨‍⚕️","Expert Guidance","Licensed pharmacist answers all your health queries."]].map(([ic,t,d]) => (
              <div key={t} style={card} className="lift">
                <div style={{ fontSize:34,marginBottom:11 }}>{ic}</div>
                <h4 style={{ fontWeight:800,marginBottom:7,fontSize:14 }}>{t}</h4>
                <p style={{ color:"var(--text2)",fontSize:12,lineHeight:1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(40px,6vw,60px) 20px" }}>
        <div style={{ ...card,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",border:"none",padding:36,textAlign:"center" }}>
          <div style={{ fontSize:48,marginBottom:12 }}>📍</div>
          <h3 style={{ fontSize:20,fontWeight:900,marginBottom:7 }}>Find Us</h3>
          <p style={{ color:"var(--text2)",marginBottom:18 }}>Shop No. 7, Janki Plaza Sector G, Jankipuram, Lucknow, U.P.</p>
          <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            <a href="tel:6389482072" style={{ ...btn(),textDecoration:"none" }}>📞 6389482072</a>
            <a href="tel:8586098544" style={{ ...btn(),background:"#0ea5e9",textDecoration:"none" }}>📞 8586098544</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn("out"),textDecoration:"none" }}>🗺️ Get Directions</a>
          </div>
        </div>
      </section>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: MEDICINES  (module-level — search state is LOCAL here, not in App)
// ─────────────────────────────────────────────────────────────────────────────
const MedicinesPage = React.memo(function MedicinesPage({ go, meds, onAddCart, onUploadImg, onRemoveImg }) {
  // Local state — only this component re-renders on search/filter change
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const card = mkCard();
  const btn  = mkBtn;
  const tag  = mkTag;

  const filtered = useMemo(() => meds.filter(m => {
    const mc = catFilter === "All" || m.category === catFilter;
    const ms = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  }), [meds, search, catFilter]);

  return (
    <div className="pg">
      <div style={mkHero("#0c4a6e","#064e3b")}>
        <h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Our Medicines</h1>
        <p style={{ color:"#a7f3d0",fontSize:14,marginBottom:26 }}>Browse genuine medicines & health products</p>
        <div style={{ position:"relative",maxWidth:460,margin:"0 auto" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by medicine name or category..."
            style={{ width:"100%",padding:"11px 42px 11px 42px",borderRadius:11,border:"1px solid rgba(255,255,255,.3)",background:"rgba(255,255,255,.15)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box" }}
          />
          <span style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.7)",pointerEvents:"none" }}><SearchIcon/></span>
          {search && <button onClick={()=>setSearch("")} style={{ position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.25)",border:"none",borderRadius:50,width:20,height:20,cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11 }}>✕</button>}
        </div>
      </div>

      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(32px,5vw,50px) 20px" }}>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:28,justifyContent:"center",padding:"0 4px" }}>
          {CATS.map(c => (
            <button key={c} onClick={()=>setCatFilter(c)} style={{ padding:"7px 18px",borderRadius:50,fontWeight:700,fontSize:12,cursor:"pointer",border:catFilter===c?"none":"1.5px solid var(--bdr)",background:catFilter===c?"#059669":"var(--bg2)",color:catFilter===c?"#fff":"var(--text2)",transition:"all .2s" }}>{c}</button>
          ))}
        </div>

        {search && <div style={{ textAlign:"center",marginBottom:18,color:"var(--text2)",fontSize:13 }}>Showing <b style={{ color:"var(--text)" }}>{filtered.length}</b> result{filtered.length!==1?"s":""} for "<b style={{ color:"var(--text)" }}>{search}</b>"</div>}

        {filtered.length === 0
          ? <div style={{ textAlign:"center",padding:"60px 0" }}>
              <div style={{ fontSize:48,marginBottom:14 }}>🔍</div>
              <h3 style={{ fontWeight:800,marginBottom:7 }}>No medicines found</h3>
              <p style={{ color:"var(--text2)",marginBottom:18 }}>Try a different name or category</p>
              <button style={btn("out")} onClick={()=>{setSearch("");setCatFilter("All");}}>Clear Filters</button>
            </div>
          : <div className="g4 card-grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))" }}>
              {filtered.map(m => (
                <div key={m.id} style={{ ...card,padding:0,overflow:"hidden" }} className="lift">
                  <div style={{ height:136,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,position:"relative",overflow:"hidden" }}>
                    {m.img ? <img src={m.img} alt={m.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : m.emoji}
                    {/* Hover overlay — change or upload */}
                    <label htmlFor={`img-${m.id}`}
                      className="med-img-overlay" style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",opacity:0,color:"#fff",gap:5 }}
                      onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                      onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
                      <CameraIcon/><span style={{ fontSize:11,fontWeight:700 }}>{m.img?"Change Image":"Upload Image"}</span>
                    </label>
                    <input id={`img-${m.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>onUploadImg(m.id,e.target.files[0])}/>
                    {/* Bottom badge */}
                    <div style={{ position:"absolute",bottom:6,right:6,background:"rgba(255,255,255,.9)",borderRadius:7,padding:"3px 7px",fontSize:10,fontWeight:700,color:m.img?"#059669":"#0ea5e9",display:"flex",alignItems:"center",gap:3 }}>
                      <CameraIcon/>{m.img?"✓ Photo":"Add Photo"}
                    </div>
                    {/* Remove button — only shown when image exists */}
                    {m.img && (
                      <button onClick={e=>{ e.stopPropagation(); onRemoveImg(m.id); }}
                        title="Remove image"
                        style={{ position:"absolute",top:6,right:6,background:"rgba(239,68,68,.85)",border:"none",borderRadius:50,width:22,height:22,cursor:"pointer",color:"#fff",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1 }}>
                        ✕
                      </button>
                    )}
                  </div>
                  <div style={{ padding:"13px 15px 16px" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}><span style={tag("g")}>{m.tag}</span><span style={{ fontSize:11,color:"var(--text2)" }}>{m.category}</span></div>
                    <h4 style={{ fontWeight:800,fontSize:13,marginBottom:3 }}>{m.name}</h4>
                    <p style={{ fontSize:11,color:"var(--text2)",marginBottom:11 }}>{m.desc}</p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <span style={{ fontSize:17,fontWeight:900,color:"#059669" }}>₹{m.price}</span>
                      <button style={btn("sm")} className="hbtn" onClick={(e)=>{addRipple(e);onAddCart(m);}}>+ Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
        <div style={{ ...card,marginTop:32,background:"#e0f2fe",border:"none",padding:"16px 20px",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
          <span style={{ fontSize:20 }}>ℹ️</span>
          <p style={{ fontSize:12,color:"var(--text2)",flex:1 }}><b>Prescription Required:</b> "Rx" items need a valid prescription.</p>
          <button style={btn("sm")} onClick={()=>go("prescription")}>Upload Rx</button>
        </div>
      </section>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: PRESCRIPTION  (module-level — own local form state)
// ─────────────────────────────────────────────────────────────────────────────
const PrescriptionPage = React.memo(function PrescriptionPage({ go, onToast }) {
  const [form, setForm]   = useState({ name:"", phone:"", address:"", medicine:"", note:"", file:null, preview:null });
  const [done, setDone]   = useState(false);
  const card = mkCard();
  const btn  = mkBtn;
  const inp  = mkInp();

  const upd = useCallback((k, v) => setForm(p => ({ ...p, [k]:v })), []);

  const handleFile = useCallback(file => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setForm(p => ({ ...p, file, preview:e.target.result }));
    r.readAsDataURL(file);
  }, []);

  const submit = useCallback(() => {
    if (!form.name || !form.phone) { onToast("Please fill Name and Phone","err"); return; }
    DB.prescriptions.push({ ...form, time:new Date().toLocaleString("en-IN") });
    setDone(true);
    onToast("Prescription submitted! We'll call you soon. ✅");
  }, [form, onToast]);

  if (done) return (
    <div style={{ textAlign:"center",padding:"90px 24px" }} className="pg">
      <div style={{ fontSize:70,marginBottom:18 }}>✅</div>
      <h2 style={{ fontSize:26,fontWeight:900,marginBottom:9 }}>Prescription Submitted!</h2>
      <p style={{ color:"var(--text2)",maxWidth:380,margin:"0 auto 22px",lineHeight:1.7 }}>Our pharmacist will review and call you within 30 minutes.</p>
      <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
        <button style={btn()} onClick={()=>go("home")}>Back to Home</button>
        <button style={btn("out")} onClick={()=>{ setDone(false); setForm({ name:"",phone:"",address:"",medicine:"",note:"",file:null,preview:null }); }}>Submit Another</button>
      </div>
    </div>
  );

  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#0c4a6e")}>
        <h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Upload Prescription</h1>
        <p style={{ color:"#a7f3d0",fontSize:15 }}>Send your prescription and we'll prepare your medicines</p>
      </div>
      <section style={{ maxWidth:640,margin:"0 auto",padding:"clamp(28px,4vw,46px) 20px" }}>
        <div style={card}>
          <h3 style={{ fontSize:17,fontWeight:900,marginBottom:20 }}>📋 Prescription Details</h3>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {[["Patient Name *","name","text","Full name"],["Phone Number *","phone","tel","10-digit number"],["Delivery Address","address","text","Full delivery address"],["Medicine Name (optional)","medicine","text","List medicine names if known"]].map(([l,k,t,ph]) => (
              <div key={k}>
                <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
                <input style={inp} type={t} placeholder={ph} value={form[k]} onChange={e=>upd(k,e.target.value)}/>
              </div>
            ))}

            <div>
              <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Upload Prescription Image</label>
              <div style={{ border:"2px dashed var(--bdr)",borderRadius:13,padding:form.preview?0:28,textAlign:"center",background:"var(--bg3)",overflow:"hidden",cursor:"pointer" }}
                onClick={()=>document.getElementById("rx-file").click()}
                onDragOver={e=>e.preventDefault()}
                onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}}>
                <input id="rx-file" type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])}/>
                {form.preview
                  ? <div style={{ position:"relative" }}>
                      <img src={form.preview} alt="Prescription" style={{ width:"100%",maxHeight:210,objectFit:"cover",display:"block" }}/>
                      <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:13 }}
                        onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0"}>
                        🔄 Click to change
                      </div>
                      <div style={{ position:"absolute",top:8,right:8,background:"#059669",color:"#fff",borderRadius:50,padding:"3px 9px",fontSize:11,fontWeight:700 }}>✓ Uploaded</div>
                    </div>
                  : <><div style={{ fontSize:32,marginBottom:7,color:"var(--text2)" }}>📷</div><p style={{ fontWeight:700,marginBottom:3,fontSize:13 }}>Drag & drop or click to upload</p><p style={{ fontSize:11,color:"var(--text2)" }}>JPG, PNG, PDF — Max 10MB</p></>
                }
              </div>
            </div>

            <div>
              <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Additional Note</label>
              <textarea style={{ ...inp,height:85,resize:"vertical" }} placeholder="Special instructions..." value={form.note} onChange={e=>upd("note",e.target.value)}/>
            </div>
            <button style={{ ...btn(),padding:"13px",fontSize:14,justifyContent:"center",width:"100%" }} className="hbtn" onClick={submit}>📤 Submit Prescription</button>
          </div>
        </div>
        <div style={{ ...card,marginTop:18,background:"#d1fae5",border:"1px solid #a7f3d0" }}>
          <h4 style={{ fontWeight:800,marginBottom:9,fontSize:14 }}>📞 Prefer to Call or WhatsApp?</h4>
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

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: SERVICES  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
const ServicesPage = React.memo(function ServicesPage({ go }) {
  const card = mkCard();
  const btn  = mkBtn;
  const tag  = mkTag;
  return (
    <div className="pg">
      <div style={mkHero("#0c4a6e","#064e3b")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Our Services</h1><p style={{ color:"#a7f3d0",fontSize:15 }}>Complete healthcare solutions for you and your family</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,56px) 20px" }}>
        <div className="g3 card-grid">
          {SERVICES.map(s => (
            <div key={s.title} style={{ ...card,padding:30 }} className="lift">
              <div style={{ width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#d1fae5,#e0f2fe)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontWeight:900,fontSize:17,marginBottom:9 }}>{s.title}</h3>
              <p style={{ color:"var(--text2)",lineHeight:1.7,marginBottom:13,fontSize:13 }}>{s.desc}</p>
              <span style={tag("g")}>Available In-Store</span>
            </div>
          ))}
        </div>
        <div style={{ ...card,marginTop:44,background:"linear-gradient(135deg,#064e3b,#065f46)",border:"none",padding:40,textAlign:"center" }}>
          <h2 style={{ color:"#fff",fontSize:24,fontWeight:900,marginBottom:9 }}>🏥 Visit TR Pharmacy</h2>
          <p style={{ color:"#a7f3d0",marginBottom:18,fontSize:14 }}>All services available at our store.</p>
          <p style={{ color:"#d1fae5",marginBottom:22,fontSize:13 }}>Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow</p>
          <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            <button style={{ ...btn(),background:"#fff",color:"#059669" }} onClick={()=>go("contact")}>📞 Contact Us</button>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none" }}>💬 WhatsApp Now</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"rgba(255,255,255,.18)",textDecoration:"none" }}>🗺️ Get Directions</a>
          </div>
        </div>
      </section>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: CONTACT  (module-level — own local form state)
// ─────────────────────────────────────────────────────────────────────────────
const ContactPage = React.memo(function ContactPage({ onToast }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", msg:"" });
  const [done, setDone] = useState(false);
  const card = mkCard();
  const btn  = mkBtn;
  const inp  = mkInp();

  const upd = useCallback((k, v) => setForm(p => ({ ...p, [k]:v })), []);

  const send = useCallback(() => {
    if (!form.name || !form.phone) { onToast("Fill Name and Phone","err"); return; }
    if (!form.msg) { onToast("Write a message","err"); return; }
    DB.contacts.push({ ...form, time:new Date().toLocaleString("en-IN") });
    setDone(true);
    onToast("Message sent! We'll reply shortly. ✅");
  }, [form, onToast]);

  return (
    <div className="pg">
      <div style={mkHero("#064e3b","#0c4a6e")}><h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:900,marginBottom:9 }}>Contact Us</h1><p style={{ color:"#a7f3d0",fontSize:15 }}>We're here for all your healthcare needs</p></div>
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,56px) 20px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:36,alignItems:"start" }} className="cg">

          {/* Info + Map */}
          <div>
            <h3 style={{ fontSize:18,fontWeight:900,marginBottom:18 }}>Get In Touch</h3>
            {[["📍","Address","Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow, U.P. — 226021",MAPS_URL],
              ["📞","Phone Numbers","6389482072  |  8586098544","tel:6389482072"],
              ["🕐","Working Hours","Mon–Sat: 9:00 AM – 9:00 PM",null],
              ["💬","WhatsApp","Chat for quick medicine queries","https://wa.me/916389482072"]].map(([ic,t,i,l]) => (
              <div key={t} style={{ ...card,display:"flex",gap:12,marginBottom:12,cursor:l?"pointer":"default",transition:"all .2s" }} className={l?"lift":""}
                onClick={()=>l&&window.open(l,l.startsWith("tel")?"_self":"_blank")}>
                <div style={{ fontSize:24,flexShrink:0 }}>{ic}</div>
                <div>
                  <div style={{ fontWeight:800,marginBottom:2,fontSize:13 }}>{t}</div>
                  <div style={{ color:l?"#059669":"var(--text2)",fontSize:12,fontWeight:l?600:400 }}>{i}</div>
                  {l && <div style={{ fontSize:10,color:"var(--text2)",marginTop:1 }}>Click to open →</div>}
                </div>
              </div>
            ))}
            <div style={{ borderRadius:14,overflow:"hidden",border:"1px solid var(--bdr)",marginTop:18 }}>
              <iframe title="TR Pharmacy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57010!2d80.95!3d26.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdaa7c9af2ab%3A0x6c7c49cf6c81a2fc!2sJankipuram%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="200" style={{ border:"none",display:"block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ display:"block",padding:"11px 16px",background:"#059669",color:"#fff",textAlign:"center",fontWeight:700,fontSize:13,textDecoration:"none" }}>
                🗺️ Open in Google Maps — Get Directions
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h3 style={{ fontSize:18,fontWeight:900,marginBottom:18 }}>Send a Message</h3>
            {done
              ? <div style={{ ...card,textAlign:"center",padding:44 }}>
                  <div style={{ fontSize:56,marginBottom:14 }}>✅</div>
                  <h3 style={{ fontWeight:900,marginBottom:7 }}>Message Received!</h3>
                  <p style={{ color:"var(--text2)",marginBottom:18,fontSize:13 }}>We'll call you back on <b>{form.phone}</b> within a few hours.</p>
                  <button style={btn("out")} onClick={()=>{ setDone(false); setForm({ name:"",email:"",phone:"",msg:"" }); }}>Send Another</button>
                </div>
              : <div style={card}>
                  <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                    {[["Your Name *","name","text"],["Email Address","email","email"],["Phone Number *","phone","tel"]].map(([l,k,t]) => (
                      <div key={k}>
                        <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>{l}</label>
                        <input style={inp} type={t} placeholder={l.replace(" *","")} value={form[k]} onChange={e=>upd(k,e.target.value)}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontWeight:700,fontSize:12,marginBottom:5,display:"block" }}>Message *</label>
                      <textarea style={{ ...inp,height:100,resize:"vertical" }} placeholder="How can we help you?" value={form.msg} onChange={e=>upd("msg",e.target.value)}/>
                    </div>
                    <button style={{ ...btn(),padding:"13px",fontSize:14,justifyContent:"center" }} className="hbtn" onClick={send}>📤 Send Message</button>
                  </div>
                </div>
            }
            <a href="https://wa.me/916389482072?text=Hello%20TR%20Pharmacy%2C%20I%20need%20help" target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:12,padding:"16px 18px",background:"#dcfce7",borderRadius:14,marginTop:14,textDecoration:"none",border:"1.5px solid #bbf7d0",transition:"all .2s" }} className="lift">
              <div style={{ width:44,height:44,borderRadius:12,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WAIcon/></div>
              <div><div style={{ fontWeight:900,color:"#166534",fontSize:14 }}>Chat on WhatsApp</div><div style={{ fontSize:11,color:"#15803d" }}>Tap to chat — Quick replies</div></div>
              <span style={{ marginLeft:"auto",fontSize:18,color:"#15803d" }}>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE: GRAND OPENING  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
// ── localStorage helpers (safe — no crash if storage full) ──────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const OpeningPage = React.memo(function OpeningPage() {
  const card = mkCard();
  const btn  = mkBtn;

  // Banner dismiss — persisted
  const [bannerVisible, setBannerVisible] = useState(() => lsGet("trp_banner", true));
  // Photos — persisted as base64 array in localStorage
  const [photos, setPhotos]   = useState(() => lsGet("trp_opening_photos", []));
  // Lightbox
  const [lightbox, setLightbox] = useState(null);

  const dismissBanner = useCallback(() => {
    setBannerVisible(false);
    lsSet("trp_banner", false);
  }, []);

  const restoreBanner = useCallback(() => {
    setBannerVisible(true);
    lsSet("trp_banner", true);
  }, []);

  const handlePhotoUpload = useCallback((files) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      const r = new FileReader();
      r.onload = e => {
        setPhotos(prev => {
          const updated = [...prev, { id: Date.now() + Math.random(), src: e.target.result, name: file.name, date: new Date().toLocaleDateString("en-IN") }];
          lsSet("trp_opening_photos", updated);
          return updated;
        });
      };
      r.readAsDataURL(file);
    });
  }, []);

  const deletePhoto = useCallback((id) => {
    setPhotos(prev => {
      const updated = prev.filter(p => p.id !== id);
      lsSet("trp_opening_photos", updated);
      return updated;
    });
    setLightbox(null);
  }, []);

  // Days since opening
  const daysSince = useMemo(() => {
    const opening = new Date("2026-03-12");
    const today   = new Date();
    return Math.floor((today - opening) / (1000 * 60 * 60 * 24));
  }, []);

  return (
    <div className="pg">

      {/* ── Hero — "Celebrated" mode ─────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(270deg,#064e3b,#065f46,#0c4a6e,#064e3b)", backgroundSize:"200% 200%", padding:"70px 24px", animation:"gradShift 8s ease infinite", textAlign:"center", position:"relative", overflow:"hidden", minHeight:320, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(#fff 1px,transparent 1px)",backgroundSize:"28px 28px" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:22,marginBottom:12,letterSpacing:3 }}>🎉 🏥 🎊</div>
          <div style={{ display:"inline-block",background:"rgba(255,255,255,.15)",borderRadius:50,padding:"6px 20px",fontSize:12,color:"#a7f3d0",fontWeight:700,marginBottom:16 }}>
            ✅ Grand Opening — Celebrated!
          </div>
          <h1 style={{ color:"#fff",fontSize:"clamp(26px,5vw,50px)",fontWeight:900,lineHeight:1.1,marginBottom:10 }}>
            TR Pharmacy<br/>
            <span className="grad-text">
              Successfully Opened!
            </span>
          </h1>
          <p style={{ color:"#a7f3d0",fontSize:15,marginBottom:6 }}>12 March 2026 · 3:00 PM · Jankipuram, Lucknow</p>
          <p style={{ color:"rgba(255,255,255,.6)",fontSize:13 }}>
            {daysSince === 0 ? "Opened today! 🎊" : `${daysSince} day${daysSince > 1 ? "s" : ""} of serving Jankipuram with quality healthcare`}
          </p>
        </div>
      </div>

      <section style={{ maxWidth:960,margin:"0 auto",padding:"clamp(28px,4vw,48px) 20px" }}>

        {/* ── Event Summary Cards ──────────────────────────────────────────── */}
        <div className="g4 card-grid" style={{ marginBottom:36 }}>
          {[["📅","Date","12 March 2026","Successfully celebrated"],
            ["⏰","Time","3:00 PM Onwards","Opening ceremony done"],
            ["📍","Venue","Shop No. 7, Janki Plaza","Sector G, Jankipuram"],
            ["🎁","Highlights","Discounts & Lucky Draw","Customers loved it!"]].map(([ic,t,v,s]) => (
            <div key={t} style={{ ...card,textAlign:"center",padding:22 }} className="lift">
              <div style={{ fontSize:30,marginBottom:9 }}>{ic}</div>
              <div style={{ fontSize:10,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:1 }}>{t}</div>
              <div style={{ fontSize:15,fontWeight:900,color:"#059669",margin:"6px 0 3px" }}>{v}</div>
              <div style={{ fontSize:11,color:"var(--text2)" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* ── Dismissible Banner ───────────────────────────────────────────── */}
        {bannerVisible ? (
          <div style={{ ...card,background:"linear-gradient(135deg,#fdf4ff,#fce7f3)",border:"1.5px solid #f9a8d4",padding:"22px 24px",marginBottom:28,position:"relative",animation:"fadeUp .4s ease" }}>
            <button onClick={dismissBanner}
              title="Dismiss this banner"
              style={{ position:"absolute",top:12,right:12,background:"rgba(0,0,0,.08)",border:"none",borderRadius:50,width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontSize:13,fontWeight:700 }}>
              ✕
            </button>
            <h3 style={{ fontWeight:900,fontSize:16,marginBottom:10 }}>🎊 Grand Opening — What Happened</h3>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10 }}>
              {["🎁 Special Discounts Given","💊 Free Health Checks","👨‍⚕️ Pharmacist Consultation","🎀 Lucky Draw Conducted","📋 Medicine Guidance","🏥 Full Stock Available"].map(item => (
                <div key={item} style={{ background:"#fff",borderRadius:10,padding:"10px 9px",fontWeight:700,fontSize:12,boxShadow:"0 2px 8px rgba(0,0,0,.06)" }}>{item}</div>
              ))}
            </div>
            <p style={{ fontSize:12,color:"var(--text2)",marginTop:12 }}>
              Thank you to everyone who joined us on 12 March 2026! Your support means the world to us. 💚
            </p>
          </div>
        ) : (
          <div style={{ marginBottom:24,textAlign:"right" }}>
            <button onClick={restoreBanner} style={{ ...btn("ghost"),fontSize:12,padding:"6px 14px",border:"1px solid var(--bdr)" }}>
              🎊 Show Opening Highlights
            </button>
          </div>
        )}

        {/* ── Photo Gallery ────────────────────────────────────────────────── */}
        <div style={{ ...card,marginBottom:28 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10 }}>
            <div>
              <h3 style={{ fontWeight:900,fontSize:17,marginBottom:3 }}>📸 Grand Opening Photos</h3>
              <p style={{ color:"var(--text2)",fontSize:12 }}>
                {photos.length === 0 ? "Upload photos from the grand opening day — they'll be saved here permanently." : `${photos.length} photo${photos.length > 1 ? "s" : ""} saved`}
              </p>
            </div>
            <label htmlFor="opening-photos" style={{ ...btn(),cursor:"pointer",fontSize:13,padding:"9px 18px" }}>
              📤 Upload Photos
            </label>
            <input id="opening-photos" type="file" accept="image/*" multiple style={{ display:"none" }}
              onChange={e => handlePhotoUpload(e.target.files)}/>
          </div>

          {photos.length === 0 ? (
            <label htmlFor="opening-photos" style={{ display:"block",cursor:"pointer" }}>
              <div style={{ border:"2px dashed var(--bdr)",borderRadius:14,padding:"clamp(28px,4vw,44px) 20px",textAlign:"center",background:"var(--bg3)",transition:"border-color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#059669"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--bdr)"}>
                <div style={{ fontSize:48,marginBottom:12 }}>📷</div>
                <p style={{ fontWeight:700,fontSize:15,marginBottom:4 }}>Drop opening day photos here</p>
                <p style={{ color:"var(--text2)",fontSize:12 }}>JPG, PNG — multiple files allowed · Saved permanently in browser</p>
              </div>
            </label>
          ) : (
            <div className="g4" style={{ gap:12 }}>
              {photos.map((p, idx) => (
                <div key={p.id} style={{ borderRadius:12,overflow:"hidden",position:"relative",cursor:"pointer",boxShadow:"var(--shd)",border:"1px solid var(--bdr)" }}
                  onClick={() => setLightbox(idx)}>
                  <img src={p.src} alt={p.name} style={{ width:"100%",height:130,objectFit:"cover",display:"block" }}/>
                  <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0)",transition:"background .2s",display:"flex",alignItems:"center",justifyContent:"center" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.4)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0)"}>
                    <span style={{ color:"#fff",fontSize:22,opacity:0,transition:"opacity .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.parentNode.style.background="rgba(0,0,0,.4)";}}
                      onMouseLeave={e=>{e.currentTarget.style.opacity="0";e.currentTarget.parentNode.style.background="rgba(0,0,0,0)";}}>
                      🔍
                    </span>
                  </div>
                  <div style={{ padding:"6px 9px",fontSize:10,color:"var(--text2)",background:"var(--bg2)",fontWeight:600 }}>
                    {p.date}
                  </div>
                </div>
              ))}
              {/* Add more button */}
              <label htmlFor="opening-photos" style={{ borderRadius:12,border:"2px dashed var(--bdr)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",height:160,background:"var(--bg3)",gap:8,transition:"border-color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#059669"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--bdr)"}>
                <div style={{ fontSize:28 }}>➕</div>
                <span style={{ fontSize:11,color:"var(--text2)",fontWeight:700 }}>Add More</span>
              </label>
            </div>
          )}
        </div>

        {/* ── Contact + Maps ───────────────────────────────────────────────── */}
        <div className="hg" style={{ gap:16 }}>
          <div style={{ ...card,background:"#059669",color:"#fff",textAlign:"center",padding:26 }}>
            <div style={{ fontSize:36,marginBottom:8 }}>📍</div>
            <h3 style={{ fontWeight:900,fontSize:15,marginBottom:6 }}>Our Location</h3>
            <p style={{ opacity:.88,fontSize:12,marginBottom:14,lineHeight:1.6 }}>Shop No. 7, Janki Plaza,<br/>Sector G, Jankipuram,<br/>Lucknow, U.P.</p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ ...btn(),background:"#fff",color:"#059669",textDecoration:"none",justifyContent:"center" }}>🗺️ Get Directions</a>
          </div>
          <div style={{ ...card,background:"#0c4a6e",color:"#fff",textAlign:"center",padding:26 }}>
            <div style={{ fontSize:36,marginBottom:8 }}>📞</div>
            <h3 style={{ fontWeight:900,fontSize:15,marginBottom:6 }}>Visit / Call Us</h3>
            <p style={{ opacity:.88,fontSize:12,marginBottom:14,lineHeight:1.6 }}>We're open now!<br/>6389482072<br/>8586098544</p>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ ...btn("wa"),textDecoration:"none",justifyContent:"center" }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:500,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20 }}
          onClick={() => setLightbox(null)}>
          <div style={{ position:"relative",maxWidth:820,width:"100%" }} onClick={e => e.stopPropagation()}>
            {/* Nav arrows */}
            {photos.length > 1 && (
              <>
                <button onClick={()=>setLightbox((lightbox-1+photos.length)%photos.length)}
                  style={{ position:"absolute",left:-48,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"none",borderRadius:50,width:38,height:38,cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>‹</button>
                <button onClick={()=>setLightbox((lightbox+1)%photos.length)}
                  style={{ position:"absolute",right:-48,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.15)",border:"none",borderRadius:50,width:38,height:38,cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>›</button>
              </>
            )}
            <img src={photos[lightbox].src} alt="" style={{ width:"100%",maxHeight:"75vh",objectFit:"contain",borderRadius:14,display:"block" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,padding:"0 4px" }}>
              <span style={{ color:"rgba(255,255,255,.7)",fontSize:13 }}>📷 {photos[lightbox].name} · {photos[lightbox].date}</span>
              <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                <span style={{ color:"rgba(255,255,255,.5)",fontSize:12 }}>{lightbox+1} / {photos.length}</span>
                <button onClick={()=>deletePhoto(photos[lightbox].id)}
                  style={{ background:"#ef4444",border:"none",borderRadius:8,cursor:"pointer",color:"#fff",padding:"6px 12px",fontSize:12,fontWeight:700 }}>
                  🗑️ Delete
                </button>
                <button onClick={()=>setLightbox(null)}
                  style={{ background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,cursor:"pointer",color:"#fff",padding:"6px 12px",fontSize:12,fontWeight:700 }}>
                  ✕ Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER  (module-level)
// ─────────────────────────────────────────────────────────────────────────────
const Footer = React.memo(function Footer({ go }) {
  return (
    <footer style={{ background:"#0f172a",color:"#94a3b8",padding:"46px 24px 22px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",marginBottom:36 }} className="fg">
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:13 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#059669,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16 }}>✚</div>
            <span style={{ color:"#fff",fontWeight:900,fontSize:16 }}>TR Pharmacy</span>
          </div>
          <p style={{ fontSize:12,lineHeight:1.8,marginBottom:14 }}>Your Trusted Health Partner in Jankipuram, Lucknow. Quality medicines & expert care.</p>
          <div style={{ display:"flex",gap:7 }}>
            <a href="https://wa.me/916389482072" target="_blank" rel="noreferrer" style={{ width:34,height:34,borderRadius:8,background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}><WAIcon/></a>
            <a href="tel:6389482072" style={{ width:34,height:34,borderRadius:8,background:"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#94a3b8",fontSize:15 }}>📞</a>
          </div>
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Quick Links</h4>
          {[["home","Home"],["about","About Us"],["medicines","Medicines"],["prescription","Upload Rx"],["services","Services"],["contact","Contact"],["opening","Grand Opening"]].map(([p,l]) => (
            <div key={p} style={{ marginBottom:6 }}><button onClick={()=>go(p)} style={{ background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:12,padding:0 }}>→ {l}</button></div>
          ))}
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Services</h4>
          {["Prescription Medicines","OTC Medicines","Health Supplements","BP Monitoring","Diabetes Care","Home Delivery"].map(s => (
            <div key={s} style={{ fontSize:12,marginBottom:6 }}>✓ {s}</div>
          ))}
        </div>
        <div>
          <h4 style={{ color:"#fff",fontWeight:800,marginBottom:12,fontSize:14 }}>Contact</h4>
          <div style={{ display:"flex",gap:7,marginBottom:9,fontSize:12,alignItems:"flex-start" }}>
            <span>📍</span><a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color:"#94a3b8",textDecoration:"none" }}>Shop No. 7, Janki Plaza, Sector G, Jankipuram, Lucknow</a>
          </div>
          <div style={{ display:"flex",gap:7,marginBottom:6,fontSize:12 }}><span>📞</span><a href="tel:6389482072" style={{ color:"#94a3b8",textDecoration:"none" }}>6389482072</a></div>
          <div style={{ display:"flex",gap:7,marginBottom:14,fontSize:12 }}><span>📞</span><a href="tel:8586098544" style={{ color:"#94a3b8",textDecoration:"none" }}>8586098544</a></div>
          <div style={{ background:"#1e293b",borderRadius:11,padding:"11px 13px" }}>
            <div style={{ fontSize:10,color:"#475569",marginBottom:2,textTransform:"uppercase",letterSpacing:1 }}>Grand Opening</div>
            <div style={{ color:"#fff",fontWeight:800,fontSize:13 }}>12 March 2026</div>
            <div style={{ color:"#059669",fontSize:12 }}>3:00 PM onwards</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",borderTop:"1px solid #1e293b",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,fontSize:11 }}>
        <span>© 2026 TR Pharmacy, Jankipuram, Lucknow. All rights reserved.</span>
        <span style={{ color:"#059669",fontWeight:700 }}>"Your Trusted Health Partner"</span>
      </div>
    </footer>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  APP  (only manages global state — no page JSX defined inside)
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,      setPage]      = useState("home");
  const [dark,      setDark]      = useState(false);
  const [meds, setMeds] = useState(() => {
    const saved = lsGet("trp_med_imgs", {});
    return INITIAL_MEDICINES.map(m => ({ ...m, img: saved[m.id] || null }));
  });
  const [cart,      setCart]      = useState([]);
  const [cartOpen,  setCartOpen]  = useState(false);
  const [cartStep,  setCartStep]  = useState("items");
  const [cartAddr,  setCartAddr]  = useState({ name:"", phone:"", address:"", pincode:"" });
  const [payMode,   setPayMode]   = useState("cod");
  const [showDB,    setShowDB]    = useState(false);
  const [toast,     setToast]     = useState(null);

  // CSS variables — only recalc when dark changes
  const cssVars = useMemo(() => (
    dark
      ? { "--bg":"#0f172a","--bg2":"#1e293b","--bg3":"#273549","--text":"#f1f5f9","--text2":"#94a3b8","--bdr":"#334155","--shd":"0 4px 24px rgba(0,0,0,.45)" }
      : { "--bg":"#f8fafc","--bg2":"#ffffff","--bg3":"#f1f5f9","--text":"#0f172a","--text2":"#64748b","--bdr":"#e2e8f0","--shd":"0 4px 20px rgba(0,0,0,.07)" }
  ), [dark]);

  // Stable callbacks — never re-created
  const go        = useCallback((p) => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); }, []);
  const showToast = useCallback((msg, err) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); }, []);
  const onCartOpen = useCallback(() => { setCartOpen(true); setCartStep("items"); }, []);
  const onDBOpen   = useCallback(() => setShowDB(true), []);
  const onDBClose  = useCallback(() => setShowDB(false), []);
  const onCartClose = useCallback(() => setCartOpen(false), []);

  const onAddCart = useCallback((m) => {
    setCart(c => { const ex = c.find(i=>i.id===m.id); return ex ? c.map(i=>i.id===m.id?{...i,qty:i.qty+1}:i) : [...c,{...m,qty:1}]; });
    showToast(`${m.name} added! 🛒`);
  }, [showToast]);

  const onUpdQty = useCallback((id, d) => setCart(c => c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i)), []);

  const onRemCart = useCallback((id, silent) => {
    setCart(c => c.filter(i=>i.id!==id));
  }, []);

  const onClearCart = useCallback(() => setCart([]), []);

  const onRemoveImg = useCallback((id) => {
    setMeds(prev => {
      const updated = prev.map(m => m.id===id ? {...m, img:null} : m);
      const imgMap = {};
      updated.forEach(m => { if (m.img) imgMap[m.id] = m.img; });
      lsSet("trp_med_imgs", imgMap);
      return updated;
    });
    showToast("Image removed.");
  }, [showToast]);

  const onUploadImg = useCallback((id, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => {
      const imgData = e.target.result;
      setMeds(prev => {
        const updated = prev.map(m => m.id===id ? {...m, img:imgData} : m);
        // Save all images to localStorage — {id: base64}
        const imgMap = {};
        updated.forEach(m => { if (m.img) imgMap[m.id] = m.img; });
        lsSet("trp_med_imgs", imgMap);
        return updated;
      });
    };
    r.readAsDataURL(file);
    showToast("Image uploaded! ✅");
  }, [showToast]);

  const cartCount = useMemo(() => cart.reduce((s,i)=>s+i.qty,0), [cart]);

  // Apply CSS vars to root div
  const rootStyle = useMemo(() => ({
    ...cssVars,
    fontFamily:"'Nunito','Segoe UI',sans-serif",
    background:"var(--bg)",
    color:"var(--text)",
    minHeight:"100vh",
    transition:"background .3s,color .3s",
  }), [cssVars]);

  const renderPage = () => {
    switch (page) {
      case "home":         return <HomePage        go={go} meds={meds} onAddCart={onAddCart} onToast={showToast}/>;
      case "about":        return <AboutPage        go={go}/>;
      case "medicines":    return <MedicinesPage    go={go} meds={meds} onAddCart={onAddCart} onUploadImg={onUploadImg} onRemoveImg={onRemoveImg}/>;
      case "prescription": return <PrescriptionPage go={go} onToast={showToast}/>;
      case "services":     return <ServicesPage     go={go}/>;
      case "contact":      return <ContactPage      onToast={showToast}/>;
      case "opening":      return <OpeningPage/>;
      default:             return <HomePage        go={go} meds={meds} onAddCart={onAddCart} onToast={showToast}/>;
    }
  };

  return (
    <div style={rootStyle}>
      <Nav dark={dark} setDark={setDark} page={page} go={go} cartCount={cartCount} onCartOpen={onCartOpen} onDBOpen={onDBOpen}/>

      <div className="page-content">{renderPage()}</div>

      <Footer go={go}/>

      {/* WhatsApp floating */}
      <a href="https://wa.me/916389482072?text=Hello%20TR%20Pharmacy%2C%20I%20need%20help" target="_blank" rel="noreferrer"
        title="Chat on WhatsApp"
        className="wa-fab"
        style={{ position:"fixed",bottom:24,right:24,width:54,height:54,borderRadius:27,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,.5),0 0 0 4px rgba(37,211,102,.15)",zIndex:999,animation:"waPulse 2.5s infinite",transition:"transform .2s" }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <WAIcon/>
      </a>

      {/* Bottom Nav — mobile only */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {[
            ["home","🏠","Home"],
            ["medicines","💊","Medicines"],
            ["prescription","📋","Upload Rx"],
            ["contact","📞","Contact"],
            ["opening","✅","Opening"],
          ].map(([p,ic,l]) => (
            <button key={p} onClick={()=>go(p)} className={`bnav-btn${page===p?" active":""}`}>
              <span className="icon">{ic}</span>
              <span>{l}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Toast */}
      {toast && (
        <div className="toast-pop" style={{ position:"fixed",bottom:90,right:24,background:toast.err?"#ef4444":"#059669",color:"#fff",padding:"12px 20px",borderRadius:14,fontWeight:700,fontSize:13,boxShadow:"0 6px 24px rgba(0,0,0,.25)",zIndex:1000,maxWidth:280,lineHeight:1.4,display:"flex",alignItems:"center",gap:8 }}>
          {toast.msg}
        </div>
      )}

      {/* Cart panel */}
      {cartOpen && (
        <CartPanel
          cart={cart}
          cartStep={cartStep}
          setCartStep={setCartStep}
          cartAddr={cartAddr}
          setCartAddr={setCartAddr}
          payMode={payMode}
          setPayMode={setPayMode}
          onClose={onCartClose}
          onAddCart={onAddCart}
          onUpdQty={onUpdQty}
          onRemCart={onRemCart}
          onGoPage={go}
          onToast={showToast}
        />
      )}

      {/* Submissions panel */}
      {showDB && <DBPanel onClose={onDBClose}/>}
    </div>
  );
}