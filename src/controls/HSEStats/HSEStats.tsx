import React from 'react';
import styles from '@src/controls/HSEStats/HSEStats.module.scss';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { useEffect, useState } from 'react';
import { HSEStats } from '@src/models/HSEStats';
import fmtAmounts from '@src/helpers/FormatAmounts';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import Error from '@src/controls/Error/Error';
import { config } from '@src/common/constants';

export const HSEStatsPane: React.FC = () => {
    const sp = useSPService();
    const [stats, setStats] = useState<HSEStats[]>([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await sp.getHSEStats();
                // Format values with FormatAmounts if needed
                data.forEach(stat => {
                    stat.value = fmtAmounts(stat.value);
                });
                setStats(data);
                setShowList(true);
            } catch (err: any) {
                    setError(true);
                }
            };
        fetchStats();
    }, []);

    return (
        <div className={styles.container}>
            {error ? (
                <Error paneName="Works Progress" />
            ) : stats.length === 0 && (
                <div className={`${styles.fadeIn}`}>
                    <LoadingSpinner />
                </div>
            )}
            <ul className={`${styles.hseStatsList} ${showList ? styles.fadeIn : styles.hidden}`}>
                {stats.map((stat, idx) => (
                    <li key={`hse-stat-${idx}`}>
                        <div className={styles.value} style={{ fontFamily: config.WideFontFamily }}>{stat.value}</div>
                        <div className={styles.details} style={{ fontFamily: config.FontFamily }}>{stat.details}</div>
                        {idx < stats.length - 1 && (
                            <hr className={styles.divider} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HSEStatsPane;
