(() => {
  const goal = 200000;
  const amount = document.getElementById('amount');
  const percent = document.getElementById('percent');
  const actual = document.getElementById('chart-actual');
  const area = document.getElementById('chart-area');
  const projection = document.getElementById('chart-projection');
  const points = document.getElementById('chart-points');
  const note = document.getElementById('update-note');
  const message = document.getElementById('data-message');
  const celebration = document.getElementById('celebration');
  const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function show(entries) {
    const { value, updated } = entries[entries.length - 1];
    const share = value / goal * 100;
    amount.textContent = money.format(value);
    percent.textContent = `${Number(share.toFixed(1))}%`;
    const start = Math.min(Date.UTC(2026, 9, 30), entries[0].date), end = Math.max(Date.UTC(2027, 2, 30), entries[entries.length - 1].date);
    const labels = document.querySelectorAll('.axis-labels span');
    labels[0].textContent = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(start));
    labels[1].style.left = `${100 * (Date.UTC(2026, 11, 1) - start) / (end - start)}%`;
    labels[2].style.left = `${100 * (Date.UTC(2027, 1, 1) - start) / (end - start)}%`;
    const plotted = entries.map(entry => ({
      ...entry,
      x: 400 * (entry.date - start) / (end - start),
      y: 125 - 105 * Math.min(1, entry.value / goal)
    }));
    const path = plotted.map((entry, i) => `${i ? 'L' : 'M'} ${entry.x} ${entry.y}`).join(' ');
    const first = plotted[0], last = plotted[plotted.length - 1];
    actual.setAttribute('d', path);
    area.setAttribute('d', `${path} L ${last.x} 125 L ${first.x} 125 Z`);
    projection.setAttribute('d', `M ${last.x} ${last.y} L 400 20`);
    points.replaceChildren();
    plotted.forEach(entry => {
      const circle = document.createElement('span');
      circle.className = 'chart-point';
      circle.style.left = `${entry.x / 4}%`;
      circle.style.top = `${entry.y / 1.5}%`;
      circle.title = `${entry.updated}: ${money.format(entry.value)}`;
      points.appendChild(circle);
    });
    requestAnimationFrame(() => requestAnimationFrame(() => actual.classList.add('drawn')));
    document.querySelector('.chart').setAttribute('role', 'progressbar');
    document.querySelector('.chart').setAttribute('aria-label', 'Enlarge fundraising progress');
    document.querySelector('.chart').setAttribute('aria-valuemin', '0');
    document.querySelector('.chart').setAttribute('aria-valuemax', String(goal));
    document.querySelector('.chart').setAttribute('aria-valuenow', String(Math.min(value, goal)));
    document.querySelector('.chart').setAttribute('aria-valuetext', `${money.format(value)} raised of ${money.format(goal)}`);
    document.querySelectorAll('.milestone').forEach(item => item.classList.toggle('reached', share >= Number(item.dataset.percent)));
    const reached = [25, 50, 75, 100].filter(target => share >= target).pop();
    if (reached) {
      celebration.textContent = reached === 100 ? '✦ Goal reached — thank you, church family!' : `✦ ${reached}% milestone reached — thank you, church family!`;
      celebration.classList.add('visible');
    } else {
      celebration.textContent = `✦ ${money.format(Math.max(0, goal * 0.25 - value))} to our first milestone`;
      celebration.classList.remove('visible');
    }
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
