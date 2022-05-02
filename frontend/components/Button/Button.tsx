import { FC, MouseEvent } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";

import { AppTheme } from "@/styles/themes";
import { boxShadow, transition, borderRadius } from "@/components/styles";

export type Color = "primary" | "secondary" | "danger" | "warning";

export type Props = {
  /** Text in the button */
  children: string;
  /** Button color */
  color?: Color;
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const getColors = (theme: AppTheme, color?: Color): SerializedStyles => {
  switch (color) {
    case "secondary":
      return css`
        color: ${theme.font.regular};
      `;
    case "primary":
    case "danger":
      return css`
        background: ${theme.components[color]};
        color: ${theme.font.button};
      `;
    case "warning":
      return css`
        background: ${theme.components[color]};
        color: ${theme.font.warning};
      `;
    default:
      return css``;
  }
};

export const Button = styled.button<Props>`
  all: unset;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 1.6rem;
  width: 15rem;
  height: 4rem;
  ${borderRadius};
  ${({ theme, color }) => getColors(theme, color)};
  &:hover {
    opacity: 0.9;
  }
  ${transition()}
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)}
  &:active {
    ${({ theme }) =>
      boxShadow(theme.components.shadow1, theme.components.shadow2, true)}
  }
`;

Button.defaultProps = {
  color: "primary",
};

type DefinedButton = Omit<Props, "color">;

export const PrimaryButton: FC<DefinedButton> = (props) => (
  <Button color="primary" {...props} />
);

export const SecondaryButton: FC<DefinedButton> = (props) => (
  <Button color="secondary" {...props} />
);

export const DangerButton: FC<DefinedButton> = (props) => (
  <Button color="danger" {...props} />
);

export const WarningButton: FC<DefinedButton> = (props) => (
  <Button color="warning" {...props} />
);
