import React from 'react';
import { useTranslation } from 'react-i18next';

import { Language } from '../../lang/i18n.types';
import { classNames } from '../../helpers/classNames.helper';
import styles from './LangSwitcher.module.scss';

export const LangSwitchComponent: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <div>
            <button
                className={classNames({
                    [styles.activeLanguage]: i18n.language === Language.Ru,
                })}
                onClick={() => i18n.changeLanguage(Language.Ru)}
            >
                RU
            </button>
            <button
                className={classNames({
                    [styles.activeLanguage]: i18n.language === Language.En,
                })}
                onClick={() => i18n.changeLanguage(Language.En)}
            >
                EN
            </button>
        </div>
    );
};
