import React from 'react';
import {Button, Field, Message} from "../ui";
import profileImg from '../ui/profile-placeholder.png'
import {getBase64URL} from "../functions/imageFn";


function AuthorForm({error, loading, onSubmit, author, setAuthor}) {


    const handleChange = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value,
        });


    }

    const handleFile = async (e) => {

        const base64URL = await getBase64URL(e.target.files[0]);


        setAuthor({
            ...author,
            photo: base64URL
        })


    }


    return (
        <form onSubmit={onSubmit}>

            <Field labelText="이름" id="author-name">

                <input type="text" name="name" id="author-name" value={author.name} onChange={handleChange}/>
            </Field>

            <Field labelText="사진" id="author-photo">
                <div>
                    <figure>
                        <img src={author.photo === '' ? profileImg : author.photo}
                             width="120" alt=""/>
                    </figure>
                    <input type="file" onChange={handleFile} name="photo" id="author-photo" accept="image/*"/>
                </div>
            </Field>

            <Field labelText="작가 설명" id="author-description">
               <textarea name="description" id="author-description" rows="8" value={author.description}
                         onChange={handleChange}/>
            </Field>

            <Message text={error} type="error"/>
            <Button loading={loading} type="submit"> 작가 정보 갱신하기 </Button>

        </form>
    );
}

export default AuthorForm;