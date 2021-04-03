import React from 'react';
import {useContext} from "react";
import {ToasterContext} from "../../ui/ToasterContext";
import db, {storageRef, storage} from "../../firebase";
import firebase from "firebase";
import profileImg from '../../ui/profile-placeholder.png'
import {excerpt} from "../../functions/stringFn";

function BookAuthor({author, id, dispatch}) {
    const {addToast} = useContext(ToasterContext);
    // 오른쪽밑에 생성되엇다고 뜨는거

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            if (author.photo !== '') await storage.refFromURL(author.photo).delete()
            await db.collection('books').doc(id).update({
                authors: firebase.firestore.FieldValue.arrayRemove(author)
            });
            addToast({text: "선택한 작가가 삭제되었습니다.", type: 'success'})

        } catch (e) {
            console.log(e)
            addToast({text: "삭제에 실패 했습니다.", type: 'error'})
        }
    }


    return (
        <>
            <figure>

                <img src={author.photo !== '' ? author.photo : profileImg} alt="" width="90"/>
            </figure>

            <div>
                <h5>
                    {author.name}
                </h5>
                <p>{excerpt(author.description)}</p>
            </div>
            <div>
                <a href="#" onClick={handleDelete}>삭제</a>
            </div>
        </>

    )
}

export default BookAuthor;