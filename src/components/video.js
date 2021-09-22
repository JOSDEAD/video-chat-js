import styled from "styled-components"

const StyledVideo=styled.video`
    min-width: 50%;
    @media screen and (max-width: 1000px) {
          min-height: 50%;
      }
`


const Video = ({reference,mute}) => {
    return (
        <StyledVideo ref={reference} autoPlay playsInline muted={mute}></StyledVideo>
    )
}

export default Video