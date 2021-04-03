import styled, {css} from "styled-components";

const ModalWrapper = styled.div`

position: fixed;
width: 100%;
height: 100%;;
top: 0;
left: 0;
background-color:rgba(0,0,0,0.8);
display: flex;
align-items: center;
justify-content: center;
opacity: 0;
transition: opacity 0.4s ease-in-out; !important;
pointer-events: none;
${props => props.show && css`
opacity: 1;
pointer-events: all;

`};

`;

const ModalContent = styled.div`

background-color:white;
box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.4);
border-radius:6px;
padding:30px;
max-width: calc(100% - 60px);
max-height: calc(100% - 60px);

.close {
cursor:pointer;
position: absolute;
top: 180px;
right: 210px;
z-index: 1;
font-size: 16px;
font-weight:bold;
color: white;

}

.title {
margin-top: 0;
}

overflow: hidden;
overflow-y: scroll;

${props => props.height && css`height: ${props.height}px`
}
${props => props.width && css`width: ${props.width}px;`
}


`;


function Modal(props) {
    return (
        <ModalWrapper show={props.show}>
            <ModalContent width={props.width} height={props.height}>
                <h2 className="title"> 새로운 책 추가하기 </h2>
                {
                    props.children
                }
                <div className="close" onClick={props.close}>X</div>
            </ModalContent>
        </ModalWrapper>
    );
}

export default Modal;