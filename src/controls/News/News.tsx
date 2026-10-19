import React from 'react';
import styles from '@src/controls/News/News.module.scss';
import useSPService from '@src/hooks/SharePoint/useSPService';
import { useEffect, useState } from 'react';
import { NewsArticle } from '@src/models/NewsArticle';
import LoadingSpinner from '@src/controls/LoadingSpinner/LoadingSpinner';
import { config } from '@src/common/constants';

export const NewsPane: React.FC = () => {
    const sp = useSPService();
    const [newsArticle, setNewsArticle] = useState<NewsArticle | null>(null);
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        const fetchNewsArticle = async () => {
            try {
                const newsArticle = await sp.getNewsArticle();
                setNewsArticle(newsArticle);
                console.log('Fetched news article:', newsArticle);
            } catch (err: any) {
                setError(true);
            }
        };
        fetchNewsArticle();
    }, []);

    return (
        <div className={styles.container}>
            {error ? (
                <div className={`${styles.noNewsPlaceholder} ${styles.fadeIn}`} style={{ fontFamily: config.WideFontFamily }}>
                        <p>No news article available at this time.</p>
                    </div>
            ) : newsArticle === null ? (
                <div className={styles.fadeIn}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={`${styles.newsArticle} ${styles.fadeIn}`}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={newsArticle?.imageURL} alt={newsArticle?.title} />
                    </div>
                    <h2 className={styles.title} style={{ fontFamily: config.WideFontFamily }}>{newsArticle?.title}</h2>
                    <p className={styles.description} style={{ fontFamily: config.FontFamily }}>{newsArticle?.description}</p>
                    <a className={styles.articleLink}style={{ fontFamily: config.FontFamily }}href={newsArticle?.articleURL} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                </div>
            )}
        </div>
    );
};

export default NewsPane;