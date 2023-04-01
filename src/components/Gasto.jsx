import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from "../helpers/Index"
import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripcion from "../img/icono_suscripciones.svg"
const Gasto = ({nombre,categoria,cantidad, fecha, id, setGastoEditar, setEditando, eliminarGasto}) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {
        setGastoEditar({
          id,
          fecha,
          nombre,
          cantidad,
          categoria
        }
        )
        setEditando(true)
      }}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminarGasto(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  const iconosMap =  {
   Ahorro: IconoAhorro,
                 Comida: IconoComida,
                   Casa: IconoCasa,
                   Gastos:IconoGastos ,
                    Ocio: IconoOcio,
                    Salud: IconoSalud,
                    Suscripciones: IconoSuscripcion ,
  }
  return (
    <SwipeableList>
      <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      >
<div className="gasto sombra">
    <div className="contenido-gasto">
      <img src={iconosMap[categoria]} alt="icono gasto" />
        <div className="descripcion-gasto">
            <p className="categoria">{categoria}</p>
            <p className="nombre-gasto">{nombre}</p>
            <p className="fecha-gasto">
              Agregado el: {''}
              <span>{formatearFecha(fecha)}</span> 
            </p>
        </div>
    </div>
    <p className="cantidad-gasto"> ${cantidad}</p>
</div>
</SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto