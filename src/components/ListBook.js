import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "./Modal";

const ListBook = (props) => {
  const [books, setBooks] = useState(null);
  const [catagories, setCatagories] = useState(null);
  const [diUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);
  const [silinecekKitapİsmi,setSilinecekKitapİsmi] =useState("")

  useEffect(() => {
    axios
      .get(" http://localhost:3004/books")
      .then((resBook) => {
        setBooks(resBook.data);
        axios
          .get(" http://localhost:3004/catagories")
          .then((resCatagory) => {
            setTimeout(() => {
              setCatagories(resCatagory.data);
            }, 500);
          })
          .catch((err) => console.log("kategori hatası", err));
      })
      .catch((err) => console.log("Kitap hatsı ", err));
  }, [diUpdate]);

  const deletBook = (id) => {
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("hata payı", res);

        setDidUpdate(!diUpdate);
      })
      .catch((err) => console.log("silme işlemi hastası", err));
  };

  if (books === null || catagories === null) {
    return <Loading />;
  }

  return (
    <div className="container m-5 p-5 ">
      <div className=" my-3 d-flex justify-content-end">
        <Link to="/add-book" className="btn-danger ">
          kitap ekle
        </Link>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th className="" scope="col">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => {
            const catagory = catagories.find(
              (cat) => cat.id === book.catagoryId
            );
            return (
              <tr>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{catagory?.name}</td>
                <td>
                  <button
                    className="btn-danger mx-2 btn"
                    onClick={() => {
                      setShowModal(true);
                      setSilinecekKitap(book.id);
                      setSilinecekKitapİsmi(book.name)
                    }}
                  >
                    <i className="bi bi-trash3-fill "></i>
                  </button>
                  <Link to={`edit-book/${book.id}`}>
                    <i className="bi bi-pen-fill"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal === true && (
        <Modal
        aciklama="Silmek istediğinize eminmisinz?" //{`${silinecekKitapİsmi}`} bu da ikinci bir yol olurdu
        title={silinecekKitapİsmi}
        onConfirm={() => deletBook(silinecekKitap)}
        onCansel={()=> setShowModal(false)}
        />
      )}
    </div>
  );
};
export default ListBook;
