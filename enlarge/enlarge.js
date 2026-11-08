(() => {
  const goal = 200000;
  const amount = document.getElementById('amount');
  const percent = document.getElementById('percent');
  const fill = document.getElementById('fill');
  const note = document.getElementById('update-note');
  const message = document.getElementById('data-message');
  const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function show(value, updated) {
    const share = value / goal * 100;
    amount.textContent = money.format(value);
    percent.textContent = `${Number(share.toFixed(1))}%`;
    fill.style.width = `${Math.min(100, share)}%`;
    fill.parentElement.setAttribute('role', 'progressbar');
    fill.parentElement.setAttribute('aria-label', 'Enlarge fundraising progress');
    fill.parentElement.setAttribute('aria-valuemin', '0');
    fill.parentElement.setAttribute('aria-valuemax', String(goal));
    fill.parentElement.setAttribute('aria-valuenow', String(Math.min(value, goal)));
    fill.parentElement.setAttribute('aria-valuetext', `${money.format(value)} raised of ${money.format(goal)}`);
    document.querySelectorAll('.milestone').forEach(item => item.classList.toggle('reached', share >= Number(item.dataset.percent)));
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
    const row = (lines[1] || '').split(',').map(x => x.trim());
    const raw = row[headings.indexOf('amount_aud')];
    if (!raw || !/^\d+(\.\d{1,2})?$/.test(raw)) throw new Error('Invalid amount');
    show(Number(raw), row[headings.indexOf('updated_at')]);
  }).catch(() => {
    amount.textContent = '—'; percent.textContent = '—'; note.textContent = 'Progress is temporarily unavailable.';
    message.textContent = 'Please check back later for the latest total.';
  });
})();
