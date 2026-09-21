/* ==================== MOBILE MENU ==================== */

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* ==================== CLOSE MENU ON LINK CLICK ==================== */

const navLinks = document.querySelectorAll(".nav__link, .nav__contact");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("show-menu");
    }
  });
});

/* ==================== HEADER SCROLL ==================== */

const header = document.getElementById("header");

function handleHeaderScroll() {
  if (!header) return;

  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

/* ==================== SCROLL UP ==================== */

const scrollUp = document.getElementById("scroll-up");

function handleScrollUp() {
  if (!scrollUp) return;

  if (window.scrollY >= 350) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", handleScrollUp);

/* ==================== ACTIVE NAV LINK ==================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav__link").forEach((item) => {
        item.classList.remove("active-link");
      });

      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

/* ==================== TYPED TEXT ==================== */

if (typeof Typed !== "undefined" && document.getElementById("home-typed")) {
  new Typed("#home-typed", {
    strings: ["Backend Developer", "Web Developer", "Full Stack Developer"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1800,
    loop: true,
  });
}

/* ==================== SCROLL REVEAL ==================== */

if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    distance: "40px",
    duration: 1000,
    delay: 100,
    reset: false,
  });

  sr.reveal(".home__content", {
    origin: "left",
  });

  sr.reveal(".home__circle", {
    origin: "right",
  });

  sr.reveal(".about__data", {
    origin: "bottom",
  });

  sr.reveal(".work__card", {
    origin: "bottom",
    interval: 150,
  });

  sr.reveal(".skills__group", {
    origin: "bottom",
    interval: 100,
  });

  sr.reveal(".contact__form", {
    origin: "left",
  });

  sr.reveal(".contact__info", {
    origin: "right",
  });
}

/* ==================== EMAILJS ==================== */

const EMAILJS_PUBLIC_KEY = "KjWunYM7Q9hwsCPkI";
const EMAILJS_SERVICE_ID = "service_xx5cvm7";
const EMAILJS_TEMPLATE_ID = "template_x9kitoh";

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

/* ==================== CONTACT FORM ==================== */

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
const contactSubmit = document.getElementById("contact-submit");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactMessage || !contactSubmit) {
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (typeof emailjs === "undefined") {
      contactMessage.textContent =
        "Email service is not loaded. Please refresh the page and try again.";

      contactMessage.classList.remove("success");
      contactMessage.classList.add("error");

      return;
    }

    contactSubmit.disabled = true;

    contactSubmit.innerHTML = 'Sending... <i class="ri-loader-4-line"></i>';

    contactMessage.textContent = "";
    contactMessage.classList.remove("success", "error");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      contactMessage.textContent =
        "Message sent successfully! I'll get back to you soon.";

      contactMessage.classList.remove("error");
      contactMessage.classList.add("success");

      contactForm.reset();

      contactSubmit.innerHTML = 'Message Sent <i class="ri-check-line"></i>';

      setTimeout(() => {
        contactSubmit.disabled = false;

        contactSubmit.innerHTML =
          'Send Message <i class="ri-send-plane-line"></i>';
      }, 3000);

      setTimeout(() => {
        contactMessage.textContent = "";
        contactMessage.classList.remove("success");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);

      contactMessage.textContent =
        "Message could not be sent. Please try again later.";

      contactMessage.classList.remove("success");
      contactMessage.classList.add("error");

      contactSubmit.disabled = false;

      contactSubmit.innerHTML =
        'Send Message <i class="ri-send-plane-line"></i>';
    }
  });
}
