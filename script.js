// ===== STRUCT: Produk (objek beku dengan field tetap) =====
const Produk=(id,nama,kat,harga,stok,rating,emoji,ulasan=0,terjual=0)=>Object.freeze({id,nama,kat,harga,stok,rating,emoji,ulasan,terjual});
// ===== ULASAN & TERJUAL per produk: id -> [jumlah ulasan awal, jumlah terjual]. GANTI dengan angka asli tokomu =====
const STAT={1:[124,410],2:[98,340],3:[76,215],4:[41,118],5:[63,170],6:[34,96],7:[52,143],8:[21,64],9:[67,192],10:[38,121],11:[45,130],12:[39,112],13:[58,205],14:[81,260],15:[47,158],16:[69,188],17:[36,133],18:[29,94],19:[33,107],20:[22,71],21:[48,126],22:[55,149],23:[43,117],24:[18,57],25:[24,73],26:[12,38],27:[31,99],28:[26,82],29:[19,54],30:[28,91],31:[23,88],32:[72,205]};
const fmtN=n=>n>=1000?(n/1000).toFixed(1).replace(".",",").replace(",0","")+"rb":String(n);
// Ulasan yang ditulis pembeli disimpan di browser (kunci "vc_reviews"). rstat = rating & jumlah ulasan gabungan (ulasan awal + ulasan pembeli)
const revAll=()=>{try{const v=JSON.parse(localStorage.getItem("vc_reviews"));return Array.isArray(v)?v:[]}catch(e){return[]}};
const rstat=o=>{const m=revAll().filter(r=>r.pid===o.id),n=o.ulasan+m.length;if(!n)return{n:0,avg:o.rating,m};return{n,avg:Math.round((o.rating*o.ulasan+m.reduce((t,r)=>t+r.s,0))/n*10)/10,m}};
const rlabel=o=>{const r=rstat(o);return`${r.avg.toFixed(1)} (${r.n} ulasan)`};
// ===== HEAP: alamat -> struct. POINTER = alamat (angka) =====
const heap=new Map();
const deref=p=>heap.get(p);              // *ptr
const hex=a=>"0x"+a.toString(16).toUpperCase();
const rp=n=>"Rp"+n.toLocaleString("id-ID");
// Gambar produk: kalau isi kolom terakhir berupa nama file gambar (mis. "gambarvell/kucing.jfif") tampil sebagai foto, kalau bukan maka tampil sebagai emoji
const isImg=e=>/\.(jpe?g|jfif|png|webp|gif|avif)$/i.test(String(e));
const pv=(e,alt)=>isImg(e)?`<img src="${e}" alt="${String(alt||"").replace(/"/g,"&quot;")}" loading="lazy">`:e;
// ===== WHATSAPP: isi nomor penjual (format 62..., tanpa + atau 0). Kosong = pengguna pilih kontak sendiri =====
const WA_NUMBER="6285286242430";
// ===== QRIS: nama file gambar QRIS di folder gambarvell (ganti kalau nama/format filenya beda) =====
const QRIS_IMG="gambarvell/qris.jfif";
function waLink(o){
 const t=o?`Halo VELLCROCHET, saya mau tanya soal produk ini:\n\n*${o.nama}*\nKategori: ${o.kat}\nHarga: ${rp(o.harga)}\nStok: ${o.stok}\n\nApakah masih tersedia? Terima kasih.`:"Halo VELLCROCHET, saya mau tanya soal produk rajutannya.";
 return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(t);
}
const data=[
[1,"Gantungan Kunci Kucing","Ganci",25000,30,4.8,"gambarvell/kucing.jpg"],
[2,"Gantungan Kunci Strawberry","Ganci",18000,45,4.7,"gambarvell/stroberi.jfif"],
[3,"Boneka Kelinci","Boneka",85000,12,4.9,"gambarvell/kelinci.jfif"],
[4,"Boneka Dinosaurus","Boneka",95000,9,4.6,"gambarvell/dino.jpg"],
[5,"Boneka Beruang","Boneka",120000,8,4.9,"gambarvell/beruang.jfif"],
[6,"Boneka Bunga Matahari","Boneka",65000,15,4.5,"gambarvell/bunga.jfif"],
[7,"Cardigan Rajut Wanita","Baju",250000,6,4.8,"gambarvell/cardi.jfif"],
[8,"Rompi Rajut Anak","Baju",135000,10,4.4,"gambarvell/vest.jfif"],
[9,"Dompet Koin Rajut","Lainnya",45000,25,4.7,"gambarvell/koin.jfif"],
[10,"Dompet Kartu Mini","Lainnya",35000,28,4.3,"gambarvell/kartu.jfif"],
[11,"Tas Tote Rajut","Lainnya",175000,7,4.8,"gambarvell/bag.jfif"],
[12,"Topi Beanie Rajut","Lainnya",70000,14,4.6,"gambarvell/topi.jfif"],
[13,"Gantungan Kunci Tulip","Ganci",20000,40,4.6,"gambarvell/tulip.jfif"],
[14,"Gantungan Kunci Panda","Ganci",28000,22,4.8,"gambarvell/panda.jfif"],
[15,"Gantungan Kunci Anak Ayam","Ganci",22000,35,4.5,"gambarvell/piyik.jfif"],
[16,"Boneka Kucing Oren","Boneka",90000,10,4.8,"gambarvell/cuking.jfif"],
[17,"Gantungan Kunci Mini Octopus","Ganci",18000,14,4.7,"gambarvell/octo.jfif"],
[18,"Gantungan Kunci Penguin","Ganci",28000,11,4.6,"gambarvell/penguin.jfif"],
[19,"Gantungan Kunci Bebek","Ganci",25000,16,4.5,"gambarvell/bebek.jfif"],
[20,"Boneka Kodok","Boneka",70000,13,4.4,"gambarvell/kodok.jfif"],
[21,"Boneka Domba","Boneka",110000,7,4.9,"gambarvell/domba.jfif"],
[22,"Boneka Panda","Boneka",115000,9,4.7,"gambarvell/ppanda.jfif"],
[23,"Boneka Unicorn","Boneka",130000,6,4.8,"gambarvell/unic.jfif"],
[24,"Sweater Rajut Pria","Baju",220000,8,4.6,"gambarvell/swett.jfif"],
[25,"Crop Top Rajut","Baju",120000,12,4.5,"gambarvell/crop.jfif"],
[26,"Rok Rajut Panjang","Baju",150000,7,4.4,"gambarvell/rok.jpg"],
[27,"Syal Rajut","Lainnya",85000,18,4.7,"gambarvell/syal.jfif"],
[28,"Sarung Tangan Rajut","Lainnya",60000,20,4.5,"gambarvell/paw.jfif"],
[29,"Tas Ransel Mini Rajut","Lainnya",195000,5,4.7,"gambarvell/tas.jfif"],
[30,"Bucket Hat Rajut","Lainnya",80000,15,4.6,"gambarvell/hat.jfif"],
[31,"Kaos Kaki Rajut","Lainnya",40000,25,4.3,"gambarvell/kaki.jfif"],
[32,"Buket Bunga Rajut","Lainnya",95000,10,4.9,"gambarvell/buket.jpg"]];
// ===== ARRAY: daftar pointer ke struct =====
let daftar=[];
data.forEach((r,i)=>{const a=0x1000+i*0x40;heap.set(a,Produk(...r,...(STAT[r[0]]||[0,0])));daftar.push(a)});
const asli=[...daftar];
let kat="Semua",hasil=null,keranjang=[]; // keranjang: array of {ptr,qty}

// ---------- FILTER (panel samping) ----------
const FG=[["harga","Harga",["Semua","Di bawah Rp50.000","Rp50.000 – Rp100.000","Rp100.000 – Rp200.000","Di atas Rp200.000"]],["rating","Rating",["Semua","★ 4.5 ke atas","★ 4.8 ke atas"]],["stok","Stok",["Semua","Stok terbatas (maks. 10)"]]];
const HR=[[0,Infinity],[0,49999],[50000,100000],[100001,200000],[200001,Infinity]],RT=[0,4.5,4.8];
let F={harga:0,rating:0,stok:0};
const passF=o=>o.harga>=HR[F.harga][0]&&o.harga<=HR[F.harga][1]&&o.rating>=RT[F.rating]&&(!F.stok||o.stok<=10);
function drawF(){
 document.getElementById("fgroups").innerHTML=FG.map(([k,t,o])=>`<div class="fg"><strong>${t}</strong><div class="chips">${o.map((x,i)=>`<button class="chip" aria-pressed="${F[k]===i}" data-f="${k}" data-i="${i}">${x}</button>`).join("")}</div></div>`).join("");
 const n=Object.values(F).filter(v=>v).length;
 document.getElementById("openF").textContent="☰ Filter ("+n+")";document.getElementById("clearF").hidden=!n;
}

// ---------- SORTING ----------
const keys={hargaA:p=>deref(p).harga,hargaD:p=>-deref(p).harga,nama:p=>deref(p).nama.toLowerCase(),rating:p=>-deref(p).rating};
const lbl={hargaA:"harga naik",hargaD:"harga turun",nama:"nama A–Z",rating:"rating tertinggi"};
function runSort(algo,key){
 const L=[],a=[...daftar],k=keys[key];let c=0,s=0;
 const n=i=>deref(a[i]).nama;
 const gt=(i,j)=>{c++;const r=k(a[i])>k(a[j]);L.push(`<span>#${String(c).padStart(3,"0")} bandingkan [${i}] ${n(i)} (${k(a[i])}) dengan [${j}] ${n(j)} (${k(a[j])}) → ${r?"<span class='bad'>tukar</span>":"<span class='ok'>tetap</span>"}</span>`);return r};
 const sw=(i,j)=>{[a[i],a[j]]=[a[j],a[i]];s++};
 L.push(`<span class="hd">${algo.toUpperCase()} SORT · kunci: ${lbl[key]} · n = ${a.length}</span>`);
 if(algo==="bubble"){for(let i=0;i<a.length-1;i++){L.push(`<span class="hd">-- Putaran ${i+1}</span>`);let t=false;for(let j=0;j<a.length-1-i;j++)if(gt(j,j+1)){sw(j,j+1);t=true}if(!t){L.push("Tidak ada pertukaran, selesai lebih awal.");break}}}
 else if(algo==="selection"){for(let i=0;i<a.length-1;i++){let m=i;L.push(`<span class="hd">-- Cari terkecil mulai indeks ${i}</span>`);for(let j=i+1;j<a.length;j++)if(gt(m,j))m=j;if(m!==i){sw(i,m);L.push(`  tukar indeks ${i} ↔ ${m}`)}}}
 else{for(let i=1;i<a.length;i++){L.push(`<span class="hd">-- Sisipkan indeks ${i}</span>`);let j=i;while(j>0&&gt(j-1,j)){sw(j-1,j);j--}}}
 L.push(`<span class="hd">Selesai: ${c} perbandingan, ${s} pertukaran pointer.</span>`);
 daftar=a;logTo("lsort",L);
}
function logTo(id,L){const e=document.getElementById(id);e.innerHTML=L.join("\n");e.scrollTop=0}

