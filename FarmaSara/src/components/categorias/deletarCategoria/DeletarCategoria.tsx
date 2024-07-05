import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Categoria from '../../../models/Categoria'
import { buscar, deletar } from '../../../services/Service'
//import { toastAlerta } from '../../../util/toastAlerta'


function DeletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria) 
    const navigate = useNavigate()
//Usa o hook useParams para extrair o parâmetro id da URL.
    const { id } = useParams<{ id: string }>()
//Usa o hook useContext para acessar o contexto AuthContext e desestruturar usuario e handleLogout.
    //Extrai o token de autenticação do objeto usuario.
// função assincrona :Tenta fazer uma requisição para buscar um tema pelo seu id e atualizar o estado tema.
    async function buscarPorId(id: string) {
        try {//Usa a função buscar para enviar a requisição, passando o URL, a função de atualização de estado, e os headers com o token de autorização
            await buscar(`/categorias/${id}`, setCategoria
               
            )
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, faça login novamente')
            }
        }
    }

  

    useEffect(() => {//Se o id não for indefinido, chama buscarPorId com o id.
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    //: Define a função retornar que navega o usuário de volta para a página de temas.
    function retornar() {
        navigate("/categorias")
    }

    async function deletarCategoria() {
        try {//Tenta deletar o tema pelo seu id.
            await deletar(`/categorias/${id}`
                
            )

alert('Categoria apagada com sucesso')
//Se ocorrer um erro, alerta o usuário que houve um erro ao apagar o tema
        } catch (error) {
            alert('Erro ao apagar a Categoria')
        }

        retornar()
    }
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a Categoria a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>{categoria.nome}</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.descricao}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>{/*Chama a função de retornar que navega o usuario para a página de temas  */}
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarCategoria}>{/*Chama a função deletarTema , que irá deletar o tema*/}
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria