import React, { useState } from "react";

function App() {

  let [products, setProducts] = useState([])
  let [prodName, setProdName] = useState('');
  let [prodDesc, setProdDesc] = useState('');
  let [prodQtd, setProdQtd] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const newProd = { id: Date.now(), name: prodName, desc: prodDesc, qtd: prodQtd };
    setProducts(products.concat(newProd));
    setProdName('');
    setProdDesc('');
    setProdQtd('');
  }

  function handleFavorite(el, id) {
    const newProduct = products.filter(product => product.id === id);
    products = products.filter(product => product.id !== id);
    if (el.target.checked) {
      products.unshift(newProduct[0]);
    } else {
      products.push(newProduct[0]);
    }
    setProducts(products);
  }

  function handleDelete(id) {
    products = products.filter(product => product.id !== id);
    setProducts(products);
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h1>Adicione seu produto a lista de compras:</h1>
        <label htmlFor="prodName">Nome</label>
        <input id="prodName" name="name" type="text" onChange={(e) => setProdName(e.target.value)} value={prodName} required />
        <br />
        <label htmlFor="prodDesc">Descrição</label>
        <textarea style={{ verticalAlign: "middle" }} id="prodDesc" name="desc" type="text" cols="20" rows="5" onChange={(e) => setProdDesc(e.target.value)} value={prodDesc} required ></textarea>
        <br />
        <label htmlFor="prodQtd">Qtd.:</label>
        <input id="prodQtd" name="qtd" type="number" onChange={(e) => setProdQtd(e.target.value)} value={prodQtd} required />
        <br />
        <button>Adicionar</button>
      </form>
      <h1>Lista de Compras:</h1>
      <ul>
        {
          products.map(product => (
            <li key={product.id}>
              {product.name} - Desc.: {product.desc} - Qtd.: {product.qtd}
              <input onChange={(el) => handleFavorite(el, product.id)} type="checkbox" />Favoritado
              <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(product.id)}>Excluir</button>
            </li>
          ))
        }
      </ul>
    </div>
  );

}


export default App;