// ---------- SEARCHING ----------
function runSearch(q,mode){
 q=q.trim().toLowerCase();
 if(!q){hasil=null;document.getElementById("lsearch").textContent="Ketik di kolom pencarian untuk melihat log.";return}
 const L=[],h=new Set();
 if(mode==="linear"){
  L.push(`<span class="hd">LINEAR SEARCH · kata kunci: "${q}" · cek nama dan kategori</span>`);
  daftar.forEach((p,i)=>{const o=deref(p),ok=(o.nama+" "+o.kat).toLowerCase().includes(q);if(ok)h.add(p);L.push(`[${i}] ${hex(p)} ${o.nama} → ${ok?"<span class='ok'>cocok</span>":"<span class='bad'>tidak</span>"}`)});
  L.push(`<span class="hd">Selesai: ${daftar.length} pengecekan, ${h.size} cocok.</span>`);
 }else{
  const a=[...daftar].sort((x,y)=>deref(x).nama.localeCompare(deref(y).nama,"id"));
  L.push(`<span class="hd">BINARY SEARCH · awalan nama: "${q}"</span>`,"Syarat: data harus terurut. Array pointer diurutkan sementara berdasarkan nama.");
  let lo=0,hi=a.length,step=0;
  while(lo<hi){const m=(lo+hi)>>1,nm=deref(a[m]).nama.toLowerCase();step++;const less=nm<q;L.push(`langkah ${step}: lo=${lo}, hi=${hi}, mid=${m} (${deref(a[m]).nama}) → ${less?"nama < kata kunci, geser lo ke "+(m+1):"nama ≥ kata kunci, geser hi ke "+m}`);if(less)lo=m+1;else hi=m}
  L.push(`Batas bawah ditemukan di indeks ${lo}. Pindai ke kanan selama awalan cocok:`);
  for(let i=lo;i<a.length&&deref(a[i]).nama.toLowerCase().startsWith(q);i++){h.add(a[i]);L.push(`  [${i}] ${deref(a[i]).nama} → <span class='ok'>cocok</span>`)}
  L.push(`<span class="hd">Selesai: ${step} langkah biner, ${h.size} cocok.${h.size?"":" Coba kata awalan seperti Boneka atau Dompet."}</span>`);
 }
 hasil=h;logTo("lsearch",L);
}

// ---------- RENDER ----------
function render(){
 const cats=["Semua",...new Set(asli.map(p=>deref(p).kat))];
 document.getElementById("chips").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===kat}" data-c="${c}">${c}</button>`).join("");
 const list=daftar.filter(p=>(kat==="Semua"||deref(p).kat===kat)&&(!hasil||hasil.has(p))&&passF(deref(p)));
 document.getElementById("count").textContent=list.length+" Produk";document.getElementById("fshow").textContent="Tunjukkan "+list.length+" Produk";drawF();
 document.getElementById("grid").innerHTML=list.length?list.map(p=>{const o=deref(p);return `<article class="card"><div class="pic" data-k="${o.kat}" data-pd="${p}">${pv(o.emoji,o.nama)}</div><h3 data-pd="${p}">${o.nama}</h3><span class="meta">${o.kat} · ★ ${rlabel(o)}<br>Terjual ${fmtN(o.terjual)} · stok ${o.stok}</span><span class="price">${rp(o.harga)}</span><span class="ptr">ptr ${hex(p)}</span><div class="acts"><button class="btn" data-add="${p}">🛒 Tambah</button><a class="btn alt" target="_blank" rel="noopener" href="${waLink(o)}">💬 Tanya Penjual</a></div></article>`}).join(""):`<div class="empty">Tidak ada produk yang cocok. Hapus kata kunci atau pilih kategori Semua.</div>`;
 document.getElementById("arr").innerHTML=daftar.map((p,i)=>`daftar[${i}] = ${hex(p)}  → ${deref(p).nama}`).join("\n");
 document.getElementById("heap").innerHTML=[...heap].map(([a,o])=>`<tr><td>${hex(a)}</td><td>${o.id}</td><td>${o.nama}</td><td>${o.kat}</td><td>${rp(o.harga)}</td><td>${o.stok}</td><td>${o.rating}</td></tr>`).join("");
 renderCart();
}
function renderCart(){
 const sel=keranjang.filter(x=>x.sel),all=keranjang.length>0&&sel.length===keranjang.length;
 $("cnt").textContent=keranjang.reduce((s,x)=>s+x.qty,0);
 $("total").textContent=rp(sel.reduce((s,x)=>s+deref(x.ptr).harga*x.qty,0));
 $("selN").textContent=sel.length;$("cAllN").textContent=keranjang.length;
 $("chkAll").checked=$("chkAll2").checked=all;$("chkAll").disabled=$("chkAll2").disabled=!keranjang.length;
 $("checkout").disabled=!sel.length;
 $("items").innerHTML=keranjang.length?keranjang.map((x,i)=>{const o=deref(x.ptr);return `<div class="crow"><label class="ck"><input type="checkbox" data-sel="${i}" ${x.sel?"checked":""} aria-label="Pilih ${o.nama}"></label><div class="cprod"><div class="pic cpic" data-k="${o.kat}">${pv(o.emoji,o.nama)}</div><div><strong>${o.nama}</strong><span class="meta">${o.kat} · stok ${o.stok}</span></div></div><span class="c-h">${rp(o.harga)}</span><div class="c-q"><span class="cqty"><button data-m="${i}" aria-label="Kurangi">−</button><span>${x.qty}</span><button data-p="${i}" aria-label="Tambah">+</button></span></div><span class="c-t">${rp(o.harga*x.qty)}</span><div class="c-a"><button class="link" data-del="${i}">Hapus</button></div></div>`}).join(""):`<div class="cempty"><span>Keranjang masih kosong. Tambahkan produk dari daftar.</span><button class="btn" data-go>Mulai belanja</button></div>`;
}

// ---------- EVENTS ----------
const $=id=>document.getElementById(id);
const doSort=()=>{const k=$("sortkey").value;if(!k){daftar=[...asli];logTo("lsort",["Urutan dikembalikan ke bawaan (tanpa sorting)."])}else runSort($("salgo").value,k);render()};
$("sortkey").onchange=doSort;$("salgo").onchange=()=>{if($("sortkey").value)doSort()};
$("q").oninput=()=>{runSearch($("q").value,$("smode").value);render()};
$("smode").onchange=()=>{runSearch($("q").value,$("smode").value);render()};
$("chips").onclick=e=>{const c=e.target.dataset.c;if(c){kat=c;render()}};
$("grid").onclick=e=>{const p=e.target.dataset.add;if(!p)return;if(!needAcct())return;const ptr=+p,x=keranjang.find(k=>k.ptr===ptr),o=deref(ptr);if(x){if(x.qty<o.stok){x.qty++;toast("Ditambahkan ke keranjang: "+o.nama)}else toast("Stok hanya "+o.stok)}else{keranjang.push({ptr,qty:1,sel:false});toast("Ditambahkan ke keranjang: "+o.nama)}renderCart()};
$("items").onclick=e=>{const d=e.target.dataset;
 if(d.p!==undefined){const x=keranjang[+d.p],st=deref(x.ptr).stok;if(x.qty<st)x.qty++;else toast("Stok hanya "+st)}
 else if(d.m!==undefined){const x=keranjang[+d.m];if(x.qty>1)x.qty--}
 else if(d.del!==undefined)keranjang.splice(+d.del,1);
 else if(d.go!==undefined)$("cart").classList.remove("open");
 else return;
 renderCart()};
$("items").onchange=e=>{const d=e.target.dataset;
 if(d.sel!==undefined)keranjang[+d.sel].sel=e.target.checked;
 else if(d.all!==undefined)keranjang.forEach(x=>x.sel=e.target.checked);
 else return;
 renderCart()};
$("chkAll").onchange=$("chkAll2").onchange=e=>{keranjang.forEach(x=>x.sel=e.target.checked);renderCart()};
$("delSel").onclick=()=>{if(!keranjang.some(x=>x.sel)){toast("Pilih produk yang mau dihapus.");return}keranjang=keranjang.filter(x=>!x.sel);renderCart()};
$("openCart").onclick=()=>{if(needAcct())$("cart").classList.add("open")};
$("closeCart").onclick=()=>$("cart").classList.remove("open");

$("checkout").onclick=()=>{const S=keranjang.filter(x=>x.sel);if(!S.length){toast("Pilih dulu produk yang mau dibeli.");return}if(!needAcct())return;
 const t=S.reduce((s,x)=>s+deref(x.ptr).harga*x.qty,0);
 $("cosum").textContent=S.reduce((s,x)=>s+x.qty,0)+" barang · Total "+rp(t);
 if(!$("nama").value&&user)$("nama").value=user.nama;prefillCheckout();
 drawPay();$("coErr").textContent="";$("co").classList.add("open")};
