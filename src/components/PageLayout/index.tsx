import React from 'react';

import { Container } from './styles';
import Header from '../Header';

interface PageLayoutProps {
  children: React.ReactNode
  btnLabel?: string;
  btnOnClick?: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  btnLabel,
  btnOnClick,
}: PageLayoutProps) => (
  <>
    <Header
      btnLabel={btnLabel}
      btnOnClick={btnOnClick}
    />
    <Container>
      {children}
    </Container>
  </>
);

export default PageLayout;
