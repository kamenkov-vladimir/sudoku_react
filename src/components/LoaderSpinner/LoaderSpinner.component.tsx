import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LoaderSpinner.module.scss';

export const LoaderSpinnerComponent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.loader}>
            <div>
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path
                        id="Oval-3"
                        fill="#D0D9E4"
                        d="M25 0a25 25 0 1021.4 12.07l-2.52 1.61c2.03 3.16 3.05 6.93 3.05 11.32 0 15.5-13.32 22-21.93 22C11.78 47 3 36.14 3 25 3 13.44 12.17 3 25 3V0z"
                    ></path>
                </svg>
                <span>{t('game.loading')}</span>
            </div>
        </div>
    );
};
