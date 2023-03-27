import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps  {
  color: string;
  alignBottom?: boolean
  children: string;
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
}

export function Button({
  alignBottom,
  color,
  children,
  onPress,
  disabled,
  loading
}: ButtonProps) {
  return (
    <Container
      disabled={disabled || loading}
      alignBottom={alignBottom}
      onPress={onPress}>
      { !loading
        ? ( <Text weight={600} color={color}>{children}</Text>)
        : (<ActivityIndicator color="#fff"/>)
      }
    </Container>
  );
}
