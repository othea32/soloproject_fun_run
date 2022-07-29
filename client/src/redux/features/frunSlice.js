import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createFrun = createAsyncThunk(
  "frun/createFrun",
  async ({ updatedFrunData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createFrun(updatedFrunData);
      toast.success("Funrun Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFruns = createAsyncThunk(
  "frun/getFruns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getFruns();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFrun = createAsyncThunk(
  "frun/getFrun",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getFrun(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFrunsByUser = createAsyncThunk(
  "frun/getFrunsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getFrunsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteFrun = createAsyncThunk(
  "frun/deleteFrun",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteFrun(id);
      toast.success("Funrun Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateFrun = createAsyncThunk(
  "frun/updateFrun",
  async ({ id, updatedFrunData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateFrun(updatedFrunData, id);
      toast.success("Funrun Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const frunSlice = createSlice({
  name: "frun",
  initialState: {
    frun: {},
    fruns: [],
    userFruns: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createFrun.pending]: (state, action) => {
      state.loading = true;
    },
    [createFrun.fulfilled]: (state, action) => {
      state.loading = false;
      state.fruns = [action.payload];
    },
    [createFrun.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFruns.pending]: (state, action) => {
      state.loading = true;
    },
    [getFruns.fulfilled]: (state, action) => {
      state.loading = false;
      state.fruns = action.payload;
    },
    [getFruns.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFrun.pending]: (state, action) => {
      state.loading = true;
    },
    [getFrun.fulfilled]: (state, action) => {
      state.loading = false;
      state.frun = action.payload;
    },
    [getFrun.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFrunsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getFrunsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userFruns = action.payload;
    },
    [getFrunsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteFrun.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteFrun.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFruns = state.userFruns.filter((item) => item._id !== id);
        state.fruns = state.fruns.filter((item) => item._id !== id);
      }
    },
    [deleteFrun.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateFrun.pending]: (state, action) => {
      state.loading = true;
    },
    [updateFrun.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFruns = state.userFruns.map((item) =>
          item._id === id ? action.payload : item
        );
        state.fruns = state.fruns.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateFrun.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default frunSlice.reducer;