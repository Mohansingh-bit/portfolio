console.log("Portfolio loaded successfully");
const video = document.querySelector("video");

video.addEventListener("canplay", () => {
    video.classList.add("ready");
});
