import { FlatList, TouchableOpacity } from 'react-native';
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

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmedOrder: () => void;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmedOrder }:
   CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmedOrder() {
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
                  uri: `${process.env.API_IMAGES}${product.imagePath}`
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
                <TouchableOpacity onPress={() => onAdd(product)}>
                  { isWeb
                    ? <SvgToWeb>{AddToCartButtonWeb}</SvgToWeb>
                    : <PlusCircle />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(product)}>
                  { isWeb
                    ? <SvgToWeb>{MinusCircleWeb}</SvgToWeb>
                    : <MinusCircle />
                  }
                </TouchableOpacity>
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
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </Fragment>
  );
}
