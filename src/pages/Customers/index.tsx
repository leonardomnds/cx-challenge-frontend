import React, { useState, useEffect, useCallback } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import PageLayout from '../../components/PageLayout';
import { useToast } from '../../hooks/Toast';
import api from '../../services/ApiService';

import { Container, LeftSection, RightSection } from './styles';

import { Customer as CustomerType } from '../../interfaces/Customer';
import { convertBlobToFile, phoneFormat } from '../../utils/functions';

const CustomerPage: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const handleNewClient = useCallback(() => {
    history.push('/customers/new');
  }, [history]);

  const handleViewReport = useCallback(async () => {
    setGeneratingPdf(true);
    api.get('/reports/customers', { responseType: 'blob' }).then((response) => {
      if (response.status === 200) {
        const file = convertBlobToFile(response.data, `Relatório-${Date.now()}.pdf`);
        const win = window.open(URL.createObjectURL(file), '_blank');
        if (win) win.focus();
      }
    });
    setGeneratingPdf(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        api.get('/customers').then((response) => setCustomers(response.data));
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao consultar os clientes',
        });
      }
    })();
  }, [addToast, setCustomers]);

  return (
    <PageLayout
      btnLabel="Novo Cliente"
      btnOnClick={handleNewClient}
    >
      <Container>

        <div>
          <h2>Relação de Clientes</h2>
          {customers.length > 0 && (
          <button
            type="button"
            disabled={generatingPdf}
            onClick={handleViewReport}
          >
            <FiPrinter size={24} />
            Imprimir
          </button>
          )}
        </div>

        {customers.map((c) => (
          <Link key={c.id} to={`/customers/edit/${c.id}`}>

            <LeftSection>
              <p>{c.name}</p>
              <span>
                <strong>E-mail:</strong>
                {c.email}
              </span>
              <span>
                <strong>Telefone:</strong>
                {phoneFormat(c.phone)}
              </span>
            </LeftSection>

            <RightSection>
              <span>Cadastro</span>
              <p>{format(new Date(c.createdAt), 'dd/MM/yyyy')}</p>
            </RightSection>

          </Link>
        ))}
      </Container>
    </PageLayout>
  );
};

export default CustomerPage;
