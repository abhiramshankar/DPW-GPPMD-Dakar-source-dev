# Action Plan: Build & Deploy Standard Dashboard Template

## Overview

You have a **reusable SharePoint Framework template** that will be:
1. Built once as a standard .sppkg file
2. Deployed to SharePoint App Catalog
3. Installed on any DP World project site
4. Configured per-site with project data

This document outlines your action plan.

---

## Phase 1: Build the Template (30 minutes)

### Step 1: Verify Prerequisites
```bash
# Check Node.js version (should be 16.13.0+ or 18.17.1+, NOT 17.x)
node --version

# Check npm version
npm --version
```

**If versions are wrong**: Install Node.js from nodejs.org

### Step 2: Install Global Tools (One-time)
```bash
npm install -g gulp-cli yo @microsoft/generator-sharepoint spfx-fast-serve
```

### Step 3: Navigate to Project
```bash
cd DPW-GPPMD-Dakar-source-dev
```

### Step 4: Install Dependencies
```bash
npm install
```

Wait 2-3 minutes for dependencies to download.

### Step 5: Build the Template
```bash
npm run build
```

Expected output: Build succeeded

### Step 6: Package for Deployment
```bash
gulp package-solution
```

Expected output: Successfully created package

### Step 7: Verify Output File
```bash
ls solution/DPW-Dashboard.sppkg
# or on Windows: dir solution\DPW-Dashboard.sppkg
```

Should show ~500KB file size.

---

## Phase 2: Deploy to SharePoint App Catalog (15 minutes)

### Step 1: Access App Catalog
URL: `https://[your-tenant].sharepoint.com/sites/appcatalog`

**Required**: SharePoint Admin or App Catalog Owner permissions

### Step 2: Upload Package
- Click **Upload** button (or **New** → **App**)
- Select: `solution/DPW-Dashboard.sppkg`
- Click **Next**

### Step 3: Enable for All Sites
- Check: **"Make this solution available to all sites in the organization"**
- Click **Deploy**

Wait 1-2 minutes for deployment to complete.

### Step 4: Verify Deployment
Once deployed, you'll see:
- Status: **Available to install**
- Can be installed on any project site

---

## Phase 3: Install on SNDKR Ndayane Port Site (15 minutes)

### Step 1: Go to Project Site
URL: `https://dpworld.sharepoint.com/sites/SNDKRNdayaneport`

(or your actual SNDKR site URL)

### Step 2: Prepare Lists
Before adding the web part, create these SharePoint lists:

**List 1: Works Progress**
- Create new list
- Add columns:
  - Title (Text) - default
  - Progress (Percentage)
  - Status (Choice: On Track, At Risk, Delayed, Completed)
  - Description (Text)

**List 2: Progress Against Milestones**
- Create new list
- Add columns:
  - Title (Text) - default
  - Key_x0020_Date (Date)
  - Status (Choice: Not Started, In Progress, Completed, Delayed)
  - Description (Text)

**List 3: Key Risks**
- Create new list
- Add columns:
  - Title (Text) - default
  - Severity (Choice: High, Medium, Low)
  - Status (Choice: Active, Mitigated, Closed)
  - Description (Text)

**List 4: HSE Stats**
- Create new list
- Add columns:
  - Title (Text) - default
  - Value (Number)
  - Target (Number)
  - Unit (Text)
  - Status (Choice: On Track, At Risk)

**List 5: News**
- Create new list
- Add columns:
  - Title (Text) - default
  - Body (Rich Text)
  - Created (Date/Time) - default
  - Featured Image (Hyperlink)

### Step 3: Add Sample Data
Populate each list with sample project data:
- Works Progress: 3-5 items with % and status
- Milestones: 3-5 items with dates
- Risks: 2-3 items
- HSE Stats: 5-10 metrics
- News: 2-3 items

### Step 4: Add Web Part to Home Page
- Edit home page
- Click **+ Add web part**
- Search: **"DPW Dakar"** or **"DmsPortal"**
- Click **DPW Dakar Project Dashboard**

### Step 5: Configure (Optional)
- Livestream URL: Leave blank (or enter camera URL if available)
- Livestream Image URL: Leave blank (or enter snapshot URL)

### Step 6: Publish
- Save/Publish the page
- Dashboard is now live

### Step 7: Verify
- Check that all 6 panels load:
  - ✅ Works Progress
  - ✅ Progress Against Milestones
  - ✅ Key Risks
  - ✅ Livestream (optional)
  - ✅ News
  - ✅ HSE Stats
- Confirm data appears from your lists

---

## Phase 4: Ready for Future Projects (Reuse)

Once template is in App Catalog, deploying to future project sites is simple:

### For Project Site 2 (Future):
1. Install app from App Catalog
2. Create 5 standard lists
3. Add sample data
4. Add web part to home page
5. Done

**No rebuild needed. Same .sppkg file.**

---

## Timeline

| Phase | Task | Time |
|-------|------|------|
| 1 | Build & Package | 30 min |
| 2 | Deploy to App Catalog | 15 min |
| 3 | Configure SNDKR Site | 30 min |
| **Total** | | **75 min (1.25 hours)** |

---

## Checklist: Build Phase

- [ ] Node.js 16.13.0+ or 18.17.1+ installed
- [ ] npm 8.x+ installed
- [ ] Global tools installed (gulp-cli, yo, spfx-fast-serve)
- [ ] Navigated to project directory
- [ ] `npm install` completed
- [ ] `npm run build` succeeded
- [ ] `gulp package-solution` succeeded
- [ ] `solution/DPW-Dashboard.sppkg` file exists

