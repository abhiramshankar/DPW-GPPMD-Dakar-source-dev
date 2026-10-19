# Quick Build Reference - DPW Dakar Dashboard SPFx

## TL;DR - Build in 5 Steps

```bash
# 1. Install dependencies
npm install

# 2. Set your environment (choose one)
gulp set-env --name "DPW-Prod"      # Production
gulp set-env --name "DPW-UAT"       # Testing
gulp set-env --name "DPW-Dev"       # Development
gulp set-env --name "BH"            # Brave & Heart testing
gulp set-env --name "Showcase"      # Demo

# 3. Build the solution
npm run build

# 4. Package for deployment
gulp package-solution

# 5. Deploy
# Upload solution/DPW-Dashboard.sppkg to SharePoint App Catalog
```

**Output:** `solution/DPW-Dashboard.sppkg` - Ready for SharePoint deployment

---

## Common Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Set production environment | `gulp set-env --name "DPW-Prod"` |
| Build code | `npm run build` |
| Create package | `gulp package-solution` |
| Local dev (hot reload) | `npm run serve` |
| Clean build artifacts | `npm run clean` |
| Run linter | `gulp lint` |
| Run tests | `npm run test` |

---

## Environment Names (Case-Sensitive)

- `DPW-Prod` - Production (all DP World sites)
- `DPW-UAT` - User Acceptance Testing
- `DPW-Dev` - Development (braveDashboardDev site)
- `BH` - Brave & Heart testing
- `Showcase` - Demo/showcase environment

---

## Complete Build Example

```bash
# Fresh clone
git clone <repo>
cd DPW-GPPMD-Dakar-source-dev
npm install

# For production
gulp set-env --name "DPW-Prod"
npm run build
gulp package-solution

# Package is ready at: solution/DPW-Dashboard.sppkg
```

---

## Deployment to SharePoint

1. Go to: `https://[tenant].sharepoint.com/sites/appcatalog`
2. Click **Upload** → Select `solution/DPW-Dashboard.sppkg`
3. Check **"Make this solution available to all sites in the organization"**
4. Click **Deploy**
5. Go to target site and add the **"DPW Dakar Project Dashboard"** web part

---

## What Gets Built

| File/Folder | Purpose |
|-------------|---------|
| `solution/DPW-Dashboard.sppkg` | Main package for deployment |
| `lib/` | Compiled JavaScript (temporary) |
| `temp/` | Build artifacts (temporary) |

---

## Dashboard Panels

Configured in `src/common/constants.ts`:

- **Works Progress** - Construction/project phase completion
- **Progress Against Milestones** - Milestone tracking
- **Key Risks** - Project risk status
- **Livestream** - Live camera feed (PhotoSentinel)
- **News** - Project news and updates
- **HSE Stats** - Health & Safety metrics
- **Environmental** - Environmental monitoring
- **Quality** - Quality metrics
- **Process** - Process tracking
- **Showcase Webcam** - Demo camera feed

---

## Configuration

Edit `src/common/constants.ts` for:
- SharePoint site URLs
- Term Set IDs
- Theme colors
- Livestream URLs
- Font families
- Photo API keys
- Visible panels

Or run `gulp set-env --name "EnvName"` to auto-configure.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| TypeScript errors | Check Node version (16.13+ or 18.17+, NOT 17.x) |
| gulp command not found | `npm install -g gulp-cli` |
| set-env not working | Verify environment name is exact (case-sensitive) |
| .sppkg not created | Ensure `npm run build` completed successfully |

---

## Node.js Version Check

```bash
node --version
# Should output: v16.13.0 or higher (v18.17.1+), NOT v17.x or v19.x
```

---

## Repository Structure

```
src/
├── common/constants.ts          ← Environment config (EDIT THIS)
├── webparts/dmsPortal/          ← Main web part
├── controls/                    ← Dashboard components
├── services/                    ← Data fetching
├── hooks/                       ← Custom React hooks
└── models/                      ← TypeScript types

config/
├── config.json                  ← Bundle config
└── package-solution.json        ← Solution metadata

solution/
└── DPW-Dashboard.sppkg          ← OUTPUT FILE (for deployment)
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/common/constants.ts` | All environment settings |
| `config/config.json` | SPFx bundle configuration |
| `config/package-solution.json` | Solution package metadata |
| `gulpfile.js` | Custom build tasks |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript compiler settings |

---

## Web Part Details

- **Name:** DPW Dakar Project Dashboard
- **ID:** `111268f6-1fed-44e9-be82-031f93c83ae5`
- **Bundle:** `dms-portal-web-part`
- **Supports:** SharePoint web parts, Teams tabs, Teams personal apps, Full-page apps

---

## Supported Hosts

The web part can be added to:
- SharePoint web parts
- Teams tabs
- Teams personal apps
- SharePoint full-page apps

---

## Next: Configuration

After building, configure these environment values:

```typescript
// In constants.ts for your environment:
const configYourEnv = {
  siteUrl: "https://your-sharepoint-domain",
  termGroupId: "...",
  UnitsTermSetId: "...",
  ProgressAgainstMilestonesStatusTermSetId: "...",
  ProgressAgainstMilestonesDateColumnName: "Key_x0020_Date",
  defaultLivestreamURL: "https://your-camera-feed-url",
  defaultLivestreamImageURL: "https://your-camera-snapshot-url",
  photoSentinelApiKey: "YOUR_ACTUAL_API_KEY",
  WorksProgressStatusTermSetId: "...",
  WorksProgressTypeTermSetId: "...",
  selectedPanels: [ /* dashboard panels */ ],
  Colors: { /* theme colors */ }
};
```

---

**For detailed guidance, see BUILD_GUIDE.md**