const setTheme=t=>{document.documentElement.dataset.theme=t;$("theme").textContent=t==="dark"?"☀️ Mode":"🌙 Mode";$("theme").setAttribute("aria-pressed",t==="dark");};
let dipilih=false;
$("theme").onclick=()=>{dipilih=true;setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark")};
setTheme("light");
// Kunci tampilan terang: kalau ada yang mengubah tema sebelum pengguna menekan tombol, kembalikan ke terang
new MutationObserver(()=>{if(!dipilih&&document.documentElement.dataset.theme!=="light")setTheme("light")}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
render();

// ---------- ULASAN PEMBELI ----------
// Ulasan awal di bawah ini adalah CONTOH (dibuat otomatis, selalu sama untuk tiap produk). Ulasan dari pembeli sungguhan ditulis lewat formulir
// dan hanya bisa dikirim kalau pesanan berisi produk itu sudah berstatus "Selesai · diterima".
const REV_NAMA=["Dewi","Rina","Ayu","Siti","Nanda","Putri","Salsa","Intan","Citra","Maya","Fitri","Lestari","Wulan","Bagas","Dimas","Rizky","Fajar","Andi","Kevin","Aldo","Nabila","Alya","Tiara","Mega","Vina","Rara","Yuni","Eka","Dina","Tasya"];
const REV_TXT={
 Ganci:["Lucu banget, rajutannya rapi dan kuat!","Dipasang di tas langsung banyak yang nanya belinya di mana.","Warnanya cantik sesuai foto, cocok buat hadiah.","Jahitannya halus dan gantungannya kokoh.","Gemes banget! Ukurannya pas, nggak kekecilan."],
 Boneka:["Bonekanya lembut dan gemes, hasil rajutannya rapi banget.","Dikasih ke adik dan dia suka banget, nggak mau lepas.","Detail wajahnya bagus, kelihatan dikerjakan dengan telaten.","Isiannya padat dan empuk, pas buat dipeluk.","Cocok banget buat hadiah ulang tahun, penerimanya senang."],
 Baju:["Rajutannya rapi, bahannya nyaman dipakai dan nggak gatal.","Ukurannya pas dan modelnya bagus, banyak yang muji.","Benangnya halus, hangat, dan warnanya cantik.","Hasil rajutannya rapi, jahitan nggak ada yang bolong.","Modelnya cantik, cocok dipakai santai maupun jalan-jalan."],
 Lainnya:["Rajutannya rapi dan kuat, kelihatan awet dipakai.","Bagus banget, dipakai sehari-hari makin sayang.","Warna sesuai foto dan bahannya enak dipegang.","Ukurannya pas dan jahitannya halus.","Cantik banget, banyak teman yang nanya belinya di mana."]
};
const REV_BAGUS=["Pengiriman cepat, packing rapi.","Seller ramah dan fast respon.","Pasti beli lagi!","Sesuai deskripsi, puas banget.","Dikerjakan tepat waktu, nggak nunggu lama.","Terima kasih kak, recommended!"];
const REV_CUKUP=["Hasilnya bagus, tapi pengerjaan sedikit lebih lama dari estimasi.","Ukurannya agak lebih kecil dari bayanganku, tapi tetap rapi.","Warnanya sedikit beda dari foto, tapi overall oke."];
const REV_KURANG=["Pengerjaannya molor beberapa hari, semoga ke depannya lebih cepat.","Ada sedikit benang yang longgar, tapi seller sigap menanggapi."];
const REV_LABEL=["","Buruk","Kurang","Cukup","Bagus","Sangat bagus"];
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const revProb=r=>{const d=Math.max(0,5-r),p1=.01*d,p2=.04*d,p3=.15*d,p4=.5*d;return[p1,p2,p3,p4,1-p1-p2-p3-p4]}; // peluang bintang 1..5 sesuai rating
const mask=n=>{n=String(n||"?").trim()||"?";return n.length<2?n.toLowerCase()+"***":n[0].toLowerCase()+"***"+n[n.length-1].toLowerCase()};
const bintang=n=>"★".repeat(n)+"☆".repeat(5-n);
const tglID=t=>new Date(t).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"});
function makeRev(o,i){
 const r=rng(o.id*1009+i*7919),p=revProb(o.rating);let x=r(),s=1,c=0;
 for(;s<5;s++){c+=p[s-1];if(x<c)break}
 const pick=a=>a[Math.floor(r()*a.length)];
 let txt;
 if(s>=4){txt=pick(REV_TXT[o.kat]||REV_TXT.Lainnya);if(r()<.6)txt+=" "+pick(REV_BAGUS)}
 else if(s===3)txt=pick(REV_CUKUP);else txt=pick(REV_KURANG);
 const n=pick(REV_NAMA),hari=Math.round(i*150/Math.max(o.ulasan,1)+r()*3);
 return{nama:n,s,txt,at:Date.now()-hari*864e5};
}
// ---- Media ulasan (foto/video) disimpan di IndexedDB karena terlalu besar untuk localStorage ----
const MDB={_d:null,
 open(){return this._d||(this._d=new Promise((ok,no)=>{try{const q=indexedDB.open("vc_media",1);q.onupgradeneeded=()=>q.result.createObjectStore("m");q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)}catch(e){no(e)}}))},
 async tx(mode,fn){const d=await this.open();return new Promise((ok,no)=>{const t=d.transaction("m",mode),r=fn(t.objectStore("m"));t.oncomplete=()=>ok(r&&r.result);t.onerror=t.onabort=()=>no(t.error)})},
 put(id,b){return this.tx("readwrite",s=>s.put(b,id))},
 get(id){return this.tx("readonly",s=>s.get(id))},
 del(id){return this.tx("readwrite",s=>s.delete(id))}};
const MURL=new Map();
async function mediaUrl(id){if(MURL.has(id))return MURL.get(id);const b=await MDB.get(id);if(!b)return"";const u=URL.createObjectURL(b);MURL.set(id,u);return u}
function dropUrl(id){const u=MURL.get(id);if(u)URL.revokeObjectURL(u);MURL.delete(id)}
function hydrate(root){root.querySelectorAll("[data-mid]").forEach(async el=>{try{const u=await mediaUrl(el.dataset.mid);if(u)el.src=u;else{const w=el.closest(".mi");if(w)w.remove()}}catch(e){}})}

function revItem(v,own,id){
 const md=(v.media||[]).map(m=>m.t==="vid"?`<span class="mi"><video data-mid="${esc(m.id)}" controls preload="metadata"></video></span>`:`<span class="mi"><img data-mid="${esc(m.id)}" alt="Foto ulasan"></span>`).join("");
 return `<article class="rev${own?" mine":""}"><div class="revav" aria-hidden="true">${esc(String(v.nama).trim()[0]||"?")}</div><div class="revbody"><div class="revhead"><strong>${mask(v.nama)}</strong><span class="revstars" aria-label="${v.s} dari 5 bintang">${bintang(v.s)}</span>${own?'<span class="revbadge">Ulasanmu</span>':""}</div><span class="meta">${tglID(v.at)}${v.ed?" · diedit":""}</span><p>${esc(v.txt)}</p>${md?`<div class="revmedia">${md}</div>`:""}${own?`<div class="revacts"><button class="link revedit" type="button" data-edit="${id}">✏️ Edit ulasan</button><button class="link revedit" type="button" data-rdel="${id}">🗑️ Hapus ulasan</button></div>`:""}</div></article>`;
}
let revO=null;
// Ulasan milik pengguna yang sedang masuk ditaruh paling atas
function revList(o){const me=user&&user.email;return rstat(o).m.slice().sort((a,b)=>(b.em===me)-(a.em===me))}
function revAt(o,i,m){
 if(i<m.length){const r=m[i];return revItem({nama:r.nama,s:r.s,txt:r.txt,at:r.at,media:r.media,ed:r.ed},!!user&&r.em===user.email,r.id)}
 return revItem(makeRev(o,i-m.length),false)}
function paintMeta(o){
 $("pdmeta").textContent=`★ ${rlabel(o)} · Terjual ${fmtN(o.terjual)} · stok ${o.stok}`;
 $("pdrating").textContent=rlabel(o);
}
const GEN=new Map();
function genStars(o){if(!GEN.has(o.id)){const a=[];for(let i=0;i<o.ulasan;i++)a.push(makeRev(o,i).s);GEN.set(o.id,a)}return GEN.get(o.id)}
function rpItems(o,m){const a=[];m.forEach((r,i)=>a.push({i,s:r.s,med:!!(r.media&&r.media.length)}));genStars(o).forEach((s,i)=>a.push({i:m.length+i,s,med:false}));return a}
function rsumHtml(o,r){
 const cnt=[0,0,0,0,0];rpItems(o,r.m).forEach(x=>cnt[x.s-1]++);
 const bars=[5,4,3,2,1].map(k=>`<div class="revbar"><span>${k} ★</span><i><b style="width:${r.n?Math.round(cnt[k-1]/r.n*100):0}%"></b></i><span>${cnt[k-1]}</span></div>`).join("");
 return r.n?`<div class="revsum"><div class="revbig"><strong>${r.avg.toFixed(1)}</strong><span class="revstars">${bintang(Math.round(r.avg))}</span><span>${r.n} ulasan</span></div><div class="revbars">${bars}</div></div>`:'<p class="meta">Belum ada ulasan untuk produk ini.</p>';
}
// Halaman produk: hanya 3 ulasan pertama; sisanya di halaman ulasan tersendiri
const REV_PREVIEW=3,RP_PAGE=10;
function renderRev(o){
 revO=o;const box=$("pdrev");if(!box)return;const r=rstat(o),m=revList(o),k=Math.min(REV_PREVIEW,r.n);let items="";
 for(let i=0;i<k;i++)items+=revAt(o,i,m);
 box.innerHTML=rsumHtml(o,r)+`<div id="revlist">${items}</div>`+(r.n>REV_PREVIEW?`<button class="btn" id="revmore" type="button">Lihat lebih banyak (${r.n-REV_PREVIEW} lagi)</button>`:"");
 hydrate(box);
}
// ---- Halaman semua ulasan ----
let rpN=0,rpF="all",rpL=[];
function rpChips(all){
 const n=k=>all.filter(x=>k==="media"?x.med:k==="all"?true:x.s===k).length;
 const D=[["all","Semua"],[5,"5 Bintang"],[4,"4 Bintang"],[3,"3 Bintang"],[2,"2 Bintang"],[1,"1 Bintang"],["media","Dengan Foto/Video"]];
 return `<div class="rvfil" id="rpfil">${D.map(([k,t])=>`<button type="button" data-rf="${k}" aria-pressed="${String(rpF)===String(k)}">${t}${k==="all"?"":" ("+n(k)+")"}</button>`).join("")}</div>`}
function drawRp(keep){
 const o=revO;if(!o)return;const r=rstat(o),m=revList(o),all=rpItems(o,m);
 rpL=all.filter(x=>rpF==="all"?true:rpF==="media"?x.med:x.s===rpF);
 $("rptitle").textContent="Ulasan Pembeli";$("rpcrumb").textContent=`Beranda / ${o.kat} / ${o.nama}`;
 $("rpsum").innerHTML=rsumHtml(o,r)+rpChips(all);$("rplist").innerHTML="";rpN=0;rpMore(keep||RP_PAGE);
}
function rpMore(cnt){
 const o=revO,m=revList(o),n=rpL.length,end=Math.min(n,rpN+(cnt||RP_PAGE));let h="";
 for(let i=rpN;i<end;i++)h+=revAt(o,rpL[i].i,m);
 if(!n)h='<p class="meta" style="padding:14px 0">Belum ada ulasan untuk filter ini.</p>';
 $("rplist").insertAdjacentHTML("beforeend",h);hydrate($("rplist"));rpN=end;
 $("rpmore").hidden=rpN>=n;$("rpmore").textContent=`Muat ${Math.min(RP_PAGE,n-rpN)} ulasan lagi (${n-rpN} tersisa)`;
}
$("rpsum").addEventListener("click",e=>{const b=e.target.closest("[data-rf]");if(!b)return;const v=b.dataset.rf;rpF=v==="all"||v==="media"?v:+v;drawRp()});
function openRp(){if(!revO)return;rpF="all";drawRp();$("rvpage").classList.add("open");$("rvpage").scrollTop=0}
function closeRp(){$("rvpage").classList.remove("open")}
function refreshRev(){try{if(!revO)return;renderRev(revO);paintMeta(revO);if($("rvpage").classList.contains("open"))drawRp(rpN)}catch(e){}}
function revClick(e){
 const img=e.target.closest(".revmedia img");if(img){img.classList.toggle("big");return}
 const t=e.target.closest("button");if(!t)return;
 if(t.id==="revmore")openRp();
 else if(t.dataset.edit&&user){const r=revAll().find(x=>x.id===t.dataset.edit&&x.em===user.email);if(r)openRvForm(r.pid,r.oid)}
 else if(t.dataset.rdel&&user)delRev(t.dataset.rdel);
}
async function delRev(id){
 const r=revAll().find(x=>x.id===id&&x.em===user.email);if(!r||!confirm("Hapus ulasanmu?"))return;
 for(const m of (r.media||[])){try{await MDB.del(m.id)}catch(e){}dropUrl(m.id)}
 LS.set("vc_reviews",revAll().filter(x=>x.id!==id));
 renderOrders();refreshRev();render();toast("Ulasan dihapus.");
}
if($("pdrev"))$("pdrev").addEventListener("click",revClick);
$("rplist").addEventListener("click",revClick);
$("rpmore").onclick=()=>rpMore();
$("rpback").onclick=closeRp;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("rvModal").classList.contains("open")){e.stopImmediatePropagation();closeRv();return}
 if(e.key==="Escape"&&$("rvpage").classList.contains("open")&&!$("orders").classList.contains("open")){e.stopImmediatePropagation();closeRp()}},true);

