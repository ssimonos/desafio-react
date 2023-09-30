import { useState } from 'react';
import "./index.css";
import Swal from "sweetalert2";

import usuarioService from '../../services/usuario-service';

function Login () {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = () => {
        if(!email || !senha) {
            Swal.fire({
                icon: 'error',
                text: 'Os campos de e-mail e senha são obrigatórios!'
            });
            return;
        }

        usuarioService.autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);

            window.location='/';
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    return (
        <div className="caixa-login">

        <div className="titulo-login">
            <h1>Login</h1>
        </div>

        <div className="grupo">
            <label for="email">E-mail</label> <br/>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="ex@dominio.com" />
        </div>

        <div className="grupo">
            <label for="senha">Senha</label> <br/>
            <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" />
        </div>

        <button id="btn-entrar" onClick={logar} >Entrar</button>
    </div>
    )
}

export default Login;