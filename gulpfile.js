"use strict";

const build = require("@microsoft/sp-build-web");
const path = require("path");
const { addFastServe } = require("spfx-fast-serve-helpers");
const { src, dest, task } = require("gulp");
const replace = require("gulp-replace");
const argv = require("yargs").argv;
const fs = require("fs");
const fse = require("fs-extra");

// Suppress warnings
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Override the serve task
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);
  result.set("serve", result.get("serve-deprecated"));
  return result;
};

// Add fast-serve
addFastServe(build);

// Configure Webpack
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {};
    }

    // Add aliases
    generatedConfiguration.resolve.alias["@src"] = path.resolve(__dirname, "lib");
    generatedConfiguration.resolve.alias["@dmsPortal"] = path.resolve(__dirname, "lib/webparts/dmsPortal/");

    return generatedConfiguration;
  }
});

// Set Deployment Environment
task("set-env", (done) => {
  const envName = argv.name;

  if (!envName) {
    console.error("Please provide an environment name using --name argument");
    return done();
  }

  let configToExport;
  let impersonationResource;

  switch (envName) {
    case "DPW-Dev":
      configToExport = "configDPWDev";
      impersonationResource = "app-dms-dev";
      break;
    case "DPW-UAT":
      configToExport = "configDPWUAT";
      impersonationResource = "PLACEHOLDER - ADD VALUE";
      break;
    case "DPW-Prod":
      configToExport = "configDPWProd";
      impersonationResource = "globaldmsdpworld";
      break;
    case "BH":
      configToExport = "configBH";
      impersonationResource = "DMS-DEVAPPREG";
      break;
    case "Showcase":
      configToExport = "configShowcase";
      break;
    default:
      console.error(`Unknown environment name: ${envName}`);
      return done();
  }

  // Config file location
  const configFilePath = "./src/common/constants.ts";
  const packageSolutionFilePath = "./config/package-solution.json";

  // Update the constants.ts file
  src(configFilePath)
    .pipe(replace(/export const config = .*;/, `export const config = ${configToExport};`))
    .pipe(dest(file => file.base))
    .on("end", () => {
      // Update the package-solution.json file
      fs.readFile(packageSolutionFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading ${packageSolutionFilePath}: ${err}`);
          return done();
        }

        let packageSolutionJson;
        try {
          packageSolutionJson = JSON.parse(data);
        } catch (err) {
          console.error(`Error parsing ${packageSolutionFilePath}: ${err}`);
          return done();
        }

        // Find the webApiPermissionRequests for user_impersonation and update the resource
        const updatedWebApiPermissionRequests = packageSolutionJson.solution.webApiPermissionRequests.map(
          (request) => {
            if (request.scope === "user_impersonation") {
              request.resource = impersonationResource;
            }
            return request;
          }
        );

        packageSolutionJson.solution.webApiPermissionRequests = updatedWebApiPermissionRequests;

        // Write the updated JSON back to the file
        fs.writeFile(packageSolutionFilePath, JSON.stringify(packageSolutionJson, null, 2), "utf8", (err) => {
          if (err) {
            console.error(`Error writing ${packageSolutionFilePath}: ${err}`);
            return done();
          }

          console.log(`Updated ${packageSolutionFilePath} successfully`);
          done();
        });
      });
    });
});

// Define the write-build-info task
const writeBuildInfoTask = build.subTask('write-build-info', (gulp, buildOptions, done) => {
  console.log("Writing build info");
  const now = new Date();
  const buildInfo = {
    buildDate: now.toISOString()
  };

  // Write build-info.json to the root directory to avoid infinite loop
  const filePath = path.join(__dirname, "build-info.json");
  fse.writeJson(filePath, buildInfo, { spaces: 2 }, (err) => {
    if (err) {
      console.error(`Error writing build-info.json: ${err}`);
      done(err);
    } else {
      console.log(`Build info written to ${filePath}`);
      done();
    }
  });
});

// Add the write-build-info task to the pre-build pipeline
build.rig.addPreBuildTask(writeBuildInfoTask);

build.initialize(require("gulp"));
