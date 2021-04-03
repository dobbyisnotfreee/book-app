import React from 'react';
import Image from './Image';
import styled from "styled-components";


const StyledDiv = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 800px;
> div {
margin: 4px;
}

`;


function Gallery({imgs, id}) {
    return (
        <StyledDiv>
            <div>
                {imgs.map(img => <Image img={img} id={id} />)}
            </div>
        </StyledDiv>
    );
}

export default Gallery;