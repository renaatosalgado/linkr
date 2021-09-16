import styled from 'styled-components'


const LinkPreviewContainer = styled.div`
    height: 155px;
    border: 1px solid #4D4D4D;
    box-sizing: border-box;
    border-radius: 11px;
`

const LinkTitle = styled.p`

`

const LinkDescription = styled.p`
    
`

const LinkAnchor = styled.p`
    
`

const LinkImg = styled.img`

`

const RightContainer = styled.div``

const LeftContainer = styled.div``

const LinkPreview = () => {
    return (
        <LinkPreviewContainer>
            <RightContainer>
                <LinkTitle></LinkTitle>
                <LinkDescription></LinkDescription>
                <LinkAnchor></LinkAnchor>
            </RightContainer>
            <LeftContainer>
                <LinkImg></LinkImg>
            </LeftContainer>
        </LinkPreviewContainer>
    )
}

export default LinkPreview