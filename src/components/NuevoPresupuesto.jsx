import { useState } from "react";
import Mensaje from "./Mensaje";
function NuevoPresupuesto({
  presupuesto, 
  setPresupuesto, 
    setIsValidPresupuesto}) {
  const [mensaje, setMensaje] = useState(null)
  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!presupuesto || presupuesto <= 0 ){
      setMensaje("No es un presupuesto valido")
      return
    }
    setMensaje(null)
    setIsValidPresupuesto(true)

  }
  return (
    <div className="contenedor-presupuesto sombra">
      <form className="formulario"action="" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input
          className="nuevo-presupuesto"
          type="number"
          value={presupuesto}
          autoFocus
          onChange={(e)=>{setPresupuesto( Number(e.target.value))}}/>
        </div>
        <input type="submit" value="Añadir"/>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto