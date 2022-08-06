import styled from 'styled-components'

export const Button = styled.button`
    font-size: 16px;
    width: 200px;
    height: 50px;
    display: flex;

    background-color: #1550ff;
    border-radius: 10px;
    opacity: 1;
    transition: all ease .3s;

    &:hover{
        opacity: 0.8;
    }
`

export const IconArea = styled.div`
    height: inherit;
    padding: 0 15px;
    border-right: 1px solid rgba(255, 255, 255, .2);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const Icon = styled.img`
    height: 20px;
`

export const Label = styled.div`
    height: inherit;
    padding: 0 20px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`