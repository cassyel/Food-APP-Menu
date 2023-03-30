import { FlatList, Pressable } from 'react-native';
import { CartItem } from '../../@types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { isWeb } from '../../utils/isWeb';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { SvgToWeb } from '../Icons/SvgToWeb/SvgToWeb';
import { Text } from '../Text';
import {
  ItemContainer,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Actions,
  Summary,
  TotalContainer,
} from './styles';
import AddToCartButtonWeb from '../../assets/images/AddToCartWeb.svg';
import MinusCircleWeb from '../../assets/images/MinusCircleWeb.svg';
import { Fragment, useState } from 'react';
import { Button } from '../Button';
import { Product } from '../../@types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

import { api } from '../../utils/api';

interface CartProps {
  cartItems: CartItem[];
  selectedTable: string
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmedOrder: () => void;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmedOrder,
  selectedTable: tableNumber,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmedOrder() {
    setIsLoading(true);
    const response = await api.post('/orders', {
      table: tableNumber.length < 2 ? '0'.concat(tableNumber) : tableNumber,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });

    console.log(' -----------------------------------------------------------');
    console.log('handleConfirmedOrder  \n response:', response.data);
    console.log('handleConfirmedOrder  \n response:', response.status);
    console.log(' -----------------------------------------------------------');

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmedOrder();
    setIsModalVisible(false);
  }

  return (
    <Fragment>
      <OrderConfirmedModal
        onClose={handleOk}
        visible={isModalVisible}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 140 }}
          renderItem={({ item: { product, quantity } }) => (
            <ItemContainer>
              <ProductContainer>
                <Image source={{
                  uri: `${process.env.API_IMAGES}/${product.imagePath}`
                }} />

                <QuantityContainer>
                  <Text size={14} color="#666">{quantity}x</Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight={600}>{product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <Pressable onPress={() => onAdd(product)}>
                  { isWeb
                    ? <SvgToWeb>{AddToCartButtonWeb}</SvgToWeb>
                    : <PlusCircle />
                  }
                </Pressable>
                <Pressable onPress={() => onDecrement(product)}>
                  { isWeb
                    ? <SvgToWeb>{MinusCircleWeb}</SvgToWeb>
                    : <MinusCircle />
                  }
                </Pressable>
              </Actions>
            </ItemContainer>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <Fragment>
              <Text color='#666'>Total</Text>
              <Text size={20} weight={600}>{formatCurrency(total)}</Text>
            </Fragment>
          ) : (
            <Text color='#666'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmedOrder}
          color="#fff"
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </Fragment>
  );
}
