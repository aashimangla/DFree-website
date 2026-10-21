
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("advisorGrid");

    // This script is only for the advisors page.
    if (!grid) return;

    const searchInput = document.getElementById("advisorSearch");
    const filterButtons = document.querySelectorAll(".advisor-filter");
    const resetButton = document.getElementById("advisorReset");
    const emptyResetButton = document.getElementById("advisorEmptyReset");
    const emptyMessage = document.getElementById("advisorEmpty");

    /*
     * These are expertise categories, not individual advisor profiles.
     * Add verified advisor names and qualifications when those details
     * are available for publication.
     */
    const expertiseAreas = [
        {
            id: "01",
            category: "research",
            categoryLabel: "Research & Academic",
            title: "Research Methodology",
            description:
                "Guidance on research design, methodology, literature reviews, and structuring academic projects.",
            icon: "⌘",
            keywords: "research thesis dissertation methodology literature review"
        },
        {
            id: "02",
            category: "research",
            categoryLabel: "Research & Academic",
            title: "Data Analysis",
            description:
                "Support with research data, analytical approaches, interpretation, and presenting findings.",
            icon: "◫",
            keywords: "statistics data analysis quantitative qualitative findings"
        },
        {
            id: "03",
            category: "publication",
            categoryLabel: "Publication",
            title: "Journal Publication",
            description:
                "Guidance on manuscript preparation, journal selection, submission requirements, and reviewer feedback.",
            icon: "▤",
            keywords: "journal manuscript scopus peer review submission publication"
        },
        {
            id: "04",
            category: "publication",
            categoryLabel: "Publication",
            title: "Academic Editing",
            description:
                "Improve manuscript clarity, academic structure, language, and consistency while preserving your ideas.",
            icon: "✎",
            keywords: "editing proofreading academic writing manuscript language"
        },
        {
            id: "05",
            category: "technology",
            categoryLabel: "Technology",
            title: "Website Development",
            description:
                "Explore web development approaches for accessible, responsive, and maintainable websites.",
            icon: "⌘",
            keywords: "website web development frontend backend responsive design"
        },
        {
            id: "06",
            category: "technology",
            categoryLabel: "Technology",
            title: "Software & Applications",
            description:
                "Discuss software requirements, application development, technical planning, and digital solutions.",
            icon: "◇",
            keywords: "software apps application programming systems technology"
        },
        {
            id: "07",
            category: "digital",
            categoryLabel: "Digital Growth",
            title: "Digital Marketing",
            description:
                "Explore content strategy, social media, audience engagement, and digital campaign planning.",
            icon: "↗",
            keywords: "marketing social media content advertising digital campaigns"
        },
        {
            id: "08",
            category: "digital",
            categoryLabel: "Digital Growth",
            title: "Business Growth Strategy",
            description:
                "Identify opportunities to improve your online presence, generate leads, and strengthen your digital offering.",
            icon: "◎",
            keywords: "business strategy lead generation branding growth online presence"
        }
    ];

    let activeFilter = "all";

    function renderCards() {
        const query = searchInput.value.trim().toLowerCase();

        const filteredAreas = expertiseAreas.filter(function (area) {
            const matchesCategory =
                activeFilter === "all" ||
                area.category === activeFilter;

            const searchableText = [
                area.title,
                area.categoryLabel,
                area.description,
                area.keywords
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(query);

            return matchesCategory && matchesSearch;
        });

        grid.innerHTML = filteredAreas.map(function (area) {
            const consultationUrl =
                "consultation.html?subject=" +
                encodeURIComponent(area.title);

            return `
                <article class="advisor-expertise-card">
                    <div class="advisor-card-top">
                        <span class="advisor-card-icon"
                              aria-hidden="true">${area.icon}</span>
                        <span class="advisor-card-index">${area.id}</span>
                    </div>

                    <span class="advisor-card-category">
                        ${area.categoryLabel}
                    </span>

                    <h3>${area.title}</h3>

                    <p>${area.description}</p>

                    <a class="advisor-card-link"
                       href="${consultationUrl}">
                        Discuss your needs <span>→</span>
                    </a>
                </article>
            `;
        }).join("");

        emptyMessage.hidden = filteredAreas.length > 0;
        grid.hidden = filteredAreas.length === 0;
    }

    function setFilter(filter) {
        activeFilter = filter;

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.filter === filter;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        renderCards();
    }

    function resetFilters() {
        searchInput.value = "";
        setFilter("all");
        searchInput.focus();
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            setFilter(button.dataset.filter);
        });
    });

    searchInput.addEventListener("input", renderCards);

    resetButton.addEventListener("click", resetFilters);
    emptyResetButton.addEventListener("click", resetFilters);

    // Display all expertise cards when the page first loads.
    renderCards();
});

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("advisorGrid");

    // Do not run on other pages.
    if (!grid) return;

    const searchInput = document.getElementById("advisorSearch");
    const count = document.getElementById("advisorCount");
    const noResults = document.getElementById("advisorNoResults");

    // Add more verified advisors to this array as needed.
    const advisors = [
        {
            id: 1,
            name: "Dr. Iqtidar A. Shah",
            photo: "images/advisors/iqtidar-shah.jpg",
            qualification: "Ph.D. (Economics), M.A. Economics, B.A., B.Com",
            location: "Surrey, British Columbia, Canada",
            subject: "Economics",
            role: "Professor | Researcher | Academic Leader"
        },
        {
            id: 2,
            name: "Dr. Prabha Garg",
            photo: "images/advisors/prabha-garg.jpg",
            qualification: "Ph.D. in Management (Finance)",
            location: "Meerut, Uttar Pradesh, India",
            subject: "Finance",
            role: "Associate Professor | Finance Researcher | Academic Leader"
        },
        {
            id: 3,
            name: "Dr. Pooja Sharma",
            photo: "images/advisors/pooja-sharma.jpg",
            qualification:
                "Ph.D. in Management (Human Resource Management)",
            location: "Meerut, Uttar Pradesh",
            subject: "Human Resources",
            role: "Assistant Professor | Academic Leader | HR Expert"
        }
    ];

    function renderAdvisors() {
        const query = searchInput.value.trim().toLowerCase();

        const filtered = advisors.filter(function (advisor) {
            const searchable = [
                advisor.name,
                advisor.qualification,
                advisor.location,
                advisor.subject,
                advisor.role
            ].join(" ").toLowerCase();

            return searchable.includes(query);
        });

        count.textContent = filtered.length
            ? `Showing 1–${filtered.length} of ${filtered.length} advisors`
            : "Showing 0 advisors";

        noResults.hidden = filtered.length !== 0;
        grid.hidden = filtered.length === 0;

        grid.innerHTML = filtered.map(function (advisor) {
            return `
                <article class="advisor-card">

                    <div class="advisor-card-header">
                        <img
                            class="advisor-photo"
                            src="${advisor.photo}"
                            alt="Portrait of ${advisor.name}"
                            loading="lazy"
                            onerror="this.style.visibility='hidden'"
                        >

                        <h2>${advisor.name}</h2>

                        <p class="advisor-qualification">
                            ${advisor.qualification}
                        </p>

                        <p class="advisor-location">
                            <span aria-hidden="true">📍</span>
                            ${advisor.location}
                        </p>
                    </div>

                    <div class="advisor-card-body">
                        <span class="advisor-subject">
                            ${advisor.subject}
                        </span>

                        <p class="advisor-role">${advisor.role}</p>

                        <button
                            class="advisor-profile-toggle"
                            type="button"
                            aria-expanded="false"
                            aria-controls="advisor-details-${advisor.id}"
                        >
                            VIEW FULL PROFILE
                            <span class="advisor-chevron"
                                  aria-hidden="true">⌄</span>
                        </button>

                        <div
                            class="advisor-profile-details"
                            id="advisor-details-${advisor.id}"
                            hidden
                        >
                            <h3>${advisor.name}</h3>

                            <span class="advisor-detail-label">
                                Qualifications
                            </span>
                            <p>${advisor.qualification}</p>

                            <span class="advisor-detail-label">
                                Area of Expertise
                            </span>
                            <p>${advisor.subject}</p>

                            <span class="advisor-detail-label">
                                Professional Role
                            </span>
                            <p>${advisor.role}</p>

                            <span class="advisor-detail-label">
                                Location
                            </span>
                            <p>${advisor.location}</p>

                            <a
                                class="advisor-consult-link"
                                href="consultation.html?advisor=${encodeURIComponent(advisor.name)}"
                            >
                                Enquire About Consultation <span>→</span>
                            </a>
                        </div>
                    </div>

                </article>
            `;
        }).join("");
    }

    // Expand or collapse the selected advisor's profile.
    grid.addEventListener("click", function (event) {
        const button = event.target.closest(".advisor-profile-toggle");

        if (!button) return;

        const expanded = button.getAttribute("aria-expanded") === "true";
        const detailsId = button.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);

        button.setAttribute("aria-expanded", String(!expanded));
        details.hidden = expanded;

        button.firstChild.textContent = expanded
            ? "VIEW FULL PROFILE "
            : "HIDE FULL PROFILE ";
    });

    // Search by advisor name, qualification, location, subject or role.
    searchInput.addEventListener("input", renderAdvisors);

    renderAdvisors();
});

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("advisorGrid");
    if (!grid) return;

    const search = document.getElementById("advisorSearch");
    const count = document.getElementById("advisorCount");
    const noResults = document.getElementById("advisorNoResults");

    /*
     * ADVISOR TEMPLATE
     * Replace the sample values below with real advisor details.
     *
     * photo: Path to the image in your project.
     * Leave photo as "" to show initials instead.
     * Copy an object to add another advisor.
     */
    const advisors = [
        {
            name: "Advisor Name",
            photo: "",
            qualification: "Ph.D. / Relevant Qualifications",
            location: "City, Province, Canada",
            subject: "Research",
            role: "Professor | Researcher | Academic Leader",
            bio: "Add a short professional biography here.",
            expertise: ["Research Methodology", "Academic Writing"]
        },
        {
            name: "Advisor Name",
            photo: "",
            qualification: "Ph.D. / Relevant Qualifications",
            location: "City, Province, Canada",
            subject: "Finance",
            role: "Finance Researcher | Academic Professional",
            bio: "Add a short professional biography here.",
            expertise: ["Finance", "Financial Research"]
        },
        {
            name: "Advisor Name",
            photo: "",
            qualification: "Ph.D. / Relevant Qualifications",
            location: "City, Province, Canada",
            subject: "Technology",
            role: "Technology Professional | Consultant",
            bio: "Add a short professional biography here.",
            expertise: ["Software", "Digital Transformation"]
        }
    ];

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function initials(name) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0))
            .join("")
            .toUpperCase() || "?";
    }

    function renderAdvisors() {
        const query = search.value.trim().toLowerCase();

        const filtered = advisors.filter(function (advisor) {
            const searchable = [
                advisor.name,
                advisor.qualification,
                advisor.location,
                advisor.subject,
                advisor.role,
                advisor.bio,
                ...(advisor.expertise || [])
            ].join(" ").toLowerCase();

            return searchable.includes(query);
        });

        count.textContent = query
            ? `Showing ${filtered.length} of ${advisors.length} advisors`
            : `Showing 1–${advisors.length} of ${advisors.length} advisors`;

        noResults.hidden = filtered.length > 0;
        grid.hidden = filtered.length === 0;

        grid.innerHTML = filtered.map(function (advisor, index) {
            const id = `advisor-profile-${index}`;
            const name = escapeHTML(advisor.name);
            const photo = escapeHTML(advisor.photo);
            const photoMarkup = photo
                ? `<img class="advisor-portrait"
                        src="${photo}"
                        alt="Portrait of ${name}"
                        loading="lazy">`
                : `<div class="advisor-photo-placeholder"
                        aria-label="Photo placeholder for ${name}">
                        ${escapeHTML(initials(advisor.name))}
                   </div>`;

            const expertiseMarkup = (advisor.expertise || [])
                .map(item => escapeHTML(item))
                .join(", ");

            return `
                <article class="advisor-profile-card">

                    <div class="advisor-profile-header">
                        ${photoMarkup}
                        <h3>${name}</h3>
                        <p class="advisor-profile-qualification">
                            ${escapeHTML(advisor.qualification)}
                        </p>
                        <p class="advisor-profile-location">
                            <span aria-hidden="true">📍</span>
                            ${escapeHTML(advisor.location)}
                        </p>
                    </div>

                    <div class="advisor-profile-body">
                        <span class="advisor-profile-subject">
                            ${escapeHTML(advisor.subject)}
                        </span>

                        <p class="advisor-profile-role">
                            ${escapeHTML(advisor.role)}
                        </p>

                        <button
                            type="button"
                            class="advisor-profile-toggle"
                            aria-expanded="false"
                            aria-controls="${id}"
                        >
                            VIEW FULL PROFILE
                            <span class="advisor-chevron"
                                  aria-hidden="true">⌄</span>
                        </button>

                        <div class="advisor-profile-details"
                             id="${id}" hidden>
                            <h4>${name}</h4>

                            <p>${escapeHTML(advisor.bio)}</p>

                            <p>
                                <strong>Expertise:</strong>
                                ${expertiseMarkup || "Add expertise areas"}
                            </p>

                            <p>
                                <strong>Qualifications:</strong>
                                ${escapeHTML(advisor.qualification)}
                            </p>

                            <a class="advisor-consult-link"
                               href="consultation.html?advisor=${encodeURIComponent(advisor.name)}">
                                Enquire About Consultation →
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    grid.addEventListener("click", function (event) {
        const button = event.target.closest(".advisor-profile-toggle");
        if (!button) return;

        const expanded = button.getAttribute("aria-expanded") === "true";
        const details = document.getElementById(
            button.getAttribute("aria-controls")
        );

        button.setAttribute("aria-expanded", String(!expanded));
        details.hidden = expanded;

        button.childNodes[0].textContent = expanded
            ? "VIEW FULL PROFILE "
            : "HIDE FULL PROFILE ";
    });

    search.addEventListener("input", renderAdvisors);

    renderAdvisors();
});
