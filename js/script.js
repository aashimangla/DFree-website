document.addEventListener("DOMContentLoaded", function () {

    // Load Header
    fetch("components/header.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("header").innerHTML = data;

            const menuToggle = document.getElementById("menuToggle");
            const mobileNav = document.getElementById("mobileNav");

            menuToggle.addEventListener("click", function () {
                mobileNav.classList.toggle("active");
            });

        })
        .catch(error => {
            console.error("Error loading header:", error);
        });


    // Load Footer
    fetch("components/footer.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("footer").innerHTML = data;

        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });

});