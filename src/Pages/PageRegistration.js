import { Container, ContainerTitle ,ContainerForm, Title, Description, Input, Button, Connection } from './Shared-Styled-Login-Registration';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState } from 'react';

export default function PageRegistration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [picture, setPicture] = useState ('');
    const history = useHistory();



    return(
        <form >
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
                    <Input placeholder='picture url' type='url' value={picture} onChange= {e => setPicture(e.target.value)} required/>
                    <Button type='submit'>Sign Up</Button>
                    <Link to='/'>
                        <Connection>Switch back to log in</Connection>
                    </Link>
                </ContainerForm>
            </Container>
        </form>
    );
}