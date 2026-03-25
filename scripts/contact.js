document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-status");
    const submitButton = document.getElementById("contact-submit");

    if (!form || !status || !submitButton) return;

    const webhookUrl = "https://n8n.antoinef.fr/webhook/contact";

    const setStatus = (message, state = "") => {
        status.textContent = message;
        status.classList.remove("is-error", "is-success");
        if (state) status.classList.add(state);
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus("Please fill in all required fields.", "is-error");
            return;
        }

        const formData = new FormData(form);
        const payload = {
            firstName: formData.get("firstName")?.toString().trim() || "",
            lastName: formData.get("lastName")?.toString().trim() || "",
            email: formData.get("email")?.toString().trim() || "",
            whoAreYou: formData.get("whoAreYou")?.toString().trim() || "",
            message: formData.get("message")?.toString().trim() || "",
            source: "portfolio-contact"
        };

        submitButton.disabled = true;
        setStatus("Sending...");

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                setStatus("Could not send your message right now. Please try again.", "is-error");
                return;
            }

            form.reset();
            setStatus("Message sent successfully.", "is-success");
        } catch (error) {
            setStatus("Could not send your message right now. Please try again.", "is-error");
            console.error("Contact form send error:", error);
        } finally {
            submitButton.disabled = false;
        }
    });
});


