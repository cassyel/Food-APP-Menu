import { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <Fragment>
          <Text size={14} opacity={.9}>Bem-vindo(a) ao</Text>
          <Text size={24} weight={700}>
            FOOD
            <Text size={24}>APP</Text>
          </Text>
        </Fragment>
      )}

      {selectedTable && (
        <Content>

          <OrderHeader>
            <Text size={24} weight={600}>Pedido</Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color='#D73035' weight={600} size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color='#666666'>Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
