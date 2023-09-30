import "./index.css";
import clienteService from "../../services/cliente-service";
import Cliente from "../../model/Cliente.js";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";


function ClientePage() {

  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [cliente, setCliente] = useState(new Cliente());

  useEffect(() => {
    clienteService.obter()
    .then(response => {
      setClientes(response.data)
    })
    .catch(erro => {
      console.log(erro.data)
    })
  },[]);

  const editar = (e) => {
    setEditando(true);
    let buscaCliente = clientes.find(c => c.id == e.target.id)

    buscaCliente.dataCadastro = buscaCliente.dataCadastro.substring(0,10);

    setCliente(buscaCliente);
  }
  
  const excluir = (e) => {
    let buscaCliente = clientes.find(c => c.id == e.target.id);

    if(window.confirm("Deseja realmente excluir o cliente " + buscaCliente.nome + "?")){
      excluirBackend(buscaCliente.id);
    }
  }

  const adicionar = () => {
    setEditando(false);
  }

  const atualizarClienteTabela = (clienteAtualizado, removerCliente = false) => {
    let indice = clientes.findIndex((cliente) => cliente.id === clienteAtualizado.id);

    (removerCliente)
    ? clientes.splice(indice, 1)
    : clientes.splice(indice, 1 , cliente);

    setClientes(arr => [...arr]);
  }

  const salvar = () => {
    if(!cliente.cpfOuCnpj || !cliente.email || !cliente.nome){
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Os campos de nome, e-mail e CPF são obrigatórios!',
        })
      return;
    }

    (editando) ? atualizarCliente(cliente) : adicionarCliente(cliente);
  }

  const adicionarCliente = (cliente) => {
    clienteService.adicionar(cliente)
    .then(response => {
      setClientes(lista => [...lista, new Cliente(response.data)]);
      limparCliente();
      Swal.fire({
        icon: 'success',
        title: 'Cliente adicionado com sucesso.',
        showConfirmButton: false,
        timer: 2500
    });
    })
    .catch(erro => {

    })
  }

  const atualizarCliente = (cliente) => {
    clienteService.atualizar(cliente)
    .then(response => {
      
      atualizarClienteTabela(response.data);

      limparCliente();

      Swal.fire({
        icon: 'success',
        title: 'Cliente atualizado com sucesso.',
        showConfirmButton: false,
        timer: 2500
    });
    })
    .catch(erro => {

    })
  }

  const excluirBackend = (id) => {
    clienteService.excluir(id)
    .then(() => {
      let buscaCliente = clientes.find(c => c.id == id)

      atualizarClienteTabela(buscaCliente, true);

      Swal.fire({
        icon: 'success',
        title: 'Cliente excluído com sucesso.',
        showConfirmButton: false,
        timer: 2500
    });
    })
    .catch()
  }

  const limparCliente = () => {
    setCliente({...cliente, id: '', nome: '', email: '', cpfOuCnpj: '', telefone: '', dataCadastro: ''});
  }

    return (
        <div className="container">
     
      <div className="row mt-3">
        <div className="col-sm-12">
          <h4>Tabela de clientes</h4>
          <hr/>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <button id="btn-adicionar" className="btn btn-outline-dark btn-lg"
          data-bs-toggle="modal" data-bs-target="#modal-cliente" onClick={adicionar}>Adicionar</button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data de cadastro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
              {clientes.map(cliente => (
                <tr>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpfOuCnpj}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button id={cliente.id} onClick={editar} class="btn btn-outline-primary btn-sm mr-3"
                    data-bs-toggle="modal" data-bs-target="#modal-cliente">
                        Editar
                    </button>
                    <button id={cliente.id} onClick={excluir} class="btn btn-outline-danger btn-sm mr-3">
                        Excluir
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="modal fade modal-lg" id="modal-cliente">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">{editando ? "Editar cliente" : "Adicionar cliente"}</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">

                <div className="row">
                  <div className="col-sm-2">
                    <label for="id" className="form-label">ID</label>
                    <input disabled type="text" className="form-control" id="id" 
                    value={cliente.id}
                    onChange={(e) => setCliente({...cliente, id: e.target.value})}/>
                  </div>

                  <div className="col-sm-10">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" 
                    value={cliente.nome}
                    onChange={(e) => setCliente({...cliente, nome: e.target.value})}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="text" className="form-control" id="email" 
                    value={cliente.email}
                    onChange={(e) => setCliente({...cliente, email: e.target.value})}/>
                  </div>
                  <div className="col-sm-2">
                    <label for="telefone" className="form-label">Telefone</label>
                    <input type="text" className="form-control" id="telefone" 
                    value={cliente.telefone}
                    onChange={(e) => setCliente({...cliente, telefone: e.target.value})}/>
                  </div>
                  <div className="col-sm-3">
                    <label for="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" 
                    value={cliente.cpfOuCnpj}
                    onChange={(e) => setCliente({...cliente, cpfOuCnpj: e.target.value})}/>
                  </div>
                  <div className="col-sm-3">
                    <label for="dataCadastro" className="form-label">Data de cadastro</label>
                    <input type="date" className="form-control" id="dataCadastro" disabled 
                    value={cliente.dataCadastro}
                    onChange={(e) => setCliente({...cliente, dataCadastro: e.target.value})}/>
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar}>Salvar</button>
                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ClientePage;