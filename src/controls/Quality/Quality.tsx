import React from 'react';
import styles from '@src/controls/Quality/Quality.module.scss';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { useEffect, useState } from 'react';
import { Quality } from '@src/models/Quality';
import StatusPill from './StatusPill';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import Error from '@src/controls/Error/Error';
import { config } from '@src/common/constants';

export const QualityPane: React.FC = () => {
    const sp = useSPService();
    const [milestones, setMilestones] = useState<Quality[]>([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const data = await sp.getQuality();
                setMilestones(data);
                setShowList(true);
            } catch (err: any) {
                setError(true);
            }
        };
        fetchMilestones();
    }, []);

    return (
        <div className={styles.container}>
            {error ? (
                <Error paneName="Quality" />
            ) : milestones.length === 0 ? (
                <div className={`${styles.fadeIn} ${styles.spinnerWrapper}`}>
                    <LoadingSpinner />
                </div>
            ) : (
                <ul className={`${styles.milestoneList} ${showList ? styles.fadeIn : styles.hidden}`}>
                {milestones.map((milestone, idx) => (
                    <li className={styles.listItem} key={`milestone-progress-${idx}`}>
                        <div className={styles.listItemContent}>
                            <div className={styles.taskName} style={{ fontFamily: config.WideFontFamily }}>{milestone.taskName}</div>
                            <div className={styles.bottomContent} style={{ fontFamily: config.FontFamily }}>
                                <div className={styles.keyDate}>Key Date: {milestone.keyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                <div className={styles.status}>Status: <StatusPill status={milestone.status} /></div>
                            </div>
                        </div>
                        {idx < milestones.length - 1 && (
                            <hr className={styles.divider} />
                        )}
                    </li>
                ))}
            </ul>
            )
        }
        </div>
    );
};

export default QualityPane;
