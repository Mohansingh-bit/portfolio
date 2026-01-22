console.log("Portfolio loaded successfully");
const video = document.querySelector("video");

video.addEventListener("canplay", () => {
    video.classList.add("ready");
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Close menu when link is clicked
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

