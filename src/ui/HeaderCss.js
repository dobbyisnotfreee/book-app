import React from 'react';
import {useStateValue} from "../StateProvider";
import {auth} from "../firebase";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Search} from "@material-ui/icons";


const StyledHead = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: lavender;
    position: sticky;
    top: 0;
    z-index: 100;

.title {
margin-right: 30px;
}


.header_search {
    display: flex;
    flex:0.5;
    align-items: center;
    border-radius: 24px;

}
.header_searchInput{
    height: 12px;
    padding: 10px;
    border: none;
    width: 100%;
}

.header_searchIcon{
    padding: 5px;
    height: 22px;
    background-color: #cd9042;
}




.header_option {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    align-items: center;
}

.header_optionLineOne{
    font-size: 10px;
    color: black;
    font-weight:bold;
}

.header_optionLineTwo{
    font-size: 13px;
    font-weight: 800;
    margin-top: 3px;
}



`;


function HeaderCss() {

    const [{book,user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }

    }


    return (
        <StyledHead>
            <h1 className="title"><Link to="/">리액트 깎는 백수의 Book web
            </Link></h1>

            <div
                className="header_search">
                <input className="header_searchInput" type="text"/>
                <Search className="header_searchIcon"/>

            </div>



                <div className="header_option">
                    <span className='header_optionLineOne'>{!user ? '게스트' : user.email} </span>
                    <Link to={!user && '/login'} className='homelogin'>
                        <span onClick={handleAuthentication}
                              className='header_optionLineTwo'>{user ? '로그아웃' : '로그인'}
                        </span>
                    </Link>
                </div>


        </StyledHead>
    );
}

export default HeaderCss;