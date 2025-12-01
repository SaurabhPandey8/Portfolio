/* -----------------------------
    SCRIPT.JS — Portfolio Logic
------------------------------ */

// ---------- YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- MOBILE NAV ----------
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // Save preference
    const mode = document.body.classList.contains("light")
      ? "light"
      : "dark";
    localStorage.setItem("theme", mode);
  });

  // Load saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
  }
}

// ---------- DOWNLOAD CV ----------
document.getElementById("cvBtn")?.addEventListener("click", () => {
  const cvUrl = "/mnt/data/a753700d-e845-4978-bf9e-ca582553b0bf.pdf"; // Your uploaded PDF path
  const a = document.createElement("a");
  a.href = cvUrl;
  a.download = "Saurabh_Kumar_Pandey_CV.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// ---------- FORM VALIDATION ----------
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = "Please fill all fields.";
      formMsg.style.color = "#ff6b6b";
      return;
    }

    // Basic email regex
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    if (!emailValid) {
      formMsg.textContent = "Enter a valid email.";
      formMsg.style.color = "#ff6b6b";
      return;
    }

    // Save locally
    const submissions =
      JSON.parse(localStorage.getItem("submissions") || "[]");

    submissions.push({
      name,
      email,
      message,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("submissions", JSON.stringify(submissions));

    formMsg.textContent = "Message received! I will reply soon.";
    formMsg.style.color = "#4f8cff";
    form.reset();
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    form.reset();
    formMsg.textContent = "";
  });
}

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile nav after click (mobile only)
      nav.classList.remove("show");
    }
  });
});

// ---------- EXTERNAL LINKS OPEN IN NEW TAB ----------
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.rel = "noopener noreferrer";
});
