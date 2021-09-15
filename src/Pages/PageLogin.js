import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function PageLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function SendLoginInformation(event) {
        event.preventDefault()
        const body = {
            email,
            password
        }

        function Error(res) {
            if (res.response.status === 400){
                alert('seu email é invalido')
            }
            if(res.response.status === 401){
                alert ('seus dados estão icorretos')
            }
            if(res.response.status === 403){
                alert('Seus dados não foram encontrados 🤔, se cadastra aí 😉')
            }
        }

        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body)
        .then (res => {
            console.log(res.data)
            history.push('');//colocar rota
        })
        .catch ( res => { console.log (res.response) 
        Error(res)})
    }

    return(
        <form onSubmit={SendLoginInformation}>
            <Container>
                <ContainerTitle>
                    <Title>linkr</Title>
                    <Description>
                    save, share and discover <br/>
                    the best links on the web
                    </Description>
                </ContainerTitle>
                <ContainerForm>
                    <Input placeholder='e-mail' type='email' value={email} onChange= {e => setEmail(e.target.value)} required/>
                    <Input placeholder='password' type='password' value={password} onChange= {e => setPassword(e.target.value)}/>
                    <Button type='submit'>Log In</Button>
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
    border: none;
    border-radius: 6px;
    font-family: 'Oswald';
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 10px;

    ::placeholder {
        color: #9F9F9F;
    }

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