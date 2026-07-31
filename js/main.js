function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mediaBlock(video) {
  if (video && video.trim() !== '') {
    if (video.includes('youtube') || video.includes('vimeo')) {
      return `<div class="media"><iframe src="${video}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;"></iframe></div>`;
    }
    return `<div class="media"><video src="${video}" autoplay muted loop playsinline></video></div>`;
  }
  return `<div class="media empty"></div>`;
}

async function render() {
  const res = await fetch('content/site.json', { cache: 'no-store' });
  const data = await res.json();
  const app = document.getElementById('app');

  let html = '';

  // HERO
  html += `
  <section class="hero">
    <h1>${escapeHtml(data.hero.name)}</h1>
    <div class="hero-grid">
      <div class="hero-bio"><p>${escapeHtml(data.hero.bio)}</p></div>
      <div class="hero-photo"><img src="${data.hero.photo}" alt="${escapeHtml(data.hero.name)}"></div>
    </div>
  </section>`;

  // MARQUEE
  const marqueeText = escapeHtml(data.marquee.text);
  const repeated = `${marqueeText} &nbsp;&nbsp;*&nbsp;&nbsp; `.repeat(6);
  html += `
  <section class="marquee-section">
    <div class="marquee-track"><span>${repeated}</span><span>${repeated}</span></div>
  </section>`;

  // INTRO
  html += `
  <section class="intro">
    <p>${escapeHtml(data.intro.text)}</p>
  </section>`;

  // STORIES (first half)
  data.stories.forEach(story => {
    const mediaSide = story.mediaSide === 'right' ? 'media-right' : '';
    html += `
    <section class="story ${mediaSide}">
      ${mediaBlock(story.video)}
      <div class="story-text">
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(story.text)}</p>
      </div>
    </section>`;
  });

  // STATEMENT + GALLERY
  html += `
  <section class="statement-section">
    <div class="statement-text">${escapeHtml(data.statement.text)}</div>
    <div class="gallery-grid">
      ${data.gallery.map(src => `<figure><img src="${src}" loading="lazy" alt=""></figure>`).join('')}
    </div>
  </section>`;

  // CONCEPTS CAROUSEL
  html += `
  <section class="concepts">
    <h2>${escapeHtml(data.concepts.heading)}</h2>
    <div class="carousel-wrap">
      <div class="carousel" id="carousel">
        ${data.concepts.projects.map(p => `
          <div class="concept-card">
            <img src="${p.image}" alt="${escapeHtml(p.title)}">
            <h4>${escapeHtml(p.title)}</h4>
            <a class="btn" href="${p.link || '#'}">Click to see</a>
          </div>`).join('')}
      </div>
      <div class="carousel-arrows">
        <button id="carousel-prev" aria-label="Previous">&#8592;</button>
        <button id="carousel-next" aria-label="Next">&#8594;</button>
      </div>
    </div>
  </section>`;

  // CLOSING STORIES
  data.closingStories.forEach((story, i) => {
    const mediaSide = i % 2 === 1 ? 'media-right' : '';
    html += `
    <section class="story compact ${mediaSide}">
      ${mediaBlock(story.video)}
      <div class="story-text">
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(story.text)}</p>
      </div>
    </section>`;
  });

  // FOOTER
  html += `
  <footer>
    <div class="footer-grid">
      <h2>${escapeHtml(data.footer.heading)}</h2>
      <div>
        <div class="contact-label">${escapeHtml(data.footer.contactLabel)}</div>
        <a href="${data.footer.linkedin}" target="_blank" rel="noopener">Linkedin</a>
        <a href="${data.footer.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a class="email" href="mailto:${data.footer.email}">${escapeHtml(data.footer.email)}</a>
      </div>
    </div>
  </footer>`;

  app.innerHTML = html;

  // carousel controls
  const carousel = document.getElementById('carousel');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  if (carousel && prev && next) {
    const scrollAmount = 340;
    prev.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    next.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }
}

render();
