import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px auto 80px;
`

const Header = styled.header`
  background: lightgreen;
  height: 60px;
  padding: 8px 16px;
`

const Footer = styled.footer`
  background: lightblue;
  height: 80px;
  padding: 8px 16px;
`
const Main = styled.main`
  padding: 8px 16px;
  > p {
    text-align: justify;
  }

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`

export default function test() {
  return (
    <Wrapper>
      <Header>
        <h3>Header</h3>
      </Header>

      <Main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi nisi
          repellat exercitationem facilis quibusdam? Quisquam recusandae tempore
          deleniti explicabo tempora architecto quod, itaque assumenda! Dolores,
          inventore quae. Enim, corporis quam.
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore est
          qui incidunt quasi distinctio soluta voluptatem laboriosam. Distinctio
          ducimus quos rerum fugiat, minus doloremque velit non sunt tenetur
          minima fugit!
        </p>
      </Main>

      <Footer>
        <h3>Footer</h3>
      </Footer>
    </Wrapper>
  )
}
