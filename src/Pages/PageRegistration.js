import { Container, ContainerTitle ,ContainerForm, Title, Description, Input, Button, Connection } from './Shared-Styled-Login-Registration';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function PageRegistration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pictureUrl, setPictureUrl] = useState ('');
    const [condition, setCondition] = useState(false);
    const history = useHistory();

    function SendRegistrationInformation(event) {
        event.preventDefault()
        const body = {
            email,
            password,
            username,
            pictureUrl
        }

        function Error(res) {
            if (res.response.status === 403){
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'O email inserido já está em uso, cria outro aí 😉',
                  })
            }
            if (res.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Insira um email válido, por favor',
                  })
            }
        }
        setCondition(true)
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', body)
        .then (() => { history.push('/');
        setCondition(false)})
        .catch ( res => {Error(res) 
        setCondition(false)})
    }

    return(
        <form onSubmit={SendRegistrationInformation}>
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
                    <Input placeholder ='username' type='text' value={username} onChange= {e => setUsername(e.target.value)} required/>
                    <Input placeholder='picture Url' type='url' value={pictureUrl} onChange= {e => setPictureUrl(e.target.value)} required/>
                    <Button type='submit' disabled={condition}>Sign Up</Button>
                    <Link to='/'>
                        <Connection>Switch back to log in</Connection>
                    </Link>
                </ContainerForm>
            </Container>
        </form>
    );
}