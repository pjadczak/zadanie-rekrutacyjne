import styled from 'styled-components';

const BooksListStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    .filter{
        margin: 0px 0px 0px 0px;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        .search{
            flex: 1;
            &.searchName{
                align-self: flex-end;
                text-align: right;
            }
        }
        label{
            display: block;
            color: grey;
        }
        input, select{
            font-size: 20px;
            border: 1px solid grey;
            outline: 0px;
            padding: 8px;
            transition: all .3s;
        }
    }
    .notFound{
        margin: 0px auto;
    }
    .list{
        flex: 1;
        .book{
            flex-direction: row;
            display: flex;
            padding: 10px;
            border: 1px solid #d1d1d1;
            background-color: #f3f3f3;
            margin-bottom: 5px;
            transition: all 0.3s;
            align-items: center;
            cursor: pointer;
            .image{
                max-width: 100px;
                margin-right: 10px;
                img{
                    max-width: 100px;
                }
            }
            .name{
                color: green;
                margin-bottom: 5px;
            }
            .bookBody{
                flex: 1;
                display: flex;
                flex-direction: column;

            }
            .category{
                color: grey;
                margin-top: 5px;
                font-size: 12px;
            }
            .actions{
                min-width: 200px;
                min-height: 20px;
                display: flex;
                justify-content: end;
                a{
                    color: black;
                    &.remove{
                        color: red;
                    }
                }
            }
            &:hover{
                box-shadow: 0px 3px 3px rgba(0,0,0,0.6);
            }
        }
    }
`;	

export default BooksListStyle;