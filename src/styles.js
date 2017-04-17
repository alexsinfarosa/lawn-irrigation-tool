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
  justify-content: space-between;
  align-items: flex-end;
`;

export const Below = styled.div`
  background-color: #1E88E5;
  padding: .5em;
  border-radius: 5px;
  color: #111;
  font-size: .8em;
`;
export const SlightlyBelow = styled.div`
  background-color: #FDD835;
  padding: .5em;
  border-radius: 5px;
  color: #111;
  font-size: .8em;
`;
export const SlightlyAbove = styled.div`
  background-color: #FFB300;
  padding: .5em;
  border-radius: 5px;
  color: #111;
  font-size: .8em;
`;
export const Above = styled.div`
  background-color: #E53935;
  padding: .5em;
  border-radius: 5px;
  color: #111;
  font-size: .8em;
`;
export const NotObserved = styled.div`
  background-color: #757575;
  padding: .5em;
  border-radius: 5px;
  color: #111;
  font-size: .8em;
`;
