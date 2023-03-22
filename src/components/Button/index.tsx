import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps  {
  color: string;
  alignBottom?: boolean
  children: string;
  disabled?: boolean;
  onPress: () => void;
}

export function Button({
  alignBottom,
  color,
  children,
  onPress,
  disabled
}: ButtonProps) {
  return (
    <Container disabled={disabled} alignBottom={alignBottom} onPress={onPress}>
      <Text weight={600} color={color}>{children}</Text>
    </Container>
  );
}
