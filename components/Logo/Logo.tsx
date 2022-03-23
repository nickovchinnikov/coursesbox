import styled from "@emotion/styled";
import { css } from "@emotion/react";

export type Props = {
  /** Logo size in rem */
  size?: number;
};

export const Logo = styled.header<Props>`
  font-family: Monoton;
  font-size: ${({ size = 3 }) => `${size}rem`};
  ${({ theme, size = 3 }) => {
    return css`
      color: ${theme.font.logo};
      text-shadow: 0 0 ${0.1 * size}rem ${theme.font.logoShadow1},
        0 0 ${0.05 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.07 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.08 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.1 * size}rem ${theme.font.logoShadow2};
    `;
  }}
`;
