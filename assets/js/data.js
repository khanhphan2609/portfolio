// ─── Utility ────────────────────────────────────────────────
async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

function starsHTML(count) {
  return Array.from(
    { length: count },
    () => `<i class='bx bxs-star' id="star"></i>`,
  ).join("");
}

// ─── NAV ────────────────────────────────────────────────────
async function buildNav() {
  const data = await loadJSON("assets/contents/nav.json");
  const links = data.links
    .map((l) => `<a href="${l.href}">${l.label}</a>`)
    .join("\n");

  document.getElementById("header").innerHTML = `
                <a href="${data.logo.href}" class="logo">${data.logo.text} <span>${data.logo.span}</span></a>
                <i class='bx bx-menu' id="menu-icon"></i>
                <nav class="navbar">
                    ${links}
                </nav>
            `;

  // Re-attach active class to first nav link
  document.querySelector(".navbar a").classList.add("active");
}

// ─── HOME ───────────────────────────────────────────────────
async function buildHome() {
  const data = await loadJSON("assets/contents/home.json");

  const socials = data.socialLinks
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank"><i class='bx ${s.icon}'></i></a>`,
    )
    .join("\n");

  const buttons = data.buttons
    .map((b) => `<a href="${b.href}" class="btn">${b.label}</a>`)
    .join("\n");

  document.getElementById("home-section").innerHTML = `
                <div class="home-content">
                    <h1>${data.greeting} <span>${data.name}</span></h1>
                    <h3 class="text-animation">I'm a <span ></span></h3>
                    <p>${data.bio}</p>
                    <div class="social-icons">${socials}</div>
                    <div class="btn-group">${buttons}</div>
                </div>
                <div class="home-img">
                    <img src="${data.image}" alt="${data.name}">
                </div>
            `;
}

// ─── EDUCATION ──────────────────────────────────────────────
async function buildEducation() {
  const data = await loadJSON("assets/contents/education.json");

  const items = data.items
    .map(
      (item) => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${item.year}</div>
                    <div class="timeline-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `,
    )
    .join("");

  document.getElementById("education-items").innerHTML = items;
}

// ─── SERVICES ───────────────────────────────────────────────
async function buildServices() {
  const data = await loadJSON("assets/contents/services.json");

  const boxes = data.items
    .map(
      (item) => `
                <a class="service-box">
                    <div class="service-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </a>
            `,
    )
    .join("");

  document.getElementById("services-container").innerHTML = boxes;
}

// ─── TESTIMONIALS ───────────────────────────────────────────
async function buildTestimonials() {
  const data = await loadJSON("assets/contents/testimonials.json");

  const items = data.items
    .map(
      (item) => `
                <a href="${item.href}" target="_blank" class="testimonial-item">
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <div class="rating">${starsHTML(item.stars)}</div>
                    <p>${item.description}</p>
                </a>
            `,
    )
    .join("");

  document.getElementById("testimonials-wrapper").innerHTML = items;
}

// ─── CONTACT ────────────────────────────────────────────────
async function buildContact() {
  const data = await loadJSON("assets/contents/contact.json");

  const fields = data.fields
    .map(
      (f) => `
                <input type="${f.type}" id="${f.id}" placeholder="${f.placeholder}">
                <span class="error-message" id="${f.id}Error"></span>
            `,
    )
    .join("");

  document.getElementById("contact-fields").innerHTML = fields;

  const ta = data.textarea;
  document.getElementById("contact-textarea").innerHTML = `
                <textarea id="${ta.id}" cols="${ta.cols}" rows="${ta.rows}" placeholder="${ta.placeholder}"></textarea>
                <input type="button" value="${data.submitLabel}" class="btn" onclick="validateForm()">
            `;

  document
    .getElementById("contactForm")
    .setAttribute("action", `mailto:${data.email}`);
  document.getElementById("contactForm").setAttribute("method", "post");
  document.getElementById("contactForm").setAttribute("enctype", "text/plain");
}

// ─── FOOTER ─────────────────────────────────────────────────
async function buildFooter() {
  const data = await loadJSON("assets/contents/footer.json");

  const socials = data.socialLinks
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank"><i class='bx ${s.icon}'></i></a>`,
    )
    .join("\n");

  const links = data.links
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("\n");

  document.getElementById("footer").innerHTML = `
                <div class="social">${socials}</div>
                <ul class="list">
                    ${links}
                    <p class="copyright">${data.copyright}</p>
                </ul>
            `;
}

// ─── INIT ────────────────────────────────────────────────────
async function init() {
  await Promise.all([
    buildNav(),
    buildHome(),
    buildEducation(),
    buildServices(),
    buildTestimonials(),
    buildContact(),
    buildFooter(),
  ]);
}

document.addEventListener("DOMContentLoaded", init);
