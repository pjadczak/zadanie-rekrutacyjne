import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    :root{
        --mainColor: orange;
        box-sizing: border-box;
    }

    #root{
        width: 100vw;
        height: 100vh;
        flex: 1;
        display: flex;
    }

    body{
        background-color: #d8efd8;
        padding: 0px;
        margin: 0px;
        width: 100vw;
        height: 100vh;
    }
`

const AppStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    .body{
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: #fff;
        max-width: 1200px;
        min-width: 1200px;
        border-right: 1px solid black;
        border-left: 1px solid black;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        .dataContext{
            padding: 20px;
            flex: 1;
        }
    }
`;	

export default AppStyle;