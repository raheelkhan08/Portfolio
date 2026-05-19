const yearElement = document.querySelector("#year");
const navLinks = document.querySelectorAll(".nav-links a");
const navMenu = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const revealItems = document.querySelectorAll(".reveal");
const skillItems = document.querySelectorAll(".skill-item");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

function updateThemeButton() {
  if (!themeToggle) {
    return;
  }

  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.textContent = isDark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch light mode" : "Switch dark mode");
}

updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";

    if (isDark) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }

    updateThemeButton();
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    if (navMenu && menuToggle) {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

skillItems.forEach((item) => {
  const level = item.dataset.level || "0";
  item.style.setProperty("--level", `${level}%`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => revealObserver.observe(item));
skillItems.forEach((item) => revealObserver.observe(item));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:raheel@example.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Your email app is opening with the message ready to send.";
    }
  });
}
