import { FC } from "react";
import styled from "@emotion/styled";

import { boxShadow, borderRadius } from "@/components/styles";

const Section = styled.section`
  ${borderRadius};
  padding: 1vmin 4vmin 4vmin;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)}
`;

type Props = {
  header: string;
};

export const Tile: FC<Props> = ({ header, children }) => (
  <Section>
    <h2>{header}</h2>
    {children}
  </Section>
);
