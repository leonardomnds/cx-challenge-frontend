import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiArrowLeft, FiUser, FiMail, FiLock,
} from 'react-icons/fi';
import validator from 'validator';
import api from '../../services/ApiService';

import { useToast } from '../../hooks/Toast';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Content, AnimationContainer, Background,
} from './styles';

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = useCallback(async () => {
    try {
      if (!name.trim()) {
        addToast({
          type: 'warning',
          title: 'Atenção',
          description: 'O nome é um campo obrigatório.',
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
      } else if (password.length < 6) {
        addToast({
          type: 'warning',
          title: 'Atenção',
          description: 'A senha deve ter pelo menos 6 dígitos.',
        });
      } else {
        const response = await api.post('/users', { name: name.trim(), email: email.trim(), password });

        if (response.data.error) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: response.data.message,
          });
          return;
        }

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu login no sistema!',
        });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  }, [addToast, history, name, email, password]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="customerx" />
          <div>
            <h1>Faça seu cadastro</h1>

            <Input
              value={name}
              setValue={setName}
              placeholder="Nome"
              icon={FiUser}
            />
            <Input
              value={email}
              setValue={setEmail}
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button
              type="button"
              onClick={handleSave}
            >
              Cadastrar
            </Button>
          </div>

          <Link to="/">
            <FiArrowLeft />
            Já tem uma conta? Faça login aqui.
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
