/* Theme toggle.
   The <head> sets data-theme from localStorage before paint; with no
   stored choice the CSS follows prefers-color-scheme on its own. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  function current() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function sync() {
    btn.setAttribute('aria-pressed', String(current() === 'dark'));
  }

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* storage unavailable — the choice simply won't persist */
    }
    sync();
  });

  sync();
})();
