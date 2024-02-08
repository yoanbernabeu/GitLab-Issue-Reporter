// Fonction qui récupère le contenu de la page et le renvoie au background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getPageContent") {
        console.log("Contenu de la page récupéré:", document.body.innerText);
        sendResponse({content: document.body.innerText}); // Envoyer le texte de la page
    }
});

// Fonction qui récupère le titre de la page et le renvoie au background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getPageTitle") {
        console.log("Titre de la page récupéré:", document.title);
        sendResponse({title: document.title}); // Envoyer le titre de la page
    }
});

// Fonction qui récupère l'URL de la page et le renvoie au background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getPageUrl") {
        console.log("URL de la page récupérée:", document.URL);
        sendResponse({url: document.URL}); // Envoyer l'URL de la page
    }
});