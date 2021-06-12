import styled from 'styled-components';

export const Container = styled.header`
  height: 60px;
  width: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
  background: #312E38;
`;

export const Content = styled.div`
  height: 100%;

  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 30px;
  }

  div {
    display: flex;
    align-items: center;

    button {
      background: #FF9000;
      height: 40px;
      border-radius: 5px;
      border: 0;
      padding: 0 5px;
      color: #312E38;
      width: 150px;
      font-weight: 500;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

    }

    a {
      margin-left: 20px;
      color: #FFF;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      svg {
        margin-right: 8px;
      }
    }

  }

`;
