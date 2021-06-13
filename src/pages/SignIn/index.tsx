import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Content, AnimationContainer, Background,
} from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      if (!email.trim() || !password.trim()) {
        addToast({
          type: 'warning',
          title: 'Dados incompletos',
          description: 'Preencha e-mail e senha para continuar.',
        });
      } else {
        await signIn({ email, password });
        history.push('/customers');
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login! Verifique suas credenciais.',
      });
    }
  }, [signIn, addToast, history, email, password]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="customerx" />
          <div>
            <h1>Faça seu Login</h1>

            <Input
              value={email}
              setValue={setEmail}
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              value={password}
              setValue={setPassword}
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button
              type="button"
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </div>

          <Link to="/signup">
            <FiLogIn />
            Não tem uma conta? Crie aqui.
          </Link>

        </AnimationContainer>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
