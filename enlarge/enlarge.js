(() => {
  const goal = 200000;
  const campaignEnd = Date.UTC(2027, 1, 28);
  const revealDuration = 5000;
  const amount = document.getElementById('amount');
  const percent = document.getElementById('percent');
  const actual = document.getElementById('chart-actual');
  const reveal = document.getElementById('progress-reveal');
  const area = document.getElementById('chart-area');
  const projection = document.getElementById('chart-projection');
  const points = document.getElementById('chart-points');
  const note = document.getElementById('update-note');
  const message = document.getElementById('data-message');
  const celebration = document.getElementById('celebration');
  const countdown = document.getElementById('countdown');
  const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  const brisbaneDate = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', year: 'numeric', month: 'numeric', day: 'numeric' });

  function updateCountdown() {
    const parts = Object.fromEntries(brisbaneDate.formatToParts(new Date()).map(part => [part.type, part.value]));
    const today = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
    const days = (campaignEnd - today) / 86400000;
    countdown.textContent = days < 0
      ? 'Campaign has ended'
      : days === 0
        ? 'Last day to contribute'
        : `${days} ${days === 1 ? 'day' : 'days'} remaining to contribute`;
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  function show(entries) {
    const { value, updated } = entries[entries.length - 1];
    const share = value / goal * 100;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    amount.textContent = money.format(reducedMotion ? value : 0);
    percent.textContent = `${Number(share.toFixed(1))}%`;
    const start = Math.min(Date.UTC(2026, 9, 25), entries[0].date), end = Math.max(campaignEnd, entries[entries.length - 1].date);
    const labels = document.querySelectorAll('.axis-labels span');
    const axisDate = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    labels[4].textContent = axisDate.format(new Date(end));
    labels[0].style.left = `${100 * (Date.UTC(2026, 10, 1) - start) / (end - start)}%`;
    labels[1].style.left = `${100 * (Date.UTC(2026, 11, 1) - start) / (end - start)}%`;
    labels[2].style.left = `${100 * (Date.UTC(2027, 0, 1) - start) / (end - start)}%`;
    labels[3].style.left = `${100 * (Date.UTC(2027, 1, 1) - start) / (end - start)}%`;
    const plotted = entries.map(entry => ({
      ...entry,
      x: 400 * (entry.date - start) / (end - start),
      y: 125 - 105 * Math.min(1, entry.value / goal)
    }));
    const path = plotted.map((entry, i) => `${i ? 'L' : 'M'} ${entry.x} ${entry.y}`).join(' ');
    const first = plotted[0], last = plotted[plotted.length - 1];
    const revealStart = first.x - 4, revealWidth = last.x - first.x + 8;
    actual.setAttribute('d', path);
    reveal.setAttribute('x', String(revealStart));
    reveal.setAttribute('width', String(revealWidth));
    area.setAttribute('d', `${path} L ${last.x} 125 L ${first.x} 125 Z`);
    projection.setAttribute('d', `M ${last.x} ${last.y} L 400 20`);
    points.replaceChildren();
    plotted.forEach(entry => {
      const circle = document.createElement('span');
      circle.className = 'chart-point';
      circle.style.left = `${entry.x / 4}%`;
      circle.style.top = `${entry.y / 1.5}%`;
      circle.style.setProperty('--bounce-delay', `${plotted.length === 1 ? 0 : revealDuration * (entry.x - revealStart) / revealWidth}ms`);
      circle.title = `${entry.updated}: ${money.format(entry.value)}`;
      points.appendChild(circle);
    });
    document.querySelector('.chart').style.setProperty('--reveal-duration', `${revealDuration}ms`);
    if (reducedMotion) {
      reveal.classList.add('animate');
    } else {
      requestAnimationFrame(() => {
        reveal.classList.add('animate');
        const startTime = performance.now();
        const updateAmount = (now) => {
          const progress = Math.min(1, (now - startTime) / revealDuration);
          amount.textContent = money.format(value * progress);
          if (progress < 1) requestAnimationFrame(updateAmount);
        };
        requestAnimationFrame(updateAmount);
      });
    }
    document.querySelector('.chart').setAttribute('role', 'progressbar');
    document.querySelector('.chart').setAttribute('aria-label', 'Enlarge fundraising progress');
    document.querySelector('.chart').setAttribute('aria-valuemin', '0');
    document.querySelector('.chart').setAttribute('aria-valuemax', String(goal));
    document.querySelector('.chart').setAttribute('aria-valuenow', String(Math.min(value, goal)));
    document.querySelector('.chart').setAttribute('aria-valuetext', `${money.format(value)} raised of ${money.format(goal)}`);
    celebration.textContent = value >= goal
      ? '✦ Commitment reached — thank you, church family!'
      : `✦ ${money.format(goal - value)} to reach our commitment`;
    celebration.classList.toggle('visible', value >= goal);
    if (updated) {
      const date = new Date(`${updated}T12:00:00`);
      if (!Number.isNaN(date.valueOf())) note.textContent = `Last updated ${new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}`;
    }
  }
  fetch(`./progress.csv?refresh=${Date.now()}`, { cache: 'no-store' }).then(response => {
    if (!response.ok) throw new Error('Progress unavailable');
    return response.text();
  }).then(text => {
    const lines = text.trim().split(/\r?\n/);
    const headings = lines[0].replace(/^\uFEFF/, '').split(',').map(x => x.trim());
    const amountIndex = headings.indexOf('amount_aud');
    const dateIndex = headings.indexOf('updated_at');
    if (amountIndex < 0 || dateIndex < 0) throw new Error('Missing CSV columns');
    const entries = lines.slice(1).filter(line => line.trim()).map(line => {
      const row = line.split(',').map(x => x.trim());
      const raw = row[amountIndex], updated = row[dateIndex];
      if (!raw || !/^\d+(\.\d{1,2})?$/.test(raw) || !/^\d{4}-\d{2}-\d{2}$/.test(updated || '')) throw new Error('Invalid progress row');
      const date = Date.parse(`${updated}T00:00:00Z`);
      if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== updated) throw new Error('Date outside campaign');
      return { value: Number(raw), updated, date };
    }).sort((a, b) => a.date - b.date);
    if (!entries.length || entries.some((entry, index) => index && entry.date === entries[index - 1].date)) throw new Error('Missing or duplicate progress date');
    show(entries);
  }).catch(() => {
    amount.textContent = '—'; percent.textContent = '—'; note.textContent = 'Progress is temporarily unavailable.';
    message.textContent = 'Please check back later for the latest total.';
  });
})();
