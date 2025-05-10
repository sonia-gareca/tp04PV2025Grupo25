import { useState } from "react";

const  FormularioProducto = ()=> {

    const [productos, setProductos] = useState([]);

    const [producto, setProducto] = useState({
        id: "",
        descripcion: "",
        precioUnitario: "",
        descuento: "",
        stock: "",
    });

    // Función para calcular el precio con descuento
  const calcularPrecioConDescuento = () => {
    return producto.precioUnitario * (1 - producto.descuento / 100);
  };

     // Manejo de cambios en el formulario
    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    }
    // Agregar un producto
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar si el ID ya existe
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

    // Limpiar formulario
    setProducto({
      id: "",
      descripcion: "",
      precioUnitario: "",
      descuento: "",
      precioConDescuento: "",
      stock: "",
    });
  }


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
        < div>
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
          </li>
        ))}
      </ul>
    </div>
  );
  };
    

export default FormularioProducto;