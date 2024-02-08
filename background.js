chrome.runtime.onInstalled.addListener(() => {
  // Création d'un menu contextuel
  chrome.contextMenus.create({
      id: "sendToGitLab",
      title: "Envoyer à GitLab",
      contexts: ["page"]
  });

  // Récupérer les configurations des projets GitLab et créer des sous-menus pour chaque projet
  chrome.storage.local.get('gitLabConfigs', function(data) {
      const gitLabConfigs = data.gitLabConfigs || [];
      gitLabConfigs.forEach((config, index) => {
          chrome.contextMenus.create({
              id: "sendToGitLab_" + index,
              parentId: "sendToGitLab",
              title: config.name,
              contexts: ["page"]
          });
      });
  });
});

// Écouteur pour le clic sur le menu contextuel
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith("sendToGitLab_")) {
      const projectIndex = parseInt(info.menuItemId.split("_")[1]);
      sendPageContentToGitLab(projectIndex, tab);
  }
});

function sendPageContentToGitLab(projectIndex, tab) {
    chrome.tabs.sendMessage(tab.id, { action: "getPageContent", projectIndex: projectIndex }, function(response) {
        if (response && response.content) {
            const content = response.content;
            chrome.tabs.sendMessage(tab.id, { action: "getPageTitle" }, function(response) {
                if (response && response.title) {
                    const title = response.title;
                    chrome.tabs.sendMessage(tab.id, { action: "getPageUrl" }, function(response) {
                        if (response && response.url) {
                            const url = response.url;
                            createGitLabIssue(content, title, url, projectIndex);
                        } else {
                            console.error("Erreur lors de la récupération de l'URL de la page:", response);
                        }
                    });
                } else {
                    console.error("Erreur lors de la récupération du titre de la page:", response);
                }
            });
        } else {
            console.error("Erreur lors de la récupération du contenu de la page:", response);
        }
    });

}


function createGitLabIssue(content, title, url, projectIndex) {
    chrome.storage.local.get('gitLabConfigs', function(data) {
      const config = data.gitLabConfigs[projectIndex];
      const urlApi = `${config.url}/api/v4/projects/${encodeURIComponent(config.idProject)}/issues`;
      const body = JSON.stringify({
          title: title,
          description: `URL de la page: ${url}`,
          confidential: false // Indique si l'issue doit être confidentielle
      });

      fetch(urlApi, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.apiKey}` // Utilisez l'API Key pour l'authentification
          },
          body: body
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Erreur lors de la création de l\'issue');
          }
      });
  });
}
