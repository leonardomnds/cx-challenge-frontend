import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  h2 {
    margin: 20px 0;
  }

  header {

    padding-right: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: #FFF;
      font-size: 26px;
      text-transform: capitalize;

      display: flex;
      align-items: center;

      a {
        color: #FFF;
        text-decoration: none;

        display: flex;
        justify-content: center;

        svg {
          margin-right: 16px;
        }
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      background: #bc1819;
      height: 30px;
      border-radius: 5px;
      border: 0;
      padding: 0 5px;
      color: #FFF;
      width: 100px;
      font-weight: 500;
      transition: filter 0.2s;


      svg{
        margin-right: 5px;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

`;

export const Grid = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin: 4px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const ContactsContainer = styled.div`
  padding-top: 16px;

  hr {
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    text-align: center;
    padding: 32px 0;
  }
`;

export const ContactsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  h2 {
    font-size: 20px;
  }

  button {
    background: #FF9000;
    height: 30px;
    border-radius: 5px;
    border: 0;
    padding: 0 5px;
    color: #312E38;
    width: 100px;
    font-weight: 500;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    &.clear {
      margin-right: 8px;
      width: 150px;
      background: #FFF;
    }
  }
`;
