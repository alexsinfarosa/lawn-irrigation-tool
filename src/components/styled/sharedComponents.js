import styled from "styled-components"

export const GridContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 60px auto 80px;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  padding-top: 16px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  padding-top: 16px;
`
