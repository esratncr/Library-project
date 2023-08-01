import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Navigate, useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const Navigate=useNavigate()
  const [catagories, setCatagories] = useState(null);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
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
      author,
      catagoryId: catagory,
    };

    axios
      .post("http://localhost:3004/books", newBook)
      .then((res) => {
        console.log("kitapeklendi", res);
        setBookname("");
        setAuthor("");
        setCatagory("");
        Navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (catagories === null) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col ">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Kitap Adı"
              value={bookname}
              onChange={(event) => setBookname(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Kitap Yazarı"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
        </div>
        <div className="row col m-4 ">
          <div className="col-4  "></div>
          <div className="col-4 ">
            <select
              className="form-select text-center "
              value={catagory}
              onChange={(event) => setCatagory(event.target.value)}
            >
              <option value={""} selected>
                Kategori secinz
              </option>
              {catagories.map((cat) => {
                return <option value={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-danger w-25">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
