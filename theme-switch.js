/* Shared KUSOX appearance switch — same behavior as the main index page */
(() => {
  const root = document.documentElement;
  const themes = ['system', 'light', 'dark'];
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  let selectedTheme = 'system';
  try { selectedTheme = localStorage.getItem('kusox-theme') || 'system'; } catch (_) {}
  if (!themes.includes(selectedTheme)) selectedTheme = 'system';

  // Replace any page-specific selector with the exact shared control.
  const oldControl = document.querySelector(
    '#theme-toggle, .theme-toggle, .theme-control, [data-theme-select]'
  );
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.id = 'theme-toggle';
  button.type = 'button';
  button.innerHTML = '<i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i><span class="theme-toggle-label">System</span>';
  button.setAttribute('aria-label', 'Appearance: system');
  button.title = 'Appearance: system';
  if (oldControl) oldControl.replaceWith(button);
  else {
    const target = document.querySelector('.nav-links, .nav, .header-actions, .header-content, header');
    if (target) target.appendChild(button);
  }

  function applyTheme() {
    const effectiveTheme = selectedTheme === 'system'
      ? (systemPreference.matches ? 'dark' : 'light')
      : selectedTheme;
    if (selectedTheme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', selectedTheme);

    button.querySelector('.theme-toggle-label').textContent =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    button.setAttribute('aria-label', 'Appearance: ' + selectedTheme + '. Click to change appearance.');
    button.title = 'Appearance: ' + selectedTheme + ' (click to change)';
    button.querySelector('i').className = selectedTheme === 'system'
      ? 'fa-solid fa-circle-half-stroke'
      : selectedTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

    const meta = document.getElementById('theme-color-meta') || document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', effectiveTheme === 'dark' ? '#141414' : '#f5f6fa');
  }

  button.addEventListener('click', () => {
    selectedTheme = themes[(themes.indexOf(selectedTheme) + 1) % themes.length];
    try { localStorage.setItem('kusox-theme', selectedTheme); } catch (_) {}
    applyTheme();
  });

  if (systemPreference.addEventListener) {
    systemPreference.addEventListener('change', () => {
      if (selectedTheme === 'system') applyTheme();
    });
  } else if (systemPreference.addListener) {
    systemPreference.addListener(() => {
      if (selectedTheme === 'system') applyTheme();
    });
  }
  applyTheme();
})();
