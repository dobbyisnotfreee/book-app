import React from 'react';
import AuthorForm from "../AuthorForm";
import {ToasterContext} from "../../ui/ToasterContext";
import {useContext} from "react";
import db, {storageRef} from "../../firebase";
import firebase from "firebase";
import {useState} from "react";
import BookAuthor from "./BookAuthor";
import styled from "styled-components";
import {Divider} from "../../ui";


const GridDiv = styled.div`
display : grid;
grid-template-columns : 90px auto 50px;
gap: 20px;
max-width: 600px;
`;

/*
const FlexDiv = styled.div`
display : flex;
flex-direction : column ;
`;*/


function BookAuthors({book, id, dispatch}) {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [author, setAuthor] = useState({
        name: '',
        photo: '',
        description: '',

    })


    const {addToast} = useContext(ToasterContext)

    function createImg(photo) {

        const img = new Image();
        img.src = photo;
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e)
        })
    }


    async function resizeImg(photo) {
        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 250;

        const ctx = canvas.getContext("2d");
        const img = await createImg(photo)


        // Math 메소를 활용해서 캔버스에 맞으면서 이미지 배율을 유지한챌 할수 잇도록 scale을 정해줌
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

        // 이미지로부터의 왼쪽 그리고 위쪽 포지션을 정해준다.
        let x = (canvas.width / 2) - (img.width / 2) * scale;
        let y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);


        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })


    }


    const onSubmit = async (author, e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const blob = await resizeImg(author.photo);
            const photoName = `images/author/${Date.now()}.jpeg`;
            const imageRef = storageRef.child(photoName);
            const uploadTask = imageRef.put(blob, {contentType: 'image/jpeg'});
            uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred - snapshot.totalBytes) * 100;
                    console.log(progress);
                }, (e) => {
                    switch (e.code) {
                        case
                        'storage/unauthorized'
                        :
                            console.error('허가되지 않음')
                            break;
                        case
                        'storage/unknown'
                        :
                            console.error(e.serverResponse);
                            break;
                    }


                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log("다운로드 URL :", downloadURL)

                    await db.collection("books").doc(id).update({
                        authors: firebase.firestore.FieldValue.arrayUnion({...author, photo: downloadURL})
                    })

                    setAuthor({
                        name: '',
                        photo: '',
                        description: '',
                    })
                    addToast({text: '작가 정보가 변경되었습니다', type: 'success'})
                    setLoading(false)


                }
            )


        } catch (e) {
            console.error("작가를 추가하는데 에러가 발생했습니다", e)
            setError("작가를 추가하는데 실패 했습니다.")
            setTimeout(() => {
                setError(null)
            }, 3000)
            setLoading(false)

        }


    }


    return (
        <div className="bookAuthors">
            <h1> 작가 정보</h1>


                <GridDiv>
                    {book.authors ? book.authors.map(author =>
                        <BookAuthor author={author} id={id}
                                    dispatch={dispatch}/>) : "입력된 작가가 존재 하지 않습니다"}
                </GridDiv>

            <Divider/>
            <h4> 작가 추가하기 </h4>


            <AuthorForm error={error}
                        author={author}
                        setAuthor={setAuthor}
                        loading={loading}
                        onSubmit={onSubmit.bind(this, author)}/>
        </div>
    );
}

export default BookAuthors;