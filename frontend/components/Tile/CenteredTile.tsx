import { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Tile, Props } from "./Tile";

const CommonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  ${CommonStyles};
`;

const StyledTile = styled(Tile)`
  ${CommonStyles};
  flex-flow: column;
`;

export const CenteredTile: FC<Props> = ({ children, header, ...rest }) => (
  <Wrapper {...rest}>
    <StyledTile header={header}>{children}</StyledTile>
  </Wrapper>
);
