/* ==========================================================================
   Ipswich Academy Alumni - app.js

   Contents
    1. Settings                    (FOR IT: connect the forms here)
    2. Sample content              (replace with real alumni, events and news)
    3. Helpers
    4. Lists                       (stories, events, news, filters, search)
    5. Forms
    6. Dialogs
    7. Pathways                    ("What would you like to do?")
    8. Reunion finder
    9. Entrance animation
   10. Router and page transitions
   11. Header, ticker and floating contact button
   12. Intro
   13. Start-up
   ========================================================================== */

   (() => {
    'use strict';
  
    /* 1. Settings ------------------------------------------------------------
       FOR IT / PARADIGM TRUST: INTEGRATION POINTS
  
       Every form on the site works end to end in the browser: it validates,
       builds a payload and shows a confirmation. NOTHING IS SENT ANYWHERE YET.
  
       To go live:
         1. Put the real address(es) in ALUMNI.recipients.
         2. Replace the body of ALUMNI.send() with a call to your email service,
            form handler or database. It must return a Promise that resolves on
            success and rejects on failure (the form shows an error if it rejects).
         3. Check ALUMNI.contact (shown in the hero, contact page and footer).
         4. Set ALUMNI.demoNotice to false to hide the "nothing was sent" note.
         5. Point ALUMNI.privacyNoticeUrl at the school's privacy notice.
         6. Confirm ALUMNI.minAge with the school (safeguarding). The alumni
            forms ask people to confirm they are at least this age.                */
    const ALUMNI = {
      demoNotice: true,
      minAge: 16,                                    // FOR IT / SCHOOL: confirm the minimum age to join
      privacyNoticeUrl: '#/about',                   // FOR IT: link to the real privacy notice
  
      contact: {                                     // FOR IT: check these details
        phone: '01473 550040',
        email: 'info@ipswichacademy.org.uk',
        address: 'Braziers Wood Road, Ipswich IP3 0SP',
      },
  
      recipients: {                                  // FOR IT: who receives each kind of form
        contact: 'REPLACE-ME@school-office.example',
        join: 'REPLACE-ME@alumni-team.example',
        volunteer: 'REPLACE-ME@alumni-team.example',
        eventRegistration: 'REPLACE-ME@alumni-team.example',
        story: 'REPLACE-ME@alumni-team.example',
        giving: 'REPLACE-ME@alumni-team.example',
        reunionStart: 'REPLACE-ME@alumni-team.example',
      },
  
      /**
       * @param {string} kind     one of the keys in `recipients`
       * @param {object} payload  the submitted fields, plus submittedAt and page
       * @returns {Promise}       resolve = success, reject = show an error
       */
      send(kind, payload) {
        // >>>>>>>>>>  FOR IT: REPLACE FROM HERE  <<<<<<<<<<
        console.info('[IA alumni] DEMO MODE, NOT SENT:', kind, '->', this.recipients[kind], payload);
        return new Promise((resolve) => setTimeout(resolve, 600));
        /* Example of a real implementation:
           return fetch('https://YOUR-ENDPOINT.example/alumni', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ kind, to: this.recipients[kind], payload }),
           }).then((response) => { if (!response.ok) throw new Error('Send failed'); });  */
        // >>>>>>>>>>  FOR IT: TO HERE  <<<<<<<<<<
      },
    };
  
  
    /* 2. Sample content ------------------------------------------------------
       All names, roles, events and news below are placeholders.
       Get consent (and a parent or carer's consent for anyone under 18) before
       publishing real names, photos, quotes or stories.                         */
  
    const FIELDS = {
      apprenticeship: 'Apprenticeships and trades',
      university: 'University',
      health: 'Health and care',
      business: 'Business',
      creative: 'Creative and sport',
      education: 'Education',
      tech: 'Technology',
    };
  
    // Colour of each field's tag and avatar: '' (purple), 'teal' or 'orange'.
    const FIELD_TONE = {
      apprenticeship: 'orange', creative: 'orange',
      health: 'teal', education: 'teal',
      university: '', business: '', tech: '',
    };
  
    const STORIES = [   // photo: optional photo URL, shown in place of the silhouette
      { id: 1, name: 'Phoenix Coe', year: 2019, field: 'tech', role: 'Web developer', photo: '' },
      { id: 2, name: 'Buddy Wade', year: 2016, field: 'health', role: 'Nurse', photo: '' },
      { id: 3, name: 'Temiloluwa Adebosin', year: 2014, field: 'business', role: 'Accountant', photo: '' },
      { id: 4, name: 'Christopher Tokarz', year: 2018, field: 'creative', role: 'Dancer', photo: '' },
      { id: 5, name: 'Brooklyn Kedzior', year: 2012, field: 'apprenticeship', role: 'Electrician', photo: '' },
      { id: 6, name: 'Johnathan Kwagala', year: 2024, field: 'university', role: 'Studying engineering', photo: '' },
    ];
  
    const EVENT_TYPES = {
      careers: { label: 'Careers', tone: '' },
      reunion: { label: 'Reunions', tone: 'orange' },
      community: { label: 'Community', tone: 'teal' },
    };
  
    const EVENTS = [    // date: YYYY-MM-DD. Past and upcoming are worked out from today's date.
      { id: 'e1', date: '2026-11-12', type: 'careers', title: 'Careers evening: alumni talk to Year 10 and 11', meta: '6pm · Ipswich Academy' },
      { id: 'e2', date: '2026-12-05', type: 'reunion', year: 2016, title: '2016 leavers: ten-year reunion', meta: '2pm · Ipswich Academy' },
      { id: 'e3', date: '2027-02-12', type: 'careers', title: 'Year 11 mock interview day', meta: 'All day · Volunteers needed' },
      { id: 'e4', date: '2027-07-08', type: 'community', title: 'Summer showcase', meta: 'Evening · Ipswich Academy' },
      { id: 'e5', date: '2026-03-19', type: 'careers', title: 'Careers evening', meta: '6pm · Ipswich Academy' },
      { id: 'e6', date: '2025-12-13', type: 'reunion', year: 2015, title: '2015 leavers reunion', meta: '2pm · Ipswich Academy' },
    ];
  
    const NEWS_TYPES = {
      news: { label: 'News', tone: '' },
      notice: { label: 'Notice', tone: 'teal' },
      event: { label: 'Event', tone: 'orange' },
    };
  
    const NEWS = [
      { id: 1, type: 'news', date: '2026-10-02', title: 'The alumni network launches' },
      { id: 2, type: 'notice', date: '2026-09-15', title: 'Mentors wanted for Year 11' },
      { id: 3, type: 'event', date: '2026-09-01', title: 'Summer showcase date announced' },
    ];
  
    // Messages shown after each form is submitted.
    const THANKS = {
      contact: 'The school office will reply as soon as they can.',
      join: 'We will be in touch about events and news for your leaving year.',
      volunteer: 'The alumni team will be in touch. Everyone who works with students completes safeguarding checks first.',
      eventRegistration: 'We have noted your interest and will send details nearer the time.',
      story: 'Thank you for sharing. The alumni team will check with you before anything is published.',
      giving: 'The alumni team will get in touch to talk about giving.',
      reunionStart: 'The alumni team will contact you to help get your reunion started.',
    };
  
  
    /* 3. Helpers ------------------------------------------------------------- */
  
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  
    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const thisYear = new Date().getFullYear();
  
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const parseDate = (iso) => new Date(`${iso}T12:00:00`);
    const shortDate = (iso) => { const d = parseDate(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
    const longDate = (iso) => { const d = parseDate(iso); return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`; };
  
    const isPast = (event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parseDate(event.date) < today;
    };
    const upcomingEvents = () => EVENTS.filter((e) => !isPast(e)).sort((a, b) => a.date.localeCompare(b.date));
    const pastEvents = () => EVENTS.filter(isPast).sort((a, b) => b.date.localeCompare(a.date));
  
    const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    const arrow = (className) => `<svg class="icon ${className}" aria-hidden="true"><use href="#i-arrow"/></svg>`;
    const tagClass = (tone) => (tone ? ` tag--${tone}` : '');
  
    /** Fills in the settings wherever the page asks for them (phone, email, age...). */
    function applySettings(root = document) {
      const { phone, email, address } = ALUMNI.contact;
      $$('[data-phone]', root).forEach((el) => { el.textContent = phone; });
      $$('[data-email]', root).forEach((el) => { el.textContent = email; });
      $$('[data-address]', root).forEach((el) => { el.textContent = address; });
      $$('[data-min-age]', root).forEach((el) => { el.textContent = ALUMNI.minAge; });
      $$('[data-phone-link]', root).forEach((el) => { el.href = `tel:${phone.replace(/\s/g, '')}`; });
      $$('[data-email-link]', root).forEach((el) => { el.href = `mailto:${email}`; });
      $$('[data-privacy-link]', root).forEach((el) => { el.href = ALUMNI.privacyNoticeUrl; });
      $$('[data-maps-link]', root).forEach((el) => {
        el.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Ipswich Academy ${address}`)}`;
      });
      $$('input[name="year"]', root).forEach((el) => { el.max = thisYear; });
    }
  
  
    /* 4. Lists --------------------------------------------------------------- */
  
    const AVATAR_COLOURS = {
      '': ['#66197c', '#8a2fa3'],
      teal: ['#1f7a8c', '#2c97ab'],
      orange: ['#c25f2d', '#e08a5a'],
    };
    const SILHOUETTE = '<svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="31" r="15" fill="rgba(255,255,255,.94)"/><path d="M11 84c0-19 14-31 31-31s31 12 31 31z" fill="rgba(255,255,255,.94)"/></svg>';
  
    /** First render items arrive with the page (.reveal); later renders (after a filter) use .enter. */
    const entrance = (firstRender, index) => (firstRender
      ? { cls: 'reveal', style: '' }
      : { cls: 'enter', style: ` style="--delay:${Math.min(index, 8) * 60}ms"` });
  
    function profileCard(story, firstRender, index) {
      const { cls, style } = entrance(firstRender, index);
      const tone = FIELD_TONE[story.field];
      const [from, to] = AVATAR_COLOURS[tone];
      const background = story.photo ? `url(${story.photo}) center / cover` : `linear-gradient(145deg, ${from}, ${to})`;
      return `
        <button class="profile ${cls}" type="button" data-story="${story.id}"${style}>
          <span class="profile__avatar" style="background:${background}">${story.photo ? '' : SILHOUETTE}</span>
          <span class="profile__body">
            <span class="profile__top"><span class="tag${tagClass(tone)}">${FIELDS[story.field]}</span><span class="meta">Left in ${story.year}</span></span>
            <strong class="profile__name">${story.name}</strong>
            <span class="profile__role">${story.role}</span>
          </span>
          ${arrow('profile__arrow')}
        </button>`;
    }
  
    function eventRow(event, { past = false, firstRender, index }) {
      const { cls, style } = entrance(firstRender, index);
      const date = parseDate(event.date);
      const { label, tone } = EVENT_TYPES[event.type];
      const action = past
        ? '<span class="event__past">Past event</span>'
        : `<button class="btn btn--small" type="button" data-register="${event.id}">Register interest</button>`;
      return `
        <div class="event ${cls}"${style}>
          <div class="event__date"><span class="event__day">${date.getDate()}</span><span class="event__month">${MONTHS[date.getMonth()]} ${date.getFullYear()}</span></div>
          <div class="event__info">
            <span class="tag${tagClass(tone)}">${label}</span>
            <h3 class="event__title">${event.title}</h3>
            <p class="event__detail">${WEEKDAYS[date.getDay()]} · ${event.meta}</p>
          </div>
          ${action}
        </div>`;
    }
  
    /** One feature story, then a short list of headlines. */
    function newsBlock(items, firstRender) {
      if (!items.length) return '';
      const [feature, ...rest] = items;
      const heading = (item) => {
        const { label, tone } = NEWS_TYPES[item.type];
        return `<span class="news__heading"><span class="tag${tagClass(tone)}">${label}</span><span class="meta">${shortDate(item.date)}</span></span>`;
      };
      const featureEntrance = entrance(firstRender, 0);
      const featureTone = NEWS_TYPES[feature.type].tone;
      const list = rest.map((item, i) => {
        const { cls, style } = entrance(firstRender, i + 1);
        return `
          <button class="news__item ${cls}" type="button" data-news="${item.id}"${style}>
            <span>${heading(item)}<strong class="news__title">${item.title}</strong></span>
            ${arrow('news__arrow')}
          </button>`;
      }).join('');
      return `
        <div class="news">
          <button class="news__feature${featureTone ? ` news__feature--${featureTone}` : ''} ${featureEntrance.cls}" type="button" data-news="${feature.id}"${featureEntrance.style}>
            ${heading(feature)}
            <strong class="news__title">${feature.title}</strong>
            ${arrow('news__arrow')}
          </button>
          <div class="news__list">${list}</div>
        </div>`;
    }
  
    /** Renders one [data-list] container, applying its current filter and search. */
    function renderList(container) {
      const { list, filter = 'all' } = container.dataset;
      const limit = Number(container.dataset.limit) || Infinity;
      const query = (container.dataset.query || '').trim().toLowerCase();
      const firstRender = !container.dataset.rendered;
      container.dataset.rendered = 'yes';
  
      let html = '';
      if (list === 'stories') {
        html = STORIES
          .filter((s) => (filter === 'all' || s.field === filter)
            && (!query || `${s.name} ${s.year} ${s.role} ${FIELDS[s.field]}`.toLowerCase().includes(query)))
          .slice(0, limit)
          .map((s, i) => profileCard(s, firstRender, i)).join('');
      } else if (list === 'events') {
        html = upcomingEvents().filter((e) => filter === 'all' || e.type === filter).slice(0, limit)
          .map((e, i) => eventRow(e, { firstRender, index: i })).join('');
      } else if (list === 'past-events') {
        html = pastEvents().slice(0, limit)
          .map((e, i) => eventRow(e, { past: true, firstRender, index: i })).join('');
      } else if (list === 'news') {
        html = newsBlock(NEWS.filter((n) => filter === 'all' || n.type === filter)
          .sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit), firstRender);
      }
      container.innerHTML = html || `<p class="empty-note ${firstRender ? 'reveal' : 'enter'}">Nothing matches that. Try a different search or filter.</p>`;
    }
  
    /** Builds the filter buttons above each list and wires up filtering and search. */
    function initFilters() {
      const options = {
        stories: Object.entries(FIELDS).map(([key, label]) => [key, label]),
        events: Object.entries(EVENT_TYPES).map(([key, { label }]) => [key, label]),
        news: Object.entries(NEWS_TYPES).map(([key, { label }]) => [key, label]),
      };
      $$('[data-filter]').forEach((group) => {
        const name = group.dataset.filter;
        const buttons = [['all', 'All'], ...options[name]]
          .map(([key, label], i) => `<button class="chip" type="button" data-value="${key}" aria-pressed="${i === 0}">${label}</button>`);
        group.innerHTML = buttons.join('');
        group.addEventListener('click', (event) => {
          const chip = event.target.closest('.chip');
          if (!chip) return;
          $$('.chip', group).forEach((c) => c.setAttribute('aria-pressed', c === chip));
          const target = document.getElementById(`${name}-list`);
          target.dataset.filter = chip.dataset.value;
          renderList(target);
        });
      });
  
      $$('[data-search]').forEach((input) => {
        input.addEventListener('input', () => {
          const target = document.getElementById(`${input.dataset.search}-list`);
          target.dataset.query = input.value;
          renderList(target);
        });
      });
  
      $$('select[data-options="fields"]').forEach((select) => {
        select.innerHTML = Object.values(FIELDS).map((label) => `<option>${label}</option>`).join('');
      });
    }
  
  
    /* 5. Forms --------------------------------------------------------------- */
  
    /** Replaces each [data-form] placeholder with a copy of its template. */
    function mountForms(root = document) {
      $$('[data-form]', root).forEach((slot) => {
        const form = $(`#tpl-${slot.dataset.form}`).content.firstElementChild.cloneNode(true);
        if (slot.dataset.role) form.elements.role.value = slot.dataset.role;
        if (slot.hasAttribute('data-reveal')) $$('.field, .check, .form__actions', form).forEach((el) => el.classList.add('reveal'));
        slot.replaceChildren(form);
      });
      applySettings(root);
    }
  
    /** Collects a form's values into a plain object. */
    function readForm(form) {
      const payload = {};
      new FormData(form).forEach((value, key) => {
        payload[key] = key in payload ? [].concat(payload[key], value) : value;
      });
      $$('[data-group]', form).forEach((group) => { payload[group.dataset.group] = [].concat(payload[group.dataset.group] || []); });
      return payload;
    }
  
    function showThanks(form, kind, payload) {
      const name = String(payload.first || '').trim();
      const box = document.createElement('div');
      box.className = 'form-done';
      box.tabIndex = -1;
      box.setAttribute('role', 'status');
      box.innerHTML = '<h3 class="form-done__title"></h3><p class="form-done__text"></p>';
      $('.form-done__title', box).textContent = name ? `Thanks, ${name}.` : 'Thanks.';
      $('.form-done__text', box).textContent = THANKS[kind];
      if (ALUMNI.demoNotice) {
        const note = document.createElement('p');
        note.className = 'form-done__note';
        note.textContent = 'Demo mode: nothing has been sent.';
        box.append(note);
      }
      form.replaceWith(box);
      box.focus();
    }
  
    async function submitForm(form) {
      const error = $('.form__error', form);
      const button = $('button[type="submit"]', form);
      const kind = form.dataset.kind;
      error.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }
  
      const payload = {
        ...readForm(form),
        consent: true,
        submittedAt: new Date().toISOString(),
        page: location.hash || '#/',
      };
      if (form.dataset.age !== 'off') payload.confirmedMinAge = ALUMNI.minAge;
  
      const label = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending…';
      try {
        await ALUMNI.send(kind, payload);
        showThanks(form, kind, payload);
      } catch (err) {
        error.textContent = `Sorry, something went wrong. Please try again, or call ${ALUMNI.contact.phone}.`;
        error.hidden = false;
        button.disabled = false;
        button.textContent = label;
      }
    }
  
  
    /* 6. Dialogs ------------------------------------------------------------- */
  
    const dialog = $('#dialog');
  
    /** @param {string} title  @param {string|Node} content */
    function openDialog(title, content) {
      dialog.classList.remove('is-closing');
      dialog.innerHTML = `
        <div class="dialog__header">
          <h2 class="dialog__title" id="dialog-title"></h2>
          <button class="dialog__close" type="button" data-close aria-label="Close">&times;</button>
        </div>
        <div class="dialog__body"></div>`;
      $('.dialog__title', dialog).textContent = title;
      const body = $('.dialog__body', dialog);
      if (typeof content === 'string') body.innerHTML = content; else body.append(content);
      mountForms(body);
      document.body.classList.add('is-locked');
      dialog.showModal();
    }
  
    function closeDialog() {
      if (!dialog.open || dialog.classList.contains('is-closing')) return;
      dialog.classList.add('is-closing');
      setTimeout(() => { dialog.close(); dialog.classList.remove('is-closing'); }, 280);
    }
  
    dialog.addEventListener('close', () => document.body.classList.remove('is-locked'));
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(); });
  
    function openStory(id) {
      const story = STORIES.find((s) => s.id === id);
      openDialog(story.name, `
        <p class="dialog__meta">${story.role} · Left in ${story.year} · ${FIELDS[story.field]}</p>
        <p>The full story will appear here.</p>`);
    }
  
    function openNews(id) {
      const item = NEWS.find((n) => n.id === id);
      openDialog(item.title, `
        <p class="dialog__meta">${NEWS_TYPES[item.type].label} · ${shortDate(item.date)}</p>
        <p>The full article will appear here.</p>`);
    }
  
    function openRegistration(id) {
      const event = EVENTS.find((e) => e.id === id);
      const form = $('#tpl-register').content.firstElementChild.cloneNode(true);
      form.elements.event.value = `${event.id}: ${event.title}`;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<p><strong></strong><br><span></span></p>`;
      $('strong', wrapper).textContent = event.title;
      $('span', wrapper).textContent = `${longDate(event.date)} · ${event.meta}`;
      wrapper.append(form);
      openDialog('Register interest', wrapper);
    }
  
    function openReunionStart(year) {
      const form = $('#tpl-reunion').content.firstElementChild.cloneNode(true);
      form.elements.year.value = year;
      openDialog('Start a reunion', form);
    }
  
    function openContact() {
      openDialog('Contact the school', `
        <p class="dialog__meta">Send a message, or call <a data-phone-link><strong data-phone></strong></a>.</p>
        <div data-form="contact"></div>`);
    }
  
  
    /* 7. Pathways ------------------------------------------------------------ */
  
    function initPathways() {
      const tabs = $$('.pathway-tab');
      if (!tabs.length) return;
      const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  
      const select = (index, focus = false) => {
        tabs.forEach((tab, i) => {
          tab.setAttribute('aria-selected', i === index);
          tab.tabIndex = i === index ? 0 : -1;
          panels[i].hidden = i !== index;
        });
        if (focus) tabs[index].focus();
        if (innerWidth <= 960) tabs[index].scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
      };
  
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => select(index));
        tab.addEventListener('keydown', (event) => {
          const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
          const backward = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
          if (!forward && !backward) return;
          event.preventDefault();
          select((index + (forward ? 1 : tabs.length - 1)) % tabs.length, true);
        });
      });
  
      // "Come to an event" shows the next upcoming event.
      const next = upcomingEvents()[0];
      const register = $('[data-next-register]');
      if (next) {
        $('[data-next-title]').textContent = next.title;
        $('[data-next-text]').textContent = `Next up is ${longDate(next.date)}. Everyone who has left IA is welcome.`;
        register.dataset.register = next.id;
      } else {
        register.hidden = true;
      }
    }
  
  
    /* 8. Reunion finder ------------------------------------------------------ */
  
    function initYearFinder() {
      const form = $('#year-finder');
      const result = $('#year-result');
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const year = Number(form.elements.year.value);
        const reunion = upcomingEvents().find((e) => e.type === 'reunion' && e.year === year);
        result.innerHTML = reunion
          ? `<div class="result-card">
               <h3 class="result-card__title">Left in ${year}</h3>
               <p class="result-card__text">${reunion.title}<br>${longDate(reunion.date)} · ${reunion.meta}</p>
               <button class="btn btn--solid btn--small" type="button" data-register="${reunion.id}">Register interest</button>
             </div>`
          : `<div class="result-card">
               <h3 class="result-card__title">Left in ${year}</h3>
               <p class="result-card__text">No reunion is planned for your year yet. We can help you start one.</p>
               <button class="btn btn--solid btn--small" type="button" data-start-reunion="${year}">Start a reunion</button>
             </div>`;
      });
    }
  
  
    /* 9. Entrance animation --------------------------------------------------
       Anything with .reveal starts hidden and rises in as it comes into view,
       one after another. After a page change, what is already on screen simply
       appears (the page transition does the animating); the rest rises in as
       you scroll.                                                              */
  
    const state = { revealsOn: false, page: 'home', firstRoute: true, contactCardVisible: true, footerVisible: false, typing: false };
  
    const revealObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        visible.forEach((el, i) => {
          el.style.setProperty('--delay', `${Math.min(i, 6) * 70}ms`);
          el.classList.add('is-in');
          revealObserver.unobserve(el);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
      : null;
  
    /** Resets and (re)starts the .reveal items inside `scope`. */
    function watchReveals(scope = document, { instantInView = false } = {}) {
      $$('.reveal', scope).forEach((el) => {
        el.classList.remove('is-in', 'is-instant');
        el.style.removeProperty('--delay');
        if (!revealObserver) { el.classList.add('is-in', 'is-instant'); return; }
        if (instantInView && el.getBoundingClientRect().top < innerHeight) {
          el.classList.add('is-in', 'is-instant');
        } else {
          revealObserver.observe(el);
        }
      });
    }
  
    function startReveals() {
      state.revealsOn = true;
      watchReveals(document);
      updateFab();
    }
  
  
    /* 10. Router and page transitions ---------------------------------------- */
  
    const pages = $$('.page');
    const main = $('#main');
    const header = $('#site-header');
    const nav = $('#nav');
    const menuToggle = $('#menu-toggle');
    let leaveTimer = 0;
  
    function showPage(page) {
      state.page = page.id.replace('page-', '');
      pages.forEach((p) => { p.hidden = p !== page; });
      document.title = `${page.dataset.title ? `${page.dataset.title} | ` : ''}Ipswich Academy Alumni`;
  
      $$('.nav__link').forEach((link) => {
        if (link.getAttribute('href') === `#/${state.page}`) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
  
      window.scrollTo({ top: 0, behavior: 'instant' });
      header.classList.remove('is-scrolled');
      if (state.revealsOn) watchReveals(page, { instantInView: true });
      updateFab();
      if (!state.firstRoute) $('h1', page)?.focus({ preventScroll: true });
      state.firstRoute = false;
    }
  
    function onRouteChange() {
      const hash = location.hash;
      if (hash && !hash.startsWith('#/')) return;                       // ignore in-page anchors
      const name = hash.replace(/^#\/?/, '') || 'home';
      const page = document.getElementById(`page-${name}`) || document.getElementById('page-home');
  
      if (!state.firstRoute && page.id === `page-${state.page}`) {      // same page: scroll to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (state.firstRoute || !state.revealsOn) { showPage(page); return; }
  
      if (document.startViewTransition && !prefersReducedMotion) {
        document.startViewTransition(() => showPage(page));             // native crossfade
      } else {
        main.classList.add('is-leaving');                               // simple fade for older browsers
        clearTimeout(leaveTimer);
        leaveTimer = setTimeout(() => { showPage(page); main.classList.remove('is-leaving'); }, 260);
      }
    }
  
  
    /* 11. Header, ticker and floating contact button -------------------------- */
  
    function initHeader() {
      addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });
      menuToggle.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', nav.classList.toggle('is-open'));
      });
      $('.skip-link').addEventListener('click', (event) => { event.preventDefault(); main.focus(); });
  
      const next = upcomingEvents()[0];
      if (next) {
        const date = parseDate(next.date);
        const pill = $('#next-event');
        pill.textContent = `Next event · ${date.getDate()} ${MONTHS[date.getMonth()]}`;
        pill.href = '#/events';
      }
    }
  
    function initTicker() {
      const next = upcomingEvents()[0];
      const items = [
        next && ['calendar-days', `Next event: ${next.title}, ${shortDate(next.date)}`, '#/events'],
        ['users', 'Find your leaving year and join a reunion', '#/reunions'],
        ['comments', 'Mentors wanted for Year 10 and 11', '#/mentoring'],
        ['heart', 'Support bursaries, equipment and trips', '#/giving'],
      ].filter(Boolean);
      const html = items.map(([name, text, href]) => `<a class="ticker__item" href="${href}">${icon(name)}<span>${text}</span></a>`).join('');
      $('#ticker').innerHTML = html + html;          // twice, so the loop is seamless
    }
  
    /** The floating button steps aside while the hero form, footer or a form field is in use. */
    function updateFab() {
      const onHome = state.page === 'home';
      const show = state.revealsOn && !state.footerVisible && !state.typing
        && state.page !== 'contact' && (!onHome || !state.contactCardVisible);
      $('#fab').classList.toggle('is-visible', show);
    }
  
    function initFab() {
      $('#fab').addEventListener('click', openContact);
      if (!('IntersectionObserver' in window)) return;
      new IntersectionObserver(([entry]) => { state.contactCardVisible = entry.isIntersecting; updateFab(); }, { threshold: 0.15 })
        .observe($('#contact-card'));
      new IntersectionObserver(([entry]) => { state.footerVisible = entry.isIntersecting; updateFab(); }, { threshold: 0.05 })
        .observe($('#site-footer'));
      document.addEventListener('focusin', (e) => { state.typing = e.target.matches('input, textarea, select'); updateFab(); });
      document.addEventListener('focusout', () => { state.typing = false; updateFab(); });
    }
  
  
    /* 12. Intro ---------------------------------------------------------------
       The IA mark and "Alumni" fade in on a dark screen, then the screen lifts
       to reveal the site. Shown once per visit; click or press a key to skip.  */
  
    function runIntro() {
      const intro = $('#intro');
      let seen = false;
      try { seen = sessionStorage.getItem('ia-alumni-intro') === '1'; } catch (err) { /* storage unavailable */ }
  
      if (seen) { intro.remove(); startReveals(); return; }
  
      document.body.classList.add('is-locked');
      let leaving = false;
  
      const leave = () => {
        if (leaving) return;
        leaving = true;
        try { sessionStorage.setItem('ia-alumni-intro', '1'); } catch (err) { /* ignore */ }
        intro.classList.add('is-leaving');
        setTimeout(startReveals, 200);                                  // the page starts arriving as the screen lifts
        setTimeout(() => { intro.remove(); document.body.classList.remove('is-locked'); }, 1150);
        document.removeEventListener('keydown', onKey);
      };
      const onKey = (event) => { if (['Escape', 'Enter', ' '].includes(event.key)) leave(); };
  
      intro.addEventListener('click', leave);
      document.addEventListener('keydown', onKey);
      setTimeout(leave, prefersReducedMotion ? 300 : 1700);
    }
  
  
    /* 13. Start-up ----------------------------------------------------------- */
  
    document.addEventListener('click', (event) => {
      const target = event.target;
      const hit = (selector) => target.closest(selector);
      let el;
  
      if (target === dialog || hit('[data-close]')) closeDialog();
      else if ((el = hit('[data-story]'))) openStory(Number(el.dataset.story));
      else if ((el = hit('[data-news]'))) openNews(Number(el.dataset.news));
      else if ((el = hit('[data-register]'))) openRegistration(el.dataset.register);
      else if ((el = hit('[data-start-reunion]'))) openReunionStart(Number(el.dataset.startReunion));
      else if ((el = hit('a[href^="#/"]')) && el.getAttribute('href') === (location.hash || '#/')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });                // a link to the page you are already on
      }
    });
  
    document.addEventListener('submit', (event) => {
      const form = event.target.closest('form[data-kind]');
      if (!form) return;
      event.preventDefault();
      submitForm(form);
    });
  
    initFilters();
    $$('[data-list]').forEach(renderList);
    mountForms();
    applySettings();
    initPathways();
    initYearFinder();
    initTicker();
    initHeader();
    initFab();
    addEventListener('hashchange', onRouteChange);
    onRouteChange();
    runIntro();
  })();