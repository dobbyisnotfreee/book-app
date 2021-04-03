import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useStateValue} from "../StateProvider";

function BookItem({book}) {

    const [{user}, dispatch] = useStateValue();


    const history = useHistory();

    const handleClick = () => {
        if (user) {

            history.push(`/book/${book.id}`)
        } else {
            history.push('/login')
        }
    }

    return (
        <div className="book-item">
            <h1 onClick={handleClick} style={{'cursor':'pointer'}}>{book.title}</h1>
            <span>
                            <strong> 책 제목 :{" "} </strong>{book.title}
                        </span>
            <br/>
            <span>
                            <strong> 총 페이지 :{" "} </strong>{book.pages}
                        </span>
            <br/>
            <span>
                            <strong> 출판일 :{" "} </strong> {new Date(book.publishDate.toDate()).toLocaleString()}
                        </span>

        </div>
    );
}

export default BookItem;