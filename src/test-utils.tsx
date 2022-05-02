import { ReactElement } from 'react';
import { Provider } from 'react-redux'

export const ReduxProvider: (children: any, reduxStore: any) => ReactElement = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
);