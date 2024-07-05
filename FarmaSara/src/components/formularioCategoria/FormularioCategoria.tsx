import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../services/Service';
//import { toastAlerta } from '../../../util/toastAlerta';


function FormularioCategoria() {
  //Declara um estado local tema com tipo Tema, inicializando-o como um objeto vazio.
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const navigate = useNavigate();
//Usa o hook useParams para extrair o parâmetro id da URL, identificando se estamos criando ou editando um tema.
  const { id } = useParams<{ id: string }>();
//Usa o hook useContext para acessar o contexto de autenticação, obtendo o usuário logado e a função de logout.
  

 // Extrai o token do usuário logado para usá-lo em requisições HTTP.
 
// obter os dados do tema pelo ID e armazena-os no estado tema, passando o token de autorização nos headers.
  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria);
  }
//buscar os dados do tema se o id estiver definido
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])
//Define a função para atualizar o estado tema com os valores dos campos do formulário.
//Atualiza o estado tema, copiando os valores existentes e substituindo o valor do campo correspondente.
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
//Imprime o estado tema atualizado no console para depuração.
    console.log(JSON.stringify(categoria))//PERGUNTAR
  }
//: Define uma função assíncrona para criar ou atualizar um tema.
//e.preventDefault() :previne o comportamento padrão do formulário ao ser enviado.
  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault() //PERGUNTAR
//: Verifica se estamos editando um tema e se o id está definido).
    if (id !== undefined) {
      try {//Tenta atualizar o tema no backend e trata possíveis erros. Se a atualização for bem-sucedida, exibe um alerta e chama a função retornar
        await atualizar(`/categorias`, categoria, setCategoria)

        alert('Categoria atualizado com sucesso')
        retornar()
//: Trata erros específicos de token expirado ou outros erros gerais.
      } catch (error: any) {//é usada para especificar que o tipo do parâmetro error pode ser qualquer coisa. Isso significa que error pode ser um objeto, uma string, um número, ou qualquer outro tipo
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          
        } else {
          alert('Erro ao atualizar a Categoria')
        }

      }

    } else {//Caso contrário, estamos criando um novo tema.
      try {
        await cadastrar(`/categorias`, categoria, setCategoria)

        alert('Categoria cadastrado com sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
        
        } else {
          alert('Erro ao cadastrar Categoria')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/categorias")
  }

 

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {/*Mostra um título que muda dependendo se estamos criando ou editando um tema, pode ser
        Cadastre um novo tema ou editar tema */} 
        {id === undefined ? 'Cadastre um nova categoria' : 'Editar categoria'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">

        <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Nome da categoria"
            name='nome'
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//caso ocorra um evento nesse input , ele executa a função atualizarEstado
          />

          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name='descricao'
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//caso ocorra um evento nesse input , ele executa a função atualizarEstado
          />
          
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioCategoria;