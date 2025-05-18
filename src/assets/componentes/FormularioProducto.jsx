import { useState, useMemo, useCallback } from "react";
import '../css/styles.css';

const FormularioProducto = ({ productos, setProductos, onEditar }) => {
  const [producto, setProducto] = useState({
    id: "",
    descripcion: "",
    precioUnitario: "",
    descuento: "",
    stock: "",
    eliminado: false, // NUEVO CAMPO BOOLEANO
  });
  const [searchTerm, setSearchTerm] = useState(""); // Estado para BUSQUEDA por ID
  const [searchMarcaNombre, setSearchMarcaNombre] = useState(""); // Estado para BUSQUEDA por marca/nombre

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
      eliminado: false, // asegurás que el producto no esté "eliminado"
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

  // Funcion para ocultar un producto
  const eliminarProducto = useCallback((id) => {
    setProductos(productos.map(prod => 
      prod.id === id ? { ...prod, eliminado: true} : prod));
  }, [productos, setProductos]);

  //------------------BUSQUEDA-----------------------------------
  // Filtrado de productos según el término de búsqueda
  // Estado para BUSQUEDA por marca/nombre (el dato es extraído del campo "descripcion")
  const filteredProducts = useMemo(() => {
    return productos.filter((prod) => {
      if (prod.eliminado) return false; //Para no incluir productos eliminados en la busqueda
      const matchId = prod.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesc = prod.descripcion.toLowerCase().includes(searchMarcaNombre.toLowerCase());
      if (searchTerm && searchMarcaNombre) return matchId && matchDesc;
      if (searchTerm) return matchId;
      if (searchMarcaNombre) return matchDesc;
      return true; // Si ambas están vacías, muestra todos los no eliminados
    });
  }, [productos, searchTerm, searchMarcaNombre]);
//-----------------------------------------------------------------
  //Funcion para eliminar un producto del stock
  const eliminarProductoStock = (id) => {
    const nuevaListaProductos = productos.map((prod) => {
      if (prod.id === id) {
        const stockActual = parseInt(prod.stock, 10);
        if (stockActual > 0) {
          alert(`¿Desea eliminar el producto "${prod.descripcion}" del stock?`);
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
        <button  className="btn_agregar" type="submit">Agregar Producto</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((prod) => (
          //Aqui solo se renderiza si el producto no esta eliminado
          !prod.eliminado && (
          <li key={prod.id}>
            <strong>{prod.descripcion}</strong><br />
            <span>ID: {prod.id}</span><br />
            Precio Unitario: ${prod.precioUnitario} <br />
            Descuento: {prod.descuento}% <br />
            Precio con Descuento: ${prod.precioConDescuento} <br />
            Stock: {prod.stock} unidades
            <button className="btn_eliminar" onClick={() => eliminarProducto(prod.id)}>Eliminar Producto</button>
            <button className="btn_editar" onClick={() => onEditar(prod)}>Editar</button>
            <button className="btn_eliminar_stock" onClick={() => eliminarProductoStock(prod.id)}>Eliminar Producto del Stock</button>
          </li>
          )
        ))}
      </ul>

      <h2>Buscar Producto</h2>
      {/* buscador por ID */}
      <div className="buscador">
        <input 
          type="text"
          placeholder="Buscar por ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Buscar por Marca o Nombre */}
        <input
          type="text"
          placeholder="Buscar por Marca o Nombre"
          value={searchMarcaNombre}
          onChange={(e) => setSearchMarcaNombre(e.target.value)}
        />
      </div>
      {(searchTerm !== "" || searchMarcaNombre !== "") && (
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
                <button className="btn_eliminar" onClick={() => eliminarProducto(prod.id)}>Eliminar Producto</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormularioProducto;