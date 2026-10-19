# DPW Dakar Dashboard - Standard SPFx Template Guide

## Overview

This is a **reusable, configurable SharePoint Framework (SPFx) dashboard template** designed to work with any DP World project SharePoint site. The solution can be packaged once and deployed to multiple sites with different configurations.

**Key Principle**: Build once, configure everywhere.

---

## What This Solution Provides

A professional dashboard web part with **6 configurable panels**:

1. **Works Progress** - Track construction/project phase completion
2. **Progress Against Milestones** - Monitor key project dates and status
3. **Key Risks** - Display and track project risks
4. **Livestream** - Optional live feed display (configurable per site)
5. **News** - Project news and photo gallery
6. **HSE Stats** - Health & Safety metrics

All panels connect to **standard SharePoint lists** on the target site.

---

## Architecture: Configuration at Three Levels

### Level 1: Build-Time Configuration
Location: `src/common/constants.ts`

```typescript
// DEFAULT configuration used when building
const DEFAULT_CONFIG = {
  // Default display panels (can be overridden)
  selectedPanels: [
    { panelType: "WorksProgress", headerText: "WORKS PROGRESS" },
    { panelType: "ProgressAgainstMilestones", headerText: "MILESTONES" },
    { panelType: "KeyRisks", headerText: "KEY RISKS" },
    { panelType: "Livestream", headerText: "LIVESTREAM" },
    { panelType: "News", headerText: "NEWS" },
    { panelType: "HSEStats", headerText: "HSE STATS" }
  ],
  // Theme colors (can be overridden per site)
  Colors: {
    Background: "#1E1450",
    OnTrack: "#00E68C",
    OffTrack: "#FF5C5C",
    // ... theme colors
  }
};

// Export the default configuration
export const config = DEFAULT_CONFIG;
```

**Purpose**: Sensible defaults that work for most sites

### Level 2: Web Part Property Panel (Runtime Configuration)
Users can configure these when adding the web part:

- **Livestream URL** (optional) - Link to live camera feed
- **Livestream Image URL** (optional) - Snapshot image URL
- **Dashboard Title** (optional) - Custom dashboard name

### Level 3: List Column Mapping (Per-Site Configuration)
Each SharePoint site can have lists with different column names. The solution discovers and uses:

- **Works Progress List**: Looks for progress % fields
- **Milestones List**: Looks for date and status fields
- **Key Risks List**: Looks for risk and severity fields
- **HSE Stats List**: Looks for numeric metric fields
- **News List**: Looks for title and body fields

---

## Build & Deployment Model

### Standard Build (One-Time)

```bash
# Install dependencies
npm install

# Use DEFAULT configuration (no environment-specific settings)
# constants.ts already exported with DEFAULT_CONFIG

# Build the solution
npm run build

# Package for distribution
gulp package-solution

# Output: solution/DPW-Dashboard.sppkg (reusable package)
```

**Result**: A single `.sppkg` file that works with ANY DP World SharePoint site.

### Deploy to Multiple Sites

Same `.sppkg` file can be deployed to:
- SNDKR Ndayane Port site
- Future project sites
- Any DP World project SharePoint site

Each site simply configures its own lists and web part properties.

---

## Required SharePoint List Structure

For the dashboard to work on ANY site, the site must have these **standard lists**:

### 1. Works Progress List
**Required Columns:**
- Title (Text) - Workstream name
- Progress (Percentage) - % completion
- Status (Choice) - On Track / At Risk / Delayed / Complete
- Description (Text) - Optional details

### 2. Progress Against Milestones List
**Required Columns:**
- Title (Text) - Milestone name
- Key_x0020_Date (Date) - Target date
- Status (Choice) - Not Started / In Progress / Completed / Delayed
- Description (Text) - Optional details

### 3. Key Risks List
**Required Columns:**
- Title (Text) - Risk description
- Severity (Choice) - High / Medium / Low
- Status (Choice) - Active / Mitigated / Closed
- Description (Text) - Risk details

### 4. HSE Stats List
**Required Columns:**
- Title (Text) - Metric name
- Value (Number) - Current value
- Target (Number) - Target value
- Unit (Text) - Measurement unit (incidents, days, %, etc.)
- Status (Choice) - On Track / At Risk

### 5. News List
**Required Columns:**
- Title (Text) - News headline
- Body (Rich Text) - News content
- Created (Date/Time) - Auto-populated
- Featured Image (Hyperlink/Picture) - Optional
- Published (Choice) - Yes / No

### 6. Livestream (Optional)
Can be a single list item or external configuration.

---

## Installation for New Sites

### Step 1: Upload to App Catalog (One-Time, Tenant-Level)

```bash
# Administrator action: Deploy to App Catalog
# URL: https://[tenant].sharepoint.com/sites/appcatalog
# File: solution/DPW-Dashboard.sppkg
# Action: Upload and Deploy (make available to all sites)
```

Once deployed to App Catalog, **any project site can install it**.

### Step 2: Prepare the SharePoint Site

For each new project site:

1. **Create standard lists** (Works Progress, Milestones, Risks, HSE Stats, News)
2. **Add sample data** to populate the dashboard
3. **Create necessary Term Sets** for choice fields

