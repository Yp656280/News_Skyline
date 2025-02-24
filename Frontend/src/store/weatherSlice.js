import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  city: "",
  activeWeather: "",
  allWeather: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCityInfo: (state, action) => {
      state.city = action.payload.city;
    },
    setActiveWeather: (state, action) => {
      state.activeWeather = action.payload.data;
    },
    setAllWeather: (state, action) => {
      state.allWeather.push(action.payload.data);
    },
  },
});

export const { setCityInfo, setActiveWeather, setAllWeather } =
  weatherSlice.actions;

export default weatherSlice.reducer;
