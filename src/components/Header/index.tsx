import React from 'react';
import logoImg from '../../assets/logo.png';

import { Container, Content } from './styles';

const Header: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="dt money" />
      <button type="button">
        Novo Cliente
      </button>
    </Content>
  </Container>
);

export default Header;
