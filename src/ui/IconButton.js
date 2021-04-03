import React from 'react';
import styled, {css} from "styled-components";
import {Loading} from "./index";
import {Delete} from "@material-ui/icons";

const Div = styled.div`
cursor: pointer;

${({color}) => color && css`
div {
  color: ${color}
}
`}

${({size}) => size && css`
div {
font-size: ${size}
}
`}




`;


function IconButton({loading, color, size, onClick}) {
    return (
        <Div size={size} color={color}>
            {loading ? (<Loading/>) : (

                <div onClick={onClick}>
                    <Delete/>
                </div>

            )}


        </Div>

    );
}

export default IconButton;