---

## Checklist: App Catalog Phase

- [ ] Access to App Catalog
- [ ] Uploaded DPW-Dashboard.sppkg
- [ ] Checked "Make available to all sites"
- [ ] Clicked Deploy
- [ ] Deployment completed successfully

---

## Checklist: SNDKR Site Phase

### Lists Created:
- [ ] Works Progress list (with columns: Title, Progress %, Status, Description)
- [ ] Progress Against Milestones list (with columns: Title, Key_x0020_Date, Status, Description)
- [ ] Key Risks list (with columns: Title, Severity, Status, Description)
- [ ] HSE Stats list (with columns: Title, Value, Target, Unit, Status)
- [ ] News list (with columns: Title, Body, Created, Featured Image)

### Data Populated:
- [ ] Works Progress: 3-5 sample items
- [ ] Milestones: 3-5 sample items
- [ ] Risks: 2-3 sample items
- [ ] HSE Stats: 5-10 sample items
- [ ] News: 2-3 sample items

### Web Part Installed:
- [ ] Added DPW Dakar Project Dashboard to home page
- [ ] Configured livestream URLs (or left blank)
- [ ] Page published

### Testing:
- [ ] All 6 panels load
- [ ] Data displays correctly
- [ ] No error messages
- [ ] Dashboard looks professional

---

## Troubleshooting During Build

| Error | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` again |
| "Node version error" | Verify node --version is 16.13.0+ or 18.17.1+ |
| "gulp not found" | `npm install -g gulp-cli` |
| "Build failed" | Run `npm run clean` then `npm run build` |
| ".sppkg not created" | Ensure `npm run build` completed first |

---

## What's Different: Standard Template vs Environment-Specific

### OLD APPROACH (Environment-Specific)
```
❌ gulp set-env --name "DPW-Prod"
❌ Different configs per environment
❌ Rebuild for each environment
❌ Hard to scale
```

### NEW APPROACH (Standard Template)
```
✅ One default config in constants.ts
✅ Same .sppkg for all sites
✅ Build once, deploy everywhere
✅ Scales to unlimited projects
```

---

## Why This Works

**Single .sppkg = Multiple Deployments**

```
Build:           Deploy:              Configure:
DPW-Dashboard    App Catalog    →     SNDKR Site
.sppkg                                 (Lists + Data)
                                    →  Project A Site
                                       (Lists + Data)
                                    →  Project B Site
                                       (Lists + Data)
                                    →  ...unlimited...
```

Same code. Different data. Zero rebuilds.

---

## Documentation References

Located in your project directory:

1. **STANDARD_TEMPLATE_GUIDE.md**
   - Architecture and design
   - Reusable template concept
   - Configuration levels

2. **TEMPLATE_BUILD_SIMPLE.md**
   - Step-by-step build instructions
   - Troubleshooting guide
   - Deployment instructions

3. **QUICK_BUILD_REFERENCE.md**
   - Command reference
   - Quick cheat sheet

4. **BUILD_GUIDE.md**
   - Detailed technical reference
   - Complete configuration guide

5. **CODEBASE_REVIEW_SUMMARY.md**
   - Code quality assessment
   - Dependencies review
   - Recommendations

---

## Support During Execution

If you encounter issues:

1. **Build issues**: See TEMPLATE_BUILD_SIMPLE.md → Troubleshooting
2. **Deployment issues**: See STANDARD_TEMPLATE_GUIDE.md → Installation
3. **Configuration issues**: See BUILD_GUIDE.md → Environment Constants
4. **List structure questions**: See STANDARD_TEMPLATE_GUIDE.md → Required Lists

---

## After Deployment

Once SNDKR site is live with the dashboard:

### Monitor:
- Verify users can access the dashboard
- Check that all 6 panels load and display data
- Monitor SharePoint logs for errors

### Future Projects:
- Reuse the same .sppkg file from App Catalog
- Create project-specific lists with standard structure
- Add project data
- Install web part

### Enhancements:
- Can add features without rebuilding (if done in property pane)
- Can update list data anytime
- Can customize per-site configuration (livestream URLs, etc.)

---

## Success Criteria

You'll know you're successful when:

✅ DPW-Dashboard.sppkg file created (~500KB)  
✅ File deployed to App Catalog  
✅ Web part installed on SNDKR site  
✅ All 6 panels visible on home page  
✅ Data from lists displays correctly  
✅ No error messages in console  
✅ Dashboard looks professional  

---

## Next Steps

1. **Right Now**: Read TEMPLATE_BUILD_SIMPLE.md
2. **Next 30 min**: Build the template (`npm install` → `npm run build` → `gulp package-solution`)
3. **Next 15 min**: Deploy to App Catalog
4. **Next 30 min**: Configure SNDKR site with lists and data
5. **Final**: Add web part and verify

---

## Completion

You'll have:
- ✅ A reusable SPFx dashboard template
- ✅ Deployed to SharePoint App Catalog
- ✅ Installed on SNDKR Ndayane Port site
- ✅ Ready for future DP World project rollouts

---

**Start**: `npm install`  
**Build**: `npm run build`  
**Package**: `gulp package-solution`  
**Deploy**: Upload to App Catalog  
**Done**: Add to SNDKR site  

---

**Version**: 1.0 (Standard Template)  
**Created**: October 6, 2026  
**Status**: Ready to Execute
