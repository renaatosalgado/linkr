import styled from "styled-components";

export default function PageLogin() {
    return(
        <form>
            <Container>
                <ContainerTitle>
                    <Title>linkr</Title>
                    <Description>
                    save, share and discover <br/>
                    the best links on the web
                    </Description>
                </ContainerTitle>
                <ContainerForm>
                    <Input placeholder='e-mail'></Input>
                    <Input placeholder='password'></Input>
                    <Button>Log In</Button>
                    <Link>First time? Create an account!</Link>
                </ContainerForm>
            </Container>
        </form>
    );
}

const Container = styled.div `
    width: 100%;
    height: 100vh;
    display: flex;

    @media(max-width: 600px) {
        flex-direction: column;
    }
`
const ContainerTitle = styled.div `
    width: 60%;
    height: 100%;
    background-color: #151515;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5%;

    @media(max-width: 600px) {
        width: 100%;
        height: 25%;
        padding-left: 0;
        align-items: center;
        padding: 5px 0;
    }
`
const Title = styled.h1`
    font-size: 106px;
    font-family: 'Passion one';
    font-weight: 700;
    letter-spacing: 0.05em;

    @media(max-width: 600px){
        font-size: 76px;
    }
`
const Description = styled.h2`
    font-family: 'Oswald';
    font-size: 43px;
    font-weight: bold;
    line-height: 60px;

    @media(max-width: 600px){
        font-size:23px;
        line-height: 34px;
    }
`
const ContainerForm = styled.div`
    width: 40%;
    height: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media(max-width: 600px){
        justify-content: flex-start;
        padding-top: 10%;
        width: 100%;
        height: 75%;
    }
`
const Input = styled.input`
    width: 80%;
    height: 65px;
    background-color: #FFFFFF;
    color: #9F9F9F;
;
    border: none;
    border-radius: 6px;
    font-family: 'Oswald';
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 10px;

    @media(max-width:600px) {
        height: 55px;
    }
`
const Button = styled.button`
    width: 80%;
    height: 65px;
    background-color: #1877F2;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    margin-bottom: 13px;
    font-weight: bold;
    font-family: 'Oswald';
    font-size: 27px;

    @media(max-width:600px){
        height: 55px;
        font-size: 22px;
    }
`
const Link = styled.p`
    text-decoration: underline;
    color: #FFFFFF;
    font-family: 'Lato';
    font-size: 20px;
    font-weight: normal;

    @media(max-width: 600px) {
        font-size: 17px;
    }
`
