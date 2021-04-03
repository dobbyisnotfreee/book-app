import React from 'react';
import {Button, Field, Message, Modal} from "../ui";
import {useState} from "react";
import db from "../firebase";
import {ToasterContext} from "../ui/ToasterContext";
import {useHistory} from "react-router-dom";
import {useStateValue} from "../StateProvider";

function AddBook() {

    const [isModal, setModal] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [bookPage, setBookPage] = useState('');
    const [bookPublish, setBookPublish] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [{user}, dispatch] = useStateValue();


    const history = useHistory();


    const handleBook = async (addToast, e) => {
        e.preventDefault();
        setLoading(true)
        console.log({bookTitle, bookPage, bookPublish})

        try {
            const docRef = await db.collection("books").add({
                title: bookTitle,
                pages: parseInt(bookPage),
                publishDate: new Date(bookPublish),
            })

            addToast({text: '성공적으로 만들었습니다', type: 'success'})

            docRef.id ? history.push(`/book/${docRef.id}`) : history.push(`/`)

        } catch (e) {
            addToast({text: '새로운 책 저장에 실패했습니다!!!', type: 'error'})
            setError("에러가 발생했습니다.")
            setTimeout(() => {
                setError(null)
            }, 3000)


        }


    }


    const handleClick = () => {
        if (user) {
            setModal(true);
            setError(null)
        } else {
            history.push('/login')
        }
    }


    return (

        <ToasterContext.Consumer>
            {({addToast}) => (
                <>

                    <Button onClick={handleClick} outline> 책 추가하기
                    </Button>

                    <Modal title="책 추가" show={isModal} close={() => setModal(false)}>

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
                    </Modal>


                </>
            )}

        </ToasterContext.Consumer>
    );
}

export default AddBook;