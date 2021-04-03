import React from 'react';
import {Button, Field, Message} from "../ui";
import {useState} from "react";
import db from "../firebase";
import {ToasterContext} from "../ui/ToasterContext";

function EditBook( {book , id}) {

    const [bookTitle, setBookTitle] = useState(book.title);
    const [bookPage, setBookPage] = useState(book.pages);
    const [bookPublish, setBookPublish] = useState(book.publishDate.toDate().toISOString().slice(0,10));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const handleBook = async (addToast, e) => {
        e.preventDefault();
        setLoading(true)

        try {
           await db.collection("books").
            doc(id).set({
                title: bookTitle,
                pages: parseInt(bookPage),
                publishDate: new Date(bookPublish),
            }, {merge: true})

            addToast({text: '수정되었습니다', type: 'success'})

        } catch (e) {
            addToast({text: '수정에 실패하였습니다!', type: 'error'})
            setError("수정시 에러가 발생했습니다.")
            setTimeout(() => {
                setError(null)
            }, 3000)


        }


        setLoading(false);

    }


    return (

        <ToasterContext.Consumer>
            {({addToast}) => (
                <>

                        <form onSubmit={handleBook.bind(this, addToast)}>

                            <Field labelText="제목" id="book-title">

                                <input type="text" name="제목" id="book-title" value={bookTitle} placeholder="제목"
                                       onChange={(e) => setBookTitle(e.target.value)}
                                />
                            </Field>

                            <Field labelText="페이지수" id="book-pages">
                                <input type="number" name="pages" id="book-pages" value={bookPage} placeholder="페이지 수"
                                       onChange={(e) => setBookPage(e.target.value)}/>
                            </Field>

                            <Field labelText="출판일" id="book-publish-date">
                                <input type="date" name="publish-date" id="book-publish-date" value={bookPublish}
                                       placeholder="출판일"
                                       onChange={(e) => setBookPublish(e.target.value)}/>
                            </Field>


                            <Button type="submit" loading={loading}>저장하기</Button>

                            <Message text={error} type="error"/>

                        </form>

                </>
            )}

        </ToasterContext.Consumer>
    );
}

export default EditBook;