document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/GESTUDY/sw.js")
      .then((reg) => console.log("Service Worker registered!", reg))
      .catch((err) => console.log("Service Worker registration failed:", err));
}

window.addEventListener("load", () => {
  const installButton = document.getElementById("installButton");

  // Check if the PWA is running in standalone mode
  function isStandalone() {
      return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  }

  if (isStandalone()) {
      installButton.style.display = "none"; // Hide the button
  }

  let deferredPrompt;

  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent auto-popup
      deferredPrompt = event; // Save the event
      installButton.style.display = "block"; // Show the button
  });

  // Handle install button click
  installButton.addEventListener("click", () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choice) => {
          if (choice.outcome === "accepted") {
              console.log("PWA Installed");
              installButton.style.display = "none"; // Hide the button after install
          }
          deferredPrompt = null;
      });
  });

  // Hide button when app is installed
  window.addEventListener("appinstalled", () => {
      console.log("App installed successfully!");
      installButton.style.display = "none";
  });
});
