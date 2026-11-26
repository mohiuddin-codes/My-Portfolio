
//1. Mobile Navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// 2. Typing Animation
const typingText = document.getElementById("typing-text");

 const words = [
    "Developer",
    "Programmer",
    "Software Engineer",
    "Tech Enthusiast",
    "Full Stack Developer"
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
const sections = document.querySelectorAll(
    "section:not(.hero)"
);

sections.forEach(section => {
    section.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    observer.observe(section);
});


// 4. Dynamic Footer Year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Initialize EmailJS
(function () {
    emailjs.init({
        publicKey: "pDm-e-BzJcK8TMswB",
    });
})();

// Contact Form Submission
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

            formStatus.textContent =
                "Message sent successfully!";

            formStatus.className = "success";

            contactForm.reset();

        },
        function (error) {

            formStatus.textContent =
                "Failed to send message. Please try again.";

            formStatus.className = "error";

            console.log("EmailJS Error:", error);

        }
    ).finally(function () {

        // Reset Button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

    });

});

 