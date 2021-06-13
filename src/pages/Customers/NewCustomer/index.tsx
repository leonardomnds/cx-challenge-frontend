import React, { useState, useEffect, useCallback } from 'react';
import {
  FiArrowLeft, FiUser, FiMail, FiPhone, FiCalendar,
} from 'react-icons/fi';
import {
  MdDelete,
} from 'react-icons/md';
import { Link, useParams, useHistory } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { AxiosResponse } from 'axios';
import { uuid } from 'uuidv4';
import validator from 'validator';
import PageLayout from '../../../components/PageLayout';
import { useToast } from '../../../hooks/Toast';
import api from '../../../services/ApiService';
import Input from '../../../components/Input';
import Table from '../../../components/Table';
import ConfirmModal from '../../../components/ConfirmModal';

import {
  Container, Grid, ContactsContainer, ContactsHeader,
} from './styles';
import {
  phoneFormat, dateFormat, isValidDate, onlyNumbers,
} from '../../../utils/functions';
import { Contact } from '../../../interfaces/Contact';

const NewCustomer: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { addToast } = useToast();
  const history = useHistory();

  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [indexDeleteContact, setIndexDeleteContact] = useState<number>(-1);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');

  // Contatos
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [putContacts, setPutContacts] = useState<string[]>([]);
  const [delContacts, setDelContacts] = useState<string[]>([]);

  const [contactId, setContactId] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  const formatPhone = (value: string) => setPhone(phoneFormat(value));
  const formatContactPhone = (value: string) => setContactPhone(phoneFormat(value));
  const formatDate = (value: string) => setCreatedAt(dateFormat(value));

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O nome é um campo obrigatório.',
      });
    } else if (!!createdAt.trim() && !isValidDate(createdAt.trim())) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'A data informada é inválida.',
      });
    } else if (!email.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O e-mail é um campo obrigatório.',
      });
    } else if (!validator.isEmail(email.trim())) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O e-mail informado é inválido.',
      });
    } else if (!phone.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O telefone é um campo obrigatório.',
      });
    } else {
      const json = {
        name: name.trim(),
        email: email.trim(),
        phone: onlyNumbers(phone.trim()),
        createdAt: parse(createdAt, 'dd/MM/yyyy', new Date()) || new Date(),
      };

      let response: AxiosResponse;

      if (!customerId) {
        response = await api.post('/customers', json);
      } else {
        response = await api.put(`/customers/${customerId}`, json);
      }

      if (response.data.error) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar o cliente',
          description: response.data.reason || response.data.message || '',
        });
      } else {
        const conPost = contacts.filter((c) => c.id.startsWith('new-')).map(async (c) => {
          await api.post(`/customers/${response.data.id}/contacts`, {
            name: c.name.trim(),
            email: c.email.trim(),
            phone: onlyNumbers(c.phone.trim()),
          });
        });

        const conPut = putContacts.filter((id) => !id.startsWith('new-')).map(async (id) => {
          const contact = contacts.find((c) => c.id === id);

          if (!!contact) {
            await api.put(`/customers/${response.data.id}/contacts/${id}`, {
              name: contact.name.trim(),
              email: contact.email.trim(),
              phone: onlyNumbers(contact.phone.trim()),
            });
          }
        });

        const conDel = delContacts.filter((id) => !id.startsWith('new-')).map(async (id) => {
          await api.delete(`/customers/${response.data.id}/contacts/${id}`);
        });

        await Promise.all([...conPost, ...conPut, ...conDel]);

        addToast({
          type: 'success',
          title: 'Cadastro salvo com sucesso.',
        });
        history.push('/customers');
      }
    }
  }, [name, email, phone, createdAt, addToast, customerId,
    history, contacts, delContacts, putContacts]);

  const handleDelete = useCallback(async () => {
    api.delete(`/customers/${customerId}`).then(() => {
      addToast({
        type: 'success',
        title: 'Cliente excluído com sucesso',
      });
      history.push('/customers');
    }).catch(() => {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao eliminar o cliente',
      });
    });
  }, [addToast, history, customerId]);

  const clearContact = useCallback(() => {
    setContactId('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
  }, []);

  const handleNewContact = useCallback(() => {
    clearContact();
    setContactId(`new-${uuid()}`);
  }, [clearContact]);

  const handleSaveContact = useCallback(() => {
    if (!contactName.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O nome do contato é um campo obrigatório.',
      });
    } else if (!contactEmail.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O e-mail do contato é um campo obrigatório.',
      });
    } else if (!validator.isEmail(contactEmail.trim())) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O e-mail informado é inválido.',
      });
    } else if (!contactPhone.trim()) {
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'O telefone do contato é um campo obrigatório.',
      });
    } else {
      const savedContact: Contact = {
        id: contactId,
        customerId: customerId || '',
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
      };

      setContacts([...contacts.filter((c) => c.id !== savedContact.id), savedContact]);
      setPutContacts([...putContacts.filter((id) => id !== savedContact.id), savedContact.id]);

      clearContact();
    }
  }, [contactId, contactName, contactEmail, contactPhone,
    contacts, customerId, putContacts, clearContact, addToast]);

  const handleEditContact = useCallback((listIndex: number) => {
    const edit = contacts[listIndex];
    setContactId(edit.id);
    setContactName(edit.name);
    setContactEmail(edit.email);
    formatContactPhone(edit.phone);
  }, [contacts]);

  const handleDeleteContact = useCallback((listIndex: number) => {
    const deleting = contacts[listIndex];
    setContacts([...contacts.filter((c) => c.id !== deleting.id)]);
    if (!deleting.id.startsWith('new-')) {
      setDelContacts([...delContacts, deleting.id]);
    }
  }, [contacts, delContacts]);

  const getContactContainer = useCallback(() => {
    if (!!contactId) {
      return (
        <div>
          <Grid>
            <Input
              value={contactName}
              setValue={setContactName}
              icon={FiUser}
              placeholder="Nome do contato"
            />
          </Grid>
          <Grid>
            <Input
              value={contactEmail}
              setValue={setContactEmail}
              icon={FiMail}
              placeholder="E-mail do contato"
            />
            <Input
              value={contactPhone}
              setValue={formatContactPhone}
              icon={FiPhone}
              placeholder="Telefone do contato"
            />
          </Grid>
        </div>
      );
    }
    if (contacts.length === 0) {
      return (<p>Não há contatos para exibir</p>);
    }
    return (
      <Table
        onEdit={handleEditContact}
        onDelete={(value: number) => {
          setIndexDeleteContact(value);
          setContactModalOpen(true);
        }}
        tableRows={contacts}
        tableColumns={[
          {
            id: 'name',
            name: 'Nome',
          },
          {
            id: 'email',
            name: 'E-mail',
          },
          {
            id: 'phone',
            name: 'Telefone',
            align: 'center',
            format: phoneFormat,
          },
        ]}
      />
    );
  }, [contactId, contacts, handleEditContact,
    setIndexDeleteContact, contactEmail, contactName, contactPhone]);

  useEffect(() => {
    if (!!customerId) {
      (async () => {
        try {
          api.get(`/customers/${customerId}`).then((response) => {
            const { data } = response;

            if (!!data && !data.error) {
              setName(data.name);
              setEmail(data.email);
              formatPhone(data.phone);
              formatDate(format(new Date(data.createdAt), 'dd/MM/yyyy'));

              api.get(`/customers/${customerId}/contacts`).then((res) => {
                if (!!res.data && !res.data.error) {
                  setContacts(res.data);
                }
              });
            }
          });
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Cliente não localizado',
          });
          history.push('/customers');
        }
      })();
    }
  }, [customerId, addToast, history]);

  return (

    <PageLayout
      btnLabel="Salvar"
      btnOnClick={handleSave}
    >
      <Container>

        <header>
          <h2>
            <Link to="/customers">
              <FiArrowLeft />
            </Link>
            {`${customerId ? 'Alterando' : 'Novo'} Cliente`}
          </h2>
          {!!customerId && (
          <button
            type="button"
            onClick={() => setCustomerModalOpen(true)}
          >
            <MdDelete />
            Excluir
          </button>
          )}
        </header>

        <div>
          <Grid>
            <Input
              value={name}
              setValue={setName}
              icon={FiUser}
              placeholder="Nome"
            />
            <Input
              value={createdAt}
              setValue={formatDate}
              icon={FiCalendar}
              placeholder="Data de Cadastro"
            />
          </Grid>
          <Grid>
            <Input
              value={email}
              setValue={setEmail}
              icon={FiMail}
              placeholder="E-mail principal"
            />
            <Input
              value={phone}
              setValue={formatPhone}
              icon={FiPhone}
              placeholder="Telefone principal"
            />
          </Grid>
        </div>

        <ContactsContainer>
          <ContactsHeader>
            <h2>
              Contatos
            </h2>
            <div>
              {!!contactId && (
                <button
                  type="button"
                  className="clear"
                  onClick={clearContact}
                >
                  Limpar Campos
                </button>
              )}
              <button
                type="button"
                onClick={!!contactId ? handleSaveContact : handleNewContact}
              >
                {!!contactId ? 'Salvar' : 'Novo'}
              </button>
            </div>
          </ContactsHeader>
          <hr />

          {getContactContainer()}

        </ContactsContainer>

      </Container>

      <ConfirmModal
        isOpen={isCustomerModalOpen}
        message="Tem certeza que deseja excluir este cliente e todos os seus contatos?"
        onCancel={() => setCustomerModalOpen(false)}
        onConfirm={() => {
          setCustomerModalOpen(false);
          handleDelete();
        }}
      />
      <ConfirmModal
        isOpen={isContactModalOpen}
        message="Tem certeza que deseja excluir este contato?"
        onCancel={() => {
          setContactModalOpen(false);
          setIndexDeleteContact(-1);
        }}
        onConfirm={() => {
          setContactModalOpen(false);
          handleDeleteContact(indexDeleteContact);
          setIndexDeleteContact(-1);
        }}
      />

    </PageLayout>

  );
};

export default NewCustomer;
