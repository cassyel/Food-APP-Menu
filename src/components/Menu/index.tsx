import { Fragment, useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { isWeb } from '../../utils/isWeb';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { SvgToWeb } from '../Icons/SvgToWeb/SvgToWeb';
import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles';
import { ProductModal } from '../ProductModal';

import AddToCartButtonWeb from '../../assets/images/AddToCartWeb.svg';

import { Product } from '../../types/Product';


export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <Fragment>
      <ProductModal
        visible={isModalVisible}
        onClose={()  => setIsModalVisible(false)}
        product={selectedProduct}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage source={{
              uri: `https://food-app-6n6r.onrender.com/uploads/images/${product.imagePath}`
            }} />

            <ProductDetails>
              <Text weight={600}>{product.name}</Text>
              <Text color='#666666' size={14} style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text weight={600} size={14}>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton>
              { isWeb
                ? <SvgToWeb>{AddToCartButtonWeb}</SvgToWeb>
                : <PlusCircle />
              }
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </Fragment>
  );
}
