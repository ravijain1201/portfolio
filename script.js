// --- Helper to create badges ---
function createChips(list) {
  return list.map(item => `<span class="chip">${item}</span>`).join("");
}

// --- Section Methods ---
function renderHero(data) {
  const hero = document.getElementById("hero");
  hero.innerHTML = `
    <div class="avatar"><img src="${data.avatar}" alt="Portrait of ${data.name}" /></div>
    <div>
      <h1>${data.title}</h1>
      <p class="subtitle">${data.location} · 
        <a href="tel:${data.phone}">${data.phone}</a> · 
        <a href="mailto:${data.email}">${data.email}</a>
      </p>
      <p>${data.summary}</p>
      <div class="badges">${createChips(data.skills)}</div>
    </div>
  `;
}

function renderProfile(data) {
  document.getElementById("profile").innerHTML = `
    <h2>Profile</h2>
    <p>${data.text}</p>
  `;
}

function renderExperience(list) {
  const container = document.getElementById("experience");
  container.innerHTML = `
    <h2>Experience</h2>
    <div class="grid cols-2">
      ${list.map(job => `
        <article class="xp">
          <div class="role">${job.role}</div>
          <div class="meta">${job.meta}</div>
          <ul>${job.details.map(i => `<li>${i}</li>`).join("")}</ul>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSkills(skills) {
  document.getElementById("skills").innerHTML = `
    <h2>Core Skills</h2>
    <div class="grid cols-3">
      <div><div class="small">Back-End</div><div class="badges">${createChips(skills.backend)}</div></div>
      <div><div class="small">Front-End</div><div class="badges">${createChips(skills.frontend)}</div></div>
      <div><div class="small">DevOps & Data</div><div class="badges">${createChips(skills.devops)}</div></div>
    </div>
  `;
}

function renderCertifications(data) {
  document.getElementById("certifications").innerHTML = `
    <div class="card">
      <h2>Licenses & Certifications</h2>
      <ul>${data.certifications.map(c => `<li>${c}</li>`).join("")}</ul>
    </div>
    <div class="card">
      <h2>Honors & Awards</h2>
      <ul>${data.awards.map(a => `<li>${a}</li>`).join("")}</ul>
    </div>
  `;
}

function renderEducation(list) {
  document.getElementById("education").innerHTML = `
    <h2>Education</h2>
    <ul>${list.map(e => `<li>${e}</li>`).join("")}</ul>
  `;
}

function renderInterests(text) {
  document.getElementById("interests").innerHTML = `
    <h2>Interests</h2>
    <p>${text}</p>
  `;
}

function renderContact(data) {
  document.getElementById("contact").innerHTML = `
    <h2>Contact</h2>
    <div class="grid cols-3">
      <div><div class="small">Email</div><a href="mailto:${data.email}">${data.email}</a></div>
      <div><div class="small">Phone</div><a href="tel:${data.phone}">${data.phone}</a></div>
      <div><div class="small">Location</div><span>${data.location}</span></div>
    </div>
  `;
}

// --- Main ---
async function loadPortfolio() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    renderHero(data.hero);
    renderProfile(data.profile);
    renderExperience(data.experience);
    renderSkills(data.skills);
    renderCertifications(data);
    renderEducation(data.education);
    renderInterests(data.interests);
    renderContact(data.contact);

    document.getElementById("year").textContent = new Date().getFullYear();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadPortfolio);

// --- PDF Generation ---
function generatePDF() {
  document.querySelector('header').style.display = 'none';
  window.print();
  setTimeout(() => {
    document.querySelector('header').style.display = '';
  }, 1000);
}
