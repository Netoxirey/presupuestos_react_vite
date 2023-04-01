import Mensaje from './Mensaje'
import Cerrar from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setEditando, editando, gastos}) => {
    const [nombre,setNombre ] = useState('')
    const [cantidad, setCantidad] =useState(0)
    const [categoria, setCategoria] =useState('')
    const [mensaje, setMensaje] = useState('')

    const ocultarModal = () => {
        setModal(false)
        setAnimarModal(false)
        setEditando(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre === '' || cantidad <= 0 || categoria === '') {
            return setMensaje('Todos los campos son obligatorios')
        }
        guardarGasto({nombre,cantidad,categoria})
        setMensaje('')
        setModal(false)
        setAnimarModal(false)
    }

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
        }
    },[])

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            onClick={ocultarModal} 
            src={Cerrar} 
            alt="Boton cerrar" />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar':'cerrar'}`}>
            <legend>{gastoEditar.nombre? "Editar gasto": "Nuevo gasto"}</legend>
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input onChange={e => setNombre(e.target.value)} type="text" id='nombre' placeholder='Inserta el nombre de tu gasto' value={nombre} />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input onChange={ e => setCantidad(Number(e.target.value))} type="number" id='cantidad' placeholder='Inserta la cantidad de dinero gastado' value={cantidad} />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                <select onChange={e => setCategoria(e.target.value)} id='categoria' value={categoria}>
                    <option value="">-- Seleccione --</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Comida">Comida</option>
                    <option value="Casa">Casa</option>
                    <option value="Gastos">Gastos varios</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Salud">Salud</option>
                    <option value="Suscripciones">Suscripciones</option>
                </select>
                <input type="submit" value={gastoEditar.nombre? `Guardar cambios`: `Guardar gasto`} />
                {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}
            </div>
        </form>
    </div>
  )
}

export default Modal