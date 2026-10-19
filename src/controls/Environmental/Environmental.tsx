import React from 'react';
import styles from '@src/controls/Environmental/Environmental.module.scss';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import Error from '@src/controls/Error/Error';
import { config } from '@src/common/constants';

export const EnvironmentalPane: React.FC = () => {
    const sp = useSPService();
    const [risks, setRisks] = useState<string[]>([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
            const data = await sp.getEnvironmental();
            setRisks(data);
            setShowList(true);
        } catch (err: any) {
                setError(true);
            }
        };
        fetchRisks();
    }, []);

    return (
        <div className={styles.container}>
            {error ? (
                <Error paneName="Environmental" />
            ) : risks.length === 0 ? (
                <div className={`${styles.fadeIn} ${styles.spinnerWrapper}`}>
                    <LoadingSpinner />
                </div>
            ) : (
                <ul className={`${styles.riskList} ${showList ? styles.fadeIn : styles.hidden}`} style={{ fontFamily: config.WideFontFamily }}>
                {risks.map((risk, idx) => (
                    <li className={styles.listItem} key={`key-risk-${idx}`}>
                        <div className={styles.listItemContent}>{risk}</div>
                        {idx < risks.length - 1 && (
                            <hr className={styles.divider} />
                        )}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default EnvironmentalPane;
