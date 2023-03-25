import { Modal } from 'react-native';
import { isWeb } from '../../utils/isWeb';
import { Close } from '../Icons/Close';
import { SvgToWeb } from '../Icons/SvgToWeb/SvgToWeb';
import { Text } from '../Text';
import { Overlay, ModalBody, ModalHeader, ModalButton, ModalForm, ModalInput } from './styles';

import { isAndroid } from '../../utils/isAndroid';

import CloseWeb from '../../assets/images/CloseWeb.svg';
import { Button } from '../Button';
import { useState } from 'react';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>

            <Text weight={600}>Informe a mesa</Text>

            <ModalButton onPress={onClose}>
              { isWeb
                ? <SvgToWeb>{CloseWeb}</SvgToWeb>
                : <Close color='#666'/>
              }
            </ModalButton>

          </ModalHeader>

          <ModalForm>
            <ModalInput
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button
              disabled={table.length === 0}
              color='#fff'
              onPress={handleSave}
            >
              Salvar
            </Button>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
