import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './reducers/item.reducer';

export default configureStore({
  reducer: {
    // REDUCERS CONNECT TO STORE HERE:
    item: itemReducer
  },
});
