import React, {useState, useEffect} from 'react'
import CaracteristicaDataAccess from '../dataAccess/CaracteristicaDataAccess';
import '../styles/Management.css';


const CaracteristicaManagement = () => {
    const [caracteristicaList, setCaracteristicaList] = useState([]);

    const updateList = () => {
        CaracteristicaDataAccess.list().then(() => {
            setCaracteristicaList(CaracteristicaDataAccess.response.data)
        });
    }

    const [caracteristicaCreateInputValue, setCaracteristicaCreateInputValue] = useState('');
    const [descripcionCreateInputValue, setDescripcionCreateInputValue] = useState('');

    const onCaracteristicaCreateInputChange = (e) => {
        setCaracteristicaCreateInputValue(e.target.value);
    }

    const onDescripcionCreateInputChange = (e) => {
        setDescripcionCreateInputValue(e.target.value);
    }

    const onCaracteristicaEditInputChange = (e, id) => {
        const list = caracteristicaList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            id: id,
            caracteristica: e.target.value,
            descripcion: list[index].descripcion
        };
        setCaracteristicaList([...list]);
    }

    const onDescripcionEditInputChange = (e, id) => {
        const list = caracteristicaList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            id: id,
            caracteristica: list[index].caracteristica,
            descripcion: e.target.value
        };
        setCaracteristicaList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = caracteristicaList.findIndex(x => x.id === id);
        const caracteristica = caracteristicaList[index].caracteristica;
        const descripcion = caracteristicaList[index].descripcion;
        if(caracteristica !== '' && descripcion !== '') {
            CaracteristicaDataAccess.update(id, {
                'caracteristica': caracteristica,
                'descripcion': descripcion
            }).then(() => {
                //Marca actualizada con éxito
            });
        }
    }

    const onDeleteClick = (e, id) => {
        CaracteristicaDataAccess.delete(id).then(() => {
            updateList();
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const caracteristica = caracteristicaCreateInputValue;
        const descripcion = descripcionCreateInputValue;
        if(caracteristica !== '' && descripcion !== '') {
            CaracteristicaDataAccess.create({
                'caracteristica': caracteristica,
                'descripcion': descripcion
            }).then(() => {
                updateList();
            });
            setCaracteristicaCreateInputValue('');
            setDescripcionCreateInputValue('');
        }
    }

    useEffect(() => {
        updateList();
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de características</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <div className='input-container'>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Ingrese una característica...'
                        maxLength={50}
                        required
                        value={caracteristicaCreateInputValue}
                        onChange={onCaracteristicaCreateInputChange}
                    />
                    <textarea
                        className='form-input'
                        placeholder='Ingrese una descripción...'
                        required
                        maxLength={255}
                        value={descripcionCreateInputValue}
                        onChange={onDescripcionCreateInputChange}
                    />
                </div>
                <div className='button-container'><button className='multi-form-button' type='submit'>Agregar</button></div>
            </form>
            <div className='grid'>
                <ul className='management-list'>
                    {caracteristicaList.map((caracteristica) => (
                        <li key={caracteristica.id} className='management-list-item'>
                            <div className='management-list-item-container'>
                                <input
                                    className='management-list-item-input multi'
                                    type='text'
                                    maxLength={50}
                                    value={caracteristica.caracteristica}
                                    onChange={(e) => onCaracteristicaEditInputChange(e, caracteristica.id)}
                                />
                                <textarea
                                    className='management-list-item-input multi'
                                    maxLength={255}
                                    value={caracteristica.descripcion}
                                    onChange={(e) => onDescripcionEditInputChange(e, caracteristica.id)}
                                />
                            </div>
                            <div className='caracteristica-options'>
                                <button className='caracteristica-options-button' onClick={(e) => onEditClick(e, caracteristica.id)}>Editar</button>
                                <button className='caracteristica-options-button' onClick={(e) => onDeleteClick(e, caracteristica.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CaracteristicaManagement;