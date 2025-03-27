document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/GESTUDY/sw.js")
        .then((reg) => console.log("Service Worker registered!", reg))
        .catch((err) => console.log("Service Worker registration failed:", err));

    navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log("New version available. Reloading...");
                    window.location.reload();
                }
            };
        };
    });
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
  else {
    startButton.style.display = "none";
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

window.addEventListener("DOMContentLoaded", () => {
    const standaloneButton = document.getElementById("standaloneButton");
    const browserButton = document.getElementById("browserButton");

    function checkStandaloneMode() {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
        
        if (isStandalone) {
            standaloneButton.style.display = "block"; // Show button in standalone mode
            browserButton.style.display = "none";
        } else {
            standaloneButton.style.display = "none"; // Hide button in browser mode
            browserButton.style.display = "block";
        }
    }

    // Run on page load
    checkStandaloneMode();

    // Listen for changes in display mode (useful for iOS)
    window.matchMedia("(display-mode: standalone)").addEventListener("change", checkStandaloneMode);
});

