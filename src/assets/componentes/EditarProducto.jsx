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