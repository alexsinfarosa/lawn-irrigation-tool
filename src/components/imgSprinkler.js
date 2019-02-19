import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function renderImage(file) {
  // console.log(file);
  return <Img fluid={file.node.childImageSharp.fluid} />;
}

const SprinklerImage = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { name: { regex: "/Sprinkler/" } }) {
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
);
export default SprinklerImage;
