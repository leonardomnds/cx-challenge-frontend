import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  position: relative;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  color: #666360;
  border: 2px solid #232129;

  ${(props) => props.isFocused && css`
    color: #FF9000;
    border-color: #FF9000;
  `}

  span {
    pointer-events: none;
    position: absolute;
    top: 18px;
    padding: 0 36px;
    transition: all 0.2s;
    color: #666360;
  }

  input {
    flex: 1;
    border: 0;
    color: #F4EDE8;
    background: transparent;
  }

  input:focus + span,
  input:valid + span {
    top: 2px;
    font-size: 75%;
  }

  input:focus + span {
    color: #FF9000;
  }

  svg {
    margin-right: 16px;
  }
`;
