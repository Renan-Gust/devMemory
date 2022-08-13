import styled from 'styled-components'

export const Container = styled.div<{ showBackground: boolean }>`
    background-color: ${props => props.showBackground ? "#1550ff" : "#e2e3e3"};
    height: 100px;
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Icon = styled.img<{ opacity?: number }>`
    width: 40px;
    height: 40px;
    opacity: ${props => props.opacity ?? 1};
`