// ---- Formulir ulasan (tulis baru / edit), dibuka dari tombol "Ulas Produk" di menu Pesanan ----
let rv=null;
const REV_MAXFILE=5,REV_MAXVID=15*1048576;
function shrink(f){return new Promise((ok,no)=>{const u=URL.createObjectURL(f),im=new Image();
 im.onload=()=>{const M=1000,k=Math.min(1,M/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));
  const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?ok(b):no(new Error("blob")),"image/jpeg",.82)};
 im.onerror=()=>{URL.revokeObjectURL(u);no(new Error("img"))};im.src=u})}
function rvPaint(){
 if(!rv)return;
 document.querySelectorAll("#rvStars [data-star]").forEach(b=>{const on=+b.dataset.star<=rv.star;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
 $("rvLab").textContent=REV_LABEL[rv.star]||"";
 $("rvMedia").innerHTML=rv.media.map((m,i)=>`<div class="rvthumb">${!m.url?'<span class="rvph">…</span>':m.t==="vid"?`<video src="${m.url}" muted preload="metadata"></video><span class="rvplay">▶</span>`:`<img src="${m.url}" alt="">`}<button type="button" data-rm="${i}" aria-label="Hapus file ini">✕</button></div>`).join("")+(rv.media.length<REV_MAXFILE?'<button type="button" class="rvadd" data-addf="1"><b>＋</b><span>Foto / Video</span></button>':"");
}
function openRvForm(pid,oid){
 if(!user)return;const o=[...heap.values()].find(x=>x.id===pid);if(!o)return;
 const rec=revAll().find(r=>r.oid===oid&&r.pid===pid&&r.em===user.email)||null;
 rv={o,oid,rec,star:rec?rec.s:0,media:((rec&&rec.media)||[]).map(m=>({id:m.id,t:m.t,url:"",isNew:false})),gone:[]};
 const cur=rv;
 $("rvTitle").textContent=rec?"Edit Ulasan":"Tulis Ulasan";$("rvSub").innerHTML=`Pesanan <strong>${esc(oid)}</strong> · ${esc(o.nama)}`;
 $("rvTxt").value=rec?rec.txt:"";$("rvErr").textContent="";$("rvSend").disabled=false;$("rvSend").textContent=rec?"Simpan Perubahan":"Kirim Ulasan";
 rvPaint();$("rvModal").classList.add("open");
 cur.media.forEach(async m=>{try{const u=await mediaUrl(m.id);if(rv===cur){m.url=u;rvPaint()}}catch(e){}});
}
function closeRv(){if(rv)rv.media.forEach(m=>{if(m.isNew&&m.url)URL.revokeObjectURL(m.url)});rv=null;$("rvModal").classList.remove("open")}
$("rvx").onclick=closeRv;
$("rvStars").addEventListener("click",e=>{const b=e.target.closest("[data-star]");if(b&&rv){rv.star=+b.dataset.star;rvPaint()}});
$("rvMedia").addEventListener("click",e=>{
 if(!rv)return;
 if(e.target.closest("[data-addf]")){$("rvFile").click();return}
 const b=e.target.closest("[data-rm]");if(!b)return;
 const m=rv.media.splice(+b.dataset.rm,1)[0];if(!m)return;
 if(m.isNew){if(m.url)URL.revokeObjectURL(m.url)}else rv.gone.push(m.id);
 rvPaint()});
$("rvFile").onchange=async()=>{
 const fs=[...$("rvFile").files],cur=rv;$("rvFile").value="";if(!cur)return;
 for(const f of fs){
  if(cur.media.length>=REV_MAXFILE){toast("Maksimal "+REV_MAXFILE+" foto/video.");break}
  try{
   const id="M"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
   if(f.type.startsWith("image/")){const b=await shrink(f);cur.media.push({id,t:"img",blob:b,url:URL.createObjectURL(b),isNew:true})}
   else if(f.type.startsWith("video/")){if(f.size>REV_MAXVID){toast("Video maksimal 15 MB.");continue}cur.media.push({id,t:"vid",blob:f,url:URL.createObjectURL(f),isNew:true})}
   else toast("Hanya foto atau video yang bisa dilampirkan.");
  }catch(err){toast("File tidak bisa dibaca.")}
 }
 if(rv===cur)rvPaint()};
$("rvSend").onclick=async()=>{
 if(!rv||!user)return;const cur=rv,err=$("rvErr");err.textContent="";
 const t=$("rvTxt").value.trim();
 if(!cur.star){err.textContent="Pilih jumlah bintang dulu.";return}
 if(t.length<5){err.textContent="Tulis ulasanmu minimal 5 karakter.";$("rvTxt").focus();return}
 if(!cur.rec){const od=LS.get(ordKey(),[]).find(x=>x.id===cur.oid);if(!od||statusOf(od)!=="selesai"){err.textContent="Ulasan hanya bisa ditulis setelah pesanan diterima.";return}}
 const btn=$("rvSend");btn.disabled=true;
 try{
  for(const m of cur.media)if(m.isNew)await MDB.put(m.id,m.blob);
  for(const id of cur.gone){await MDB.del(id);dropUrl(id)}
 }catch(e){err.textContent="Foto/video gagal disimpan (penyimpanan browser penuh atau diblokir).";btn.disabled=false;return}
 const media=cur.media.map(m=>({id:m.id,t:m.t})),L=revAll();
 if(cur.rec){const r=L.find(x=>x.id===cur.rec.id&&x.em===user.email);if(r){r.s=cur.star;r.txt=t;r.media=media;r.ed=Date.now()}}
 else if(!L.some(x=>x.oid===cur.oid&&x.pid===cur.o.id&&x.em===user.email))
  L.unshift({id:"R"+Date.now().toString(36)+Math.floor(Math.random()*1e3),pid:cur.o.id,oid:cur.oid,em:user.email,nama:user.nama,s:cur.star,txt:t,media,at:Date.now()});
 LS.set("vc_reviews",L);
 const edit=!!cur.rec;closeRv();
 renderOrders();refreshRev();render();toast(edit?"Ulasan diperbarui 💜":"Ulasan terkirim, terima kasih! 💜");
};

// ---------- DETAIL PRODUK ----------
let pdPtr=null,pdQty=1;
function openPD(ptr){pdPtr=ptr;pdQty=1;const o=deref(ptr);
 $("pdcrumb").textContent=`Beranda / ${o.kat} / ${o.nama}`;$("pdpic").innerHTML=pv(o.emoji,o.nama);$("pdname").textContent=o.nama;
 $("pdprice").textContent=rp(o.harga);paintMeta(o);$("pdq").textContent=1;
 $("pdkat").textContent=o.kat;$("pdstok").textContent=o.stok;$("pdptr").textContent=hex(ptr);
 const sim=[...asli].filter(p=>p!==ptr).sort((x,y)=>(deref(y).kat===o.kat)-(deref(x).kat===o.kat)).slice(0,6);
 $("pdsim").innerHTML=sim.map(p=>{const q=deref(p);return `<article class="scard" data-pd="${p}"><div class="pic" data-k="${q.kat}">${pv(q.emoji,q.nama)}</div><h3>${q.nama}</h3><span class="meta">${q.kat} · ★ ${rstat(q).avg.toFixed(1)} (${rstat(q).n})<br>Terjual ${fmtN(q.terjual)}</span><span class="price">${rp(q.harga)}</span></article>`}).join("");$("pdsim").scrollLeft=0;
 try{renderRev(o)}catch(err){console.error("Ulasan gagal dimuat:",err);if($("pdrev"))$("pdrev").innerHTML='<p class="meta">Ulasan gagal dimuat. Muat ulang halaman.</p>'}$("pdask").href=waLink(o);$("pd").classList.add("open");$("pd").scrollTop=0;document.body.style.overflow="hidden"}
function closePD(){$("pd").classList.remove("open");document.body.style.overflow=""}
$("grid").addEventListener("click",e=>{const t=e.target.closest("[data-pd]");if(t)openPD(+t.dataset.pd)});
$("pdclose").onclick=closePD;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePD()});
$("pdm").onclick=()=>{if(pdQty>1)$("pdq").textContent=--pdQty};
$("pdp").onclick=()=>{if(pdQty<deref(pdPtr).stok)$("pdq").textContent=++pdQty};
$("pdadd").onclick=()=>{if(!needAcct())return;const st=deref(pdPtr).stok,x=keranjang.find(k=>k.ptr===pdPtr);if(x)x.qty=Math.min(st,x.qty+pdQty);else keranjang.push({ptr:pdPtr,qty:pdQty,sel:false});renderCart();toast("Ditambahkan ke keranjang: "+deref(pdPtr).nama+(pdQty>1?" ×"+pdQty:""))};
$("pdsim").addEventListener("click",e=>{const t=e.target.closest("[data-pd]");if(t)openPD(+t.dataset.pd)});
$("simL").onclick=()=>$("pdsim").scrollBy({left:-420,behavior:"smooth"});
$("simR").onclick=()=>$("pdsim").scrollBy({left:420,behavior:"smooth"});

