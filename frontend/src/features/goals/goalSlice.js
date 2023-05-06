import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// Our Initial State of each of the objects when we make the goals
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      // Getting our token thats in our localStorage / user.state
      // --> thunkAPI has a get state method built in
      // .auth (the part of the state we want) .user (specific user we want) .token (gets our user token)
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      // If it finds any errors it can display them in these structure types
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // It will send the rejection message as the payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User Goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      // If it finds any errors it can display them in these structure types
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // It will send the rejection message as the payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//
export const goalsSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // CREATE GOALS
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      // GET GOALS
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getGoals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
