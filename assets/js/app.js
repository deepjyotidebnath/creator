/* ================= EDIT YOUR DETAILS HERE ================= */
const C = {
  name: "Aarav Sen",
  niche: "Lifestyle & Tech Creator",
  tagline: "I turn everyday moments and honest product stories into content people actually watch, save and share.",
  bio: "I'm a full-time content creator based in India, making short-form video and long-form reviews across Instagram and YouTube. My audience trusts my honest takes, which is why brands see strong engagement and real conversions from our collaborations.",
  tags: ["Reels & Shorts", "Product reviews", "Brand storytelling", "UGC", "Travel", "Tech"],
  whatsapp: "919999999999",            // country code + number, no + or spaces
  email: "hello@yourname.com",
  socials: [
    {label: "Instagram", url: "https://instagram.com/yourhandle"},
    {label: "YouTube",   url: "https://youtube.com/@yourhandle"},
    {label: "LinkedIn",  url: "https://linkedin.com/in/yourhandle"},
    {label: "X",         url: "https://x.com/yourhandle"}
  ],
  stats: [["250K","Total followers"],["6.8%","Avg. engagement"],["1.2M","Monthly reach"],["45+","Brand campaigns"]],
  platforms: [["Instagram","180K followers"],["YouTube","62K subscribers"],["LinkedIn","8K followers"]],
  audience: [["Age 18–24",46],["Age 25–34",38],["India",78],["Female / Male",52]],  // label, percent
  audienceLabels: {3:"52% / 48%"},
  rates: [["Instagram Reel","from ₹25,000"],["YouTube integration","from ₹60,000"],["Story set (3 frames)","from ₹8,000"],["Product review video","from ₹45,000"],["Monthly brand ambassador","Custom"]],
  brands: ["Brand One","Brand Two","Brand Three","Brand Four","Brand Five","Brand Six"],
  works: [   // image goes in assets/images/ ; missing image shows a gradient
    {title:"Smartphone launch campaign", cat:"Reels",   img:"work-1.jpg", stat:"1.4M views"},
    {title:"Skincare 30-day challenge",  cat:"Reels",   img:"work-2.jpg", stat:"820K views"},
    {title:"Headphones honest review",   cat:"YouTube", img:"work-3.jpg", stat:"310K views"},
    {title:"Goa travel vlog",            cat:"YouTube", img:"work-4.jpg", stat:"265K views"},
    {title:"Café collab photo series",   cat:"Photos",  img:"work-5.jpg", stat:"48K saves"},
    {title:"Fitness app UGC",            cat:"UGC",     img:"work-6.jpg", stat:"12% CTR"}
  ]
};
/* ========================================================== */

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const wa = text => "https://wa.me/" + C.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");

/* --- basic content --- */
document.title = C.name + " — Creator Portfolio & Media Kit";
$("logo").textContent = C.name;
$("hName").textContent = C.name;
$("niche").textContent = C.niche;
$("tagline").textContent = C.tagline;
$("bio").textContent = C.bio;
$("tags").innerHTML = C.tags.map(t => `<li>${esc(t)}</li>`).join("");
$("initials").textContent = C.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
$("avatarImg").addEventListener("error", () => $("avatar").classList.add("noimg"));
if ($("avatarImg").complete && !$("avatarImg").naturalWidth) $("avatar").classList.add("noimg");

/* --- socials / contact --- */
const socialHTML = C.socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");
$("heroSocials").innerHTML = socialHTML;
$("footSocials").innerHTML = socialHTML;
$("waCard").href = wa("Hi " + C.name + ", I'd like to discuss a collaboration.");
$("waTxt").textContent = "+" + C.whatsapp;
$("mailCard").href = "mailto:" + C.email;
$("mailTxt").textContent = C.email;
$("fab").href = wa("Hi " + C.name + "!");
$("foot").textContent = "© " + new Date().getFullYear() + " " + C.name + ". All rights reserved.";

/* --- stats --- */
$("stats").innerHTML = C.stats.map(s => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("");

/* --- portfolio --- */
const GRADS = ["#8b5cf6,#ec4899","#06b6d4,#8b5cf6","#f59e0b,#ec4899","#10b981,#06b6d4","#ec4899,#f43f5e","#6366f1,#22d3ee"];
let cat = "All";
const cats = ["All", ...new Set(C.works.map(w => w.cat))];
function renderWorks() {
  $("filters").innerHTML = cats.map(c => `<button class="${c === cat ? "on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
  $("works").innerHTML = C.works.map((w, i) => ({w, i})).filter(o => cat === "All" || o.w.cat === cat).map(o =>
    `<article class="work" style="--g:linear-gradient(135deg,${GRADS[o.i % GRADS.length]})">
       <img src="assets/images/${esc(o.w.img)}" alt="${esc(o.w.title)}" loading="lazy" onerror="this.remove()">
       <div class="cap"><small>${esc(o.w.cat)} · ${esc(o.w.stat)}</small><b>${esc(o.w.title)}</b></div>
     </article>`).join("");
}
$("filters").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { cat = b.dataset.c; renderWorks(); } });
renderWorks();

/* --- media kit --- */
$("aud").innerHTML = C.audience.map((a, i) =>
  `<div class="bar"><div><span>${esc(a[0])}</span><b>${C.audienceLabels && C.audienceLabels[i] ? esc(C.audienceLabels[i]) : a[1] + "%"}</b></div><div class="track"><div class="fill" style="width:${a[1]}%"></div></div></div>`).join("");
const rows = arr => arr.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("");
$("plat").innerHTML = rows(C.platforms);
$("rates").innerHTML = rows(C.rates);
$("brands").innerHTML = C.brands.map(b => `<li>${esc(b)}</li>`).join("");
$("ctype").innerHTML = C.rates.map(r => `<option>${esc(r[0])}</option>`).join("") + "<option>Other</option>";
$("kitPdf").onclick = () => {
  document.body.classList.add("print-kit");
  const done = () => { document.body.classList.remove("print-kit"); window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  window.print();
};

/* --- collaboration form --- */
$("cf").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, v = n => f.elements[n].value.trim(), err = $("cerr");
  err.textContent = "";
  if (!v("name") || !v("brand") || !v("msg")) { err.textContent = "Please fill in your name, brand and campaign details."; return; }
  if (!/^\S+@\S+\.\S+$/.test(v("email"))) { err.textContent = "Please enter a valid email address."; return; }
  const body =
`Brand collaboration inquiry

Name: ${v("name")}
Brand: ${v("brand")}
Email: ${v("email")}
Phone: ${v("phone") || "-"}
Type: ${v("type")}
Budget: ${v("budget")}
Timeline: ${v("timeline") || "-"}

Details:
${v("msg")}`;
  if (e.submitter && e.submitter.value === "wa") window.open(wa(body), "_blank");
  else location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Collaboration inquiry — " + v("brand")) + "&body=" + encodeURIComponent(body);
});

/* --- mobile menu --- */
$("burger").onclick = () => { const o = $("nav").classList.toggle("open"); $("burger").setAttribute("aria-expanded", o); };
$("nav").addEventListener("click", e => { if (e.target.tagName === "A") { $("nav").classList.remove("open"); $("burger").setAttribute("aria-expanded", false); } });
