import React, {useContext, useEffect} from 'react';
import {appStore, onAppMount} from './state/app';

import {Container} from './components/Container';
import {Giver} from './components/Giver';

// helpers
export const btnClass = 'btn btn-lg btn-outline-primary mb-3 ';
export const flexClass = 'd-flex justify-content-evenly align-items-center ';
export const qs = (s) => document.querySelector(s);

const App = () => {
    const {state, dispatch, update} = useContext(appStore);

    const onMount = () => {
        dispatch(onAppMount());
    };
    useEffect(onMount, []);

    let children = null;

    children = <Giver {...{state, dispatch, update}} />;

    return <Container state={state}>{children}</Container>;
};

export default App;
