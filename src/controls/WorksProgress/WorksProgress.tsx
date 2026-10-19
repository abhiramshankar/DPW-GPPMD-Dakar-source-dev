import React, { useEffect, useState } from 'react';
import styles from '@src/controls/WorksProgress/WorksProgress.module.scss';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { WorksProgress } from '@src/models/WorksProgress';
import ProgressLine from '../ProgressLine/ProgressLine';
import fmtAmounts from '@src/helpers/FormatAmounts';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import Error from '@src/controls/Error/Error';
import { config } from '@src/common/constants';

export const WorksProgressPane: React.FC = () => {
    const sp = useSPService();
    const [worksProgress, setWorksProgress] = useState<WorksProgress[]>([]);
    const [showList, setShowList] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await sp.getWorksProgress();
                // Convert progress and total to formatted strings
                data.forEach(stat => {
                    stat.progress = fmtAmounts(stat.progress);
                    stat.total = fmtAmounts(stat.total);
                });
                setWorksProgress(data);
                setShowList(true);
                setTimeout(() => setShowProgress(true), 500); // Match fadeIn duration
            } catch (err: any) {
                setError(true);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className={styles.container}>
            {error ? (
                <Error paneName="Key Works Progress" />
            ) : worksProgress.length === 0 ? (
                <div className={styles.fadeIn}>
                    <LoadingSpinner />
                </div>
            ) : (
                <ul className={`${styles.worksProgressList} ${showList ? styles.fadeIn : styles.hidden}`}>
                    {worksProgress.map((stat, idx) => (
                        <li key={`works-progress-${idx}`}>
                            <div className={styles.title} style={{ fontFamily: config.WideFontFamily }}>
                                <span>{stat.workType}</span>
                                <span>{stat.progressPercentage}</span>
                            </div>
                            <div className={styles.progressLine}>
                                <ProgressLine
                                    backgroundColor="#635fad50"
                                    visualParts={showProgress ? [{
                                        percentage: stat.progressPercentage,
                                        color: stat.status
                                    }] : [{
                                        percentage: 0,
                                        color: stat.status
                                    }]}
                                />
                            </div>
                            {stat.unit === '%' ? <div className={styles.detailsEmpty}></div> : (
                                <div className={styles.details} style={{ fontFamily: config.FontFamily }}>{stat.progress}{stat.unit} progress of {stat.total}{stat.unit} total</div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorksProgressPane;