import styled, { css } from "styled-components"
import { Link } from "gatsby"

// import pink from "@material-ui/core/colors/pink"
import indigo from "@material-ui/core/colors/indigo"

export const GridContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 60px auto 80px;
  padding-left: 16px;
  padding-right: 16px;
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
export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 24px 80px;
  border: 1px solid ${indigo[300]};
  border-radius: 50px;
  text-transform: uppercase;
  background: #ffffff;
  display: inline-block;
  font-size: 1.1rem;
  font-family: roboto;
  color: ${indigo[300]};
  ::after {
    content: " →";
  }

  :hover {
    color: #fff;
    background: ${indigo[300]};
    transition: all 0.2s ease 0s;
  }
`

export const StyledButton = styled(Link)`
  text-decoration: none;
  padding: 24px 80px;
  text-transform: uppercase;
  background: ${indigo[200]};
  color: #fff;
  text-align: center;
  width: 100%;
  display: block;
  font-size: 1.1rem;
  font-family: roboto;

  ${props =>
    props.disabled &&
    css`
      background: #fafafa;
      color: rgba(0, 0, 0, 0.47);
    `}

  ::after {
    content: " →";
  }

  :hover {
    color: #fff;
    background: ${indigo[300]};
    transition: all 0.3s ease 0s;
    ${props =>
      props.disabled &&
      css`
        cursor: default;
        background: #fafafa;
        color: rgba(0, 0, 0, 0.47);
      `}
  }
`
