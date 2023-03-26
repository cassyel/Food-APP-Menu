import React, { useState, Fragment } from 'react';
import { SafeAreaView } from 'react-native';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories/';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal/';
import { Cart } from '../components/Cart';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  FooterContainer,
}from './styles';

import { CartItem } from '../@types/CartItem';
import { Product } from '../@types/Product';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCarItems] = useState<CartItem[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCarItems([]);
  }


  function handleAddToCart(product: Product) {
    if (!selectedTable) setIsTableModalVisible(true);

    setCarItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCarItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;

    });
  }

  return (
    <Fragment>

      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
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

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmedOrder={handleResetOrder}
            />
          )}
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
