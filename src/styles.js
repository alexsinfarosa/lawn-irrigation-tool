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
  height: 520px;
  width: 820px;
`;

export const Top = styled.div`
  ${/* background-color: pink; */ ""}
  text-align: center;
  font-size: 1.1em;
  margin-bottom: 20px;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 220px;
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
  display: flex;
  ${/* justify-content: space-between; */ ""}
  align-items: flex-end;
  width: 480px;
  margin-top: 10px;
`;

export const Below = styled.div`
  background-color: #108EE9;
  padding: .5em;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: white;
  font-size: .7em;
  flex: 1;
  font-weight: bold;
`;
export const SlightlyBelow = styled.div`
  background-color: #00A854;
  padding: .5em;
  border-radius: 0px;
  color: white;
  font-size: .7em;
  flex: 1;
  font-weight: bold;
`;
export const SlightlyAbove = styled.div`
  background-color: #FFBF00;
  padding: .5em;
  border-radius: 0px;
  color: white;
  font-size: .7em;
  flex: 1;
  font-weight: bold;
`;
export const Above = styled.div`
  background-color: #F04134;
  padding: .5em;
  border-radius: 0px;
  color: white;
  font-size: .7em;
  flex: 1;
  font-weight: bold;
`;
export const NotObserved = styled.div`
  background-color: #9E9E9E;
  padding: .5em;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
  font-size: .7em;
  flex: 1;
  font-weight: bold;
`;
