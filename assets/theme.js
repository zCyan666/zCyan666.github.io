// Apply the saved preference before styles render to avoid a flash of the wrong theme.
(() => {
  let theme = 'dark';
  try {
    if (localStorage.getItem('software-services-theme') === 'light') theme = 'light';
  } catch {
    // A blocked storage API must not prevent the page from loading.
  }
  document.documentElement.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === 'light' ? '#f5f5f5' : '#0a0a0a';
})();
