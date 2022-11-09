import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { BsFillTrashFill, BsFillSuitHeartFill } from "react-icons/bs";

const ListBook = () => {
  const [book, setBook] = useState(null);
  const [catagories, setCatagories] = useState(null);
  const [didUpdate,setDidUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("  http://localhost:3004/books")
      .then((resbook) => {
        console.log(resbook);
        setBook(resbook.data);
        axios
          .get("  http://localhost:3004/catagories")
          .then((resCat) => {
            console.log("................", resCat);
            setCatagories(resCat.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const deleteBook = (id) => {
    console.log(id);
    axios
    .delete(`http://localhost:3004/books/${id}`)
    .then((res)=> {
      console.log(res);
      setDidUpdate(!didUpdate);
    })
    .catch((err)=> console.log(err));
  };



  if (book === null || catagories === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log("---------------", catagories);
  return (
    <div className="container my-5 ">
      <Link className=" btn btn-danger  my-2" to="/add-book">
        Kitap Ekle
      </Link>

      <table className="table table-danger table-hover">
        <thead>
          <tr>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Kitap Yazarı</th>
            <th scope="col">Kategoriler</th>
            
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {book.map((books) => {
            const catagory = catagories.find(
              (cat) => cat.id === books.catagoryId
            );
            console.log(books);

            return (
              <tr>
                <td>{books?.name}</td>
                <td>{books?.author}</td>
                <td>{catagory?.name}</td>
                <td>
                  <div className=" " role="group" aria-label="Basic example">
                    <button className="btn"
                     onClick={()=> deleteBook(books.id)}>
                      <BsFillTrashFill />
                    </button>

                    <button className="btn m-2">
                      <BsFillSuitHeartFill />
                    </button>
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

export default ListBook;
