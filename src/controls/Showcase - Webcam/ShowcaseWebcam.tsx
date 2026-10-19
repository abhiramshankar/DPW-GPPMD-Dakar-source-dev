import React, { useEffect, useState } from 'react';
import styles from '@src/controls/Showcase - Webcam/ShowcaseWebcam.module.scss';
import { FaExpand, FaPlay } from 'react-icons/fa';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { Modal, PrimaryButton } from '@fluentui/react';
import { config } from '@src/common/constants';

interface WebcamPaneProps {
    webcamURL: string;
    webcamImageURL: string;
}
export const WebcamPane: React.FC<WebcamPaneProps> = ({ webcamURL, webcamImageURL }) => {
    const sp = useSPService();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [webcamImageDate, setWebcamImageDate] = useState<Date | undefined>(undefined);
    const [livestreamModalOpen, showlivestreamModal] = useState(false);

    useEffect(() => {
        const fetchWebcamImage = async () => {
            const interval = setInterval(() => {
                setWebcamImageDate(new Date());
            }, 1000);

            return () => clearInterval(interval);
        };
        fetchWebcamImage();
    }, []);

    return (
        <>
            <div className={styles.container}>
                {!imageLoaded && (
                    <div className={`${styles.fadeIn} ${styles.spinnerWrapper}`}>
                        <LoadingSpinner />
                    </div>
                )}
                <video
                    className={`${styles.webcamImage} ${imageLoaded ? styles.fadeIn : styles.hidden}`}
                    src="https://braveandheartcom.sharepoint.com/sites/Showcase/SiteAssets/fakeFactoryWebcam.mp4"
                    autoPlay
                    loop
                    muted
                    onLoadedData={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)} />
                <div className={`${styles.imageDate} ${imageLoaded ? styles.fadeIn : styles.hidden}`} style={{ fontFamily: config.FontFamily }}>                
                    <span>
                        {webcamImageDate?.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>
                <div
                    className={`${styles.overlay} ${imageLoaded ? styles.fadeIn : styles.hidden}`}
                    onClick={() => {
                        // window.open(livestreamURL, '_blank');
                        showlivestreamModal(true); // Placeholder for future implementation
                    }}
                >
                    <button
                        className={styles.playButton}
                        aria-label="Play Webcam"
                    >
                        <span className={styles.expandIcon}>
                            {FaExpand({ color: "#fff", size: 30 })}
                        </span>
                    </button>
                </div>
            </div>
            <Modal
                isOpen={livestreamModalOpen}
                onDismiss={() => showlivestreamModal(false)}
                isBlocking={false}
                containerClassName={styles.modalContainer}
            >
                <div className={styles.modalContent} style={{ fontFamily: config.WideFontFamily }}>
                    <video
                    className={`${styles.webcamImage} ${imageLoaded ? styles.fadeIn : styles.hidden}`}
                    src="https://braveandheartcom.sharepoint.com/sites/Showcase/SiteAssets/fakeFactoryWebcam.mp4"
                    autoPlay
                    loop
                    muted />
                    <div className={`${styles.fullscreenImageDate} ${imageLoaded ? styles.fadeIn : styles.hidden}`} style={{ fontFamily: config.FontFamily }}>                
                        <span>
                            {webcamImageDate?.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                    </div>
                    <PrimaryButton className={styles.webcamCloseButton} onClick={() => showlivestreamModal(false)}>Close</PrimaryButton>
                </div>
            </Modal>
        </>
    );
};

export default WebcamPane;