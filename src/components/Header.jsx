import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"
import ListaGastos from "./ListaGastos"
function Header({
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto,
  gastos,
setGastos,}) {
  return (
    <header>
    <h1>Planificador de Gatos</h1>
    {isValidPresupuesto ? (
      <ControlPresupuesto  presupuesto={ presupuesto} gastos={gastos} setGastos={setGastos} setPresupuesto={setPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto}/>
    ): (<NuevoPresupuesto
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />)}

</header>
  )
}

export default Header