import styled from "styled-components";

export const Selector = styled.div`
  display: flex;
  flex-direction: column;
  ${/* background-color: orange; */ ""}
`;

export const Select = styled.select`
  ${/* appearance: none; */ ""}
  margin-top: 5px;
  font-size: 12px;
  border-radius: 3px;
  background: white !important;
  border: 1px solid #CECECE;

  &:focus {
    outline: none;
  }
`;
