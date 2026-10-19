import { Status } from '@src/models/Status';
import React from 'react';
import { config } from '@src/common/constants';
import styles from '@src/controls/ProgressAgainstMilestones/ProgressAgainstMilestones.module.scss';
interface StatusPillProps {
    status: Status;
}

const statusColors: Record<Status, string> = {
    'On Track': config.Colors.OnTrack,
    'At Risk': config.Colors.AtRisk,
    'High Risk': config.Colors.OffTrack, // or the appropriate color from your constants
};
const getGradient = (color: string) =>
    `linear-gradient(90deg, ${color} 0%, #ffffff 200%)`;

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    const displayStatus = status in statusColors ? status : 'Unknown';
    const baseColor = statusColors[status] || '#F5F3F5';
    return (
        <span
            className={styles.statusPill}
            style={{
                background: getGradient(baseColor),
            }}
            title={displayStatus} // Tooltip for better accessibility
        >
            {displayStatus}
        </span>
    );
};

export default StatusPill;
