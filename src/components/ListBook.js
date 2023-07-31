import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBook = (props) => {
  const [books, setBooks] = useState(null);
  const [catagories,setCatagories]=useState(null);

  useEffect(() => {
    axios
      .get(" http://localhost:3004/books")
      .then((resBook) => {
        setBooks(resBook.data)
        axios
        .get(" http://localhost:3004/catagories")
        .then((resCatagory)=>{
          setTimeout(()=>{
            setCatagories(resCatagory.data)

          },500)
         
        })
        .catch((err)=>console.log("kategori hatası",err))
      })
      .catch((err) => console.log("Kitap hatsı ", err));
  }, []);
   if( books ===null || catagories===null){
    return(
    
      <Loading />
    )
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
       
          </tr>
        </thead>
        <tbody>
          {
            books?.map(book=>{
              const catagory= catagories.find(cat=> cat.id === book.catagoryId)
              return(

                <tr>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{catagory?.name}</td>
              
              </tr>
              )
            })
          }
         
         
        </tbody>
      </table>
    </div>
  );
};
export default ListBook;
