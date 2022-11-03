import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBooks from "./pages/EditBooks";
import Home from "./pages/Home";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route  path ="/edit-book/:bookId" element={<EditBooks />}  />
    </Routes>
  </BrowserRouter>
)
}

export default App;
