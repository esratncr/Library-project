import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

const AddBookForm = () => {
  const [catagories, setCatagories] = useState(null);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [catagory, setCatagory] = useState("");

  useEffect(() => {
    axios
      .get("  http://localhost:3004/catagories")
      .then((res) => {
        console.log(res);
        setCatagories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bookname === "" || author === "" || catagory === "") {
      alert("Kitap adı,Kitap yazarı,kategori boş bırakılamaz");
      return;
    }

    const newBook = {
      id: new Date().getTime(),
      name: bookname,
      isbn: isbn,
      catagoryId: catagory,
    };
    
axios
.post("http://localhost:3004/books",newBook)
.then((res)=>{
console.log("kitapeklendi",res)
setBookname("");
setAuthor("");
setIsbn("");
setCatagory("");

Navigate("/");
})
.catch((err)=>
console.log(err))
  };

  if (catagories === null) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Kitap Adı"
              value={bookname}
              onChange={(event) => setBookname(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Kitap Yazarı"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
        </div>
        <div className="row my-5">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Isbn"
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
            />
          </div>
            <div className="col">
          <select className="form-select"
          value={catagory}
          onChange={(event)=> setCatagory(event.target.value)}>
            
            <option value={""} selected>
              Kategori secinz
            </option>
            {catagories.map((cat) => {
              return( 
                <option value={cat.id}>{cat.name}</option>
                );
            
            
            })}
          </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-25">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
