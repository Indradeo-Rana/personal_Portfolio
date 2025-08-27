//  main.js

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     NAV: mobile toggle + outside close
     ------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    // toggle open/close
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent trigger from document click
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("show");
    });

    // close nav when clicking a link (mobile)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("show")) {
        const isClickInside = navLinks.contains(e.target) || navToggle.contains(e.target);
        if (!isClickInside) {
          navLinks.classList.remove("show");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  /* -------------------------
     Tabs (About section)
     ------------------------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabContents.forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-hidden", "true");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const tabId = btn.dataset.tab;
      const tabEl = document.getElementById(tabId);
      if (tabEl) {
        tabEl.classList.add("active");
        tabEl.setAttribute("aria-hidden", "false");
      }
    });
  });

  /* -------------------------
     Project filters
     ------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const categories = card.dataset.category || "";
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* -------------------------
     Project modal (data + events)
     ------------------------- */
  const projectsData = {
    1: {
      title: "Library Database Management System",
      image: "https://images.unsplash.com/photo-1712844775908-53b541754d10?w=1200&auto=format&fit=crop&q=60",
      description:
        "An efficient Library Management System that handles book inventory, member records, and issue/return transactions with real-time tracking.",
      tech: ["Java", "Servlet/JSP", "JavaFX", "MySQL", "JDBC"],
      features: ["Book inventory management", "Member records management", "Issue/return transaction handling", "Real-time tracking"],
      links: [{ icon: "fab fa-github", text: "View Code", url: "#" }],
    },
    2: {
      title: "Banking Microservice",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52c?auto=format&fit=crop&q=80",
      description: "A scalable banking transaction system built with Spring Boot and Kafka.",
      tech: ["Java", "Spring Boot", "Kafka", "Docker"],
      features: ["Event-driven transactions", "Scalability", "Fault tolerance"],
      links: [{ icon: "fab fa-github", text: "View Code", url: "#" }],
    },
    3: {
      title: "Personal Portfolio",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80",
      description: "A drag-and-drop portfolio website builder.",
      tech: ["HTML", "CSS", "JS", "Firebase"],
      features: ["Drag-and-drop", "Live preview"],
      links: [{ icon: "fas fa-external-link-alt", text: "Live Demo", url: "#" }],
    },
    4: {
      title: "Inventory Management",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      description: "Microservice-based inventory system.",
      tech: ["Java", "Spring Cloud", "MySQL", "Redis"],
      features: ["Real-time stock tracking", "Automated reordering"],
      links: [{ icon: "fab fa-github", text: "View Code", url: "#" }],
    },
    5: {
      title: "Memory Card Game",
      image: "https://plus.unsplash.com/premium_photo-1677870728119-52aef052d7ef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
      description: "A Memory Card Game with Emoji & Number modes.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      features: ["Timer", "Move counter", "Dual modes"],
      links: [{ icon: "fab fa-github", text: "View Code", url: "https://github.com/indradeo-rana/memory-card-game" }],
    },
  };

  const viewDetailBtns = document.querySelectorAll(".view-details");
  const projectModal = document.querySelector(".project-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  const openModal = (projectId) => {
    const project = projectsData[projectId];
    if (!project || !projectModal) return;
    projectModal.querySelector(".modal-img").src = project.image;
    projectModal.querySelector(".modal-img").alt = project.title;
    projectModal.querySelector(".modal-content .project-title").textContent = project.title;
    projectModal.querySelector(".modal-description").textContent = project.description;

    const modalTech = projectModal.querySelector(".modal-tech");
    modalTech.innerHTML = "";
    project.tech.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tech-tag";
      span.textContent = t;
      modalTech.appendChild(span);
    });

    const featuresList = projectModal.querySelector(".features-list");
    featuresList.innerHTML = "";
    project.features.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresList.appendChild(li);
    });

    const modalLinks = projectModal.querySelector(".modal-links");
    modalLinks.innerHTML = "";
    project.links.forEach((lnk) => {
      const a = document.createElement("a");
      a.className = "project-link " + (lnk.text === "Live Demo" ? "outline" : "");
      a.href = lnk.url;
      a.innerHTML = `<i class="${lnk.icon}"></i> ${lnk.text}`;
      a.target = "_blank";
      modalLinks.appendChild(a);
    });

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  viewDetailBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pid = btn.dataset.project;
      openModal(pid);
    });
  });

  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* -------------------------
     Contact form validation + demo EmailJS send (Go to contact.js)
     ------------------------- */

  /* -------------------------
     Back to top smooth scroll
     ------------------------- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------
     Auto-update year
     ------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------
     Typed.js for intro roles
     ------------------------- */
  if (window.Typed) {
    new Typed("#element", {
      strings: [
        "Web Development.",
        "Java Programming.",
        "MicroServices Architecture.",
        "Building Scalable Solutions.",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });
  }

});
