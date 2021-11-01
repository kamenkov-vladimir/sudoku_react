import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { LangSwitchComponent } from './components/LangSwitcher/LangSwitcher.component';
import { NewGameButtonComponent } from './components/NewGameButton/NewGameButton.component';
import { ControlsNumpadComponent } from './components/ControlsNumpad/ControlsNumpad.component';
import { LoaderSpinnerComponent } from './components/LoaderSpinner/LoaderSpinner.component';
import { GameToolbarComponent } from './components/GameToolbar/GameToolbar.component';
import { selectGame, getLevelAsync } from './store/slices/game';
// import { GameAreaComponent } from './components/GameAreaDOM/GameArea.component';
import { GameAreaComponent } from './components/GameAreaCanvas/GameArea.component';

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, level } = useAppSelector(selectGame);

    useEffect(() => {
        dispatch(getLevelAsync(level));
    }, [dispatch, level]);

    return (
        <div className="container">
            <div className="row">
                <LangSwitchComponent />
            </div>
            <div className="row content">
                <div className="col-md-8 loader-wrapper">
                    {status === 'loading' && <LoaderSpinnerComponent />}

                    <div className="row">
                        <div className="col-md-7">
                            <GameAreaComponent />
                        </div>
                        <div className="col-md-5">
                            <NewGameButtonComponent />
                            <GameToolbarComponent />
                            <ControlsNumpadComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
