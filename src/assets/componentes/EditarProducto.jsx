import { useState } from "react";
import FormularioProducto from "./FormularioProducto";

export default function EditarProducto() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  const handleEditar = (producto) => {
    setProductoEditando(producto);
  };

  const handleGuardar = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoActualizado.id ? productoActualizado : prod
      )
    );
    setProductoEditando(null);
  };

  const handleCancelar = () => {
    setProductoEditando(null);
  };

  return (
    <div>
      <FormularioProducto
        productos={productos}
        setProductos={setProductos}
        onEditar={handleEditar}
      />
      {productoEditando && (
        <div className="modal-editar">
          <h2>Editar Producto</h2>
          <form
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
            <div>
              <label>ID:</label>
              <input value={productoEditando.id} disabled />
            </div>
            <div>
              <label>Descripción:</label>
              <input
                value={productoEditando.descripcion}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    descripcion: e.target.value,
                  })
                }
              />
            </div>
            <div>
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
              />
            </div>
            <div>
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
              />
            </div>
            <div>
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
              />
            </div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleCancelar} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}