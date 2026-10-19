import React, { useEffect, useState } from 'react';
import styles from '@src/controls/Livestream/Livestream.module.scss';
import { FaPlay } from 'react-icons/fa';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { Modal, PrimaryButton } from '@fluentui/react';
import { config } from '@src/common/constants';

interface LivestreamPaneProps {
    livestreamURL: string;
    livestreamImageURL: string;
}
export const LivestreamPane: React.FC<LivestreamPaneProps> = ({ livestreamURL, livestreamImageURL }) => {
    const sp = useSPService();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [livestreamImageDate, setLivestreamImageDate] = useState<Date | undefined>(undefined);
    const [notImplementedModalOpen, showNotImplementedModal] = useState(false);

    useEffect(() => {
        const fetchLivestreamImage = async () => {
            const imageDate = await sp.getLiveStreamImageDateTimeFromPhotoSentinel();
            setLivestreamImageDate(imageDate);
        };
        fetchLivestreamImage();
    }, []);

    return (
        <>
            <div className={styles.container}>
                {!imageLoaded && (
                    <div className={`${styles.fadeIn} ${styles.spinnerWrapper}`}>
                        <LoadingSpinner />
                    </div>
                )}
                <img
                    className={`${styles.livestreamImage} ${imageLoaded ? styles.fadeIn : styles.hidden}`}
                    src={livestreamImageURL}
                    alt="Livestream"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)} />
                <div className={`${styles.imageDate} ${imageLoaded ? styles.fadeIn : styles.hidden}`} style={{ fontFamily: config.FontFamily }}>                
                    <span>
                        {livestreamImageDate?.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div
                    className={`${styles.overlay} ${imageLoaded ? styles.fadeIn : styles.hidden}`}
                    onClick={() => {
                        // window.open(livestreamURL, '_blank');
                        showNotImplementedModal(true); // Placeholder for future implementation
                    }}
                >
                    <button
                        className={styles.playButton}
                        aria-label="Play Livestream"
                    >
                        <span className={styles.playIcon}>
                            {FaPlay({ color: "#fff", size: 30 })}
                        </span>
                    </button>
                </div>
            </div>
            <Modal
                isOpen={notImplementedModalOpen}
                onDismiss={() => showNotImplementedModal(false)}
                isBlocking={false}
                containerClassName={styles.modalContainer}
            >
                <div className={styles.modalContent} style={{ fontFamily: config.WideFontFamily }}>
                    <h2 className={styles.livestreamWarningText}>Livestream Coming Soon</h2>
                    <PrimaryButton className={styles.livestreamCloseButton} onClick={() => showNotImplementedModal(false)}>Close</PrimaryButton>
                </div>
            </Modal>
        </>
    );
};

export default LivestreamPane;