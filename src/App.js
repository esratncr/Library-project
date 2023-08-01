import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Favori from "./pages/favori";
import Home from "./pages/Home";
import ListBook from "./components/ListBook";
import EditBooks from "./pages/EditBooks";


function App() {

  return(
    
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/favoriler" element={<Favori />} />
      <Route path="" element={ <ListBook />} />
      <Route path="/edit-book/:bookId" element={ <EditBooks />} />
      
      
    </Routes>
  </BrowserRouter>
)
}

export default App;
