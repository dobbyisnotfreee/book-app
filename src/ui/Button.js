import styled, {css} from "styled-components";
import {Loading} from "./index";


const ButtonStyled = styled.button`

  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  color: white;
  background-color: black;
  cursor: pointer;
  
  ${props => {
    return props.outline && css`
        border: 2px solid gray;
  background-color: white;
  border-radius: 6px;
  color: black;
  font-size:20px;
`;
}}

`

function Button( {loading,  ...rest} ) {
    return (

        <ButtonStyled disabled={loading} {...rest} >
            {loading ? <Loading /> : rest.children }
        </ButtonStyled>


    );
}

export default Button;