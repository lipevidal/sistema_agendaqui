import React, { useState } from "react";
import axios from 'axios'
import styled from 'styled-components'
import InputMask from "react-input-mask";

const ContainerCadastro = styled.div`
    background-color: #141f36;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1 {
        color: #ececf6;
        }
        .box-inputs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            input {
                background-color: #2d3d54;
                letter-spacing: 2px;
                width: 250px;
                border: none;
                margin: 10px;
                padding: 10px 15px;
                font-size: 1em;
                border-radius: 10px;
                outline: none;
                color: #ececf6;
            }
        }
    }
    .boxCodigo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
            color: #ececf6;
            text-align: center;
            font-size: 1.2em;
        }
        input {
            background-color: #2d3d54;
            width: 150px;
            border: none;
            border-bottom: 3px solid #15191b;
            border-radius: 10px 10px 0 0;
            text-align: center;
            letter-spacing: 5px;
            margin: 10px;
            padding: 10px 15px;
            font-size: 1.5em;
            outline: none;
            color: #ececf6;
            margin-bottom: 30px;
        }
    }
    button {
        padding: 10px 15px;
        border-radius: 10px;
        border: none;
        color: #ececf6;
        background-color: #369a5d;
        cursor: pointer;
        font-size: 1em;
        margin: 15px;
        &:hover {
            background-color: #4eca7a;
        }
    }
    p.codigo-incorreto {
        padding: 20px;
        color: #df484a;
    }
`

export default function Cadastro() {
    const [nome, setNome] = useState(''.trim())
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [codigo, setCodigo] = useState(0)
    const [paginaCodigo, setPaginaCodigo] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [verificaCodigo, setVerificaCodigo] = useState('')
  
    const enviarCodigo = () => {
      setMensagemErro('')
      if(senha !== confirmSenha) {
        setMensagemErro('As senhas não correspondem')
      } else {
        const body = {
          nome: nome,
          email: email,
          telefone: telefone,
          senha: senha,
          codigo: codigo
        }
        axios.post('http://localhost:8000/api/user', body, {
          headers: {
            Accept : 'application/json'
          }
        }).then((response) => {
          setCodigo(response.data)
          //let tel = telefone.replace(/[^0-9]/g,'')
          setPaginaCodigo(true)
          
        }).catch((err) => {
          console.log(err)
        })
      }
    }

    const cadastrarUsuario = () => {
        setMensagemErro('')
        if(verificaCodigo != codigo) {
            setMensagemErro('Código incorreto')
        } else {
            const body = {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
                codigo: codigo
            }
    
            axios.post('http://localhost:8000/api/user', body, {
              headers: {
                Accept: 'application/json'
              }
            }).then((response) => {
              console.log(response.data)
            }).catch((err) => {
              console.log(err.response.data)
            })
        }
    }
  
    const pegarNome = (event) => {
      setNome(event.target.value)
    }
  
    const pegarEmail = (event) => {
      setEmail(event.target.value)
    }
  
    const pegarTelefone = (event) => {
      setTelefone(event.target.value)
    }
  
    const pegarSenha = (event) => {
      setSenha(event.target.value)
    }
  
    const pegarConfirmSenha = (event) => {
      setConfirmSenha(event.target.value)
    }

    const pegarVerificacaoCodigo =(event) => {
        setVerificaCodigo(event.target.value)
    }
  
    return (
      <ContainerCadastro>
          {paginaCodigo ? 
          <div className="boxCodigo">
              <p>Digite o código enviado para o número: <br />{telefone}</p>
              <input value={verificaCodigo} onChange={pegarVerificacaoCodigo} autoComplete="none"/>
              <button onClick={cadastrarUsuario}>Enviar</button>
              <p className="codigo-incorreto">{mensagemErro}</p>
          </div> 
          : 
            <div className="form">
                <h1>Cadastre-se</h1>
                <div className='box-inputs'>
                    <input value={nome} onChange={pegarNome} placeholder='Nome' autoComplete="none"/>
                    <input value={email.trim()} onChange={pegarEmail} placeholder='Email' autoComplete="none"/>
                    <InputMask mask="(99)99999-9999" value={telefone} onChange={pegarTelefone} placeholder='Telefone' autoComplete="none"/>
                    <input type="password" value={senha} onChange={pegarSenha} placeholder='Senha' autoComplete="none"/>
                    <input type="password" value={confirmSenha} onChange={pegarConfirmSenha} placeholder='Confirme sua senha' autoComplete="none"/>
                </div>
                <button onClick={enviarCodigo}>Cadastrar</button>
                <p className="codigo-incorreto">{mensagemErro}</p>
            </div>}
      </ContainerCadastro>
    );
  }
