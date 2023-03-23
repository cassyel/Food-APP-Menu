import { Image } from 'react-native';

interface SvgProps {
  children: string;
  width?: number;
  height?: number;
}

export function SvgToWeb({ children: uri, width = 22, height = 24 }: SvgProps) {
  return (
    <Image  source={{ uri, width, height }}/>
  );
}
