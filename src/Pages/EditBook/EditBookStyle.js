import styled from 'styled-components';

const EditBookStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    .row{
        display: flex;
        flex-direction: row;
        margin: 0px 0px 10px 0px;
        .col{
            padding: 5px;
            flex: 1;
            background-color: #fbfbfb;
            border: 1px solid #d5d5d5;
            margin: 5px;
            &.col-10{ max-width: 10%; }
            &.col-20{ max-width: 20%; }
            &.col-30{ max-width: 30%; }
            &.col-40{ max-width: 40%; }
            &.col-50{ max-width: 50%; }
            &.col-60{ max-width: 60%; }
            &.col-70{ max-width: 70%; }
            &.col-80{ max-width: 80%; }
            &.col-90{ max-width: 90%; }
            &.col-100{ max-width: 100%; }
            label{
                display: block;
                font-size: 16px;
                color: grey;
                margin-bottom: 5px;
            }
            input, select{
                display: block;
                padding: 10px;
                font-size: 16px;
                width: -webkit-fill-available;
                outline: 0px;
                border: 1px solid grey;
                transition: all .3s;
                &:focus{
                    border-color: black;
                    background-color: grey;
                    color: white;
                }
                &.noValid{
                    border: 1px solid red;
                    background-color: #ffe6e6;
                }
            }
            &.noValid{
                label{
                    color: red;
                }
            }
            .names{
                display: flex;
                flex-direction: row;
                .langCol{
                    flex: 1;
                    margin: 0px 5px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid transparent;
                    img{
                        max-height: 30px;
                        margin-right: 10px;
                    }
                    &.selected{
                        border-color: #d7d7d7;
                        background-color: #e7e6e6;
                    }
                }
            }
        }
    }
    .buttons{
        display: flex;
        flex-direction: row-reverse;
        button{
            font-size: 18px;
            background-color: #d9d9d9;
            padding: 15px 30px;
            margin-left: 10px;
            outline: 0px;
            border: 1px solid grey;
            cursor: pointer;
            transition: all .3s;
            &:hover{
                background-color: black;
                color: white;
            }
        }
    }
`;

export default EditBookStyle;