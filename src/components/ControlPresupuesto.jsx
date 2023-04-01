import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function ControlPresupuesto({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) {
  const [disponible, setDisponible] = useState(presupuesto)
  const [gastado, setGastado] = useState(0)


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-Us',{
      style: 'currency',
      currency: 'USD'
    })
  }


  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
    setGastado(totalGastado)
    setDisponible(presupuesto - totalGastado)
  }, [gastos, presupuesto])


  const percentage = Math.floor((gastado / presupuesto) * 100)


  const clickHandle = (e) => {
    const confirmation = confirm('¿Deseas reiniciar presupuesto y gastos?')
    
    if(confirmation) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
          pathColor: percentage > 100 ? 'red': '#3B82F6',
          textColor: percentage > 100 ? 'red': '#3B82F6',})}/>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app"
        type="button"
        onClick={clickHandle}
        >
          Resetear App
        </button>
        <p>
          <span> Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? 'negativo': ''}>
          <span> Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span> Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
