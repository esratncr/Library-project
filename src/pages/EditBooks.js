import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Loading from "../components/Loading";

const EditBooks = () => {
  const params = useParams();
  const navigate = useNavigate();

  console.log("params", params);

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [catagory, setCatagory] = useState("");
  const [catagories, setCatagories] = useState(null);

  useEffect(() => {
    axios
      .get(` http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
        console.log(res);
        setBookname(res.data.name);
        setAuthor(res.data.author);
        setCatagory(res.data.catagoryId);
        axios
          .get(` http://localhost:3004/catagories`)
          .then((res) => {
            setCatagories(res.data);
          })
          .catch((err) => console.log("kategori hata", err));
      })
      .catch((err) => console.log("book edit  hata", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bookname === "" || author === "" || catagory === "") {
      alert("Kitap adı,Kitap yazarı,kategori boş bırakılamaz");
      return;
    }
    const updatedBook = {
      id: params.bookId,
      name: bookname,
      author: author,
      catagoryId: catagory,
    };
    console.log("update", updatedBook);

    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
      .then((res) => {
        console.log(res);
        navigate("/")
      })
      .catch((err) => console.log("update", err));
  };
  if (catagories === null) {
    return 
    <Loading />;
  }

  return (
    <div>
      <Header />
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
            <button
            
              type="submit"
              className="btn btn-danger w-25"
            >
              Kaydet
            </button>
            <button
              onClick={() => navigate("/")}
              type="btn"
              className="btn btn-danger w-25 mx-4"
            >
              Vazgec
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
