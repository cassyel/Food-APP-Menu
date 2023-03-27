import React, { useState, Fragment, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories/';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal/';
import { Cart } from '../components/Cart';
import { Empty } from '../components/Icons/Empty';
import { SvgToWeb } from '../components/Icons/SvgToWeb/SvgToWeb';

import { CartItem } from '../@types/CartItem';
import { Product } from '../@types/Product';
import { ICategory } from '../@types/Category';

import { isWeb } from '../utils/isWeb';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const EmptyToWeb = require('../assets/images/EmptyButton.svg');

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  CenteredContainer,
  FooterContainer,
} from './styles';


export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCarItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.API_BASE}/categories`),
      axios.get(`${process.env.API_BASE}/products`),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

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
    <View style={{ flex: 1 }}>

      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {!isLoading ? (
          <Fragment>
            <CategoriesContainer>
              <Categories categories={categories} />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products}
                />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                { isWeb
                  ? <SvgToWeb width={240} height={178}>{EmptyToWeb}</SvgToWeb>
                  : <Empty />
                }
              </CenteredContainer>
            )}
          </Fragment>
        ) : (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size={'large'} />
          </CenteredContainer>
        )}
      </Container>

      <FooterContainer>
        {
          !selectedTable && (
            <Button
              color='#fff'
              alignBottom
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
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

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />

      <SafeAreaView
        style={{ backgroundColor: '#fff' }}
      />
    </View>
  );
}
