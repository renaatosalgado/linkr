import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, ContainerTitle ,ContainerForm, Title, Description, Input, Button, Connection } from './Shared-Styled-Login-Registration';

export default function PageLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [condition, setCondition] = useState(false)
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
        setCondition(true)
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body)
        .then (res => {
            console.log(res.data)
            history.push('/timeline')//colocar a rota
            setCondition(false);
        })
        .catch ( res => { console.log (res.response) 
        Error(res)
        setCondition(false)})
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
                    <Input placeholder='password' type='password' value={password} onChange= {e => setPassword(e.target.value)} required/>
                    <Button type='submit' disabled={condition}>Log In</Button>
                    <Link to='/sign-up'>
                        <Connection>First time? Create an account!</Connection>
                    </Link>
                </ContainerForm>
            </Container>
        </form>
    );
}