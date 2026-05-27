(function () {
  const config = window.SITE_CONFIG || {};
  const logoSrc =
    "assets/logos/Cornerstone%20Investment%20Partners%20transparent.png";

  const navLinks = [
    { href: "index.html", label: "Home", page: "home" },
    { href: "rentals.html", label: "Available Rentals", page: "rentals" },
    { href: "pay-rent.html", label: "Pay Rent", page: "pay-rent" },
    { href: "contact.html", label: "Contact", page: "contact" },
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    if (!path || path === "/" || path === "index.html") return "home";
    return path.replace(".html", "");
  }

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const current = getCurrentPage();
    const navItems = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="nav-link${
            link.page === current ? " is-active" : ""
          }">${link.label}</a>`
      )
      .join("");

    const overHero = document.body.classList.contains("has-hero");
    if (overHero) {
      header.classList.add("header--transparent");
    }

    header.innerHTML = `
      <div class="header-inner container">
        <a href="index.html" class="logo-link" aria-label="${config.companyName} — Home">
          <img src="${logoSrc}" alt="${config.companyName}" class="logo" width="220" height="auto" />
        </a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
          <span class="sr-only">Menu</span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Main">
          ${navItems}
          <a href="rentals.html" class="nav-link nav-cta">View Rentals</a>
        </nav>
      </div>
    `;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand">
          <img src="${logoSrc}" alt="" class="footer-logo" width="180" height="auto" aria-hidden="true" />
          <p class="footer-tagline">${config.tagline || ""}</p>
        </div>
        <div class="footer-contact">
          <h2 class="footer-heading">Contact</h2>
          <p><a href="tel:${(config.phone || "").replace(/\D/g, "")}">${config.phone || ""}</a></p>
          <p><a href="mailto:${config.email || ""}">${config.email || ""}</a></p>
        </div>
        <div class="footer-links">
          <h2 class="footer-heading">Quick links</h2>
          <ul>
            <li><a href="rentals.html">Available Rentals</a></li>
            <li><a href="pay-rent.html">Pay Rent</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>&copy; ${year} ${config.companyName}. All rights reserved.</p>
      </div>
    `;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function renderRentals() {
    const container = document.getElementById("rentals-list");
    if (!container) return;

    const properties = (window.PROPERTIES || []).filter((p) => p.active);
    if (properties.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h2>No rentals available right now</h2>
          <p>Check back soon, or <a href="contact.html">contact us</a> to ask about upcoming availability.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = properties
      .map((property) => {
        const mainPhoto = property.photos?.[0] || "";
        const photoCount = property.photos?.length || 0;
        const inquireUrl = property.applyUrl
          ? property.applyUrl
          : `contact.html?property=${encodeURIComponent(property.address)}`;
        const listingBtn = property.listingUrl
          ? `<a href="${property.listingUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Listing</a>`
          : "";

        return `
          <article class="property-card reveal" id="property-${property.id}">
            <div class="property-gallery">
              <span class="property-rent-badge">${formatCurrency(property.rent)}<span style="font-weight:500;font-size:0.75em">/mo</span></span>
              <img src="${mainPhoto}" alt="Photo of ${property.address}" class="property-main-photo" loading="lazy" />
              ${
                photoCount > 1
                  ? `<button type="button" class="btn-text gallery-trigger" data-property-id="${property.id}">View ${photoCount} photos</button>`
                  : ""
              }
            </div>
            <div class="property-details">
              <h2 class="property-address">${property.address}</h2>
              <p class="property-location">${property.location}</p>
              <ul class="property-meta">
                <li><strong>${property.beds}</strong> beds</li>
                <li><strong>${property.baths}</strong> baths</li>
                <li>${property.availableDate}</li>
              </ul>
              <p class="property-description">${property.description}</p>
              <div class="property-actions">
                <a href="${inquireUrl}" class="btn btn-primary">Inquire About This Property</a>
                ${listingBtn}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    container.querySelectorAll(".gallery-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.propertyId;
        const property = properties.find((p) => p.id === id);
        if (property) openGallery(property);
      });
    });

    initReveal();
  }

  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header || !document.body.classList.contains("has-hero")) return;

    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add("header--scrolled");
        header.classList.remove("header--transparent");
      } else {
        header.classList.remove("header--scrolled");
        header.classList.add("header--transparent");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    const elements = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function openGallery(property) {
    let index = 0;
    const photos = property.photos || [];

    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", `Photos of ${property.address}`);

    function render() {
      overlay.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
        <button type="button" class="lightbox-prev" aria-label="Previous photo">&lsaquo;</button>
        <img src="${photos[index]}" alt="Photo ${index + 1} of ${property.address}" class="lightbox-image" />
        <button type="button" class="lightbox-next" aria-label="Next photo">&rsaquo;</button>
        <p class="lightbox-caption">${index + 1} / ${photos.length}</p>
      `;

      overlay.querySelector(".lightbox-close").onclick = close;
      overlay.querySelector(".lightbox-prev").onclick = () => {
        index = (index - 1 + photos.length) % photos.length;
        render();
      };
      overlay.querySelector(".lightbox-next").onclick = () => {
        index = (index + 1) % photos.length;
        render();
      };
    }

    function close() {
      overlay.remove();
      document.body.classList.remove("lightbox-open");
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener(
      "keydown",
      function onKey(e) {
        if (!document.body.classList.contains("lightbox-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft")
          index = (index - 1 + photos.length) % photos.length;
        if (e.key === "ArrowRight") index = (index + 1) % photos.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") render();
      },
      { once: false }
    );

    document.body.classList.add("lightbox-open");
    document.body.appendChild(overlay);
    render();
  }

  function ensureFormHiddenField(form, name, value) {
    let field = form.querySelector(`input[type="hidden"][name="${name}"]`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const config = window.SITE_CONFIG || {};
    const params = new URLSearchParams(window.location.search);
    const propertyField = form.querySelector('[name="property"]');
    if (propertyField && params.get("property")) {
      propertyField.value = params.get("property");
    }

    if (params.get("sent") === "1") {
      const notice = document.createElement("p");
      notice.className = "form-success";
      notice.setAttribute("role", "status");
      notice.textContent =
        "Thank you — your message was sent. We'll respond as soon as we can.";
      form.prepend(notice);
    }

    if (config.formspreeId) {
      form.action = `https://formspree.io/f/${config.formspreeId}`;
      form.method = "POST";
      return;
    }

    const recipient = config.email || "rentwithcip@gmail.com";
    form.action = `https://formsubmit.co/${encodeURIComponent(recipient)}`;
    form.method = "POST";

    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    nextUrl.searchParams.set("sent", "1");

    ensureFormHiddenField(
      form,
      "_subject",
      "New inquiry — Cornerstone Investment Partners"
    );
    ensureFormHiddenField(form, "_captcha", "false");
    ensureFormHiddenField(form, "_template", "table");
    ensureFormHiddenField(form, "_next", nextUrl.toString());
  }

  function initPayRentLinks() {
    document.querySelectorAll("[data-pay-rent]").forEach((el) => {
      const url = (window.SITE_CONFIG || {}).payRentUrl;
      if (url) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    renderRentals();
    initContactForm();
    initPayRentLinks();
    initHeaderScroll();
    initReveal();
  });
})();
