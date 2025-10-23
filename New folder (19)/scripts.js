
// Initialize Swiper 
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
   spaceBetween:25,
   

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    ddynamicBullets:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0:{
        slidesPerView: 1,
    },
    

  }
  
});

// Starter data (replace with your own experiences)
const data = [
{company:"Tech Solutions Pvt Ltd", role:"Frontend Developer", dates:"Mar 2023 — Present", type:"fulltime", desc:"Built responsive webpages and interactive UI components using HTML, CSS and JavaScript. Collaborated with designers and backend engineers.", tags:["HTML","CSS","JavaScript"]},
{company:"Bright Start Internship", role:"Web Development Intern", dates:"Jun 2022 — Aug 2022", type:"internship", desc:"Assisted in developing landing pages, fixed accessibility issues, and wrote unit tests for components.", tags:["HTML","CSS"]},
{company:"Freelance Projects", role:"Web Developer", dates:"2020 — 2022", type:"freelance", desc:"Delivered small business websites, portfolios and one-page apps. Worked directly with clients to scope and implement features.", tags:["HTML","CSS","Client Communication"]}
];


const listEl = document.getElementById('list');
const qEl = document.getElementById('q');
const filterEl = document.getElementById('filter');
const countEl = document.getElementById('count');


function render(items){
listEl.innerHTML = '';
items.forEach(it=>{
const card = document.createElement('article');
card.className = 'card';
card.innerHTML = `
<h3>${escapeHtml(it.role)}</h3>
<div class="meta"><div>${escapeHtml(it.company)}</div><div>•</div><div>${escapeHtml(it.dates)}</div></div>
<div class="tags">${it.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
<p class="desc">${escapeHtml(it.desc)}</p>
`;
listEl.appendChild(card);
});
countEl.textContent = items.length + (items.length === 1 ? ' experience' : ' experiences');
}


function escapeHtml(s){
return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


function getFiltered(){
const q = qEl.value.trim().toLowerCase();
const f = filterEl.value;
return data.filter(it=>{
if(f !== 'all' && it.type !== f) return false;
if(!q) return true;
return (it.company + ' ' + it.role + ' ' + it.desc + ' ' + it.tags.join(' ')).toLowerCase().includes(q);
});
}


qEl.addEventListener('input', ()=> render(getFiltered()));
filterEl.addEventListener('change', ()=> render(getFiltered()));
document.getElementById('clear').addEventListener('click', ()=>{qEl.value='';filterEl.value='all';render(getFiltered())});


// Add new experience
document.getElementById('add').addEventListener('click', ()=>{
const company = document.getElementById('company').value.trim();
const role = document.getElementById('role').value.trim();
const dates = document.getElementById('dates').value.trim() || 'Dates not provided';
const type = document.getElementById('type').value.trim().toLowerCase() || 'fulltime';
const desc = document.getElementById('desc').value.trim() || 'No description provided.';
const tags = document.getElementById('tags').value.split(',').map(t=>t.trim()).filter(Boolean);
if(!company || !role){ alert('Please enter at least company and role'); return; }
data.unshift({company,role,dates,type,desc,tags});
// clear inputs
['company','role','dates','type','desc','tags'].forEach(id=>document.getElementById(id).value='');
render(getFiltered());
});


// initial render
render(data);


const btn = document.getElementById('sendBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const responseMsg = document.getElementById('responseMsg');


btn.addEventListener('click', ()=>{
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const msg = messageInput.value.trim();


if(!name || !email || !msg){
responseMsg.style.display='block';
responseMsg.style.color='#f87171';
responseMsg.textContent='⚠️ Please fill all fields.';
return;
}


// simulate sending message
btn.disabled = true;
btn.textContent = 'Sending...';


setTimeout(()=>{
btn.disabled = false;
btn.textContent = 'Send Message';
responseMsg.style.display='block';
responseMsg.style.color='#4ade80';
responseMsg.textContent='✅ Message sent successfully!';
nameInput.value='';
emailInput.value='';
messageInput.value='';
},1500);
})