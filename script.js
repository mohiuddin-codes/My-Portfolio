 // 1. Mobile Navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close menu with Esc key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// 2. Typing Animation
const typingText = document.getElementById("typing-text");

const words = [
    "Web Developer",
    "C++ Programmer",
    "ICE Student",
    "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1200;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// 3. Scroll Reveal Animation
const sections = document.querySelectorAll("section:not(.hero)");

sections.forEach(section => {
    section.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    revealObserver.observe(section);
});


// 4. Highlight Current Section in Navbar
const navAnchors = document.querySelectorAll(".nav-links a");

const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                a.classList.toggle(
                    "current",
                    a.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section[id]").forEach(section => {
    spy.observe(section);
});


// 5. Dynamic Footer Year
document.getElementById("year").textContent = new Date().getFullYear();


// 6. Initialize EmailJS
(function () {
    emailjs.init({
        publicKey: "pDm-e-BzJcK8TMswB",
    });
})();


// 7. Contact Form Submission
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Loading State
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    formStatus.textContent = "";
    formStatus.className = "";

    // Send Email
    emailjs.sendForm(
        "service_gueby0o",
        "template_ggzul6r",
        this
    ).then(
        function () {
            formStatus.textContent = "Message sent successfully!";
            formStatus.className = "success";
            contactForm.reset();
        },
        function (error) {
            formStatus.textContent = "Failed to send message. Please try again.";
            formStatus.className = "error";
            console.log("EmailJS Error:", error);
        }
    ).finally(function () {
        // Reset Button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    });

});
// 8. আরও লোগো, পুরো পেজ জুড়ে
window.addEventListener("load", () => {
    const techBg = document.querySelector(".tech-bg");
    const originals = Array.from(techBg.children);
    const total = Math.round(document.body.scrollHeight / 120);

    for (let i = 0; i < total; i++) {
        const clone = originals[i % originals.length].cloneNode(true);
        clone.style.left = Math.random() * 92 + "%";
        clone.style.top = Math.random() * 95 + "%";
        clone.style.animationDelay = (Math.random() * -20) + "s";
        techBg.appendChild(clone);
    }
});