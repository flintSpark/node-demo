# Azure Web App CI/CD Workflow Setup

This document explains how to configure and use the GitHub Actions deployment workflow defined in [`azure-webapps-node.yml`](https://github.com/flintSpark/node-in-azure/blob/master/.github/workflows/azure-webapps-node.yml?utm_source=gemini).

---

## 📌 Overview

This workflow automates building, testing, and deploying your Node.js application directly to **Azure App Service**.

* **Workflow Path:** `.github/workflows/azure-webapps-node.yml`
* **Triggers:**
* Direct push to the `master` branch.
* Manual execution via the GitHub **Actions** tab (`workflow_dispatch`).


* **Node.js Version:** `20.x`
* **Deployment Environment:** `Development`

---

## ⚙️ Setup & Prerequisites

### 1. Update Environment Variables

In [`azure-webapps-node.yml`](https://github.com/flintSpark/node-in-azure/blob/master/.github/workflows/azure-webapps-node.yml?utm_source=gemini), update the `env` block with your Azure App Service details:

```yaml
env:
  AZURE_WEBAPP_NAME: 'your-app-name'   # Replace with your actual Azure App Service name
  AZURE_WEBAPP_PACKAGE_PATH: '.'     # Path to your Node.js app root (default: '.')
  NODE_VERSION: '20.x'               # Node.js runtime version

```

### 2. Configure Azure Publish Profile Secret

To allow GitHub Actions to deploy to Azure, you must store your App Service publish profile as a secret in GitHub:

1. Open the **Azure Portal** and navigate to your **App Service Web App**.
2. On the **Overview** blade, click **Get publish profile** to download the XML publish profile file.
3. In your GitHub repository, navigate to **Settings** > **Secrets and variables** > **Actions**.
4. Click **New repository secret** and configure:
* **Name:** `AZURE_WEBAPP_PUBLISH_PROFILE`
* **Secret:** Paste the entire contents of the downloaded publish profile XML file.


5. Click **Add secret**.

---

## 🔄 Pipeline Breakdown

### `build` Job

Runs on `ubuntu-latest`:

1. **Checkout:** Clones the repository using `actions/checkout@v4`.
2. **Setup Node:** Initializes Node.js `20.x` with `npm` dependency caching (`actions/setup-node@v4`).
3. **Build & Test:** Executes:
```bash
npm install
npm run build --if-present
npm run test --if-present

```


4. **Artifact Upload:** Packs project files into a deployment artifact named `node-app` (`actions/upload-artifact@v4`).

### `deploy` Job

Runs on `ubuntu-latest` (depends on successful completion of `build`):

1. **Artifact Download:** Retrieves the `node-app` artifact (`actions/download-artifact@v4`).
2. **Azure Deployment:** Uses `azure/webapps-deploy@v2` to deploy the artifact to Azure App Service using `AZURE_WEBAPP_PUBLISH_PROFILE`.

---

## 🚀 Triggering a Deployment

* **Automatic:** Push changes directly to the `master` branch.
* **Manual Trigger:**
1. Open your repository on GitHub.
2. Click the **Actions** tab.
3. Select **Deploy to Azure WebApp** from the left sidebar.
4. Click **Run workflow**, select the target branch, and execute.
