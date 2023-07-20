import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  //PRÁTICA 1

  const saveLocalStorage = () => {
    const listString = JSON.stringify(listaCompras)
    localStorage.setItem('lista', listString)
  }

  //PRÁTICA 2

  const getItensLocalStorage = () => {
    const listString = localStorage.getItem('lista')
    const listArray = JSON.parse(listString)

    if (listArray) {
      setListaCompras(listArray)
    }
  }

  const deleteItens = () => {
    localStorage.removeItem('lista')
    setListaCompras([])
  }

  useEffect(() => {
    getItensLocalStorage()
  }, [])

  useEffect(() => {
    listaCompras.length && saveLocalStorage()
  }, [listaCompras])

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <button onClick={saveLocalStorage}>Salvar no LocalStorage</button>
      <button onClick={deleteItens}>Deletar</button>

      {/* <button onClick={getItensLocalStorage}>Pegar do LocalStorage</button> */}


      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
