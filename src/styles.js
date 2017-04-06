import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const MyApp = styled.div`
  display: flex;
  ${/* background-color: pink; */ ""}
`;

export const Top = styled.div`
  ${/* background-color: pink; */ ""}
  text-align: center;
  font-size: 1.1em;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 10px;
  ${/* background-color: aqua; */ ""}
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  ${/* background-color: lightgreen */ ""}
`;

export const Bottom = styled.div`
  ${/* background-color: lightgreen; */ ""}
  text-align: center;
`;
