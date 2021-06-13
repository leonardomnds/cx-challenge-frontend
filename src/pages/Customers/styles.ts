import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 50px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: #FFF;
      margin: 20px 0;
      font-size: 26px;
      text-transform: capitalize;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 4px 12px;
      background: #FFF;
      height: 40px;
      width: 130px;
      border-radius: 5px;
      border: 0;
      padding: 0 5px;
      color: #312E38;
      font-weight: 500;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      &:disabled {
        cursor: not-allowed;
      }

      svg {
        margin-right: 8px;
      }

    }

  }

  a {
    color: #FFF;
    background: #232129;
    border-radius: 5px;
    width: 100%;
    padding: 12px 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

  }
`;

export const LeftSection = styled.div`

  p {
    font-size: 22px;
    margin-bottom: 12px;
  }

  span {
    display: block;

    strong {
      font-weight: 500;
      display: block;
    }

  }

  span + span {
    margin-top: 12px;
  }

`;

export const RightSection = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 500;
  }

`;
