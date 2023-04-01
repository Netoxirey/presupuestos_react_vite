import Gasto from "./Gasto";
const ListaGastos = ({ gastos, setGastoEditar, setEditando, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos" : "No hay gastos aun"}</h2>
      
      {filtro ? gastosFiltrados.map((gasto) => (
        <Gasto key={gasto.id} nombre={gasto.nombre} cantidad={gasto.cantidad} categoria={gasto.categoria} fecha={gasto.fecha} setGastoEditar={setGastoEditar} id={gasto.id} setEditando={setEditando} eliminarGasto={eliminarGasto} />
      )):
      gastos.map((gasto) => (
        <Gasto key={gasto.id} nombre={gasto.nombre} cantidad={gasto.cantidad} categoria={gasto.categoria} fecha={gasto.fecha} setGastoEditar={setGastoEditar} id={gasto.id} setEditando={setEditando} eliminarGasto={eliminarGasto} />
      ))
      }
    </div>
  );
};

export default ListaGastos;
