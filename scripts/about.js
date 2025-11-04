document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about");
    const photo = aboutSection.querySelector(".photo");
    const text = aboutSection.querySelector(".text-p");
    const lines = aboutSection.querySelectorAll(".line, .line2");
    const title = aboutSection.querySelector("h2");

    [photo, text, ...lines, title].forEach(el => {
        el.classList.add("hidden");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    photo.classList.add("slide-in-left");
                    title.classList.add("fade-in");

                    setTimeout(() => {
                        lines[0].classList.add("grow-left-to-right");
                    }, 500);

                    setTimeout(() => {
                        lines[1].classList.add("grow-left-to-right");
                    }, 800);

                    setTimeout(() => {
                        text.classList.add("fade-in-up");
                    }, 1000);

                    observer.unobserve(aboutSection);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(aboutSection);
});
