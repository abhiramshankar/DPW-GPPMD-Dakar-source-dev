import { HealthAndSafety } from "@src/models/HealthandSafety";
import { HSEStats } from "@src/models/HSEStats";
import { NewsArticle } from "@src/models/NewsArticle";
import { Process } from "@src/models/Process";
import { ProgressAgainstMilestones } from "@src/models/ProgressAgainstMilestones";
import { Quality } from "@src/models/Quality";
import { WorksProgress } from "@src/models/WorksProgress";


export interface ISPService {
  isUserController(
    siteURL: string
  ): Promise<boolean>
  getKeyRisks(): Promise<string[]>
  getEnvironmental(): Promise<string[]>
  getQuality(): Promise<Quality[]>
  getHealthAndSafety(): Promise<HealthAndSafety[]>
  getProcess(): Promise<Process[]>
  getHSEStats(): Promise<HSEStats[]>
  getNewsArticle(): Promise<NewsArticle>
  getProgressAgainstMilestones(): Promise<ProgressAgainstMilestones[]>
  getWorksProgress(): Promise<WorksProgress[]>
  getLivestreamImage(): Promise<string | undefined>
  getLiveStreamImageDateTimeFromPhotoSentinel(): Promise<Date | undefined>
  getTermLabelFromGuid(setGuid: string, termGuid: string): Promise<string | undefined>
}

