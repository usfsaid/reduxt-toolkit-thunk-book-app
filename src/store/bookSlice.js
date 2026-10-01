import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

// fetch data from api server
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // dispatch({type: 'book/getBooks/pending', payload: undefined)
      const response = await fetch("http://localhost:3005/books");
      const data = await response.json();
      return data;
      // dispatch({type: 'book/getBooks/fulfilled', payload: data)
    } catch (error) {
      return rejectWithValue(error.message);
      // dispatch({type: 'book/getBooks/rejected', payload: error)
    }
  },
);

// Insert new book => send data to database server
export const insertBooks = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    bookData.userName = getState().auth.name;
    try {
      const response = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      dispatch(logInsert({ name: "InsertBook", status: "Sucess" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "InsertBook", status: "faild" }));

      return rejectWithValue(error.message);
    }
  },
);

// deleteBook
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// readBook
export const readBook = createAsyncThunk(
  "book/readBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// when create any createAsyncThunk => redux-toolkit create
// 3 type action {pending,fulfilled,rejected}

// How create ?
//pending => createAction("book/getBooks/pending",(payload)=>{return payload})
//fulfilled => createAction("book/getBooks/fulfilled",(payload)=>{return payload})
//rejected => createAction("book/getBooks/rejected",(payload)=>{return payload})

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoadding: false,
    error: null,
    bookInfo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    // get books
    builder.addCase(getBooks.pending, (state, action) => {
      state.isLoadding = true;
      state.error = null;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoadding = false;
      state.books = action.payload;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadding = true;
    });

    // insert book
    builder.addCase(insertBooks.pending, (state, action) => {
      state.isLoadding = true;
    });
    builder.addCase(insertBooks.fulfilled, (state, action) => {
      state.isLoadding = false;
      state.books.push(action.payload);
    });
    builder.addCase(insertBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadding = true;
    });

    // delete book
    builder.addCase(deleteBook.pending, (state, action) => {
      state.isLoadding = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoadding = false;
      // console.log(action.payload);
      state.books = state.books.filter((el) => el.id !== action.payload.id);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadding = true;
    });

    // read book
    builder.addCase(readBook.pending, (state, action) => {
      state.isLoadding = true;
    });
    builder.addCase(readBook.fulfilled, (state, action) => {
      state.isLoadding = false;
      state.bookInfo = action.payload;
      console.log(state.bookInfo);
    });
    builder.addCase(readBook.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadding = true;
    });
  },
});

export default bookSlice.reducer;
