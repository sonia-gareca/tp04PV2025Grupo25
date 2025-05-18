import { useState, useEffect } from "react";
import FormularioProducto from "./FormularioProducto";

export default function EditarProducto() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState(""); // Nuevo estado

  const handleEditar = (producto) => {
    setProductoEditando(producto);
  };

  const handleGuardar = (productoActualizado) => {
    if (
      !productoActualizado.descripcion ||
      productoActualizado.precioUnitario <= 0 ||
      productoActualizado.stock < 0
    ) {
      alert("Completa todos los campos");
      return;
    }
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoActualizado.id ? productoActualizado : prod
      )
    );
    setProductoEditando(null);
    setMensaje("Producto guardado correctamente"); // Usar el nuevo estado
  };

  const handleCancelar = () => {
    setProductoEditando(null);
  };

  useEffect(() => {
    console.log("Productos actualizados:", productos);
  }, [productos]);

  return (
    <div>
      {mensaje && <div className="mensaje-exito">{mensaje}</div>}
      <FormularioProducto
        productos={productos}
        setProductos={setProductos}
        onEditar={handleEditar}
      />
      {productoEditando && (
        <div className="modal-editar">
          <h2>Editar Producto</h2>
          <form
            className="form-editar-producto"
            onSubmit={(e) => {
              e.preventDefault();
              handleGuardar({
                ...productoEditando,
                precioConDescuento:
                  productoEditando.precioUnitario *
                  (1 - productoEditando.descuento / 100),
              });
            }}
          >
            <div className="form-group">
              <label>ID:</label>
              <input
                value={productoEditando.id}
                disabled
                className="input-disabled"
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input
                value={productoEditando.descripcion}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    descripcion: e.target.value,
                  })
                }
                className="input-text"
              />
            </div>
            <div className="form-group">
              <label>Precio Unitario:</label>
              <input
                type="number"
                value={productoEditando.precioUnitario}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    precioUnitario: Number(e.target.value),
                  })
                }
                className="input-number"
              />
            </div>
            <div className="form-group">
              <label>Descuento (%):</label>
              <input
                type="number"
                value={productoEditando.descuento}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    descuento: Number(e.target.value),
                  })
                }
                className="input-number"
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                value={productoEditando.stock}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    stock: Number(e.target.value),
                  })
                }
                className="input-number"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-guardar">
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCancelar}
                className="btn btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}