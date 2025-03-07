import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch users from API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

// Add user (Mock API, since JSONPlaceholder doesn’t allow posting)
export const addUserAsync = createAsyncThunk("users/addUser", async (user: User) => {
  return user; // Simulate adding user to API
});

// Update user
export const updateUserAsync = createAsyncThunk("users/updateUser", async (user: User) => {
  return user; // Simulate updating user
});

// Delete user
export const deleteUserAsync = createAsyncThunk("users/deleteUser", async (id: number) => {
  return id; // Simulate deleting user
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;