import React, {useState} from 'react';
import {Divider, DropBox, Gallery, ImgProgress} from "../../ui";
import {getBase64URL, resizeImg} from "../../functions/imageFn";
import db, {storageRef} from "../../firebase";
import firebase from "firebase";


function BookPhotos({book, id}) {

    const [imag, setImag] = useState([]);


    const onFiles = async (files) => {
        for (let i = 0; i < files.length; i++) {

            try {
                const base64URL = await getBase64URL(files[i]);

                setImag((imag) => [...imag, {url: base64URL, percent: 0}])
                const blob = await resizeImg(base64URL, 2000);
                const imageName = `images/books/${Date.now()}.jpeg`;
                const uploadTask = storageRef.child(imageName).put(blob, {contentType: 'image/jpeg'})


                uploadTask.on("state_changed", (snapshot) => {
                        let percent =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(percent);
                        setImag((imag) => imag.map((img, j) => (j === i ? {url: img.url, percent} : img)));
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
                        console.log("다운로드 URL :", downloadURL);

                        setTimeout(
                            () => setImag((imag) => imag.filter((img, j) => j === i)),
                            800
                        );

                        await db.collection("books").doc(id).update({
                            photos: firebase.firestore.FieldValue.arrayUnion(downloadURL)
                        });

                    }
                );


            } catch (e) {

                console.log(e);

            }

        }

    }


    return (
        <>
            <h1> 책 사진 정보 </h1>
            {book.photos && book.photos.length ? (
                <Gallery imgs={book.photos} id={id}/>
            ) : (
                <p>No photo available</p>
            )}


            <Divider/>

            <DropBox onFiles={onFiles}/>

            {imag.map((img) =>
                (<ImgProgress imgURL={img.url} percent={img.percent}/>)
            )}
        </>

    );
}

export default BookPhotos;