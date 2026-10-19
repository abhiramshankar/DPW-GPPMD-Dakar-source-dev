# DPW-GPPMD-Dakar Dashboard - Build Guide

## Overview
This document provides step-by-step instructions for building the SharePoint Framework (SPFx) solution package for the DPW Dakar Project Dashboard.

**Project:** DPW-GPPMD-Dakar-Dashboard  
**Solution Name:** DPW-Dashboard  
**SPFx Version:** 1.18.2  
**Node.js Version:** 18.x or 16.13.0  

## Prerequisites

### Required Software
- **Node.js**: v16.13.0 - v16.20.x OR v18.17.1 - v18.x (do NOT use v17.x or v19.x)
- **npm**: 8.x or higher (comes with Node.js)
- **Git**: For version control

### Required Global npm Packages
```bash
npm install -g gulp-cli yo @microsoft/generator-sharepoint spfx-fast-serve
```

### Environment Configuration
You must set the correct environment before building:
- **DPW-Dev**: Development environment (braveDashboardDev site)
- **DPW-UAT**: User Acceptance Testing environment
- **DPW-Prod**: Production environment (all DP World sites)
- **BH**: Brave & Heart internal testing environment
- **Showcase**: Demo/showcase environment

## Project Structure

```
DPW-GPPMD-Dakar-source-dev/
├── src/
│   ├── common/               # Shared utilities and constants
│   │   └── constants.ts      # Environment configuration
│   ├── controls/             # Reusable dashboard components
│   │   ├── WorksProgress/
│   │   ├── ProgressAgainstMilestones/
│   │   ├── KeyRisks/
│   │   ├── Livestream/
│   │   ├── News/
│   │   ├── HSEStats/
│   │   ├── Environmental/
│   │   ├── Quality/
│   │   └── ... (other components)
│   ├── webparts/             # SPFx web part
│   │   └── dmsPortal/        # Main dashboard web part
│   │       ├── DmsPortalWebPart.ts      # Web part class
│   │       ├── DmsPortalWebPart.manifest.json
│   │       └── components/
│   ├── services/             # API services and data fetching
│   ├── helpers/              # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── models/               # TypeScript interfaces and types
├── config/                   # SPFx build configuration
│   ├── config.json           # Bundle configuration
│   ├── package-solution.json # Solution metadata
│   └── deploy-azure-storage.json
├── package.json              # npm dependencies
├── gulpfile.js              # Build tasks
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## Build Process

### Step 1: Install Dependencies

Navigate to the project root and install npm packages:

```bash
cd DPW-GPPMD-Dakar-source-dev
npm install
```

This installs all dependencies defined in `package.json` including:
- SharePoint Framework libraries (@microsoft/sp-*)
- React and related libraries
- PnP libraries for SharePoint integration
- Build and dev tools

### Step 2: Set Environment Configuration

Choose your target environment and run the set-env task:

```bash
# For DPW Production
gulp set-env --name "DPW-Prod"

# For DPW UAT
gulp set-env --name "DPW-UAT"

# For DPW Development
gulp set-env --name "DPW-Dev"

# For Brave & Heart testing
gulp set-env --name "BH"

# For Showcase
gulp set-env --name "Showcase"
```

**What this does:**
- Updates `src/common/constants.ts` to use the correct configuration
- Updates `config/package-solution.json` with environment-specific settings
- Configures:
  - Site URLs
  - SharePoint Term Group IDs
  - Term Set IDs for lookups
  - Livestream URLs and API keys
  - Theme colors
  - Dashboard panel selections

**Available Configurations:**
Each environment has specific term set IDs and configuration values:
- **DPW-Prod/UAT/Dev**: Configured for DP World SharePoint
- **BH**: Configured for Brave & Heart test environment
- **Showcase**: Uses Segoe UI fonts and demo color scheme

### Step 3: Build the Solution

Run the build task to compile TypeScript and bundle the solution:

```bash
npm run build
```

Or equivalently:

```bash
gulp bundle
```

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles components with Webpack
- Generates manifests
- Creates temporary files in the `/lib` folder

**Output:**
- Compiled files: `lib/` directory
- Bundle: Single JavaScript bundle

### Step 4: Package the Solution

Create the SPFx package (.sppkg file):

```bash
gulp package-solution
```

**What this does:**
- Creates the SPFx package file
- Bundles all assets
- Generates the `.sppkg` file

**Output location:** `solution/DPW-Dashboard.sppkg`

The `.sppkg` file is a SharePoint app package ready for deployment to your SharePoint App Catalog.

## Complete Build Workflow

To build from scratch:

```bash
# 1. Install dependencies
npm install

# 2. Set environment (choose one)
gulp set-env --name "DPW-Prod"

# 3. Build
npm run build

# 4. Package
gulp package-solution
```

Or use the shorthand for testing locally:

```bash
npm install
npm run serve  # Starts local dev server with hot reload
```

## Output Files

After a successful build:

```
solution/
└── DPW-Dashboard.sppkg          # Main package file (for App Catalog)

lib/                             # Compiled TypeScript (temporary)
├── webparts/
├── controls/
├── common/
└── ...

temp/                            # Temporary build artifacts
├── manifests/
├── bundles/
└── ...
```

## Deployment Steps

### 1. Upload to SharePoint App Catalog

1. Navigate to your SharePoint tenant App Catalog
   - URL format: `https://[tenant].sharepoint.com/sites/appcatalog`

2. Click **Upload** and select `solution/DPW-Dashboard.sppkg`

3. In the dialog that appears:
   - Check "Make this solution available to all sites in the organization"
   - Click **Deploy**

### 2. Add Web Part to SharePoint Site

