import { Modal } from 'react-native';
import { isWeb } from '../../utils/isWeb';
import { CheckCircle } from '../Icons/CheckCircle';
import { SvgToWeb } from '../Icons/SvgToWeb/SvgToWeb';
import { Container, OkButton } from './style';

import CheckCircleWeb from '../../assets/images/CheckCircleWeb.svg';
import { Text } from '../Text';
import { StatusBar } from 'expo-status-bar';

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({ visible, onClose }:
  OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <StatusBar style='light' />
      <Container>
        { isWeb
          ? <SvgToWeb width={18} height={18}>{CheckCircleWeb}</SvgToWeb>
          : <CheckCircle />
        }
        <Text
          size={20}
          weight={600}
          color="#fff"
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          Pedido Confirmado
        </Text>
        <Text color="#fff" opacity={0.9}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onClose}>
          <Text color='#D73035' weight={600}>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
