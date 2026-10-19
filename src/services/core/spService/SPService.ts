import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { ISPService } from "@src/services/core/spService/ISPService";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/search";
import "@pnp/sp/taxonomy";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/presets/all";
import "@pnp/sp/taxonomy";
import { config } from "@src/common/constants";
import { AssignFrom } from "@pnp/core";
import { HSEStats } from "@src/models/HSEStats";
import { NewsArticle } from "@src/models/NewsArticle";
import { ProgressAgainstMilestones } from "@src/models/ProgressAgainstMilestones";
import { WorksProgress } from "@src/models/WorksProgress";
import { HealthAndSafety } from "@src/models/HealthAndSafety";
import { Quality } from "@src/models/Quality";
import { Process } from "@src/models/Process";



export class SPService implements ISPService {
  public static readonly serviceKey: ServiceKey<ISPService> =
    ServiceKey.create<ISPService>("dmsPortal:SPService", SPService);

  private _sp: SPFI;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      const pageContext: PageContext = serviceScope.consume(
        PageContext.serviceKey
      );
      this._sp = spfi().using(SPFx({ pageContext }));
    });
  }

  public async isUserController(siteURL: string): Promise<boolean> {
    try {
      const spTargetWeb = spfi(siteURL).using(AssignFrom(this._sp.web));
      const memberGroup = (await spTargetWeb.web.associatedMemberGroup()).Id;
      //console.log(memberGroup);
      const currentUsersGroups = await spTargetWeb.web.currentUser.groups();
      //console.log(currentUsersGroups);
      const isMember = currentUsersGroups.some((group) => group.Id === memberGroup);
      //console.log(`isUserController: ${isMember}`);
      return isMember;
    } catch (error) {
      console.error("Error checking group membership: ", error);
      return false;
    }
  }

  public async getKeyRisks(): Promise<string[]> {
  try {
    if (!this._sp) {
      throw new Error("SPFI instance is not initialized.");
    }
    const list = this._sp.web.lists.getByTitle("KEY RISKS");
    const result = await list.renderListDataAsStream({
      ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>3</RowLimit></View>`
    });
    const items = result.Row;
    return items
      .map((item) => item.Title);
  } catch (error) {
    throw new Error(error.message || "Error fetching key risks");
  }
}

  public async getHSEStats(): Promise<HSEStats[]> {
    // Get the HSE STATS lists from current site and return the details and value fields of each item
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const hseStatsList = this._sp.web.lists.getByTitle("HSE stats");
      const result = await hseStatsList.renderListDataAsStream({
        ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Details' /><FieldRef Name='Value' /></ViewFields><RowLimit>4</RowLimit></View>`
      });
      const items = result.Row;
      const HSEStats = items.map((item: any) => ({
        details: item.Details,
        value: item.Value
      })) as HSEStats[];
      return HSEStats;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getNewsArticle(): Promise<NewsArticle> {
    // Get web page from Site Pages library where DisplayLocation is 'Dashboard' and get title and description fields
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const newsList = this._sp.web.lists.getByTitle("Site Pages");
      const items = await newsList.items
        .select("Title", "Description", "BannerImageUrl", "FileRef")
        .filter("DisplayLocation eq 'Dashboard' and OData__SPSitePageFlags ne 'Template'")
        .orderBy("Modified", false)();
      console.log("Fetched news items:");
      console.log(items);
      const newsItem = items[0];
      const newsArticle: NewsArticle = {
        title: newsItem.Title,
        description: newsItem.Description,
        imageURL: newsItem.BannerImageUrl.Url,
        articleURL: newsItem.FileRef
      };
      return newsArticle;
    } catch (error) {
      throw new Error(`Error fetching news article: ${error}`);
    }
  }

  public async getProgressAgainstMilestones(): Promise<ProgressAgainstMilestones[]> {
    // Get the Progress Against Milestones list from current site and return the task name, key date and status fields of each item
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const milestonesList = this._sp.web.lists.getByTitle("Progress against milestones");
      const result = await milestonesList.renderListDataAsStream({
        ViewXml: `<View>
          <Query>
        <Where>
          <Eq>
            <FieldRef Name='Displayed' />
            <Value Type='Boolean'>1</Value>
          </Eq>
        </Where>
        <OrderBy>
          <FieldRef Name='${config.ProgressAgainstMilestonesDateColumnName}' Ascending='TRUE' />
        </OrderBy>
          </Query>
          <ViewFields>
        <FieldRef Name='Task' />
        <FieldRef Name='${config.ProgressAgainstMilestonesDateColumnName}' />
        <FieldRef Name='Status' />
          </ViewFields>
          <RowLimit>3</RowLimit>
        </View>`
      });
      const items = result.Row;
      // Convert Status taxonomy term to label
      for (const item of items) {
        //Strip emoji from status
        if (item.Status) {  
          item.Status = await this.getTermLabelFromGuid(config.ProgressAgainstMilestonesStatusTermSetId, item.Status.TermID);
          item.Status = item.Status.replace(/🔴/, '').replace(/🟠/, '').replace(/🟢/, '');
        }
      }
      const progressAgainstMilestonesPromises = items.map(async (item: any) => ({
        taskName: item.Task,
        keyDate: new Date(item[config.ProgressAgainstMilestonesDateColumnName]),
        status: item.Status
      }));
      const progressAgainstMilestones: ProgressAgainstMilestones[] = await Promise.all(progressAgainstMilestonesPromises);
      return progressAgainstMilestones;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWorksProgress(): Promise<WorksProgress[]> {
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      // Get the Works progress metrics list from current site and return the description, total, progress
      const worksProgressList = this._sp.web.lists.getByTitle("KEY WORKS PROGRESS");
      const result = await worksProgressList.renderListDataAsStream({
        ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Work_x0020_Type' /><FieldRef Name='Progress' /><FieldRef Name='Total' /><FieldRef Name='Unit' /><FieldRef Name='Status' /></ViewFields><RowLimit>4</RowLimit></View>`
      });
      const items = result.Row;
      // Convert Unit and Status taxonomy term to label
      for (const item of items) {
        // Convert Status to color code
        if (item.Status) {
            switch (item.Status.Label.charAt(0)?.toLowerCase()) {
            case "1": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "2": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "3": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "4": // At risk
              item.Status = config.Colors.AtRisk; // DPW Orange color for at risk
              break;
            case "5": // Off track
              item.Status = config.Colors.OffTrack; // DPW Red color for off track
              break;
            default:
              item.Status = config.Colors.unknownStatus; // DPW White color for unknown status
            }
        } else {
          item.Status = config.Colors.unknownStatus; // DPW White color for unknown status
        }

        // if (item.Task) {
        //   // If Task begins with Number full stop, remove number and full stop
        //   if (/^\d+\./.test(item.Task)) {
        //     item.Task = item.Task.replace(/^\d+\.\s*/, '');
        //   }
        // }
      }
      // Calculate progress percentage
      items.forEach((item: any) => {
        let progress = item.Progress.replace(/,/g, ''); // Remove commas for parsing
        let total = item.Total.replace(/,/g, ''); // Remove commas for parsing
        progress = parseFloat(progress);
        total = parseFloat(total);
        item.progressPercentage = total ? `${Math.round((progress / total) * 100)}%` : "0%";
      });
      const worksProgressPromises = items.map(async (item: any) => ({
        workType: (await this.getTermLabelFromGuid(config.WorksProgressTypeTermSetId, item[config.WorksProgressTypeColumnName].TermID)) ?? "",
        total: item.Total,
        progress: item.Progress,
        unit: (await this.getTermLabelFromGuid(config.UnitsTermSetId, item.Unit.TermID)) ?? "",
        progressPercentage: item.progressPercentage,
        status: item.Status
      }));
      const worksProgress: WorksProgress[] = await Promise.all(worksProgressPromises);
      return worksProgress;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getLivestreamImage(): Promise<string | undefined> {
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const livestreamList = this._sp.web.lists.getByTitle("LIVESTREAM LINK");
      const items = await livestreamList.items
        .select("Image")
        .expand("AttachmentFiles")();
      if (items.length > 0) {
        const attachmentsUrl = items[0].AttachmentFiles[0].ServerRelativeUrl;
        return attachmentsUrl;
      }
      return undefined;
    } catch (error) {
      console.error(`Error fetching livestream image: ${error}`);
      return undefined;
    }
  }

  public async getLiveStreamImageDateTimeFromPhotoSentinel(): Promise<Date | undefined> {
    try {
      const installationId = '23810';
      const response = await fetch(
        `https://api.photosentinel.com/v2/installations/${installationId}/photos?items_per_page=1&sort_newest_first=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `apiKey ${config.photoSentinelApiKey}`
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data?.photos[0]?.datetime_taken_local ? new Date(data.photos[0].datetime_taken_local) : undefined;
    } catch (error) {
      console.error(`Error fetching livestream image date from Photo Sentinel: ${error}`);
      return undefined;
    }
  }

  public async getTermLabelFromGuid(setGuid: string, termGuid: string): Promise<string | undefined> {
    try {
      const store = this._sp.termStore;
      const group = store.groups.getById(config.termGroupId);
      const termSet = group.sets.getById(setGuid);
      const term = await termSet.terms.getById(termGuid)();
      let termLabel = term.labels?.[0]?.name;
      // If term label begins with a numberand fullstop , remove the number and full stop and space
      if (termLabel && /^\d+\.\s/.test(termLabel)) {
        termLabel = termLabel.replace(/^\d+\.\s/, '');
      }
      return termLabel;
    } catch (error) {
      console.error(`Error retrieving term label: ${error}`);
      return undefined;
    }
  }

  public async getEnvironmental(): Promise<string[]> {
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const list = this._sp.web.lists.getByTitle("ENVIRONMENTAL");
      const result = await list.renderListDataAsStream({
        ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>3</RowLimit></View>`
      });
      const items = result.Row;
      return items
        .map((item) => item.Title);
    } catch (error) {
      throw new Error(error.message || "Error fetching environmental risks");
    }
  }
  public async getQuality(): Promise<Quality[]>{
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const milestonesList = this._sp.web.lists.getByTitle("QUALITY");
      const result = await milestonesList.renderListDataAsStream({
        ViewXml: `<View>
          <Query>
        <Where>
          <Eq>
            <FieldRef Name='Displayed' />
            <Value Type='Boolean'>1</Value>
          </Eq>
        </Where>
        <OrderBy>
          <FieldRef Name='${config.ProgressAgainstMilestonesDateColumnName}' Ascending='TRUE' />
        </OrderBy>
          </Query>
          <ViewFields>
        <FieldRef Name='Task' />
        <FieldRef Name='${config.ProgressAgainstMilestonesDateColumnName}' />
        <FieldRef Name='Status' />
          </ViewFields>
          <RowLimit>3</RowLimit>
        </View>`
      });
      const items = result.Row;
      // Convert Status taxonomy term to label
      for (const item of items) {
        //Strip emoji from status
        if (item.Status) {  
          item.Status = await this.getTermLabelFromGuid(config.ProgressAgainstMilestonesStatusTermSetId, item.Status.TermID);
          item.Status = item.Status.replace(/🔴/, '').replace(/🟠/, '').replace(/🟢/, '');
        }
      }
      const qualityPromises = items.map(async (item: any) => ({
        taskName: item.Task,
        keyDate: new Date(item[config.ProgressAgainstMilestonesDateColumnName]),
        status: item.Status
      }));
      const quality: Quality[] = await Promise.all(qualityPromises);
      return quality;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getHealthAndSafety(): Promise<HealthAndSafety[]>{
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      const healthAndSafetyList = this._sp.web.lists.getByTitle("HEALTH AND SAFETY");
      const result = await healthAndSafetyList.renderListDataAsStream({
        ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Details' /><FieldRef Name='Value' /></ViewFields><RowLimit>4</RowLimit></View>`
      });
      const items = result.Row;
      const healthAndSafety = items.map((item: any) => ({
        details: item.Details,
        value: item.Value
      })) as HealthAndSafety[];
      return healthAndSafety;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getProcess(): Promise<Process[]> {
    try {
      if (!this._sp) {
        throw new Error("SPFI instance is not initialized.");
      }
      // Get the Works progress metrics list from current site and return the description, total, progress
      const worksProgressList = this._sp.web.lists.getByTitle("PROCESS");
      const result = await worksProgressList.renderListDataAsStream({
        ViewXml: `<View><Query><Where><Eq><FieldRef Name='Displayed' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Work_x0020_Type' /><FieldRef Name='Progress' /><FieldRef Name='Total' /><FieldRef Name='Unit' /><FieldRef Name='Status' /></ViewFields><RowLimit>4</RowLimit></View>`
      });
      const items = result.Row;
      // Convert Unit and Status taxonomy term to label
      for (const item of items) {
        // Convert Status to color code
        if (item.Status) {
            switch (item.Status.Label.charAt(0)?.toLowerCase()) {
           case "1": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "2": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "3": // On track
              item.Status = config.Colors.OnTrack; // DPW Green color for on track
              break;
            case "4": // At risk
              item.Status = config.Colors.AtRisk; // DPW Orange color for at risk
              break;
            case "5": // Off track
              item.Status = config.Colors.OffTrack; // DPW Red color for off track
              break;
            default:
              item.Status = config.Colors.unknownStatus; // DPW White color for unknown status
            }
        } else {
          item.Status = config.Colors.unknownStatus; // DPW White color for unknown status
        }

        // if (item.Task) {
        //   // If Task begins with Number full stop, remove number and full stop
        //   if (/^\d+\./.test(item.Task)) {
        //     item.Task = item.Task.replace(/^\d+\.\s*/, '');
        //   }
        // }
      }
      // Calculate progress percentage
      items.forEach((item: any) => {
        let progress = item.Progress.replace(/,/g, ''); // Remove commas for parsing
        let total = item.Total.replace(/,/g, ''); // Remove commas for parsing
        progress = parseFloat(progress);
        total = parseFloat(total);
        item.progressPercentage = total ? `${Math.round((progress / total) * 100)}%` : "0%";
      });
      const processPromises = items.map(async (item: any) => ({
        workType: (await this.getTermLabelFromGuid(config.WorksProgressTypeTermSetId, item[config.WorksProgressTypeColumnName].TermID)) ?? "",
        total: item.Total,
        progress: item.Progress,
        unit: (await this.getTermLabelFromGuid(config.UnitsTermSetId, item.Unit.TermID)) ?? "",
        progressPercentage: item.progressPercentage,
        status: item.Status
      }));
      const process: Process[] = await Promise.all(processPromises);
      return process;
    } catch (error) {
      throw new Error(error);
    }
  }
}