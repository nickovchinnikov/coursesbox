import { FC, ChangeEvent } from "react";
import styled from "@emotion/styled";

import { boxShadow, transition } from "@/components/styles";
import { useId } from "@/components/hooks/useId";

const Wrapper = styled.label`
  & input {
    display: none;
  }
  & input:checked {
    & ~ label {
      background: ${({ theme }) => theme.components.primary};
      &::after {
        margin-left: 3.5rem;
        background: ${({ theme }) => theme.components.active};
        ${transition()};
      }
    }
  }
`;

const VisiblePart = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  width: 6rem;
  border-radius: 1.6rem;
  background: ${({ theme }) => theme.components.background};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
  &::after {
    content: "";
    margin-left: 0.5rem;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.components.nonActive};
    ${transition()};
  }
`;

type Props = {
  /** onChange callback */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Switch: FC<Props> = ({ onChange }) => {
  const fieldId = useId();
  return (
    <Wrapper>
      <input id={fieldId} type="checkbox" onChange={onChange} />
      <VisiblePart htmlFor={fieldId} data-testid="SwitchVisiblePart" />
    </Wrapper>
  );
};
