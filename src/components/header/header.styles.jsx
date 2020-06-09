import styled from 'styled-components';
import {Link} from 'react-router-dom';

const mainColor = '#316671';


export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    /* position: fixed; */
    background-color: ${mainColor};
    /* left: 0;
    top: 0; */
    /* z-index: 1; */
    /* padding: 0 60px;  */

    @media screen and (max-width: 800px){
        height: 60px;
        padding: 10px;
        margin-bottom: 20px;
    }
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width: 800px){
        width: 50px;
        padding: 0;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px 0 0;

    @media screen and (max-width: 800px){
        width: 80%;
    }
`; 

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;

     &:hover{
        background-color: white;
    }

    @media screen and (max-width: 400px){
        display: none;
    }
`;

export const ToogleDrop = styled.div`
    display: none;

    @media screen and (max-width: 400px){
        display: block;
    }
`;
