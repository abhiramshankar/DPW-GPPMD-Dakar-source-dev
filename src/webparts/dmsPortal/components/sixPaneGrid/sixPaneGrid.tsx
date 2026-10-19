import * as React from 'react';
import styles from './sixPaneGrid.module.scss';
import MasterPanel from '@src/controls/MasterPanel/MasterPanel';
import { config } from '@src/common/constants';
interface SixPaneGridProps {
    livestreamURL: string;
    livestreamImageURL: string;
}
const SixPaneGrid: React.FC<SixPaneGridProps> = ({ livestreamURL, livestreamImageURL }) => {
    return (
        <div className={styles.gridContainer}>
            {config.selectedPanels.map((panel, idx) => (
                <MasterPanel
                    key={panel.panelType + idx}
                    panelType={panel.panelType}
                    headerText={panel.headerText}
                    livestreamURL={panel.panelType === "Livestream" ? livestreamURL : undefined}
                    livestreamImageURL={panel.panelType === "Livestream" ? livestreamImageURL : undefined}
                    webcamURL={panel.panelType === "ShowcaseWebcam" ? livestreamURL : undefined}
                    webcamImageURL={panel.panelType === "ShowcaseWebcam" ? livestreamImageURL : undefined}
                />
            ))}
        </div>
    );
};

export default SixPaneGrid;