1. Go to the target project SharePoint site (e.g., SNDKR Ndayane Port site)
2. Edit the homepage
3. Click **Add web part** (or + icon)
4. Search for **"DPW Dakar Project Dashboard"** or **"DmsPortal"**
5. Click to add the web part

### 3. Configure Web Part Properties

The web part has configurable properties:

- **livestreamURL**: URL to the live camera feed
  - Default: PhotoSentinel dashboard URL
- **livestreamImageURL**: URL to the latest snapshot image
  - Default: PhotoSentinel latest photo API endpoint

### 4. Configure Lists and Data

The dashboard displays data from SharePoint lists:

**Works Progress List**
- Progress percentages by workstream
- Uses Term Set: `WorksProgressStatusTermSetId`

**Progress Against Milestones List**
- Milestone tracking and completion status
- Date column configured via `ProgressAgainstMilestonesDateColumnName`

**Key Risks List**
- Project risks and severity indicators

**HSE Statistics List**
- Health & Safety metrics
- Incident tracking

**News List**
- Project news and updates

**Livestream Configuration**
- Typically points to PhotoSentinel or similar live camera service

## Troubleshooting

### Issue: Build fails with "Cannot find module @microsoft/sp-*"

**Solution:** Run `npm install` to ensure all dependencies are installed.

### Issue: TypeScript compilation errors

**Solution:**
1. Check that Node.js version is 16.13.0+ or 18.17.1+ (NOT 17.x or 19.x)
2. Run `npm install` to update dependencies
3. Delete `node_modules` and `package-lock.json`, then reinstall

### Issue: "gulp set-env command not found"

**Solution:** Ensure gulp-cli is installed globally:
```bash
npm install -g gulp-cli
```

### Issue: Environment configuration not updating

**Solution:** Verify the gulp set-env command used the correct environment name:
- DPW-Prod (case-sensitive)
- DPW-UAT
- DPW-Dev
- BH
- Showcase

### Issue: .sppkg file not created

**Solution:**
1. Ensure `gulp bundle` completed successfully
2. Run `gulp package-solution --nobuild` to package existing bundle

## Environment Constants Configuration

The `src/common/constants.ts` file controls all environment-specific settings:

**Key Configuration Items:**

```typescript
const configDPWProd = {
  siteUrl: "https://dpworld.sharepoint.com",           // Target SharePoint site
  termGroupId: "...",                                   // Term store group ID
  UnitsTermSetId: "...",                                // Term set for units
  ProgressAgainstMilestonesStatusTermSetId: "...",      // Milestone status terms
  ProgressAgainstMilestonesDateColumnName: "Key_x0020_Date",  // List column name
  defaultLivestreamURL: "https://...",                  // Live camera stream
  defaultLivestreamImageURL: "https://...",             // Latest photo/snapshot
  WorksProgressStatusTermSetId: "...",                  // Works progress terms
  WorksProgressTypeTermSetId: "...",                    // Works type terms
  photoSentinelApiKey: "REPLACE_WITH_YOUR_API_KEY",     // Photo API key
  WideFontFamily: "Pilat Wide, Arial, sans-serif",      // Custom font
  FontFamily: "Pilat, Arial, sans-serif",               // Standard font
  selectedPanels: [                                      // Visible dashboard panels
    { panelType: "WorksProgress", headerText: "WORKS PROGRESS" },
    { panelType: "ProgressAgainstMilestones", headerText: "MILESTONES" },
    { panelType: "KeyRisks", headerText: "KEY RISKS" },
    { panelType: "Livestream", headerText: "LIVESTREAM" },
    { panelType: "News", headerText: "NEWS" },
    { panelType: "HSEStats", headerText: "HSE STATS" }
  ],
  Colors: {                                              // Theme colors
    Background: "#1E1450",
    OnTrack: "#00E68C",
    OffTrack: "#FF5C5C",
    // ... etc
  }
};
```

To customize for your environment:
1. Edit `src/common/constants.ts`
2. Add your configuration object
3. Update the export at the bottom: `export const config = configYourEnv;`
4. Or run `gulp set-env --name "YourEnvName"`

## Local Development

For local development with hot reload:

```bash
npm run serve
```

This uses `spfx-fast-serve` for rapid iteration:
- Watches for file changes
- Rebuilds automatically
- Hot module reloading
- Opens SharePoint workbench in browser

Access the local workbench at:
```
https://[yoursiteurl]/_layouts/workbench.aspx
```

## Version Control

The `.gitignore` file excludes:
- `node_modules/`
- Build artifacts (`dist/`, `lib/`, `temp/`)
- Environment-specific compiled files

Always commit:
- `src/` folder (source code)
- `config/` folder (configuration)
- `package.json` and `package-lock.json`
- `.yo-rc.json`
- `.eslintrc.js`

Never commit:
- Built files (lib/, dist/)
- Dependencies (node_modules/)
- API keys (replace with REPLACE_WITH_YOUR_*)

## Next Steps

After building the .sppkg file:

1. **Upload to App Catalog**: Deploy to your SharePoint App Catalog
2. **Install on Site**: Add the app to the target SharePoint site
3. **Configure Lists**: Set up required SharePoint lists with data
4. **Map Columns**: Link dashboard panels to appropriate list columns
5. **Test**: Verify all panels display data correctly
6. **Monitor**: Check SharePoint logs for any runtime errors

## Support

For issues or questions:
1. Check the wiki: `DPW-GPPMD-Dakar-wiki/Overview.md`
2. Review component source in `src/controls/`
3. Check constants configuration in `src/common/constants.ts`
4. Review SharePoint Admin Center for app deployment issues

---

**Last Updated:** October 6, 2026  
**Version:** 1.0
