import React, {useContext, useState} from 'react';
import styled from "styled-components";
import IconButton from "./IconButton";
import {storage} from "../firebase";
import db from "../firebase";
import firebase from "firebase";
import {ToasterContext} from "./ToasterContext";


const Figure = styled.div`

position: relative;
> div {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0) 30%);
opacity:0;
transition:opacity 0.2s ease-in-out;
}

:hover {
div {
opacity: 1;
}
}

`;

function Image({img, id}) {

    const [loading, setLoading] = useState(false);
const {addToast} = useContext(ToasterContext);
    const handleDelete = async () => {
        setLoading(true)
        try {
            await storage.refFromURL(img).delete();
            await db.collection('books').doc(id).update({
                photos: firebase.firestore.FieldValue.arrayRemove(img)
            })
        } catch (e) {
            console.error(e);
            addToast({text:"이미지를 지우는데 오류가 발생했습니다", type:"error"})
        }


        setLoading(false)


    }


    return (
        <Figure>
            <img src={img} height="150" alt=""/>
            <div>
                {/*<Delete className="delete"/>*/}
                <IconButton loading={loading} color="white" onClick={handleDelete}/>
            </div>

        </Figure>
    );
}

export default Image;