// ---------- AKUN PENGGUNA (disimpan di browser lewat localStorage) ----------
const LS={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v===null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
async function hash(t){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){let h=5381;for(const c of t)h=(h*33)^c.charCodeAt(0);return"f"+(h>>>0).toString(16)}}
let user=LS.get("vc_session",null),mode="in";
function updateAcct(){refreshRev();$("openCart").classList.toggle("locked",!user);$("openOrders").classList.toggle("locked",!user);setAcctBtn();$("openAcct").title=user?user.nama:"";if(user&&!$("nama").value)$("nama").value=user.nama}
function setMode(m){mode=m;$("tabIn").setAttribute("aria-pressed",m==="in");$("tabUp").setAttribute("aria-pressed",m==="up");$("lNama").style.display=$("aNama").style.display=m==="up"?"":"none";$("aGo").textContent=m==="in"?"Masuk":"Daftar";$("aErr").textContent=""}
function openAuth(m){setMode(m||"in");$("auth").classList.add("open")}
const closeAuth=()=>$("auth").classList.remove("open"),closeAcct=()=>$("acct").classList.remove("open");
$("openAcct").onclick=()=>{if(user){fillProfile();showTab("profil");$("acct").classList.add("open")}else openAuth("in")};
$("tabIn").onclick=()=>setMode("in");$("tabUp").onclick=()=>setMode("up");
$("authx").onclick=closeAuth;$("acctx").onclick=closeAcct;
$("logout").onclick=()=>{keranjang=[];renderCart();$("co").classList.remove("open");$("cart").classList.remove("open");$("orders").classList.remove("open");user=null;LS.set("vc_session",null);closeAcct();updateAcct()};
// ---------- AKUN SAYA: profil, alamat, ubah password ----------
let pFoto="";
const HP_RE=/^(\+62|62|0)8\d{7,12}$/;
function acctU(){return user?LS.get("vc_users",[]).find(x=>x.email===user.email)||null:null}
function patchU(p){const L=LS.get("vc_users",[]),i=L.findIndex(x=>user&&x.email===user.email);if(i<0)return false;Object.assign(L[i],p);LS.set("vc_users",L);return true}
function today(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function maskEmail(e){const p=e.split("@"),a=p[0];return a.slice(0,2)+"*".repeat(Math.max(3,a.length-2))+"@"+p[1]}
function maskHp(h){return "*".repeat(Math.max(0,h.length-2))+h.slice(-2)}
function setAcctBtn(){const b=$("openAcct");b.textContent="";if(!user){b.textContent="👤 Masuk";return}
 const u=acctU(),f=u&&u.foto;
 if(f){const i=new Image();i.src=f;i.alt="";i.className="hav";b.append(i)}else b.append("👤 ");
 b.title=user.nama;b.append(shortName(user.nama))}
function paintAv(el,foto,nama){el.style.backgroundImage=foto?'url("'+foto+'")':"";el.textContent=foto?"":((nama||"?").trim().charAt(0).toUpperCase()||"?")}
function drawAvatars(){const n=$("eNama").value||(user&&user.nama)||"";paintAv($("sAv"),pFoto,n);paintAv($("pBig"),pFoto,n);$("pDel").hidden=!pFoto}
function showTab(t){document.querySelectorAll(".ptab").forEach(x=>x.hidden=x.id!=="tab-"+t);document.querySelectorAll(".plink").forEach(b=>b.setAttribute("aria-current",b.dataset.ptab===t?"true":"false"))}
function fillProfile(){
 const u=acctU();if(!u)return;
 pFoto=u.foto||"";
 const un=u.email.split("@")[0];
 $("sUser").textContent=$("pUser").textContent=un;
 $("eNama").value=u.nama;
 $("pEmail").textContent=maskEmail(u.email);
 $("pHp").textContent=u.hp?maskHp(u.hp):"Belum diisi";$("chHp").textContent=u.hp?"Ubah":"Tambah";
 $("rEmail").hidden=$("rHp").hidden=true;$("eEmail").value=$("ePass").value="";$("eHp").value=u.hp||"";
 document.querySelectorAll('input[name="eGender"]').forEach(r=>r.checked=r.value===u.gender);
 $("eErr").textContent="";
 showAddrList();
 $("spOld").value=$("spNew").value=$("spNew2").value="";$("spErr").textContent="";
 drawAvatars();
}
function applyAddr(a){["nama","hp","alamat","kota","pos"].forEach(i=>$(i).value=a[i]||"")}
function markAddr(id){document.querySelectorAll("#coAddr [data-aid]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.aid===id))}
function prefillCheckout(){const u=acctU();if(!u)return;
 const L=sortAddr(addrList(u)),wrap=$("coAddrWrap");wrap.hidden=!L.length;
 $("coAddr").innerHTML=L.map(a=>'<button type="button" class="chip" data-aid="'+esc(a.id)+'" aria-pressed="false">'+esc(a.nama)+" · "+esc(a.kab||a.kota)+(a.utama?" ★":"")+"</button>").join("");
 const m=L[0];
 if(m&&!$("alamat").value){applyAddr(m);markAddr(m.id)}
 else if(!m){if(!$("nama").value)$("nama").value=u.nama;if(!$("hp").value&&u.hp)$("hp").value=u.hp}}
$("coAddr").onclick=e=>{const b=e.target.closest("[data-aid]");if(!b)return;const a=addrList(acctU()).find(x=>x.id===b.dataset.aid);if(a){applyAddr(a);markAddr(a.id)}};
document.querySelector(".pmenu").onclick=e=>{const b=e.target.closest("[data-ptab]");if(b)showTab(b.dataset.ptab)};
$("sEdit").onclick=()=>{showTab("profil");$("eNama").focus()};
$("eNama").oninput=drawAvatars;
$("chEmail").onclick=()=>{const r=$("rEmail");r.hidden=!r.hidden;if(!r.hidden)$("eEmail").focus()};
$("chHp").onclick=()=>{const r=$("rHp");r.hidden=!r.hidden;if(!r.hidden)$("eHp").focus()};
$("pPick").onclick=()=>$("pFile").click();
$("pDel").onclick=()=>{pFoto="";drawAvatars()};
$("pFile").onchange=()=>{
 const f=$("pFile").files[0];$("pFile").value="";if(!f)return;
 if(!/^image\/(jpeg|png)$/.test(f.type)){toast("Format gambar harus JPEG atau PNG.");return}
 if(f.size>1048576){toast("Ukuran gambar maksimal 1 MB.");return}
 const r=new FileReader();
 r.onload=()=>{const im=new Image();
  im.onload=()=>{const S=256,c=document.createElement("canvas");c.width=c.height=S;const x=c.getContext("2d"),m=Math.min(im.width,im.height);
   x.fillStyle="#fff";x.fillRect(0,0,S,S);x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,S,S);
   pFoto=c.toDataURL("image/jpeg",.85);drawAvatars()};
  im.onerror=()=>toast("Gambar tidak bisa dibaca.");im.src=r.result};
 r.onerror=()=>toast("Gambar tidak bisa dibaca.");r.readAsDataURL(f)};
$("eSave").onclick=async()=>{
 const err=$("eErr");err.textContent="";
 const u=acctU();if(!u){err.textContent="Akun tidak ditemukan.";return}
 const nama=$("eNama").value.trim();
 if(nama.length<2){err.textContent="Nama minimal 2 karakter.";return}
 const g=document.querySelector('input[name="eGender"]:checked');
 const p={nama,gender:g?g.value:"",foto:pFoto};
 if(!$("rHp").hidden){const hp=$("eHp").value.replace(/[\s-]/g,"");
  if(hp&&!HP_RE.test(hp)){err.textContent="Nomor telepon belum benar, contoh 08123456789.";return}
  p.hp=hp}
 let newE="";
 if(!$("rEmail").hidden){const em=$("eEmail").value.trim().toLowerCase();
  if(em&&em!==u.email){
   if(!/^\S+@\S+\.\S+$/.test(em)){err.textContent="Format email baru belum benar.";return}
   if(LS.get("vc_users",[]).some(x=>x.email===em)){err.textContent="Email itu sudah dipakai akun lain.";return}
   if(await hash($("ePass").value)!==u.h){err.textContent="Kata sandi salah. Masukkan kata sandi saat ini untuk mengganti email.";return}
   newE=em;p.email=em}}
 const old=u.email;
 if(!patchU(p)){err.textContent="Gagal menyimpan, coba lagi.";return}
 if(newE){try{const k="vc_orders_",v=localStorage.getItem(k+old);if(v!==null){localStorage.setItem(k+newE,v);localStorage.removeItem(k+old)}}catch(e){}}
 user={nama,email:newE||old};LS.set("vc_session",user);
 fillProfile();updateAcct();toast("Profil diperbarui.");
};
// ----- Alamat: boleh banyak, satu jadi alamat utama; wilayah lewat dropdown (API wilayah Indonesia) -----
const GEO_API="https://emsifa.github.io/api-wilayah-indonesia/api/";
const GL=[{k:"Prov",ph:"Pilih provinsi",path:()=>"provinces"},{k:"Kab",ph:"Pilih kota/kabupaten",path:p=>"regencies/"+p},{k:"Kec",ph:"Pilih kecamatan",path:p=>"districts/"+p},{k:"Kel",ph:"Pilih kelurahan/desa",path:p=>"villages/"+p}];
const geoCache={};let geoManual=false,adCur=null,adEditId=null;
async function geoGet(p){if(geoCache[p])return geoCache[p];const r=await fetch(GEO_API+p+".json");if(!r.ok)throw new Error("geo");const d=await r.json();geoCache[p]=d;return d}
function titleCase(s){return String(s).toLowerCase().replace(/(^|[\s.\-\/(])([a-z])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\b(Dki|Di|Ntb|Ntt)\b/g,x=>x.toUpperCase())}
function fillSel(sel,list,ph,val){sel.innerHTML="";sel.add(new Option(ph,""));list.forEach(x=>sel.add(new Option(titleCase(x.name),x.id)));if(val)sel.value=val;sel.disabled=!list.length}
async function loadLevel(i,val){
 const L=GL[i],sel=$("ad"+L.k),par=i?$("ad"+GL[i-1].k).value:"";
 for(let j=i;j<GL.length;j++)fillSel($("ad"+GL[j].k),[],GL[j].ph);
 if(i&&!par)return true;
 sel.options[0].text="Memuat…";
 try{const d=await geoGet(L.path(par));if(i&&$("ad"+GL[i-1].k).value!==par)return true;fillSel(sel,d,L.ph,val);return true}
 catch(e){fillSel(sel,[],L.ph);return false}}
function setGeoManual(on){geoManual=on;
 GL.forEach(L=>{$("ad"+L.k).hidden=on;$("ad"+L.k+"T").hidden=!on});
 if(on&&adCur)GL.forEach(L=>{const t=$("ad"+L.k+"T");if(!t.value)t.value=adCur[L.k.toLowerCase()]||""})}
function geoVal(L){const s=$("ad"+L.k);if(geoManual)return{name:$("ad"+L.k+"T").value.trim(),id:""};const o=s.options[s.selectedIndex];return{name:o&&s.value?o.text:"",id:s.value}}
GL.forEach((L,i)=>{if(i<GL.length-1)$("ad"+L.k).onchange=async()=>{if(!(await loadLevel(i+1)))setGeoManual(true)}});
function addrList(u){if(!u)return[];if(Array.isArray(u.alamatList))return u.alamatList;const a=u.alamat;return a&&a.alamat?[{id:"a1",nama:a.nama||u.nama,hp:a.hp||u.hp||"",alamat:a.alamat,kota:a.kota||"",pos:a.pos||"",utama:true}]:[]}
function sortAddr(L){return L.slice().sort((a,b)=>(b.utama?1:0)-(a.utama?1:0))}
function saveAddrs(L){if(L.length&&!L.some(x=>x.utama))L[0].utama=true;return patchU({alamatList:L})}
function addrLines(a){const l1=a.jalan!=null?[a.jalan,a.detail].filter(Boolean).join(", "):a.alamat;const l2=a.prov?[a.kel,a.kec,a.kab,a.prov].filter(Boolean).join(", ")+", "+a.pos:(a.kota+", "+a.pos);return[l1,l2]}
function renderAddr(){
 const L=sortAddr(addrList(acctU())),box=$("adList");
 if(!L.length){box.innerHTML='<p class="meta adempty">Belum ada alamat tersimpan. Klik “Tambahkan Alamat” untuk menambah.</p>';return}
 box.innerHTML=L.map(a=>{const t=addrLines(a);return'<div class="adcard" data-id="'+esc(a.id)+'"><div class="adinfo"><div class="adtop"><strong>'+esc(a.nama)+'</strong><span class="adsep"></span><span class="adhp">'+esc(a.hp)+"</span>"+'</div><div class="meta adtxt">'+esc(t[0])+"<br>"+esc(t[1])+'</div>'+(a.utama?'<span class="adbadge">Utama</span>':"")+'</div><div class="adact"><div class="adlinks"><button class="ulink" type="button" data-ad="edit">Ubah</button>'+((!a.utama||L.length===1)?'<button class="ulink" type="button" data-ad="del">Hapus</button>':"")+"</div>"+(a.utama?"":'<button class="btn adset" type="button" data-ad="main">Atur sebagai utama</button>')+"</div></div>"}).join("")}
const closeAd=()=>$("adModal").classList.remove("open");
function showAddrList(){closeAd();renderAddr()}
async function showAddrForm(a){
 const u=acctU();if(!u)return;
 const first=!addrList(u).length;adEditId=a?a.id:null;adCur=a||null;
 $("adTitle").textContent=a?"Ubah Alamat":"Alamat Baru";
 $("adNama").value=a?a.nama:u.nama;$("adHp").value=a?a.hp:(u.hp||"");
 $("adJalan").value=a?(a.jalan!=null?a.jalan:a.alamat):"";$("adDetail").value=(a&&a.detail)||"";$("adPos").value=a?a.pos:"";
 $("adMain").checked=a?!!a.utama:first;$("adMain").disabled=a?!!a.utama:first;
 $("adErr").textContent="";GL.forEach(L=>{$("ad"+L.k+"T").value=""});setGeoManual(false);
 $("adModal").classList.add("open");$("adNama").focus();
 let ok=await loadLevel(0,a&&a.provId);
 if(ok&&a&&a.provId)ok=await loadLevel(1,a.kabId);
 if(ok&&a&&a.kabId)ok=await loadLevel(2,a.kecId);
 if(ok&&a&&a.kecId)ok=await loadLevel(3,a.kelId);
 if(!ok)setGeoManual(true)}
$("adNew").onclick=()=>showAddrForm(null);
$("adCancel").onclick=$("adx").onclick=closeAd;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("adModal").classList.contains("open")){e.stopImmediatePropagation();closeAd()}},true);
$("adList").onclick=e=>{
 const b=e.target.closest("[data-ad]");if(!b)return;
 const id=b.closest(".adcard").dataset.id,L=addrList(acctU()).map(x=>Object.assign({},x)),a=L.find(x=>x.id===id);if(!a)return;
 const k=b.dataset.ad;
 if(k==="edit")showAddrForm(a);
 else if(k==="main"){L.forEach(x=>{x.utama=x.id===id});saveAddrs(L);renderAddr();toast("Alamat utama diganti.")}
 else if(k==="del"){
  if(b.dataset.sure){saveAddrs(L.filter(x=>x.id!==id));renderAddr();toast("Alamat dihapus.")}
  else{b.dataset.sure="1";b.textContent="Yakin hapus?";setTimeout(()=>{if(b.isConnected){delete b.dataset.sure;b.textContent="Hapus"}},3000)}}};
