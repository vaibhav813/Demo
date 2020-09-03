import {
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './Types';

const initialState = {
  weatherInfo: {},
  isLoading: false,
  error: false,
};

//export const getWeatherSelector = (state) => ({...state.weather});

const weatherReducer = (state = initialState, action) => {
  console.log('In Reducer ', action);
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        weatherInfo: action.weatherInfo,
      };
    }
    case FETCH_DATA_REQUEST: {
      return {
        isLoad: action.isLoad,
        error: false,
        weatherInfo: {},
      };
    }
    case FETCH_DATA_ERROR: {
      return {
        ...state,
        isLoad: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default weatherReducer;
