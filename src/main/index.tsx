import React, { useState, Fragment, useEffect } from 'react';
import { ActivityIndicator, Platform, SafeAreaView, View } from 'react-native';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories/';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal/';
import { Cart } from '../components/Cart';
import { Empty } from '../components/Icons/Empty';
import { SvgToWeb } from '../components/Icons/SvgToWeb/SvgToWeb';
import { Text } from '../components/Text';
import { QrCode } from '../components/Icons/QrCode';

import { CartItem } from '../@types/CartItem';
import { Product } from '../@types/Product';
import { ICategory } from '../@types/Category';

import { isWeb } from '../utils/isWeb';
import { api } from '../utils/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const EmptyToWeb = require('../assets/images/EmptyButton.svg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QrCodeToWeb  = require('../assets/images/FoodAPPCustomerMenu.svg');


import {
  Container,
  CategoriesContainer,
  MenuContainer,
  CenteredContainer,
  FooterContainer,
  RedirectContainer
} from './styles';


export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCarItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const renderMenu = /Android|iPhone/i.test(navigator.userAgent)
    || Platform.OS === 'ios'
    || Platform.OS === 'android'
    || Platform.OS === 'windows';

    if (renderMenu) {
      setIsMobile(true);

      Promise.all([
        api.get('/categories'),
        api.get('/products'),

      ]).then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      });

      api.post('/login', {
        name: process.env.AUTHORIZATION_NAME,
        email: process.env.AUTHORIZATION_EMAIL,
        password: process.env.AUTHORIZATION_PASSWORD,
      }).then(({ data }) => {
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      });
    }

    return;

  }, []);

  async function handleSelectCategory(categoriId: string) {
    const route = !categoriId
      ? '/products'
      : `/categories/${categoriId}/products`;


    setIsLoadingProducts(true);
    const response = await api.get(route);
    setProducts(response.data);
    setIsLoadingProducts(false);
  }

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
      { isMobile ? (
        <View style={{ flex: 1 }}>

          <Container>
            <Header
              selectedTable={selectedTable}
              onCancelOrder={handleResetOrder}
            />

            {isLoading ? (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size={'large'} />
              </CenteredContainer>
            ) : (
              <Fragment>
                <CategoriesContainer>
                  <Categories
                    onSelectCategory={handleSelectCategory}
                    categories={categories}
                  />
                </CategoriesContainer>

                { isLoadingProducts ? (
                  <CenteredContainer>
                    <ActivityIndicator color="#D73035" size={'large'} />
                  </CenteredContainer>
                ) : (
                  <Fragment>
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
                          ? <SvgToWeb
                            width={240}
                            height={178}
                          >
                            {EmptyToWeb}
                          </SvgToWeb>
                          : <Empty />
                        }
                      </CenteredContainer>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Container>

          <FooterContainer>
            {!selectedTable ? (
              <Button
                color='#fff'
                alignBottom
                onPress={() => setIsTableModalVisible(true)}
                disabled={isLoading}
                loading={isLoading}
              >
                  Novo Pedido
              </Button>
            ) : (
              <Cart
                cartItems={cartItems}
                onAdd={handleAddToCart}
                onDecrement={handleDecrementCartItem}
                onConfirmedOrder={handleResetOrder}
                selectedTable={selectedTable}
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
      ) : (
        <RedirectContainer>
          <Text size={24} color='#333'>
          Por favor utilize um smartphone para acessar o nosso cardápio
          </Text>
          { isWeb
            ? <SvgToWeb width={300} height={375} >{QrCodeToWeb}</SvgToWeb>
            : <QrCode />
          }
        </RedirectContainer>
      )
      }
    </Fragment>
  );
}
