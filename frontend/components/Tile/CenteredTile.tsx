import { FC, ReactChild } from "react";
import styled from "@emotion/styled";

import { Tile } from "./Tile";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTile = styled(Tile)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

type Props = {
  /** Header string */
  header: ReactChild;
};

export const CenteredTile: FC<Props> = ({ children, header, ...rest }) => (
  <Wrapper {...rest}>
    <StyledTile header={header}>{children}</StyledTile>
  </Wrapper>
);
