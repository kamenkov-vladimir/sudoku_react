import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './NewGameButton.module.scss';

export const NewGameButtonComponent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <button className="btn">{t('controls.newGameButton')}</button>
        </div>
    );
};
