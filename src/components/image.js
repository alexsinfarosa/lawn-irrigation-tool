import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const StyledImg = styled(Img)`
  /* height: auto; */
`

function renderImage(file) {
  // console.log(file);
  return <StyledImg fluid={file.node.childImageSharp.fluid} />
}

const SprinklerImage = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { name: { regex: "/howTo/" } }) {
          edges {
            node {
              publicURL
              childImageSharp {
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={({ images }) =>
      renderImage(
        images.edges.find(image => image.node.publicURL === props.src)
      )
    }
  />
)
export default SprinklerImage
