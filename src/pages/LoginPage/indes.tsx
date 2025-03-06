import React, { useContext, useEffect, useState } from 'react';
import { FaFacebook, FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

import {
  Container,
  FormContainer,
  Title,
  Input,
  Button,
  ErrorMessage,
  SocialColumn,
  FormColumn,
  ColumnContainer,
  CircleDivider,
  SocialButton,
} from './styles';

const LoginPage: React.FC = () => {
  const { user, signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithApple, logout } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) setErrorMessage('');
  }, [email, password]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Preencha todos os campos para continuar!');
      return;
    }

    setIsLoading(true);
    setEmail('');
    setPassword('');

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Container theme={useTheme()}>
      <ColumnContainer>
        <Title>Edu Gestor</Title>

        {user ? (
          <div style={{ textAlign: "center" }}>
            <img src={user.avatar} alt="User Avatar" style={{ width: "80px", borderRadius: "50%" }} />
            <p>Bem-vindo, {user.username}!</p>
            <Button onClick={logout}>Sair</Button>
          </div>
        ) : (
          <>
            <FormColumn>
              <FormContainer onSubmit={handleEmailLogin}>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  aria-label="Email"
                  required
                />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  aria-label="Senha"
                  required
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </FormContainer>

              <CircleDivider>OU</CircleDivider>

              <SocialColumn>
                <SocialButton onClick={signInWithGoogle}>
                  <FaGoogle size={24} color='#DB4437' /> Entrar com Google
                </SocialButton>
                <SocialButton onClick={signInWithGithub}>
                  <FaGithub size={24} color='#333' /> Entrar com GitHub
                </SocialButton>
                <SocialButton onClick={signInWithFacebook}>
                  <FaFacebook size={24} color='#4267B2' /> Entrar com Facebook
                </SocialButton>
                <SocialButton onClick={signInWithApple}>
                  <FaApple size={24} color='#000' /> Entrar com Apple
                </SocialButton>
              </SocialColumn>
            </FormColumn>
          </>
        )}
      </ColumnContainer>
    </Container>
  );
};

export default LoginPage;
