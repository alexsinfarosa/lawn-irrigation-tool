import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  ${/* background-color: lightgreen; */ ""}
`;

export const MyApp = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  width: 915px;
  min-height: 650px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 20px;
  ${/* background-color: green; */ ""}
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: stretch;
  align-items: stretch;
  ${/* align-items: stretch; */ ""}
  ${/* overflow-y: auto */ ""}
  ${/* background-color: orange; */ ""}
`;
