import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Header from "../components/Header";

const EditBooks = (props) => {
  const params = useParams();
  console.log("params", params);

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [catagory, setCatagory] = useState("");
  const [catagories, setCatagories] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.kitapId}`)
      .then((res) => {
        console.log(res.data);
         
        setBookname(res.data.name);
        setAuthor(res.data.author);
        setIsbn(res.data.isbn);
        setCatagory(res.data.catagory);
      
      

        axios
          .get(" http://localhost:3004/catagories")
          .then((res) => {
            setCatagories(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

       }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (catagories === null) {

    return (<Loading />);
  }

  return (
    <div>
      <Header />

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
              <select
                className="form-select"
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
            <button type="submit" className="btn btn-primary w-25">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
