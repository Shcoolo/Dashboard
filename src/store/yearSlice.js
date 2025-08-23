import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { indexYears } from '../api/years';

// Async thunk to fetch years and set current year id
export const fetchAndSetCurrentYear = createAsyncThunk(
  'year/fetchAndSetCurrentYear',
  async (_, { rejectWithValue }) => {
    try {
      const response = await indexYears();
      const years = response.data;
      // Pick the latest year or the one with is_current=true if available
      let currentYear = null;
      if (Array.isArray(years) && years.length > 0) {
        currentYear = years.find(y => y.is_current) || years[years.length - 1];
      }
      return { years, year_id: currentYear ? currentYear.id : null };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch years');
    }
  }
);

const initialState = {
  year_id: null,
  years: [],
  loading: false,
  error: null,
};

const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setYearId: (state, action) => {
      state.year_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndSetCurrentYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndSetCurrentYear.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload.years;
        state.year_id = action.payload.year_id;
      })
      .addCase(fetchAndSetCurrentYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setYearId } = yearSlice.actions;
export default yearSlice.reducer; 