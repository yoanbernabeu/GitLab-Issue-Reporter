document.getElementById('addGitlabConfig').addEventListener('click', addGitLabConfig);

function addGitLabConfig() {
    const index = document.getElementById('addGitlabConfig').getAttribute('data-editing-index');
    const name = document.getElementById('newGitlabName').value;
    const apiKey = document.getElementById('newGitlabApiKey').value;
    const url = document.getElementById('newGitlabUrl').value;
    const idProject = document.getElementById('newGitlabIdProject').value;
    const gitLabConfig = { name, apiKey, url, idProject };

    chrome.storage.local.get({gitLabConfigs: []}, function(data) {
        let configs = data.gitLabConfigs;
        if (index !== null) {
            // Mise à jour d'une configuration existante
            configs[index] = gitLabConfig;
        } else {
            // Ajout d'une nouvelle configuration
            configs.push(gitLabConfig);
        }
        chrome.storage.local.set({gitLabConfigs: configs}, function() {
            displayGitLabConfigs();
            document.getElementById('addGitlabConfig').removeAttribute('data-editing-index');
            document.getElementById('addGitlabConfig').textContent = 'Ajouter Configuration';
        });
    });
}


function displayGitLabConfigs() {
    chrome.storage.local.get('gitLabConfigs', function(data) {
        const listElement = document.getElementById('gitlabConfigs');
        listElement.innerHTML = '';
        data.gitLabConfigs.forEach((config, index) => {
            const div = document.createElement('div');

            const textContent = document.createTextNode(`${config.name} - ${config.url} - ${config.idProject}`);
            div.appendChild(textContent);

            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.addEventListener('click', function() { editGitLabConfig(index); });
            div.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', function() { deleteGitLabConfig(index); });
            div.appendChild(deleteButton);

            listElement.appendChild(div);
        });
    });
}

function editGitLabConfig(index) {
    chrome.storage.local.get('gitLabConfigs', function(data) {
        const config = data.gitLabConfigs[index];
        document.getElementById('newGitlabName').value = config.name;
        document.getElementById('newGitlabApiKey').value = config.apiKey;
        document.getElementById('newGitlabUrl').value = config.url;
        document.getElementById('newGitlabIdProject').value = config.idProject;

        // Stockez l'index de la configuration en cours de modification pour l'utiliser lors de la sauvegarde
        document.getElementById('addGitlabConfig').setAttribute('data-editing-index', index);
        // Changez le texte du bouton pour indiquer une mise à jour
        document.getElementById('addGitlabConfig').textContent = 'Mettre à jour la configuration';
    });
}

function deleteGitLabConfig(index) {
    chrome.storage.local.get('gitLabConfigs', function(data) {
        let configs = [...data.gitLabConfigs];
        configs.splice(index, 1);
        chrome.storage.local.set({gitLabConfigs: configs}, displayGitLabConfigs);
    });
}

// Assurez-vous d'appeler displayDomains et displayGitLabConfigs au chargement pour afficher les configurations existantes
document.addEventListener('DOMContentLoaded', function() {
    displayGitLabConfigs();
});
