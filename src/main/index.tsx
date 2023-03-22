import {
  Container,
  CategoriesContainer,
  MenuContainer,
  FooterContainer,
}from './styles';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories/';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';

export function Main() {
  return (
    <Fragment>

      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

        <FooterContainer>
          <Button
            color='#fff'
            alignBottom
            onPress={() => alert('Novo Pedido')}>
            Novo Pedido
          </Button>
        </FooterContainer>
      </Container>

      <SafeAreaView
        style={{ backgroundColor: '#fff' }}
      />
    </Fragment>
  );
}
