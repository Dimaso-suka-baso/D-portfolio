document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah pengiriman default agar animasi berjalan

        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPopup("Your message has been sent successfully!");
                form.reset(); // Reset form setelah berhasil submit
            } else {
                showPopup("Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showPopup("An error occurred. Please try again.");
        });
    });

    function showPopup(message) {
        const popup = document.createElement("div");
        popup.classList.add("popup-message");
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("fade-out");
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, 2000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const skillCards = document.querySelectorAll(".skill-card");
    const projectCards = document.querySelectorAll(".project-card");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger animasi saat 50% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("flipped"); // Tambahkan class 'flipped' untuk memutar card
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi dipicu
            }
        });
    }, observerOptions);

    // Observasi setiap skill card
    skillCards.forEach((card) => {
        observer.observe(card);
    });

    // Observasi setiap project card
    projectCards.forEach((card) => {
        observer.observe(card);
    });
});