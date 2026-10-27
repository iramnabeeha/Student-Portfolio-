// Edit these arrays with your own skills and projects.
const skills = [
  { name: "HTML & CSS", level: 95 },
  { name: "JavaScript", level: 85 },
  { name: "Python", level: 90 },
  { name: "Machine Learning", level: 80 }
];

const projects = [
  { title: "Student Portfolio Website", category: "Web", desc: "A responsive portfolio website built with HTML,CSS and JavaScript. It has project filtering, a downloadable resume and a validated contact form.", link: "#" },
];

// Responsive navigation
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
});

// Skills (bars fill when scrolled into view)
const skillList = document.getElementById("skillList");
skills.forEach(s => {
  skillList.insertAdjacentHTML("beforeend",
    `<div class="skill"><span>${s.name}<span>${s.level}%</span></span>
     <div class="bar"><i data-level="${s.level}"></i></div></div>`);
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.level + "%";
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".bar i").forEach(b => observer.observe(b));

// Projects with filtering
const grid = document.getElementById("projectGrid");
const filters = document.getElementById("filters");
const categories = ["All", ...new Set(projects.map(p => p.category))];

function showProjects(category) {
  const list = category === "All" ? projects : projects.filter(p => p.category === category);
  grid.innerHTML = list.map(p =>
    `<article class="card"><div class="tags">${p.category}</div>
     <h3>${p.title}</h3><p>${p.desc}</p>
     <a href="${p.link}" target="_blank" rel="noopener">View project</a></article>`).join("");
}
categories.forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "chip" + (i === 0 ? " active" : "");
  b.textContent = c;
  b.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    showProjects(c);
  });
  filters.appendChild(b);
});
showProjects("All");

// Contact form validation
const form = document.getElementById("contactForm");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function check(id, message, valid) {
  const field = document.getElementById(id);
  document.getElementById(id + "Err").textContent = valid ? "" : message;
  field.classList.toggle("bad", !valid);
  return valid;
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const ok = [
    check("name", "Enter your name.", name !== ""),
    check("email", "Enter a valid email address.", emailPattern.test(email)),
    check("message", "Enter a message.", message !== "")
  ].every(Boolean);
  const status = document.getElementById("formOk");
  status.textContent = ok ? "Thanks, your message is ready to send." : "";
  if (ok) form.reset();
});
