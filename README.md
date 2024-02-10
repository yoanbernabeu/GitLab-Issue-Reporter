
# GitLab Issue Reporter (Experimental)

![](./icons/logo.png)

## Table of Contents

- [GitLab Issue Reporter (Experimental)](#gitlab-issue-reporter-experimental)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
  - [Disclaimer](#disclaimer)
  - [Installation](#installation)
    - [Google Chrome](#google-chrome)
  - [Main Features](#main-features)
  - [Usage](#usage)
    - [Add a Repository](#add-a-repository)
    - [Create a Bug Report (Issue)](#create-a-bug-report-issue)
  - [Authors](#authors)
  - [Contributing](#contributing)
  - [License](#license)

## Description

GitLab Issue Reporter is a Google Chrome extension that allows sending bug reports directly from a web page to a GitLab project.

## Prerequisites

To use this extension, you will need the Google Chrome browser.

## Disclaimer

This extension is provided on an experimental basis.

You will not find it on the Chrome Web Store.

Feel free to use it as is or modify it to suit your needs.

## Installation

### Google Chrome

To install this extension in developer mode, follow the steps below:

1. Clone this repository
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" located at the top right of the page.
4. Click on "Load unpacked" and select the folder containing the source code of the extension.
5. The extension should now be installed and ready to use.

## Main Features

Once the extension is installed, it adds a new option to the context menu (right-click) that allows you to select from a list a GitLab repository and create a bug report.

## Usage

### Add a Repository

To use the extension you need to add a GitLab repository.

To do this, click on the extension icon in your browser's toolbar and add a repository by filling in the following fields:

- Repository Name (Free)
- Access Token (GitLab API access token)
- GitLab Instance URL (URL of the GitLab instance)
- Project ID (ID of the GitLab project)

To obtain an access token to the GitLab API, go to your GitLab instance, go to `Settings` > `Access Tokens` and create a new token with `api` permissions.

To get the project ID, go to your GitLab instance, go to the project you want to use and retrieve the ID in Settings > General.

### Create a Bug Report (Issue)

To create a bug report, simply right-click on the web page you want to report, select the "Send to GitLab" option, and choose the repository in which you want to create the report.

In the background, the extension will retrieve the web page's information (URL and title) and open an issue in the selected repository (Issue name: Web page title, Issue description: Web page URL).

## Authors

- [Yoan Bernabeu](https://github.com/yoanbernabeu)

## Contributing

This project is in an experimental state and is not actively maintained. Feel free to fork it and modify it to suit your needs.

## License

[![GitHub license](https://img.shields.io/github/license/yoanbernabeu/gitlab-issue-reporter)](LICENSE)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.