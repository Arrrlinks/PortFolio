document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    if (!timeline || typeof EXPERIENCES === "undefined") return;

    /* ----------------------------------------------------------
       1. Build timeline items from the data array
    ---------------------------------------------------------- */
    EXPERIENCES.forEach((exp, index) => {
        // Alternate: even index → left, odd index → right
        const side = index % 2 === 0 ? "tl-left" : "tl-right";

        const item = document.createElement("div");
        item.className = `timeline-item ${side}`;

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card tl-hidden">
                <div class="tl-header">
                    <span class="tl-type">${exp.type}</span>
                    <span class="tl-dates">${exp.startDate} - ${exp.endDate}</span>
                </div>
                <h3 class="tl-title">${exp.title}</h3>
                <div class="tl-company">${exp.company}</div>
                <div class="tl-location">${exp.location}</div>
                <p class="tl-desc">${exp.description}</p>
            </div>
        `;

        timeline.appendChild(item);
    });

    /* ----------------------------------------------------------
       2. Animate the vertical bar when the section enters view
    ---------------------------------------------------------- */
    const bar  = document.getElementById("timeline-bar");
    const section = document.getElementById("experience");

    const barObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    bar.classList.add("tl-bar-grow");
                    barObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    if (section) barObserver.observe(section);

    /* ----------------------------------------------------------
       3. Animate each card as it scrolls into view
    ---------------------------------------------------------- */
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Slight stagger based on vertical order
                    const delay = parseInt(entry.target.closest(".timeline-item")?.dataset.index || "0", 10) * 80;
                    setTimeout(() => {
                        entry.target.classList.add("tl-visible");
                    }, delay);
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    // Re-query after DOM insertion
    timeline.querySelectorAll(".timeline-card").forEach((card, i) => {
        // Store index on parent item for stagger calculation
        card.closest(".timeline-item").dataset.index = i;
        cardObserver.observe(card);
    });
});

