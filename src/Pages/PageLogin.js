import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, ContainerTitle ,ContainerForm, Title, Description, Input, Button, Connection } from './Shared-Styled-Login-Registration';
import Swal from "sweetalert2";

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
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Seu email é invalido',
                  })
            }
            if(res.response.status === 403){
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Seus dados não foram encontrados 🤔, verifica se está tudo certo aí 😉, se não tiver uma conta se cadastre 🙂',
                  })
            }
        }
        setCondition(true)
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body)
        .then (() => { history.push('/timeline')
            setCondition(false);
        })
        .catch ( res => {Error(res)
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

