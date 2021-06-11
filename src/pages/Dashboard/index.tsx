import React, { useCallback } from 'react';

import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  const handleNewClient = useCallback(() => {
    //
  }, []);

  return (
    <Header
      btnLabel="Novo Cliente"
      btnOnClick={handleNewClient}
    />
  );
};

export default Dashboard;
