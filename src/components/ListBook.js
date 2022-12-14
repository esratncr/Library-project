import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { BsFillTrashFill, BsFillSuitHeartFill } from "react-icons/bs";

const ListBook = () => {
  const [fiteredbook, setFilteredBook] = useState(null);
  const [catagories, setCatagories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);

  // const changeİsRead =(id) =>{
  //   console.log(id);
  //   const read =book.find(item => item.id === id);
  //   console.log(read);
  // }

  useEffect(() => {
    axios
      .get("  http://localhost:3004/books")
      .then((resbook) => {
        console.log(resbook);
        setFilteredBook(resbook.data);
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
  }, [didUpdate]);

  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log(res);
        setDidUpdate(!didUpdate);
      })
      .catch((err) => console.log(err));
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
    <div className="container   ">
      <div className="d-flex justify-content-end ">
        
          <form className="d-flex   ">
            <input
            value={fiteredbook}
            ocChange={((event)=>setFilteredBook(event.target.value))}
              class="me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button className="btn btn-outline-warning " type="submit">
              Search
            </button>
          </form>
       

        <Link className=" btn btn-danger my-4" to="/add-book">
          Kitap Ekle
        </Link>

        <Link className=" btn btn-danger  my-4 m-2" to="/favoriler">
          Favoriler
        </Link>
        <div></div>
      </div>

      <table className="table table-danger table-hover">
        <thead>
          <tr>
            <th></th>

            <th scope="col">Kitap Adı</th>
            <th scope="col">Kitap Yazarı</th>
            <th scope="col">Kategoriler</th>

            <th scope="col"></th>
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
                <td>
                  {""}

                  <button
                    onClick={""}
                    className="btn btn-sm btn-outline-danger border-warning border-4 "
                    style={{ width: "5px", height: "20px" }}
                  >
                    {/* {item.isRead === true ? "Done" : ""} */}
                  </button>
                </td>

                <td>{books?.name}</td>
                <td>{books?.author}</td>
                <td>{catagory?.name}</td>
                <td>
                  <div
                    className="d-flex justify-content-end "
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      className="btn"
                      onClick={() => deleteBook(books.id)}
                    >
                      <BsFillTrashFill />
                    </button>

                    <button className="btn btn-sm">
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
