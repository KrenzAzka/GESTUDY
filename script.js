document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/GESTUDY/sw.js")
        .then((reg) => {
            console.log("Service Worker registered!", reg);

            reg.onupdatefound = () => {
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                        console.log("New version available. Reloading...");
                        caches.keys().then((cacheNames) => {
                            cacheNames.forEach((cache) => caches.delete(cache)); // ✅ Clear old cache manually
                        });
                        window.location.reload(); // ✅ Reload to get new content
                    }
                };
            };
        })
        .catch((err) => console.log("Service Worker registration failed:", err));
}

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

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the PWA install");
            } else {
                console.log("User dismissed the PWA install");
            }
            deferredPrompt = null; // Reset the deferred prompt
        });
    }
}