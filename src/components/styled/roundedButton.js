import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "@reach/router"
import styled from "styled-components"

const StyledButton = styled(Button)`
  padding: 24px 32px;
  font-size: 1.1rem;
  border-radius: 16px;
`

export default function RoundedButton(props) {
  return <StyledButton component={Link} {...props} />
}
