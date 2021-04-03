import React from 'react';
import {Link} from "react-router-dom";
import EditBook from "../EditBook";

function BookGeneral({book, id }) {



    return (
        <div className="BookGeneral">
            <h1> 일반 정보</h1>
            <p> 책 : {book.title}</p>
            <hr/>
           <EditBook book={book} id={id} />

        </div>
    );
}

export default BookGeneral;