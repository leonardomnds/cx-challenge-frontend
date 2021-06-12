import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  table {
    width: 100%;
    border-spacing: 0px;

    th {
      color: #FFF;
      font-size: 16px;
      font-weight: 500;
      padding: 10px 5px;
      line-height: 1.5rem;
    }

    td {
      padding: 5px;
      color: #FFF;

      button {
        padding: 2px;
        width: 26px;
        border: 0;
        background: transparent;

        & + button {
          margin-left: 4px;
        }

        svg {
          color: #FFF;
        }
      }
    }

    th, td {

      &.center {
        text-align: center;
      }

      &.left {
        text-align: left;
      }

      &.right {
        text-align: right;
      }
    }

    tr.diff {
      background-color: #232129;
    }

  }
`;
