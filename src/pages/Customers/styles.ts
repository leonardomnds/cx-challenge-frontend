import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 50px;

  h2 {
    color: #FFF;
    margin: 20px 0;
    font-size: 26px;
    text-transform: capitalize;
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
