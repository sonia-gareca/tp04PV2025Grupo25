import { useState } from "react";
import '../css/styles.css';

const FormularioProducto = ({ productos, setProductos, onEditar }) => {
  const [producto, setProducto] = useState({
    id: "",
    descripcion: "",
    precioUnitario: "",
    descuento: "",
    stock: "",
  });

  const calcularPrecioConDescuento = () => {
    return producto.precioUnitario * (1 - producto.descuento / 100);
  };

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idDuplicado = productos.some((p) => p.id === producto.id);
    if (idDuplicado) {
      alert("El ID ya existe. Por favor, ingresa un ID único.");
      return;
    }
   //assasdsdad