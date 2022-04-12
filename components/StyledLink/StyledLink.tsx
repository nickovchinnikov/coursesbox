import styled from "@emotion/styled";

export const StyledLink = styled.a`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.font.regular};
  &:hover {
    opacity: 0.9;
  }
`;
