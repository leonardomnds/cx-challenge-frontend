import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    color: var(--title);
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  p {
    line-height: 1.5;
  }

  > div {

    display: flex;
    justify-content: flex-end;

    margin-top: 32px;

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
  }
`;
