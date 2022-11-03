import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [catagories, setCatagories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);

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
          })

          .catch((err) => console.log("catagories err", err));
      })
      .catch((err) => console.log("book res", err));
  }, [didUpdate]);

  const deleteBook = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("delete res", res);

        setDidUpdate(!didUpdate);
      })
      .catch((err) => console.log(err));
  };

  if (books === null || catagories === null) {
    return <Loading />;
  }

  return (
    <div className="container my-5 ">
      <div className="my-3 d-flex justify-content-end">
        <Link to="/add-book" className="btn btn-primary">
          Kitap Ekle
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kitap adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th scope="col">ISBN</th>
            <th scope="col">İşlem</th>
            <th scope="col">Editt</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const catagory = catagories.find(
              (cat) => cat.id === book.catagoryId
            );
            console.log(catagory);

            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.catagory}</td>

                <td className="text-center">
                  {book.ISBN === "" ? "-" : book.ısbn}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      class=" btn btn-outline-danger btn-sm "
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`edit-book/${book.id}`}
                      className=" btn btn-outline-primary btn-sm "
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
