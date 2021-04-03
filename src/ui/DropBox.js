import React, {useState} from 'react';
import styled, {css} from "styled-components";

const StyledLabel = styled.label`
display: flex;
width: 300px;
height: 300px;
border: #ccc 2px dashed;
margin: 20px;
align-items: center;
justify-content: center;
cursor: pointer;

${({dragEnter}) => dragEnter && css`
border-color:#666;

`}

`;
function DropBox({onFiles}) {

    const [dragEnter, setDragEnter] = useState(false);


    const handleFiles = (e) => {
        console.log(e.target.files);
        onFiles(e.target.files)
    }


    const handleDragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(true)
    }

    const handleDragLeaver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(false)
    }

    const handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(true)
    }

    const handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onFiles(e.dataTransfer.files)
    }

    return (
        <div className="dropbox">
            <StyledLabel
                dragEnter={dragEnter}
                onDragEnter={handleDragEnter}
                htmlFor="images-upload"
                onDragLeaver={handleDragLeaver}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >

                이미지 파일 드롭하기
            </StyledLabel>
            <input onChange={handleFiles} multiple type="file" name="images-upload" id="images-upload"
                   className="visually-hidden"/>
        </div>
    );
}

export default DropBox;