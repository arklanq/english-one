import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import {rootReducer} from './rootReducer';

function configureReduxStore() {
  const middlewares = [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  ];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
  });
}

export const store = configureReduxStore();