$("adSave").onclick=()=>{
 const err=$("adErr");err.textContent="";
 const nm=$("adNama").value.trim(),hp=$("adHp").value.replace(/[\s-]/g,""),pos=$("adPos").value.trim(),jalan=$("adJalan").value.trim(),detail=$("adDetail").value.trim();
 const G=GL.map(geoVal),P=G[0],K=G[1],C=G[2],V=G[3];
 if(nm.length<2){err.textContent="Nama lengkap wajib diisi.";return}
 if(!HP_RE.test(hp)){err.textContent="Nomor telepon belum benar, contoh 08123456789.";return}
 if(!P.name){err.textContent="Pilih provinsi dulu.";return}
 if(!K.name){err.textContent="Pilih kota/kabupaten dulu.";return}
 if(!C.name){err.textContent="Pilih kecamatan dulu.";return}
 if(!/^\d{5}$/.test(pos)){err.textContent="Kode pos harus 5 angka.";return}
 if(jalan.length<3){err.textContent="Nama jalan, gedung, atau no. rumah wajib diisi.";return}
 const L=addrList(acctU()).map(x=>Object.assign({},x)),main=$("adMain").checked||$("adMain").disabled;
 const data={nama:nm,hp,jalan,detail,prov:P.name,kab:K.name,kec:C.name,kel:V.name,provId:P.id,kabId:K.id,kecId:C.id,kelId:V.id,pos};
 data.kota=K.name+", "+P.name;
 data.alamat=[jalan,detail,V.name?"Kel. "+V.name:"","Kec. "+C.name].filter(Boolean).join(", ");
 let a=adEditId?L.find(x=>x.id===adEditId):null;
 if(a)Object.assign(a,data);
 else{a=Object.assign({id:"A"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),utama:false},data);L.push(a)}
 if(main)L.forEach(x=>{x.utama=x.id===a.id});
 if(!saveAddrs(L)){err.textContent="Gagal menyimpan, coba lagi.";return}
 closeAd();renderAddr();toast("Alamat disimpan.")};
$("spSave").onclick=async()=>{
 const err=$("spErr");err.textContent="";
 const u=acctU();if(!u){err.textContent="Akun tidak ditemukan.";return}
 const o=$("spOld").value,n=$("spNew").value,n2=$("spNew2").value;
 if(await hash(o)!==u.h){err.textContent="Kata sandi lama salah.";return}
 if(n.length<6){err.textContent="Kata sandi baru minimal 6 karakter.";return}
 if(n===o){err.textContent="Kata sandi baru harus berbeda dari yang lama.";return}
 if(n!==n2){err.textContent="Konfirmasi kata sandi tidak sama.";return}
 if(!patchU({h:await hash(n)})){err.textContent="Gagal menyimpan, coba lagi.";return}
 $("spOld").value=$("spNew").value=$("spNew2").value="";toast("Kata sandi diperbarui.")};
$("aGo").onclick=async()=>{
 const nama=$("aNama").value.trim(),email=$("aEmail").value.trim().toLowerCase(),pass=$("aPass").value,err=$("aErr");err.textContent="";
 if(mode==="up"&&!nama){err.textContent="Nama wajib diisi.";return}
 if(!/^\S+@\S+\.\S+$/.test(email)){err.textContent="Format email belum benar.";return}
 if(pass.length<6){err.textContent="Kata sandi minimal 6 karakter.";return}
 const users=LS.get("vc_users",[]),h=await hash(pass);
 if(mode==="up"){
  if(users.some(u=>u.email===email)){err.textContent="Email sudah terdaftar. Silakan masuk.";return}
  users.push({nama,email,h});LS.set("vc_users",users);user={nama,email};
 }else{
  const u=users.find(u=>u.email===email&&u.h===h);
  if(!u){err.textContent="Email atau kata sandi salah.";return}
  user={nama:u.nama,email};
 }
 LS.set("vc_session",user);$("aPass").value="";closeAuth();updateAcct();
};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeAuth();closeAcct()}});
updateAcct();

// ---------- TANYA PENJUAL (diarahkan ke WhatsApp) ----------
$("askTop").href=waLink(null);

// ---------- NAVBAR KATEGORI ----------
function setNav(){document.querySelectorAll(".navlink").forEach(b=>b.setAttribute("aria-current",b.dataset.nav===kat?"true":"false"))}
document.querySelector(".mainnav").onclick=e=>{const c=e.target.dataset.nav;if(c){kat=c;render();setNav();$("grid").scrollIntoView({behavior:"smooth",block:"start"})}};
$("chips").addEventListener("click",setNav);
setNav();

$("openF").onclick=()=>$("fpanel").classList.add("open");
$("closeF").onclick=$("fshow").onclick=()=>$("fpanel").classList.remove("open");
$("clearF").onclick=$("fclear").onclick=()=>{F={harga:0,rating:0,stok:0};render()};
$("fgroups").onclick=e=>{const b=e.target.closest("[data-f]");if(b){F[b.dataset.f]=+b.dataset.i;render()}};
$("pmore").onclick=()=>{const c=$("pdesc").classList.toggle("clamp");$("pmore").textContent=c?"Baca lebih banyak":"Baca lebih sedikit"};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("fpanel").classList.remove("open")});
// ---------- WAJIB AKUN ----------
function needAcct(msg){if(user)return true;openAuth("up");$("aErr").textContent=msg||"Buat akun dulu untuk memakai keranjang dan memesan.";return false}

// ---------- PESANAN SAYA + PEMBAYARAN ----------
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ordKey=()=>"vc_orders_"+(user?user.email:"tamu");
// GANTI data rekening / e-wallet di bawah dengan milik toko yang asli.
const PAY=[
 {k:"bca",t:"Transfer BCA",d:"BCA · 0000000000 a.n. VELLCROCHET"},
 {k:"bri",t:"Transfer BRI",d:"BRI · 0000000000 a.n. VELLCROCHET"},
 {k:"dana",t:"DANA",d:"DANA · 08xxxxxxxxxx a.n. VELLCROCHET"},
 {k:"shopeepay",t:"ShopeePay",d:"ShopeePay · 08xxxxxxxxxx a.n. VELLCROCHET"},
 {k:"gopay",t:"GoPay",d:"GoPay · 08xxxxxxxxxx a.n. VELLCROCHET"},
 {k:"qris",t:"QRIS",d:"Scan QRIS toko, lalu kirim bukti bayar lewat WhatsApp"},
 {k:"cod",t:"Bayar di tempat (COD)",d:"Bayar tunai saat pesanan sampai"}];
