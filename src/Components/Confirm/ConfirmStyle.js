import styled from 'styled-components';

const ConfirmStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    h2{
        text-align: center;
    }
    .content{
        padding: 20px;
    }
    .buttons{
        padding: 20px;
        display: flex;
        flex-direction: row-reverse;
        button{
            border: 1px solid grey;
            outline: 0px;
            font-size: 18px;
            color: black;
            margin-left: 10px;
            padding: 15px;
            cursor: pointer;
            transition: all .3s;
            &.action{
                background-color: red;
                color: white;
                &:hover{
                    background-color: black;
                }
            }
            &:hover{
                border-color: black;
            }
        }
    }
`;	

export default ConfirmStyle;