import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneLabel,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "DmsPortalWebPartStrings";
import DmsPortal from "./components/DmsPortal";
import { IDmsPortalProps } from "./components/IDmsPortalProps";
import useWebPartContextStore from "@src/stores/useWebPartContextStore";
import { config } from "@src/common/constants";

export interface IDmsPortalWebPartProps {
  livestreamURL: string;
  livestreamImageURL: string;
}

export default class DmsPortalWebPart extends BaseClientSideWebPart<IDmsPortalWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    useWebPartContextStore.setState({
      context: this.context,
      livestreamURL: this.properties.livestreamURL,
    });
    const element: React.ReactElement<IDmsPortalProps> = React.createElement(
      DmsPortal,
      {
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        livestreamURL: this.properties.livestreamURL,
        livestreamImageURL: this.properties.livestreamImageURL,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // Ensure default values for properties if not set
    if (!this.properties.livestreamURL) {
      this.properties.livestreamURL = config.defaultLivestreamURL;
    }
    if (!this.properties.livestreamImageURL) {
      this.properties.livestreamImageURL = config.defaultLivestreamImageURL;
    }
    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField("livestreamURL", {
                  label: strings.livestreamURLTextLabel,
                  value: this.properties.livestreamURL,
                }),
                PropertyPaneLabel("livestreamImageURLHint", {
                  text: "Go to Photosentinel > Installations > Your Installation > Settings > Gallery Settings > Links > Copy the Preview Link and add below",
                }),
                PropertyPaneTextField("livestreamImageURL", {
                  label: strings.livestreamImageURLTextLabel,
                  value: this.properties.livestreamImageURL,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
