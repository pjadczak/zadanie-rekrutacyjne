import styled from 'styled-components';

const HeaderStyle = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    max-height: 120px;
    background-color: #d9d9d9;
    h1{
        font-size: 20px;
        margin: 20px 0px 0px 20px;
        span{
            display: block;
            font-size: 14px;
            font-weight: normal;
            margin: 10px 0px 10px 0px;
            a{
                color: black;
                text-decoration: none;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
    .langs{
        position: absolute;
        top: 10px;
        right: 10px;
        ul{
            display: block;
            list-style: block;
            margin: 0px;
            padding: 0px;
            li{
                display: inline-block;
                margin-left: 5px;
                img{
                    width: 30px;
                    border: 1px solid transparent;
                }
                &.selected{
                    img{
                        border: 1px solid black;
                    }
                }
            }
        }
    }
    .actions{
        position: absolute;
        bottom: 10px;
        right: 10px;
        ul{
            display: block;
            list-style: none;
            margin: 0px;
            padding: 0px;
            li{
                display: inline-block;
                margin-left: 10px;
                a{
                    color: black;
                    text-decoration: none;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
`;	

export default HeaderStyle;