const payOf=k=>PAY.find(p=>p.k===k);
let payK="";
function drawPay(){
 $("paychips").innerHTML=PAY.map(p=>`<button class="chip" type="button" aria-pressed="${payK===p.k}" data-pay="${p.k}">${p.t}</button>`).join("");
 const p=payOf(payK);$("payhint").textContent=p?p.d:"Pilih salah satu metode pembayaran.";
 const q=payK==="qris";$("qrisBox").hidden=!q;
 if(q&&$("qrisImg").getAttribute("src")!==QRIS_IMG)$("qrisImg").src=QRIS_IMG}
$("paychips").onclick=e=>{const b=e.target.closest("[data-pay]");if(b){payK=b.dataset.pay;drawPay()}};
$("cox").onclick=()=>$("co").classList.remove("open");

$("coGo").onclick=()=>{
 const v=id=>$(id).value.trim(),err=$("coErr");err.textContent="";
 const nm=v("nama"),hp=v("hp").replace(/[\s-]/g,""),al=v("alamat"),kota=v("kota"),pos=v("pos");
 const bad=(m,id)=>{err.textContent=m;if(id)$(id).focus()};
 const S=keranjang.filter(x=>x.sel);if(!S.length)return bad("Tidak ada produk yang dipilih.");
 if(!nm)return bad("Nama penerima wajib diisi.","nama");
 if(!/^(\+62|62|0)8\d{7,12}$/.test(hp))return bad("Nomor HP/WhatsApp belum benar, contoh 08123456789.","hp");
 if(al.length<10)return bad("Alamat lengkap wajib diisi (jalan, nomor, RT/RW, kecamatan).","alamat");
 if(!kota)return bad("Kota/Kabupaten wajib diisi.","kota");
 if(!/^\d{5}$/.test(pos))return bad("Kode pos harus 5 angka.","pos");
 if(!payK)return bad("Pilih metode pembayaran.");
 const items=S.map(x=>{const o=deref(x.ptr);return{nama:o.nama,emoji:o.emoji,harga:o.harga,qty:x.qty}});
 const t=items.reduce((s,x)=>s+x.harga*x.qty,0),list=LS.get(ordKey(),[]),id="VC"+Date.now().toString(36).toUpperCase();
 list.unshift({id,penerima:nm,hp,alamat:al,kota,pos,catatan:v("catatan"),bayar:payK,items,total:t,at:Date.now(),paidAt:null,status:payK==="cod"?"proses":"bayar"});
 LS.set(ordKey(),list);
 keranjang=keranjang.filter(x=>!x.sel);renderCart();payK="";
 ["hp","alamat","kota","pos","catatan"].forEach(i=>$(i).value="");
 $("co").classList.remove("open");$("cart").classList.remove("open");
 renderOrders();$("orders").classList.add("open")};

// DEMO tanpa server: verifikasi bayar & pengiriman berjalan otomatis menurut waktu.
// Di toko nyata, penjual yang mengubah status (butuh server/database).
const VERIF_MS=30000,KIRIM_MS=60000;
const STEP=[["bayar","💳 Menunggu pembayaran"],["verif","🔎 Verifikasi pembayaran"],["proses","🧶 Sedang dibuat"],["kirim","🚚 Dalam pengiriman"],["selesai","✅ Selesai · diterima"]];
function statusOf(o){
 if(o.status==="selesai"||o.status==="batal")return o.status;
 const cod=o.bayar==="cod";
 if(!cod){if(!o.paidAt)return"bayar";if(Date.now()-o.paidAt<VERIF_MS)return"verif"}
 const t0=cod?o.at:o.paidAt+VERIF_MS;
 return Date.now()-t0>=KIRIM_MS?"kirim":"proses"}
const waBukti=o=>{const p=payOf(o.bayar);return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(`Halo VELLCROCHET, saya sudah bayar pesanan ${o.id}.\nTotal: ${rp(o.total)}\nMetode: ${p?p.t:"-"}\nNama: ${o.penerima}\n(bukti bayar saya lampirkan di chat ini)`)};
function renderOrders(){
 const L=LS.get(ordKey(),[]);
 $("olist").innerHTML=L.length?L.map(o=>{
  const s=statusOf(o),steps=o.bayar==="cod"?STEP.slice(2):STEP,si=steps.findIndex(x=>x[0]===s),p=payOf(o.bayar);
  const bar=s==="batal"?`<div class="steps"><span class="stp">❌ Dibatalkan</span></div>`:`<div class="steps">${steps.map((x,i)=>`<span class="stp${i<=si?" on":""}">${x[1]}</span>`).join("")}</div>`;
  const info=o.alamat?`<div class="meta">📍 ${esc(o.alamat)}, ${esc(o.kota)} ${esc(o.pos)}<br>📞 ${esc(o.hp)}${o.catatan?"<br>📝 "+esc(o.catatan):""}</div>`:"";
  let act="";
  if(s==="bayar")act=`<div class="payinfo"><strong>Bayar ${rp(o.total)}</strong><br>${p?esc(p.d):"Hubungi penjual untuk info pembayaran."}${o.bayar==="qris"?`<br><img class="qrisimg" src="${QRIS_IMG}" alt="QRIS VELLCROCHET">`:""}<br><span class="meta">Setelah membayar, kirim bukti lewat WhatsApp lalu tekan "Saya sudah bayar".</span></div><div class="oacts"><a class="btn" target="_blank" rel="noopener" href="${waBukti(o)}">💬 Kirim bukti</a><button class="btn alt" data-paid="${o.id}">Saya sudah bayar</button><button class="btn" data-cancel="${o.id}">Batalkan</button></div>`;
  else if(s==="verif")act=`<div class="payinfo">Pembayaranmu sedang dicek penjual. Pesanan mulai dirajut setelah pembayaran terkonfirmasi.</div>`;
  else if(s==="kirim")act=`<div class="oacts"><button class="btn alt" data-recv="${o.id}">Pesanan sudah diterima</button></div>`;
  return `<div class="ord"><div class="ordh"><strong>${esc(o.id)}</strong><span class="meta">${new Date(o.at).toLocaleString("id-ID")}</span></div>${bar}<ul>${o.items.map(i=>{const pp=[...heap].find(([,x])=>x.nama===i.nama),pid=pp?pp[1].id:0,rr=s==="selesai"&&pid?revAll().find(r=>r.oid===o.id&&r.pid===pid&&r.em===(user&&user.email)):null,rb=s==="selesai"&&pid?`<button class="btn rvbtn${rr?" done":""}" type="button" data-rvo="${esc(o.id)}" data-rvp="${pid}" data-seen="${rr?1:0}">${rr?"👁️ Lihat ulasan":"⭐ Ulas Produk"}</button>`:"";return `<li class="oi"><span class="oit">${pv(i.emoji,i.nama)} ${esc(i.nama)} × ${i.qty}</span>${rb}</li>`}).join("")}</ul><div class="ordf"><span>Penerima: ${esc(o.penerima)}</span><strong>${rp(o.total)}</strong></div><div class="meta">Pembayaran: ${p?esc(p.t):"-"}</div>${info}${act}</div>`}).join(""):`<p class="meta">Belum ada pesanan.</p>`}
$("openOrders").onclick=()=>{if(!needAcct("Buat akun dulu untuk melihat pesananmu."))return;renderOrders();$("orders").classList.add("open")};
$("ordx").onclick=()=>$("orders").classList.remove("open");
$("olist").onclick=e=>{const rb=e.target.closest("[data-rvp]");if(rb){const pid=+rb.dataset.rvp;if(rb.dataset.seen==="1"){const pp=[...heap].find(([,x])=>x.id===pid);if(pp){$("orders").classList.remove("open");openPD(pp[0]);openRp()}}else openRvForm(pid,rb.dataset.rvo);return}const d=e.target.dataset,id=d.recv||d.paid||d.cancel;if(!id)return;
 const L=LS.get(ordKey(),[]),o=L.find(x=>x.id===id);if(!o)return;const s=statusOf(o);
 if(d.recv&&s==="kirim")o.status="selesai";
 else if(d.paid&&s==="bayar")o.paidAt=Date.now();
 else if(d.cancel&&s==="bayar"){if(!confirm("Batalkan pesanan ini?"))return;o.status="batal"}
 LS.set(ordKey(),L);renderOrders()};
setInterval(()=>{if($("orders").classList.contains("open"))renderOrders()},5000);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("orders").classList.remove("open");$("co").classList.remove("open")}});

// ---------- TOAST & ESC KERANJANG ----------
let toastT;
function toast(m){const e=$("toast");e.textContent=m;e.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove("show"),1800)}
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("cart").classList.remove("open")});

// ---------- FOOTER ----------
$("footWA").href=waLink(null);
const INFO={
 cara:["Cara Memesan","1. Buat akun atau masuk.\n2. Tambahkan produk ke keranjang.\n3. Centang produk yang mau dibeli, lalu Checkout.\n4. Isi alamat, kontak, dan pilih metode pembayaran.\n5. Bayar, lalu pantau statusnya di menu Pesanan."],
 bayar:["Pembayaran","Metode yang tersedia: "+PAY.map(p=>p.t).join(", ")+".\nSetelah membayar, kirim bukti lewat WhatsApp atau tekan \"Saya sudah bayar\" di menu Pesanan. Pesanan mulai dirajut setelah pembayaran terkonfirmasi."],
 kirim:["Pengiriman","Pesanan dikerjakan 3–7 hari, lalu dikirim ke seluruh Indonesia. Pesanan dikemas rapi dan aman."],
 warna:["Custom Warna","Semua produk bisa dicustom warna. Tulis warna yang kamu mau di kolom catatan saat membuat pesanan, atau tanyakan dulu lewat Tanya Penjual."]};
document.querySelector(".sfoot").onclick=e=>{
 const b=e.target.closest("button");if(!b)return;const d=b.dataset;
 if(d.info){$("infot").textContent=INFO[d.info][0];$("infob").textContent=INFO[d.info][1];$("info").classList.add("open")}
 else if(d.nav){kat=d.nav;render();setNav();$("grid").scrollIntoView({behavior:"smooth",block:"start"})}
 else if(d.act)$(d.act).click()};
