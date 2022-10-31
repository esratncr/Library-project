import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [catagories, setCatagories] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((resBook) => {
        console.log(resBook);
        setBooks(resBook.data);
        axios
          .get(" http://localhost:3004/catagories")
          .then((resCat) => {
            setCatagories(resCat.data);

            // setTimeout(() => {
                                        //  burası loadin saniye kısmı
            // }, 5000);
           
          })
          .catch((err) => console.log("catagories err", err));
      })
      .catch((err) => console.log(err));
  }, []);

  if (books === null  || catagories === null) {
    return (
     <Loading />
    );
  }

  return (
    <div className="container my-5 ">
        <div className="my-3 d-flex justify-content-end">
            <Link to="/add-book" className="btn btn-primary">Kitap Ekle</Link>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kategori</th>
            <th scope="col">Kitap adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
           const catagory =  catagories.find(
            (cat) => cat.id === book.catagoryId
           );
            return (
              <tr>
                <td>{catagory.name}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.ISBN}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListBooks;
