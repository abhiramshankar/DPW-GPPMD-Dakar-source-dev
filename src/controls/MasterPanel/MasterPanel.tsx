import * as React from 'react';
import styles from "@src/controls/MasterPanel/MasterPanel.module.scss";
import KeyRisksPane from '../KeyRisks/KeyRisks';
import HSEStatsPane from '../HSEStats/HSEStats';
import NewsPane from '../News/News';
import ProgressAgainstMilestonesPane from '../ProgressAgainstMilestones/ProgressAgainstMilestones';
import WorksProgressPane from '../WorksProgress/WorksProgress';
import LivestreamPane from '../Livestream/Livestream';
import { config } from '@src/common/constants';
import WebcamPane from '@src/controls/Showcase - Webcam/ShowcaseWebcam';
import ProcessPane from '../Process/Process';
import EnvironmentalPane from '../Environmental/Environmental';
import QualityPane from '../Quality/Quality';
import HealthandSafetyPane from '../HealthandSafety/HealthandSafety';

interface IMasterPanelProps {
  panelType: string;
  headerText: string;
  livestreamURL?: string;
  livestreamImageURL?: string;
  webcamURL?: string;
  webcamImageURL?: string;
}

const MasterPanel: React.FC<IMasterPanelProps> = ({ 
  panelType, 
  headerText, 
  livestreamURL, 
  livestreamImageURL,
  webcamURL,
  webcamImageURL
}) => {
   React.useEffect(() => {
            if (config.Colors) {
                Object.entries(config.Colors).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(`--Color-${key}`, value);
                });
            }
          }, []);
  return (
    <div className={styles.masterPanel}>
      <header className={styles.header} style={{ fontFamily: config.WideFontFamily }}>{headerText}</header>
      <div className={styles.content}>
        {(() => {
          switch (panelType) {
            case "KeyRisks":
              return <KeyRisksPane />
            case "HSEStats":
              return <HSEStatsPane />
              case "News":
              return <NewsPane />
            case "ProgressAgainstMilestones":
              return <ProgressAgainstMilestonesPane />
            case "WorksProgress":
              return <WorksProgressPane />
            case "Livestream":
              return <LivestreamPane 
                livestreamURL={livestreamURL || ""}
                livestreamImageURL={livestreamImageURL || ""}
              />
            case "ShowcaseWebcam":
              return <WebcamPane 
                webcamURL={livestreamURL || ""}
                webcamImageURL={livestreamImageURL || ""}
              />
            case "Environmental":
              return <EnvironmentalPane />
            case "Quality":
              return <QualityPane />
            case "HealthAndSafety":
              return <HealthandSafetyPane />
            case "Process":
              return <ProcessPane />
            default:
              return <div>Panel disabled</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default MasterPanel;

