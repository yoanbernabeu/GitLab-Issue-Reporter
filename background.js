chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'gitLabConfigs') {
      updateContextMenus();
    }
  }
});

function updateContextMenus() {
  chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
      id: "sendToGitLab",
      title: "Send to GitLab",
      contexts: ["page"]
    });

    chrome.storage.local.get('gitLabConfigs', function(data) {
      const gitLabConfigs = data.gitLabConfigs || [];
      gitLabConfigs.forEach((config) => {
        chrome.contextMenus.create({
          id: "sendToGitLab_" + config.idProject,
          parentId: "sendToGitLab",
          title: config.name,
          contexts: ["page"]
        });
      });
    });
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith("sendToGitLab_")) {
    const projectId = info.menuItemId.split("_")[1];
    sendPageContentToGitLab(projectId, tab);
  }
});

function sendPageContentToGitLab(projectId, tab) {
  chrome.storage.local.get('gitLabConfigs', function(data) {
    const gitLabConfigs = data.gitLabConfigs || [];
    const projectIndex = gitLabConfigs.findIndex(config => config.idProject === projectId);
    if (projectIndex !== -1) {
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
                }
              });
            }
          });
        }
      });
    }
  });
}

function createGitLabIssue(content, title, url, projectIndex) {
  chrome.storage.local.get('gitLabConfigs', function(data) {
    const config = data.gitLabConfigs[projectIndex];
    const urlApi = `${config.url}/api/v4/projects/${encodeURIComponent(config.idProject)}/issues`;
    const body = JSON.stringify({
      title: title,
      description: `URL: ${url}`,
      confidential: false
    });

    fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: body
    })
    .then(response => response.json())
    .then(data => console.log("Issue created successfully:", data))
    .catch(error => console.error("Error creating issue:", error));
  });
}
