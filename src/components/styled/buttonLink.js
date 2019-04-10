import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "@reach/router"
import styled from "styled-components"

const StyledButton = styled(Button)`
  padding: 24px 32px;
  font-size: 1.1rem;
  height: 80px;
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`

export default function ButtonLink(props) {
  return <StyledButton component={Link} {...props} />
}
