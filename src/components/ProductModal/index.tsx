import { FlatList, Modal, SafeAreaView, ScrollView } from 'react-native';
import { Product } from '../../@types/Product';
import { isWeb } from '../../utils/isWeb';
import { Close } from '../Icons/Close';
import { SvgToWeb } from '../Icons/SvgToWeb/SvgToWeb';
import { Text } from '../Text';
import {
  Image,
  CloseButton,
  ModalBody,
  Header,
  IngredientsContainer,
  Ingredient,
  FooterContainer,
  PriceContainer
} from './styles';

import CloseWeb from '../../assets/images/CloseWebWhite.svg';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <Image
          source={{
            uri: `${process.env.API_BASE_IMAGES}${product.imagePath}`
          }}
        >
          <CloseButton onPress={onClose}>
            { isWeb
              ? <SvgToWeb width={32} height={32}>{CloseWeb}</SvgToWeb>
              : <Close color='#fff'/>
            }
          </CloseButton>
        </Image>

        <ModalBody>
          <Header>
            <Text weight={600} size={24}>{product.name}</Text>
            <Text color='#666' style={{ marginTop: 8 }}>
              {product.description}
            </Text>
          </Header>

          {product.ingredients.length > 0 && (
            <IngredientsContainer>
              <Text weight={600} color="#666">Ingredientes</Text>

              <FlatList
                data={product.ingredients}
                keyExtractor={ingredient => ingredient._id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item: ingredient }) => (
                  <Ingredient>
                    <Text>{ingredient.icon}</Text>
                    <Text size={14} color="#666">{ingredient.name}</Text>
                  </Ingredient>
                )}
                style={{ marginTop: 16 }}
              />

            </IngredientsContainer>
          )}
        </ModalBody>
      </ScrollView>

      <FooterContainer>
        <PriceContainer>
          <Text color='#666'>Preço</Text>
          <Text size={20} weight={600}>
            {formatCurrency(product.price)}
          </Text>
        </PriceContainer>

        <Button onPress={() => alert('Adicionar ao pedido')} color={'#fff'}>
            Adicionar ao pedido
        </Button>
      </FooterContainer>

      <SafeAreaView
        style={{ backgroundColor: '#fff' }}
      />
    </Modal>
  );
}
