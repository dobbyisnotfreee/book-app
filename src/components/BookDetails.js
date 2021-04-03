import React from 'react';
import {useRouteMatch, Route, useParams, BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import {useEffect} from "react";
import {useState} from "react";
import db from "../firebase";
import BookGeneral from "./book-details/BookGeneral";
import BookAuthors from "./book-details/BookAuthors";
import BookPhotos from "./book-details/BookPhotos";
import BookMenu from "./book-details/BookMenu";
import {useStateValue} from "../StateProvider";

function BookDetails() {
    const {id} = useParams();
/*
    const [{book,user}, dispatch] = useStateValue();


*/

    const [book, setBook] = useState("")
    const match = useRouteMatch();

    useEffect(() => {
        try {

            db.collection("books").doc(id).onSnapshot((snapshot) =>
                setBook(snapshot.data()))

        } catch (e) {
            console.error(e)
        }
    }, [id])

    console.log(book)


    return (
        <div className="bookDetails">
            <h2>주요 책 정보</h2>
            <BookMenu url={match.url}/>


            {book ? (
                <Switch>
                    <Route exact path={`${match.path}`}>
                        <BookGeneral book={book} id={id}/>
                    </Route>
                    <Route path={`${match.path}/authors`}>
                        <BookAuthors book={book} id={id} />
                    </Route>
                    <Route path={`${match.path}/photos`}>
                        <BookPhotos book={book} id={id}/>
                    </Route>

                </Switch>

            ) : "로딩중"}


        </div>
    );
}

export default BookDetails;