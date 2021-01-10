import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import App, {IAppProps} from '@/components/views/App';
import {store} from '@/redux-store/store';

export default (props: IAppProps) => (
  <ReduxProvider store={store}>
    <App {...props} />
  </ReduxProvider>
);
