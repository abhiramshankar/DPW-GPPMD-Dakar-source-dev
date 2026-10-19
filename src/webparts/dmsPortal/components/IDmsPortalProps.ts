import { WebPartContext } from "@microsoft/sp-webpart-base";
import Modules from "../../../models/Modules";

export interface IDmsPortalProps {
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  livestreamURL: string;
  livestreamImageURL: string;
}

