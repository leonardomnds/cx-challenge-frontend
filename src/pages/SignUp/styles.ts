import styled, { keyframes } from 'styled-components';

import signUpBackground from '../../assets/signup-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 340px;
  }

  > div {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    > div {
      margin-top: 8px;
    }

  }

  > a {
    color: #F4EDE8;
      display: flex;
      align-items: center;
      margin-top: 24px;
      text-decoration: none;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      svg {
        margin-right: 16px;
      }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
