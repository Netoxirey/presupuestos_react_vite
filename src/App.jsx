import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ListaGastos from './components/ListaGastos'
import Filtros from './components/Filtros';

function App() {

const [presupuesto, setPresupuesto] = useState(
 Number(localStorage.getItem('presupuesto')) ?? 0
)
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
const [modal, setModal] = useState(false)
const [animarModal, setAnimarModal] = useState(false)
const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
)
const [gastoEditar, setGastoEditar] =useState({})
const [editando, setEditando] = useState(false)
const [filtro, setFiltro] = useState("")
const [gastosFiltrados,setGastosFiltrados] = useState([])


useEffect(() => {
  if(Object.keys(gastoEditar).length > 0){
    setModal(true)
  setTimeout(() => {
    setAnimarModal(true)
  }, 200)
  }
},[gastoEditar])


const handleGasto = () => {
  setModal(true)
  setGastoEditar({})
  setTimeout(() => {
    setAnimarModal(true)
  }, 200)
}


const guardarGasto = (gasto) => {
  if(editando) {
    const gastosActualizados = gastos.map(gastoState => gastoState.id === gastoEditar.id ? {id: gastoEditar.id, fecha: Date.now(), nombre: gasto.nombre, cantidad: gasto.cantidad, categoria: gasto.categoria}: gastoState)
    setGastos(gastosActualizados)
    setEditando(false)
    setGastoEditar({})
  }else {
    setGastos([...gastos, {id: uuidv4(), fecha: Date.now(), nombre: gasto.nombre, cantidad: gasto.cantidad, categoria: gasto.categoria}])
  }
}


const eliminarGasto = (gastoId) => {
  return setGastos(gastos.filter((gasto) => {
    return gastoId !== gasto.id 
  }))
}

useEffect(() => {
  localStorage.setItem('presupuesto', presupuesto ?? 0)
},[presupuesto])


useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  if(presupuestoLS > 0) {
    setIsValidPresupuesto(true)
  }
}, [])


useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos)?? [])
}, [gastos])

useEffect(() => {
if(filtro){
  setGastosFiltrados(gastos.filter(gasto => filtro === gasto.categoria))

}
},[filtro])


  return (
    <div className={modal ? "fijar": ""}>
      <Header 
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto} 
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      IconoNuevoGasto={IconoNuevoGasto}
      setGastos={setGastos}/>
      {isValidPresupuesto &&  
      <>
      <Filtros
      filtro={filtro}
      setFiltro={setFiltro}
      />
      <ListaGastos gastos={gastos} setGastoEditar={setGastoEditar} setEditando={setEditando} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro} />
      <div className='nuevo-gasto'>
        <img onClick={handleGasto} src={IconoNuevoGasto} alt="icono nuevo gasto" />
      </div> 
      </>}
      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setEditando={setEditando} editando={editando} gastos={gastos}/>}

</div>

    
  )
}

export default App
