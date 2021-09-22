import styled from "styled-components"

const StyledVideo=styled.video`
    min-width: 50%;
    @media screen and (max-width: 1000px) {
          min-height: 50%;
      }
`


const Video = ({reference}) => {
    return (
        <StyledVideo ref={reference} autoPlay playsInline></StyledVideo>
    )
}

export default Video