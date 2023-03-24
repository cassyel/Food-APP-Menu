import React, { useState } from 'react';
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
import { TableModal } from '../components/TableModal/';



import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }
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
          {
            !selectedTable && (
              <Button
                color='#fff'
                alignBottom
                onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
              </Button>
            )
          }
        </FooterContainer>
      </Container>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />

      <SafeAreaView
        style={{ backgroundColor: '#fff' }}
      />
    </Fragment>
  );
}
