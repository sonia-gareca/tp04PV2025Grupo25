import { useState, useMemo } from "react";
import '../css/styles.css';

const FormularioProducto = ({ productos, setProductos, onEditar }) => {
  const [producto, setProducto] = useState({
    id: "",
    descripcion: "",
    precioUnitario: "",
    descuento: "",
    stock: "",
  });
const [searchTerm, setSearchTerm] = useState(""); // Estado para la BUSQUEDA
  const calcularPrecioConDescuento = () => {
    return producto.precioUnitario * (1 - producto.descuento / 100);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProducto({
      ...producto,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idDuplicado = productos.some((p) => p.id === producto.id);
    if (idDuplicado) {
      alert("El ID ya existe. Por favor, ingresa un ID único.");
      return;
    }
   const newProduct = {
      ...producto,
      precioConDescuento: calcularPrecioConDescuento(),
    };
    setProductos([...productos, newProduct]);
    setProducto({
      id: "",
      descripcion: "",
      precioUnitario: "",
      descuento: "",
      precioConDescuento: "",
      stock: "",
    });
  };

//------------------BUSQUEDA-----------------------------------
// Función para manejar la búsqueda
    const BuscarUnProducto = (e) => {
      setSearchTerm(e.target.value); // Actualiza el término de búsqueda
    };
  
    // Filtrar productos según el término de búsqueda
     const filteredProducts = useMemo(() => {
       return productos.filter((prod) =>
       prod.id.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }, [productos, searchTerm]);
//-----------------------------------------------------------------

  const eliminarProducto = (id) => {
    const nuevaListaProductos = productos.map((prod) => {
      if (prod.id === id) {
        const stockActual = parseInt(prod.stock, 10);
        if (stockActual > 0) {
          alert(`¿Desea eliminar el producto "${prod.descripcion}"?`);
          return { ...prod, stock: stockActual - 1 };
        } else {
          alert(`Ups! Parece que "${prod.descripcion}" no tiene stock disponible!`);
          return prod;
        }
      }
      return prod;
    });
    setProductos(nuevaListaProductos);
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={producto.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio Unitario:</label>
          <input
            type="number"
            name="precioUnitario"
            value={producto.precioUnitario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descuento (%):</label>
          <input
            type="number"
            name="descuento"
            value={producto.descuento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.descripcion}</strong><br />
            <span>ID: {prod.id}</span><br />
            Precio Unitario: ${prod.precioUnitario} <br />
            Descuento: {prod.descuento}% <br />
            Precio con Descuento: ${prod.precioConDescuento} <br />
            Stock: {prod.stock} unidades
            <button className="btn_eiminar" onClick={() => eliminarProducto(prod.id)}>Eliminar Producto</button>
            <button className="btn_editar" onClick={() => onEditar(prod)}>Editar</button>
          </li>
        ))}
      </ul>

      <h2>Buscar Producto</h2>
       <input
         type="text"
         placeholder="Buscar por ID"
         value={searchTerm}
         onChange={(e) => BuscarUnProducto(e)} // Evento para manejar la búsqueda
       />
       {searchTerm !== "" && (
         <div>
           <ul>
             {filteredProducts.map((prod) => (
               <li key={prod.id}>
                 <strong>{prod.descripcion}</strong>
                 <br />
                 <span>ID: {prod.id}</span>
                 <br />
                 Precio Unitario: ${prod.precioUnitario}
                 <br />
                 Descuento: {prod.descuento}%
                 <br />
                 Precio con Descuento: ${prod.precioConDescuento}
                 <br />
                 Stock: {prod.stock} unidades
               </li>
             ))}
           </ul>
         </div>
       )}

    </div>
  );
};

export default FormularioProducto;