import service from "./service";

function autenticar(email, senha) {
    return new Promise((resolve, reject) => {
        service.post('/login', {email, senha})
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}


function salvarToken(token){
    localStorage.setItem('token', token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterToken(){
    return localStorage.getItem("token");
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}";
}

function sairSistema(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    telaDeLogin();
}

function telaDeLogin(){
    window.open('/login', '_self');
}

function estaLogado(){
    let token = obterToken();

    return !!token;
}

function validarUsuario(){

    let logado = estaLogado();

    if(window.location.pathname == "/login"){
        
        if(logado){
            window.open("/", '_self')
        }
    } else if(!logado && window.location.pathname != "/login"){
        telaDeLogin();
    }

}

//validarUsuario();


export default {
    autenticar,
    salvarToken,
    salvarUsuario,
    sairSistema,
    obterToken,
    obterUsuario
}