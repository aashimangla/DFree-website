document.addEventListener("DOMContentLoaded", function () {

    // Load Header
    fetch("components/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header");
            }
            return response.text();
        })
        .then(data => {
            const header = document.getElementById("header");

            if (header) {
                header.innerHTML = data;

                const menuToggle = document.getElementById("menuToggle");
                const mobileNav = document.getElementById("mobileNav");

                if (menuToggle && mobileNav) {
                    menuToggle.addEventListener("click", function () {
                        mobileNav.classList.toggle("active");
                    });
                }
            }
        })
        .catch(error => {
            console.error("Error loading header:", error);
        });


    // Load Footer
    fetch("components/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load footer");
            }
            return response.text();
        })
        .then(data => {
            const footer = document.getElementById("footer");

            if (footer) {
                footer.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });


    // Load Consultation Component
    const consultationContainer = document.getElementById(
        "consultation-form-container"
    );

    if (consultationContainer) {
        fetch("components/consultation-form.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load consultation form");
                }
                return response.text();
            })
            .then(data => {
                consultationContainer.innerHTML = data;

                // Attach submit handler after component loads
                const consultationForm =
                    consultationContainer.querySelector("#consultationForm");

                if (consultationForm) {
                    consultationForm.addEventListener("submit", function (event) {
                        event.preventDefault();

                        alert(
                            "Thank you! Your consultation request has been received."
                        );

                        consultationForm.reset();
                    });
                }
            })
            .catch(error => {
                console.error("Error loading consultation form:", error);
            });
    }

});
