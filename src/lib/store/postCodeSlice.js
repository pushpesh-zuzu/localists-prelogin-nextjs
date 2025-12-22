import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCityName = createAsyncThunk(
    "postcode/getCityName",
    async (postcodeData, { rejectWithValue }) => {
        try {
            const axios = (await import("./axios")).default;

            const response = await axios.post("get-city-name", postcodeData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

const postCodeSlice = createSlice({
    name: "postcode",
    initialState: {
        loading: false,
        error: null,
        citySerach: "",
    },
    reducers: {
        setCitySearch: (state, action) => {
            state.citySerach = action.payload;
        },
        clearPostcodeState: (state) => {
            state.loading = false;
            state.error = null;
            state.citySerach = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCityName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCityName.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getCityName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setCitySearch,
    clearPostcodeState,
} = postCodeSlice.actions;

export default postCodeSlice.reducer;
 