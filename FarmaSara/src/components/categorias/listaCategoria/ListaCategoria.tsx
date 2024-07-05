import React, {  useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import Categoria from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import CardCategoria from '../cardCategoria/CardCategoria';
//import { toastAlerta } from '../../../util/toastAlerta';


function ListaCategoria() {
  const [categoria, setCategoria] = useState<Categoria[]>([]);

  const navigate = useNavigate();
  

  //Usa a função buscar para obter os dados dos temas e armazena-os no estado temas, passando o token de autorização nos headers. Caso ocorra um erro, ele é capturado
  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategoria
      
      );

    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, logue novamente')
      
      }
    }
  }


  // buscar a lista de temas quando o componente é montado e sempre que o comprimento da lista temas mudar.
  useEffect(() => {
    buscarCategorias();
  }, [categoria.length]);
  return (
    <>
    {/*Renderiza um componente Dna (um spinner de carregamento) se a lista temas estiver vazia.Fica rodando o icone de carregamento*/}
      {categoria.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />

        
      )}

{/* {temas.length === 0 && !loading && (
        <p className="text-center">Não tem tema</p>
      )} */}


      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/*Mapeia a lista temas para renderizar um componente CardTemas para cada tema, passando o tema como prop e definindo a key como o id do tema.*/}

            {categoria.map((categoria) => (
              <>
                <CardCategoria key={categoria.id} categoria={categoria} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategoria;