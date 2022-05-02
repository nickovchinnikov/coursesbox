import styled from "@emotion/styled";

export type Props = {
  underline?: boolean;
};

export const StyledLink = styled.a<Props>`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.font.regular};
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  &:hover {
    opacity: 0.7;
  }
`;
