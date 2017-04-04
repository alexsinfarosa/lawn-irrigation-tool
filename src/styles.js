import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
  position: relative;
`;

export const Main = styled(Page)`
  justify-content: center;
  align-items: center;
`;

export const Svg = styled.svg`
  fill: red;
`;
