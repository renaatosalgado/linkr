import styled from 'styled-components'


const LinkPreviewContainer = styled.div`
    height: 155px;
    border: 1px solid #4D4D4D;
    box-sizing: border-box;
    border-radius: 11px;
    position: relative;
`

const LinkTitle = styled.p`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #CECECE;
    margin-top: 24px;
    margin-bottom: 5px;
`

const LinkDescription = styled.p`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    color: #9B9595;
    margin-bottom: 13px;
`

const LinkAnchor = styled.p`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    color: #CECECE;
`


const LeftContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 155px);
    padding-left: 19px;
    display: flex;
    flex-direction: column;
`

const LinkImg = styled.img`
    position: absolute;
    width: 155px;
    height: 155px;
    right: 0;
    top: 0;
    border-radius: 0px 12px 13px 0px;
`

const LinkPreview = ({ link, linkTitle, linkDescription, linkImage}) => {
    return (
        <LinkPreviewContainer>
            <LeftContainer>
                <LinkTitle>{linkTitle}</LinkTitle>
                <LinkDescription>{linkDescription}</LinkDescription>
                <LinkAnchor>{link}</LinkAnchor>
            </LeftContainer>
            <LinkImg src={linkImage}></LinkImg>
        </LinkPreviewContainer>
    )
}

export default LinkPreview