$("infox").onclick=()=>$("info").classList.remove("open");
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("info").classList.remove("open")});
$("toTop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
document.addEventListener("scroll",()=>$("toTop").classList.toggle("show",(window.scrollY||0)>400),{passive:true});

// ---------- SPLIT: beranda menyempit saat keranjang terbuka ----------
new MutationObserver(()=>document.body.classList.toggle("cartopen",$("cart").classList.contains("open"))).observe($("cart"),{attributes:true,attributeFilter:["class"]});

// ---------- BREADCRUMB BISA DIKLIK ----------
document.querySelector(".crumbbar").onclick=e=>{const b=e.target.closest("[data-crumb]");if(!b)return;
 if(b.dataset.crumb==="top")window.scrollTo({top:0,behavior:"smooth"});
 else{kat="Semua";render();setNav();$("grid").scrollIntoView({behavior:"smooth",block:"start"})}};

// Nama panjang dipotong di tombol akun (nama lengkap tetap tampil di profil)
function shortName(n){n=n.trim().replace(/\s+/g," ");return n.length>10?n.slice(0,10)+"…":n}

// ---------- Ikon mata: lihat/sembunyikan tulisan di semua kolom kata sandi ----------
(function(){
 const A='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
 const EYE=A+'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
 const OFF=A+'<path d="M17.94 17.94A10.9 10.9 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 4.06-5.06M9.9 4.24A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>';
 document.querySelectorAll('input[type="password"]').forEach(inp=>{
  const w=document.createElement("span");w.className="pw";inp.parentNode.insertBefore(w,inp);w.appendChild(inp);
  const b=document.createElement("button");b.type="button";b.className="pweye";b.innerHTML=EYE;
  b.setAttribute("aria-label","Tampilkan kata sandi");b.setAttribute("aria-pressed","false");
  b.onclick=()=>{const show=inp.type==="password";inp.type=show?"text":"password";b.innerHTML=show?OFF:EYE;
   b.setAttribute("aria-label",show?"Sembunyikan kata sandi":"Tampilkan kata sandi");b.setAttribute("aria-pressed",String(show))};
  w.appendChild(b)});
})();

// ---------- Hiasan emoji lucu: padat di kolom kiri & kanan, jarang di tengah (dan tidak pernah menimpa tulisan) ----------
(function(){
 // Hanya emoji yang aman tampil di Windows (tanpa kotak kosong)
 const POOL=["🧶","🧸","🐰","🐱","🐻","🐥","🐑","🐼","🐹","🐙","🦄","🐞","🦋","🍓","🍒","🍄","🌸","🌼","🌻","🌈","💖","🎀","🍰","🧁","🐣","🐳","☁️","🧵",
  "🐶","🐨","🦊","🐷","🐸","🐵","🦆","🐢","🦔","🐬","🐠","🍩","🍭","🍑","🍉","🍪","🍦","🌷","🌺","💕","🎈","🐮","🐯","🦉","🐧","🐝","🐤","🍬"];
 const rnd=(a,b)=>a+Math.random()*(b-a);
 const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
 const MIN=44,MAX=92;                 // ukuran emoji 44–84px, tidak ada yang kecil
 const GROW=185,GCELL=200,GMAXC=2,GROWS=50;   // kolom pinggir: normal, tidak rapat
 const CCELL=165,CMAXC=9,CROWS=55,CKEEP=.8;   // tengah: lebih banyak, tapi yang kena tulisan otomatis disembunyikan
 const layer=document.createElement("div");layer.id="deco";layer.setAttribute("aria-hidden","true");document.body.appendChild(layer);
 const items=[];let bag=[];
 function make(reg,r,c,keep){
  if(!bag.length)bag=shuffle(POOL);
  const el=document.createElement("span");el.className="dc";el.textContent=bag.pop();el.style.display="none";
  el.style.setProperty("--r",Math.round(rnd(-30,30))+"deg");el.style.setProperty("--d",rnd(3.5,7).toFixed(1)+"s");el.style.setProperty("--dl",(-rnd(0,6)).toFixed(1)+"s");
  layer.appendChild(el);items.push({el,reg,r,c,keep,fx:Math.random(),fy:Math.random(),t:(()=>{const k=Math.floor(Math.random()*3);return k/3*.9+Math.random()*.25+(k===2?.1:0)})()})}   // 3 golongan ukuran (sedang, besar, jumbo) biar beda-beda
 ["L","R"].forEach(g=>{for(let r=0;r<GROWS;r++)for(let c=0;c<GMAXC;c++)make(g,r,c,Math.random()<.8)});
 for(let r=0;r<CROWS;r++)for(let c=0;c<CMAXC;c++)make("C",r,c,Math.random()<CKEEP);
 for(let r=0;r<10;r++)for(let c=0;c<14;c++)make("Z",r,c,Math.random()<.92);   // area di sekitar "Semua Produk": paling ramai

 // Kotak-kotak tulisan di halaman (supaya emoji tengah tidak menimpa teks)
 function textRects(lx,ly){
  const out=[],w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
   if(!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;
   const p=n.parentElement;if(!p||p.closest("#deco,script,style,noscript,header,#toTop,#toast,#cart,#fpanel,#pd,.modal"))return NodeFilter.FILTER_REJECT;
   return NodeFilter.FILTER_ACCEPT}}),rg=document.createRange();
  for(let n;n=w.nextNode();){rg.selectNodeContents(n);for(const q of rg.getClientRects())if(q.width>1&&q.height>1)out.push([q.left-lx,q.top-ly,q.right-lx,q.bottom-ly])}
  return out}
 function ctrlRects(lx,ly){const out=[];document.querySelectorAll("body > .wrap input,body > .wrap select,body > .wrap textarea,body > .wrap .btn,body > .wrap .chip,body > .wrap .link").forEach(e=>{const q=e.getBoundingClientRect();if(q.width>1&&q.height>1)out.push([q.left-lx,q.top-ly,q.right-lx,q.bottom-ly])});return out}
 const hit=(x,y,w,h,R,pad)=>R.some(q=>x-pad<q[2]&&x+w+pad>q[0]&&y-pad<q[3]&&y+h+pad>q[1]);

 function layout(){
  const lb=layer.getBoundingClientRect(),W=layer.offsetWidth,H=layer.offsetHeight,main=document.querySelector("body > .wrap");
  if(!main){return}
  const mb=main.getBoundingClientRect(),cartOpen=document.body.classList.contains("cartopen"),cb=$("cart").getBoundingClientRect();
  const L=mb.left-lb.left,R=mb.right-lb.left,lim=cartOpen?Math.min(W,cb.left-lb.left):W;
  const reg={L:[0,L-4],R:[R+4,lim],C:[L,R],Z:[L,R]};
  const R_=textRects(lb.left,lb.top),CR=ctrlRects(lb.left,lb.top),ph=document.querySelector(".phead"),gr=$("grid");
  const zy0=ph?ph.getBoundingClientRect().top-lb.top-70:0,zy1=gr?gr.getBoundingClientRect().top-lb.top:0;
  items.forEach(d=>{
   const [x0,x1]=reg[d.reg],bw=x1-x0,zone=d.reg==="Z",center=d.reg==="C"||zone,e=d.el;
   let hi=MAX;
   if(!center)hi=Math.min(MAX,Math.floor((bw-8)/1.25));if(zone)hi=Math.min(hi,72);
   if(!d.keep||hi<MIN||bw<MIN*1.25){e.style.display="none";return}
   const ZC=100,cols=zone?Math.max(1,Math.min(14,Math.round(bw/ZC))):Math.max(1,Math.min(center?CMAXC:GMAXC,Math.round(bw/(center?CCELL:GCELL))));
   if(d.c>=cols){e.style.display="none";return}
   const size=Math.round(MIN+d.t*(hi-MIN)),w=size*1.25,h=size*1.2,cw=bw/cols;
   const x=x0+d.c*cw+d.fx*Math.max(0,cw-w);
   const y=zone?zy0+(d.r+d.fy*.7)*ZC:center?(d.r+d.fy*.6)*CCELL:d.r*GROW+d.fy*Math.max(0,GROW-h);
   if(zone&&y+h>zy1){e.style.display="none";return}
   if(y+h>H-6||(center&&(hit(x,y,w,h,R_,zone?12:16)||(zone&&hit(x,y,w,h,CR,6))))){e.style.display="none";return}
   e.style.display="";e.style.fontSize=size+"px";e.style.left=x+"px";e.style.top=y+"px"})}
 let tm;const later=()=>{clearTimeout(tm);tm=setTimeout(layout,120)};
 addEventListener("resize",later);
 if(window.ResizeObserver)new ResizeObserver(later).observe(document.body);
 new MutationObserver(later).observe(document.body,{attributes:true,attributeFilter:["class"]});
 document.addEventListener("input",later);document.addEventListener("click",later);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
 layout();
})();

// ---------- Carousel hero: geser kiri/kanan, tombol panah, titik, swipe, otomatis ----------
(function(){
 // Untuk pakai foto asli, isi img:"gambar/gantungan.jpg" (kalau img diisi, foto tampil menggantikan emoji)
 const SL=[
  {t:"Semua Produk",img:"gambarvell/semua.jfif",cat:"Semua"},
  {t:"Gantungan Kunci",img:"gambarvell/gantungan.jpg",cat:"Gantungan"},
  {t:"Boneka",img:"gambarvell/boneka.jfif",cat:"Boneka"},
  {t:"Baju Rajut",img:"gambarvell/baju.jfif",cat:"Baju"},
  {t:"Lainnya",img:"gambarvell/lain.jpg",cat:"Lainnya"}];
 const trk=$("heroTrk"),dots=$("heroDots"),box=$("heroCar");let i=0,timer=null;
 trk.innerHTML=SL.map((s,k)=>`<div class="slide" role="group" aria-roledescription="slide" aria-label="${k+1} dari ${SL.length}">${s.img?`<img src="${s.img}" alt="${s.t}">`:`<div class="em" aria-hidden="true">${s.e}</div>`}<button class="scap" type="button" data-k="${k}">${s.t} →</button></div>`).join("");
 dots.innerHTML=SL.map((s,k)=>`<button type="button" data-d="${k}" aria-label="Slide ${k+1}: ${s.t}"></button>`).join("");
 function go(n){i=(n+SL.length)%SL.length;trk.style.transform="translateX(-"+i*100+"%)";
  dots.querySelectorAll("button").forEach((b,k)=>b.setAttribute("aria-current",k===i));
  trk.querySelectorAll(".slide").forEach((e,k)=>{e.querySelectorAll("button").forEach(b=>b.tabIndex=k===i?0:-1)})}
 function play(){stop();if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;timer=setInterval(()=>go(i+1),4500)}
 function stop(){clearInterval(timer)}
 $("heroL").onclick=()=>{go(i-1);play()};$("heroR").onclick=()=>{go(i+1);play()};
 dots.onclick=e=>{const b=e.target.closest("[data-d]");if(b){go(+b.dataset.d);play()}};
 trk.onclick=e=>{const b=e.target.closest(".scap");if(!b)return;const c=SL[+b.dataset.k].cat,n=document.querySelector('.navlink[data-nav="'+c+'"]');if(n)n.click()};
 let x0=null;
 box.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;x0=e.clientX});
 box.addEventListener("pointerup",e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>40){go(i+(dx<0?1:-1));play()}});
 box.addEventListener("pointercancel",()=>x0=null);
 box.addEventListener("mouseenter",stop);box.addEventListener("mouseleave",play);
 box.addEventListener("focusin",stop);box.addEventListener("focusout",play);
 document.addEventListener("visibilitychange",()=>document.hidden?stop():play());
 go(0);play();
})();