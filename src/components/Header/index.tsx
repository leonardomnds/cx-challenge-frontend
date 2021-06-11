import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/Auth';

import { Container, Content } from './styles';

interface HeaderProps {
  btnLabel?: string;
  btnOnClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ btnLabel, btnOnClick }: HeaderProps) => {
  const { signOut } = useAuth();

  const handleSingOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="customerx" />
        <div>

          {btnOnClick && (
            <button type="button" onClick={btnOnClick}>
              { btnLabel }
            </button>
          )}

          <Link onClick={handleSingOut} to="/">
            <FiLogOut />
            Sair
          </Link>

        </div>
      </Content>
    </Container>
  );
};

export default Header;