### Step 3: Install & Configure Web Part

1. Go to project site home page
2. Edit the page
3. Add web part → Search **"DPW Dakar"** or **"DmsPortal"**
4. Click **DPW Dakar Project Dashboard**
5. Configure optional properties:
   - Livestream URL (if applicable)
   - Livestream Image URL (if applicable)

### Step 4: Verify Data Display

- Confirm all 6 panels load
- Check data from lists appears correctly
- Test filters and sorting if available

---

## Customization per Site

Each site can customize:

**Visual Configuration:**
- Dashboard title (web part property)
- Theme colors (edit constants.ts before build, or consider moving to property pane)
- Visible panels (edit constants.ts before build)

**Data Configuration:**
- List names (discovers automatically)
- Column names (configurable in component properties)
- Sample data (populate each site's lists)

**Optional Features:**
- Livestream URL (site-specific)
- Livestream image (site-specific)
- Additional panels (hidden by default, enable in constants.ts)

---

## What Requires Rebuilding vs. Configuration

### ✅ Can Configure WITHOUT Rebuilding
- Livestream URLs (web part property)
- Dashboard title (web part property)
- List data (SharePoint side)
- Web part appearance (SharePoint side)

### ⚠️ Requires Rebuild to Change
- Color scheme (constants.ts)
- Panel visibility (constants.ts)
- Font families (constants.ts)
- List column mappings (if changing standard names)

**Recommendation**: Keep colors and panels fixed in default config. Use web part properties for site-specific URLs.

---

## File Structure for Template

```
DPW-GPPMD-Dakar-source-dev/
├── src/
│   ├── common/
│   │   └── constants.ts              # DEFAULT configuration (no env-specific)
│   ├── controls/                     # Reusable panels (no hardcoding)
│   ├── webparts/dmsPortal/           # Main web part
│   │   ├── DmsPortalWebPart.ts       # Properties for livestream URLs
│   │   └── components/DmsPortal.tsx  # Main component
│   ├── services/                     # SharePoint list services
│   └── models/                       # Reusable types
├── config/
│   ├── config.json                   # Bundle config
│   └── package-solution.json         # Solution metadata
├── solution/
│   └── DPW-Dashboard.sppkg           # OUTPUT: Reusable package
└── BUILD_GUIDE.md
```

**Key Point**: No environment-specific configurations. Just standard defaults.

---

## Standard Build Process

Simple, repeatable process:

```bash
# 1. Install dependencies (once per development environment)
npm install

# 2. Build the template
npm run build

# 3. Package for distribution
gulp package-solution

# Result: solution/DPW-Dashboard.sppkg
# This file is ready to deploy to any SharePoint site
```

**That's it.** No environment switching, no API key configuration needed.

---

## Default Configuration (src/common/constants.ts)

```typescript
const DEFAULT_CONFIG = {
  // Generic site URL (not used at runtime, kept for legacy compatibility)
  siteUrl: "https://dpworld.sharepoint.com",
  
  // Standard term set IDs (can be overridden per site if needed)
  termGroupId: "...",
  ProgressAgainstMilestonesStatusTermSetId: "...",
  WorksProgressStatusTermSetId: "...",
  
  // IGNORE PhotoSentinel for now (kept for future use)
  photoSentinelApiKey: "PLACEHOLDER - CONFIGURE IN WEB PART PROPERTIES",
  
  // Default theme (professional, works everywhere)
  WideFontFamily: "Pilat Wide, Arial, Helvetica, sans-serif",
  FontFamily: "Pilat, Arial, Helvetica, sans-serif",
  
  // Standard panel configuration (6 panels)
  selectedPanels: [
    { panelType: "WorksProgress", headerText: "WORKS PROGRESS" },
    { panelType: "ProgressAgainstMilestones", headerText: "MILESTONES" },
    { panelType: "KeyRisks", headerText: "KEY RISKS" },
    { panelType: "Livestream", headerText: "LIVESTREAM" },
    { panelType: "News", headerText: "NEWS" },
    { panelType: "HSEStats", headerText: "HSE STATS" }
  ],
  
  // Standard color scheme (dark theme works for all projects)
  Colors: {
    Background: "#1E1450",        // Professional dark purple
    Background1: "#3230BE",
    OnTrack: "#00E68C",           // Green
    OffTrack: "#FF5C5C",          // Red
    AtRisk: "#FF5C5C",            // Red
    Completed: "#4D96FF",         // Blue
    Behind: "#FFA800",            // Orange
    Ahead: "#00E68C",             // Green
    Delayed: "#FF5C5C",           // Red
    InProgress: "#FFA800",        // Orange
    NotStarted: "#CCCCCC",        // Gray
    CompletedMilestone: "#4D96FF",// Blue
    unknownStatus: "#F5F3F5",     // Light
    Text: "#d8d8d8"               // Light text
  }
};

export const config = DEFAULT_CONFIG;
```

**Philosophy**: These defaults work for ANY project. Customization is done per-site, not per-build.

---

## Web Part Properties (Runtime Configuration)

Users can configure these when adding/editing the web part:

```typescript
export interface IDmsPortalWebPartProps {
  // Optional livestream configuration
  livestreamURL?: string;
  livestreamImageURL?: string;
  
  // Optional dashboard title override
  dashboardTitle?: string;
  
  // Future: Additional per-site overrides
}
```

These properties appear in the web part property pane, allowing non-technical users to:
- Set livestream URLs
- Customize display text
- Enable/disable optional features

---

## One Package, Many Sites Example

### Deploy to Site 1: SNDKR Ndayane Port

```
1. Upload DPW-Dashboard.sppkg to App Catalog (done once)
2. Install on SNDKR Ndayane Port site
3. Create lists: Works Progress, Milestones, Risks, HSE Stats, News
4. Populate with Dakar-specific data
5. Configure web part livestream URL (PhotoSentinel or other)
6. Done - Dashboard ready
```

### Deploy to Site 2: Future Project A

```
1. App already in App Catalog - just install
2. Create lists: Works Progress, Milestones, Risks, HSE Stats, News
3. Populate with Project A data
4. Configure web part livestream URL (different camera)
5. Done - Dashboard ready (same code, different data)
```

### Deploy to Site 3: Future Project B

```
1. App already in App Catalog - just install
2. Create lists: Works Progress, Milestones, Risks, HSE Stats, News
3. Populate with Project B data
4. Configure livestream (or leave blank)
5. Done - Dashboard ready
```

**Same .sppkg file. Different data. Reusable template.**

---

## Configuration Checklist per New Site

When deploying to a new SharePoint site:

- [ ] App installed from App Catalog
- [ ] Works Progress list created with standard columns
- [ ] Milestones list created with standard columns
- [ ] Key Risks list created with standard columns
- [ ] HSE Stats list created with standard columns
- [ ] News list created with standard columns
- [ ] Sample data added to lists
- [ ] Web part added to home page
- [ ] Livestream URL configured (if applicable)
- [ ] Dashboard tested - all panels load
- [ ] Verified: data appears correctly from lists

---

## Benefits of This Template Approach

✅ **Build Once, Deploy Everywhere**: Single .sppkg works on any site  
✅ **Low Maintenance**: No need to rebuild for each project  
✅ **Scalable**: Easy to add to 10+ project sites  
✅ **Flexible**: Per-site data and configuration  
✅ **Professional**: Consistent look across all projects  
✅ **Future-Ready**: Can expand panels without rebuilding  

---

## Limitations to Be Aware Of

⚠️ **Theme Colors**: Changing colors requires rebuild (or move to property pane)  
⚠️ **Visible Panels**: Changing which panels show requires rebuild  
⚠️ **List Column Names**: Assumes standard column names (can be made configurable)  
⚠️ **Term Sets**: May vary per site, needs verification  

**Recommendation**: Lock theme and panels in default config. Allow site-specific URLs and data only.

---

## Future Enhancements

Without rebuilding, can add to property pane:

- [ ] Custom dashboard title
- [ ] Color theme selector (light/dark/custom)
- [ ] Panel visibility toggle
- [ ] List column name mapping
- [ ] Custom header image
- [ ] Refresh interval configuration

These would allow true no-rebuild customization.

---

## Build & Package Instructions (Standard Template)

```bash
# STEP 1: Install dependencies (one time)
npm install

# STEP 2: Build (constants.ts already has default config)
npm run build

# STEP 3: Package
gulp package-solution

# STEP 4: Distribute
# File: solution/DPW-Dashboard.sppkg
# Upload to App Catalog (one time)
# Then install on any project site
```

**Complete. Ready to deploy to unlimited project sites.**

---

## Version Control

For a template, track:

```
Commit:
✅ src/          (source code)
✅ config/       (default configuration)
✅ package.json  (dependencies)
✅ .yo-rc.json   (SPFx config)
✅ gulpfile.js   (build process)

Don't commit:
❌ node_modules/  (install via npm install)
❌ lib/           (build artifact)
❌ temp/          (build artifact)
❌ solution/      (build output, but consider committing for distribution)
```

---

## Deployment Workflow

```
1. Developer: npm run build + gulp package-solution
   → Creates solution/DPW-Dashboard.sppkg

2. SharePoint Admin: Upload to App Catalog
   → Makes available to all sites

3. Project Manager: Install on project site
   → Adds web part to home page

4. Site Owner: Configure lists and data
   → Populates dashboard with project info

5. Users: View dashboard
   → Real-time project visibility
```

**Each role, different responsibility. One package.**

---

## Conclusion

This is a **reusable, configurable standard SPFx template** that:
- Builds once
- Deploys to many sites
- Configures per-site
- Scales to dozens of projects
- Maintains consistency across the organization

Perfect for rolling out to the SNDKR Ndayane Port project and future DP World initiatives.

---

**Next Step**: Build the standard template and prepare for deployment to SharePoint App Catalog.

---

**Version**: 1.0  
**Purpose**: Standard Template (not environment-specific)  
**Scope**: DP World Global Project Dashboard  
**Last Updated**: October 6, 2026
