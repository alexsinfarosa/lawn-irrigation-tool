import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { window } from "browser-monads"

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fdfdfd;
  height: 80px;
  padding: 8px 16px;
  width: 100%;
`

const LinkStyled = styled(Link)`
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`
const active = {
  color: "#556cd6",
}

const Navigation = () => {
  const path = window.location.pathname
  const lastURLSegment = path.split("/")
  const route = lastURLSegment[lastURLSegment.length - 2]

  return (
    <Nav>
      <LinkStyled to="/info/" activeStyle={active}>
        <FontAwesomeIcon
          icon={[route === "info" ? "fa" : "fal", "info-circle"]}
          size="lg"
        />
        <Typography variant="caption">Info</Typography>
      </LinkStyled>

      <LinkStyled to="/lawn/" activeStyle={active}>
        <FontAwesomeIcon
          icon={[route === "lawn" ? "fa" : "fal", "home"]}
          size="lg"
        />
        <Typography variant="caption">Recommendation</Typography>
      </LinkStyled>

      <LinkStyled to="/forecast/" activeStyle={active}>
        <FontAwesomeIcon
          icon={[route === "forecast" ? "fa" : "fal", "cloud"]}
          size="lg"
        />
        <Typography variant="caption">Forecast</Typography>
      </LinkStyled>

      <LinkStyled to="/lawns/" activeStyle={active}>
        <FontAwesomeIcon
          icon={[route === "lawns" ? "fa" : "fal", "th-list"]}
          size="lg"
        />
        <Typography variant="caption">Lawns</Typography>
      </LinkStyled>
    </Nav>
  )
}

export default Navigation
