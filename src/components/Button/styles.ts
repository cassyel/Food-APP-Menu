import styled from 'styled-components/native';

export const Container = styled.Pressable<{
    disabled: boolean | undefined;alignBottom: boolean | undefined
  }>`
  background: ${({ disabled }) => disabled ? '#999' : '#d73035'};
  margin-top: ${({ alignBottom }) => alignBottom ? 'auto' : '0'}; ;
  border-radius: 48px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
`;
