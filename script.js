document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/GESTUDY/sw.js")
      .then((reg) => console.log("Service Worker registered!", reg))
      .catch((err) => console.log("Service Worker registration failed:", err));
}
  