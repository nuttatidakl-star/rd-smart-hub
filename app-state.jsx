// Global app state: language + theme
// Stored in localStorage, broadcast via a simple listener set.
window.AppState = {
  lang: localStorage.getItem("rdhub.lang") || "en",
  theme: localStorage.getItem("rdhub.theme") || "light",
  listeners: new Set(),
  set(key, val) {
    this[key] = val;
    localStorage.setItem("rdhub." + key, val);
    if (key === "theme") {
      document.documentElement.setAttribute("data-theme", val);
    }
    this.listeners.forEach(l => l());
  }
};
// Apply theme on initial load
document.documentElement.setAttribute("data-theme", window.AppState.theme);

// React hook
window.useAppState = function () {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const l = () => force(n => n + 1);
    window.AppState.listeners.add(l);
    return () => window.AppState.listeners.delete(l);
  }, []);
  return window.AppState;
};

// Inline translation helper. Read current language from AppState.
// Usage:  t("Dashboard", "แดชบอร์ด")
window.t = function (en, th) {
  return window.AppState.lang === "th" ? th : en;
};
