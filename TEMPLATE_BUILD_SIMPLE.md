# Build the Standard Template - Simple Guide

## Quick Start: 3 Steps

```bash
# 1. Install dependencies
npm install

# 2. Build the template
npm run build

# 3. Package for deployment
gulp package-solution
```

**Output**: `solution/DPW-Dashboard.sppkg` - Ready to deploy to SharePoint App Catalog

---

## Prerequisites

- **Node.js**: v16.13.0+ or v18.17.1+ (NOT v17.x or v19.x)
- **npm**: 8.x or higher

Check your versions:
```bash
node --version      # Should show 16.13+ or 18.17+
npm --version       # Should show 8.x or higher
```

---

## Prerequisites: Install Global Tools

One-time setup:

```bash
npm install -g gulp-cli yo @microsoft/generator-sharepoint spfx-fast-serve
```

---

## Step-by-Step Build

### Step 1: Install Dependencies

```bash
cd DPW-GPPMD-Dakar-source-dev
npm install
```

This downloads all required packages. Takes 2-3 minutes.

### Step 2: Build

```bash
npm run build
```

This compiles TypeScript to JavaScript and prepares the bundle. Takes 1 minute.

**Expected output:**
```
Build succeeded
```

### Step 3: Package

```bash
gulp package-solution
```

This creates the .sppkg file. Takes 30 seconds.

**Expected output:**
```
Successfully created package: solution/DPW-Dashboard.sppkg
```

---

## Verify Build Success

Check that this file exists:

```bash
ls solution/DPW-Dashboard.sppkg
# Windows: dir solution\DPW-Dashboard.sppkg
```

File should be ~500KB in size.

---

## Deploy to SharePoint

### 1. Access App Catalog

Go to: `https://[your-tenant].sharepoint.com/sites/appcatalog`

(You need SharePoint Admin or App Catalog Owner permissions)

### 2. Upload Package

- Click **Upload** (or **New** → **App**)
- Select `solution/DPW-Dashboard.sppkg`
- Click **Deploy**

### 3. Make Available

Check: **"Make this solution available to all sites in the organization"**

Click **Deploy**

---

## Deploy to a Project Site

### 1. Go to Project Site

Example: `https://dpworld.sharepoint.com/sites/SNDKRNdayaneport`

### 2. Add Web Part

- Edit the home page
- Click **+ Add web part** (or + icon)
- Search: **"DPW Dakar"** or **"DmsPortal"**
- Click **DPW Dakar Project Dashboard**

### 3. Configure (Optional)

- Livestream URL (leave blank if not needed)
- Livestream Image URL (leave blank if not needed)

### 4. Publish Page

Save the page. Dashboard is live.

---

## What You Can Configure After Deployment

**Per Site** (no rebuild needed):

✅ Livestream URL (web part property)  
✅ Dashboard title (web part property)  
✅ List data (SharePoint side)  
✅ Theme appearance (SharePoint theming)  

**Requires Rebuild** (if needed):

⚠️ Color scheme  
⚠️ Visible panels  
⚠️ Font families  

**Note**: For standard template, these are locked. Rebuild only if deploying to very different project types.

---

## Required Lists on Target Site

Before the dashboard shows data, create these SharePoint lists:

1. **Works Progress List**
   - Title, Progress (%), Status (Choice), Description

2. **Progress Against Milestones List**
   - Title, Key_x0020_Date, Status (Choice), Description

3. **Key Risks List**
   - Title, Severity (Choice), Status (Choice), Description

4. **HSE Stats List**
   - Title, Value (number), Target (number), Unit, Status (Choice)

5. **News List**
   - Title, Body (rich text), Featured Image

Then add sample data to populate the dashboard.

---

## Troubleshooting

### Issue: "Cannot find module"

**Solution**: Run `npm install` again
```bash
npm install
```

### Issue: Node version error

**Solution**: Check your Node version
```bash
node --version
# Should show 16.13.0+ or 18.17.1+
# NOT 17.x or 19.x
```

If wrong version, install correct Node.js from nodejs.org

### Issue: gulp command not found

**Solution**: Install globally
```bash
npm install -g gulp-cli
```

### Issue: Build fails

**Solution**: Clean and rebuild
```bash
npm run clean
npm install
npm run build
```

### Issue: .sppkg file not created

**Solution**: Run build first, then package
```bash
npm run build
gulp package-solution
```

---

## What Each Command Does

| Command | What it does | Time |
|---------|------------|------|
| `npm install` | Downloads dependencies | 2-3 min |
| `npm run build` | Compiles TypeScript, bundles code | 1 min |
| `gulp package-solution` | Creates .sppkg file | 30 sec |
| `npm run serve` | Starts local dev server (optional) | - |
| `npm run clean` | Removes build artifacts | 10 sec |

---

## Complete Workflow

```bash
# Fresh build from scratch
npm install
npm run build
gulp package-solution

# File ready: solution/DPW-Dashboard.sppkg
# Upload to App Catalog
# Install on project site
# Done
```

**Total time**: 5-10 minutes

---

## Local Development (Optional)

To test locally before deploying:

```bash
npm install
npm run serve
```

Opens SharePoint workbench. Changes auto-reload. Great for development.

To stop: Press `Ctrl+C`

---

## Next Steps

1. ✅ Build the template (`npm run build`)
2. ✅ Package it (`gulp package-solution`)
3. ✅ Deploy to App Catalog (SharePoint Admin)
4. ✅ Install on SNDKR Ndayane Port site
5. ✅ Create SharePoint lists
6. ✅ Add sample data
7. ✅ View dashboard

---

## Files Created

After successful build:

```
solution/
└── DPW-Dashboard.sppkg          ← Main file (upload to App Catalog)

lib/                             ← Compiled code (temporary)
temp/                            ← Build artifacts (temporary)
```

---

## Tips

- **One-time setup**: `npm install` only needs to run once (unless package.json changes)
- **Incremental builds**: Run `npm run build` after code changes
- **Clean builds**: Run `npm run clean` if you hit cache issues
- **Check version**: Build output shows version 1.0.0.0 in package-solution.json
- **Test locally first**: Run `npm run serve` before deploying to production

---

## Support Resources

1. **STANDARD_TEMPLATE_GUIDE.md** - Architecture and concepts
2. **BUILD_GUIDE.md** - Detailed reference
3. **QUICK_BUILD_REFERENCE.md** - Command cheat sheet

All in your project directory.

---

## FAQ

**Q: Do I need to rebuild for each project site?**  
A: No. Build once, deploy to unlimited sites. Each site has its own list data.

**Q: How do I customize the colors?**  
A: Edit `src/common/constants.ts` (colors are defined there). Requires rebuild.

**Q: Can I change which panels show?**  
A: Yes, in `src/common/constants.ts` under selectedPanels. Requires rebuild.

**Q: What if I want different colors for different sites?**  
A: Build separate packages with different constants.ts, or enhance web part properties to support color selection.

**Q: Is PhotoSentinel required?**  
A: No. Leave livestream URLs blank. The web part works fine without it.

---

**Build Status: Ready to Go** ✅

Next: Run `npm install && npm run build && gulp package-solution`

---

**Last Updated**: October 6, 2026  
**Version**: 1.0 (Standard Template)
