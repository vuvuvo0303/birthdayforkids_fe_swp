import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updatePackage: (state, action) => {
      state.package = action.payload;
      return state;
    },
    selectService: (state, action) => {
      if (!state.services) {
        state.services = [];
      }

      const index = state.services.map((item) => item.serviceID).indexOf(action.payload.serviceID);

      if (index >= 0) {
        state.services.splice(index, 1);
      } else {
        state.services.push(action.payload);
      }

      return state;
    },
    updateInformation: (state, action) => {
      state.information = action.payload;
      return state;
    },
    reset: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePackage, reset, selectService, updateInformation } = bookingSlice.actions;

export default bookingSlice.reducer;
