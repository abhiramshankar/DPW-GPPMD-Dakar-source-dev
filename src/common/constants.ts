/* eslint-disable @typescript-eslint/no-unused-vars */
const configDPW = {
  siteUrl: "https://dpworld.sharepoint.com",
  termGroupId: "ebef6f9c-8cce-4fae-abf6-6fe1f77d2418",
  UnitsTermSetId: "f0b7f142-96dc-4dc4-b4d0-55ff4fac4db2",
  ProgressAgainstMilestonesStatusTermSetId: "c2c37834-8c2b-4eb4-b537-f78a68725f2d",
  ProgressAgainstMilestonesDateColumnName: "KeyDate",
  defaultLivestreamURL: "https://setup.photosentinel.com.au/dashboard",
  defaultLivestreamImageURL: "https://setup.photosentinel.com.au/api/installations/23810/YxaNgNuYRm/latestPhotoWithMarks.jpg",
  WorksProgressStatusTermSetId: "858db11b-6b78-4747-858e-50a205a9fcf0",
  WorksProgressTypeTermSetId: "96815097-f1fb-4a07-98ed-a255acba9184",
  WorksProgressTypeColumnName: "Work_x0020_Type",
  photoSentinelApiKey: "REPLACE_WITH_YOUR_PHOTOSENTINEL_API_KEY",
  WideFontFamily: "Pilat Wide-1981267457, Pilat Wide, Arial, Helvetica, sans-serif",
  FontFamily: "Pilat-983300040, Pilat, Arial, Helvetica, sans-serif",
  selectedPanels: [
    { panelType: "WorksProgress", headerText: "WORKS PROGRESS" },
    { panelType: "ProgressAgainstMilestones", headerText: "MILESTONES" },
    { panelType: "KeyRisks", headerText: "KEY RISKS" },
    { panelType: "Livestream", headerText: "LIVESTREAM" },
    { panelType: "News", headerText: "NEWS" },
    { panelType: "HSEStats", headerText: "HSE STATS" },
  ],
  Colors: {
    Background: "#1E1450",
    Background1: "#3230BE",
    Background2:"#635fad50",
    OnTrack:"#00E68C",
    OffTrack:"#FF5C5C",
    AtRisk:"#FF5C5C",
    Completed:"#4D96FF",
    Behind:"#FFA800",
    Ahead:"#00E68C",
    Delayed:"#FF5C5C",
    InProgress:"#FFA800",
    NotStarted:"#CCCCCC",
    CompletedMilestone:"#4D96FF",
    unknownStatus:"#F5F3F5",
    Text:"#d8d8d8",
  }
};

const configDPWDev = {
  ...configDPW,
};

const configDPWUAT = {
  ...configDPW,
};

const configDPWProd = {
  ...configDPW,
  ProgressAgainstMilestonesDateColumnName: "Key_x0020_Date",
};

const configBH = {
  siteUrl: "https://braveandheartcom.sharepoint.com",
  termGroupId: "454b98ca-24c6-4c71-aac0-1cce28848a16",
  UnitsTermSetId: "dd208d54-8e31-49f4-948f-7f253b4fbc71",
  ProgressAgainstMilestonesStatusTermSetId: "52108472-71bf-4d89-8194-736f0e808091",
  ProgressAgainstMilestonesDateColumnName: "Date",
  defaultLivestreamURL: "https://setup.photosentinel.com.au/dashboard",
  defaultLivestreamImageURL: "https://setup.photosentinel.com.au/api/installations/23810/YxaNgNuYRm/latestPhotoWithMarks.jpg",
  WorksProgressStatusTermSetId: "53a9be9d-82be-49c7-8963-639828fcf2f1",
  WorksProgressTypeTermSetId: "752eda4c-dbe6-435a-ba61-c19dd828f652",
  WorksProgressTypeColumnName: "Work_x0020_Type",
  photoSentinelApiKey: "REPLACE_WITH_YOUR_PHOTOSENTINEL_API_KEY",
  WideFontFamily: "Pilat Wide-1981267457, Pilat Wide, Arial, Helvetica, sans-serif",
  FontFamily: "Pilat-983300040, Pilat, Arial, Helvetica, sans-serif",
  selectedPanels: [
    { panelType: "WorksProgress", headerText: "WORKS PROGRESS" },
    { panelType: "ProgressAgainstMilestones", headerText: "MILESTONES" },
    { panelType: "KeyRisks", headerText: "KEY RISKS" },
    { panelType: "Livestream", headerText: "LIVESTREAM" },
    { panelType: "News", headerText: "NEWS" },
    { panelType: "HSEStats", headerText: "HSE STATS" },
  ],
  Colors: {
    Background: "#1E1450",
    Background1: "#3230BE",
    Background2:"#635fad50",
    OnTrack:"#00E68C",
    AtRisk:"#FF5C5C",
    OffTrack:"#FF5C5C",
    Completed:"#4D96FF",
    Behind:"#FFA800",
    Ahead:"#00E68C",
    Delayed:"#FF5C5C",
    InProgress:"#FFA800",
    NotStarted:"#CCCCCC",
    CompletedMilestone:"#4D96FF",
    unknownStatus:"#F5F3F5",
    Text:"#d8d8d8"
  }
  
};

const configShowcase = {
  ...configBH,
  WideFontFamily: "Segoe UI, Arial, Helvetica, sans-serif",
  FontFamily: "Segoe UI, Arial, Helvetica, sans-serif",
  selectedPanels: [
    { panelType: "Process", headerText: "Process" },
    { panelType: "Quality", headerText: "Quality" },
    { panelType: "Environmental", headerText: "Environmental" },
    { panelType: "ShowcaseWebcam", headerText: "Webcam" },
    { panelType: "News", headerText: "Latest News" },
    { panelType: "HealthAndSafety", headerText: "Health and Safety" },
  ],
  Colors: {
    Background: "#E1132E",
    Background1: "#595959",
    Background2:"#7f170f",
    OnTrack:"#507f18",
    OffTrack:"#ef2f1b",
    AtRisk:"#f4bc08",
    Completed:"#60aeef",
    Behind:"#f4bc08",
    Ahead:"#507f18",
    Delayed:"#ef2f1b",
    InProgress:"#f4bc08",
    NotStarted:"#CCCCCC",
    CompletedMilestone:"#60aeef",
    unknownStatus:"#F5F3F5",
    Text:"#FFFFFF",
  }
  
};

export const config = configDPWUAT;

