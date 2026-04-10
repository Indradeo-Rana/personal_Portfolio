//  main.js

/* Page loader management */
const pageLoader = document.getElementById("pageLoader");
const hideLoader = () => {
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add("hidden");
    }, 300);
  }
};

window.addEventListener("load", hideLoader);
if (document.readyState === "complete") hideLoader();
setTimeout(hideLoader, 3000);

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     Page loader hide
     ------------------------- */
  hideLoader();

  /* -------------------------
     Scroll reveal animation
     ------------------------- */
  const revealTargets = document.querySelectorAll(".fade-in");
  if (revealTargets.length) {
    document.body.classList.add("reveal-ready");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16 }
      );

      revealTargets.forEach((target) => revealObserver.observe(target));
    }
  }

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
      projectCards.forEach((card, index) => {
        const categories = card.dataset.category || "";
        const isMatch = filter === "all" || categories.includes(filter);
        if (isMatch) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.add("is-visible");
          }, 20 + index * 80);
        } else {
          card.style.display = "none";
          card.classList.remove("is-visible");
        }
      });
    });
  });

  /* Initialize project card stagger reveal */
  if (document.body.classList.contains("reveal-ready")) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting && entry.target.classList.contains("project-card")) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, 40 + Array.from(projectCards).indexOf(entry.target) * 100);
          }
        });
      },
      { threshold: 0.08 }
    );
    projectCards.forEach((card) => revealObserver.observe(card));
  }

  /* -------------------------
     Project modal (data + events)
     ------------------------- */
  const projectsData = {
    6: {
      title: "CloudShare - File Storage & Sharing App",
      image: "https://plus.unsplash.com/premium_photo-1770710526963-3e2aaf94345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWQlMjBzaGFyaW5nfGVufDB8fDB8fHww",
      description:
        "A user-friendly cloud storage and file sharing system that allows users to upload, manage, and share files securely, with real-time access control and storage tracking.",
      tech: ["Java", "Spring Boot", "React", "MongoDB", "Clerk" ,"JWT","Spring Security"],
      features: ["Easy to upload files", "Easy to share", "Easy to maintain", "Real-time tracking"],
      highlights: {
        problem: "Teams struggle to manage sharing permissions and file access from one place.",
        solution: "Built secure upload and role-based sharing flows with JWT authentication and dashboard controls.",
        impact: "Improved file access speed and made collaboration safer with centralized visibility.",
      },
      links: [{ icon: "fas fa-external-link-alt", text: "Live Demo", url: "https://rainbow-liger-0af62d.netlify.app" }],
    },
    1: {
      title: "Library Database Management System",
      image: "https://images.unsplash.com/photo-1712844775908-53b541754d10?w=1200&auto=format&fit=crop&q=60",
      description:
        "An efficient Library Management System that handles book inventory, member records, and issue/return transactions with real-time tracking.",
      tech: ["Java", "Servlet/JSP", "JavaFX", "MySQL", "JDBC"],
      features: ["Book inventory management", "Member records management", "Issue/return transaction handling", "Real-time tracking"],
      highlights: {
        problem: "Manual library tracking increases errors and slows down issue/return workflows.",
        solution: "Implemented cataloging, member records, and transaction operations in a centralized Java system.",
        impact: "Reduced paperwork and improved day-to-day record accuracy for librarians.",
      },
      links: [{ icon: "fab fa-github", text: "View Code", url: "https://github.com/Indradeo-Rana/Library-Management-System.git" }],
    },
    2: {
      title: "Banking Microservice",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52c?auto=format&fit=crop&q=80",
      description: "A scalable banking transaction system built with Spring Boot and Kafka.",
      tech: ["Java", "Spring Boot", "Kafka", "Docker"],
      features: ["Event-driven transactions", "Scalability", "Fault tolerance"],
      highlights: {
        problem: "Traditional monolith transaction services are difficult to scale under peak load.",
        solution: "Designed event-driven microservices using Spring Boot and Kafka for decoupled processing.",
        impact: "Improved scalability and resilience for transaction-heavy operations.",
      },
      links: [{ icon: "fab fa-github", text: "View Code", url: "#" }],
    },
    3: {
      title: "Personal Portfolio",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80",
      description: "Designed and developed my personal portfolio website.",
      tech: ["HTML", "CSS", "JS", "Firebase"],
      features: ["Drag-and-drop", "Live preview"],
      highlights: {
        problem: "A static portfolio can fail to communicate skills and project depth effectively.",
        solution: "Created a responsive, interactive single-page experience with dynamic filtering and modals.",
        impact: "Improved recruiter engagement and presented technical capabilities more clearly.",
      },
      links: [{ icon: "fas fa-external-link-alt", text: "Live Demo", url: "#" }],
    },
    4: {
      title: "Inventory Management",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      description: "Microservice-based inventory system.",
      tech: ["Java", "Spring Cloud", "MySQL", "Redis"],
      features: ["Real-time stock tracking", "Automated reordering"],
      highlights: {
        problem: "Inventory inconsistencies create delays, stockouts, and reporting mismatches.",
        solution: "Implemented stock services with event updates and automatic reorder trigger logic.",
        impact: "Enabled near real-time inventory visibility and reduced manual follow-up tasks.",
      },
      links: [{ icon: "fab fa-github", text: "View Code", url: "#" }],
    },
    5: {
      title: "Memory Card Game",
      image: "https://plus.unsplash.com/premium_photo-1677870728119-52aef052d7ef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
      description: "A Memory Card Game with Emoji & Number modes.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      features: ["Timer", "Move counter", "Dual modes"],
      highlights: {
        problem: "Basic memory games lack progression feedback and replay value.",
        solution: "Added dual modes, timer logic, move tracking, and playful interactions for challenge depth.",
        impact: "Increased session time and made the game more engaging for repeat users.",
      },
      links: [{ icon: "fab fa-github", text: "View Code", url: "https://github.com/indradeo-rana/memory-card-game" }],
    },
  };

  const viewDetailBtns = document.querySelectorAll(".view-details");
  const projectModal = document.querySelector(".project-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const modalContent = document.querySelector(".modal-content");
  const modalProblem = document.querySelector(".modal-problem");
  const modalSolution = document.querySelector(".modal-solution");
  const modalImpact = document.querySelector(".modal-impact");
  let lastFocusedElement = null;

  const openModal = (projectId) => {
    const project = projectsData[projectId];
    if (!project || !projectModal) return;
    projectModal.querySelector(".modal-img").src = project.image;
    projectModal.querySelector(".modal-img").alt = project.title;
    projectModal.querySelector(".modal-content .project-title").textContent = project.title;
    projectModal.querySelector(".modal-description").textContent = project.description;

    const fallbackHighlights = {
      problem: "Complex workflows needed simplification and better usability.",
      solution: "Designed a practical architecture and intuitive experience for end users.",
      impact: "Delivered a faster and more reliable workflow for daily use.",
    };
    const highlights = project.highlights || fallbackHighlights;
    if (modalProblem) modalProblem.textContent = highlights.problem;
    if (modalSolution) modalSolution.textContent = highlights.solution;
    if (modalImpact) modalImpact.textContent = highlights.impact;

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

    lastFocusedElement = document.activeElement;
    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (closeModalBtn) {
      closeModalBtn.focus();
    }
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
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeModal();
    });
    if (modalContent) {
      modalContent.addEventListener("click", (e) => e.stopPropagation());
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && projectModal.classList.contains("active")) {
        closeModal();
      }
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

  // Fixed Back to Top Button functionality
  const topBtn = document.getElementById("fixed-top-btn");
  if (topBtn) {
    const toggleTopBtn = () => {
      if (window.scrollY > 260) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    };

    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleTopBtn);
    toggleTopBtn();
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
