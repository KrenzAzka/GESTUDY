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


let deferredPrompt; // Declare globally

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); // Prevent auto-popup
    deferredPrompt = event; // Save the event for later use
    console.log("Install prompt saved.");
    
    // Show install button
    document.getElementById("browserButton").style.display = "block";
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show install prompt

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the PWA install");
            } else {
                console.log("User dismissed the PWA install");
            }
            deferredPrompt = null; // Reset after interaction
        });
    } else {
        console.log("No install prompt available.");
    }
}

// Check if running in standalone mode
window.addEventListener("DOMContentLoaded", () => {
    const standaloneButton = document.getElementById("standaloneButton");
    const browserButton = document.getElementById("browserButton");

    function checkStandaloneMode() {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
        
        if (isStandalone) {
            standaloneButton.style.display = "block"; // Show standalone button
            browserButton.style.display = "none"; // Hide install button
        } else {
            standaloneButton.style.display = "none";
            browserButton.style.display = "block"; // Show install button
        }
    }

    checkStandaloneMode();
    window.matchMedia("(display-mode: standalone)").addEventListener("change", checkStandaloneMode);
});
