import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// Get user from localStorage
// .parse BECAUSE local storage can only have strings
const user = JSON.parse(localStorage.getItem("user"));

// The Intial State of each variable
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      // WE are returning the payload that's coming back from our REGISTER FUNCTION
      return await authService.register(user);
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

// Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    // If it finds any errors it can display them in these structure types
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // It will send the rejection message as the payload
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout Function
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // These are NOT asynchronous
  reducers: {
    // Resets the state to the default values
    reset: (state) => {
      // Returns it to their intial values after we dispatch the function --> i.e Hit submit
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTERING
      // When the its pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // When its fufilled
      .addCase(register.fulfilled, (state, action) => {
        // We don't want the loading state after the action has completed
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      // When its rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        // Set to true because there was an error (its rejecting)
        state.isError = true;
        // The message is being sent to the payload --> Refer to the return thunkAPI above
        state.message = action.payload;
        // Something went wrong during the register so no user is logged
        state.user = null;
      })
      // LOGIN
      // When the its pending
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // When its fufilled
      .addCase(login.fulfilled, (state, action) => {
        // We don't want the loading state after the action has completed
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      // When its rejected
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        // Set to true because there was an error (its rejecting)
        state.isError = true;
        // The message is being sent to the payload --> Refer to the return thunkAPI above
        state.message = action.payload;
        // Something went wrong during the register so no user is logged
        state.user = null;
      })
      // LOGOUT FUNCTION
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
