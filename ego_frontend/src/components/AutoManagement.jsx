import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import AutoDataAccess from '../dataAccess/AutoDataAccess';
import MarcaDataAccess from '../dataAccess/MarcaDataAccess';
import CategoriaDataAccess from '../dataAccess/CategoriaDataAccess';
import CaracteristicaDataAccess from '../dataAccess/CaracteristicaDataAccess';
import '../styles/Management.css';
import autoDataAccess from "../dataAccess/AutoDataAccess";


const AutoManagement = () => {
    const [autoList, setAutoList] = useState([]);

    const updateList = () => {
        AutoDataAccess.list().then(() => {
            setAutoList(AutoDataAccess.response.data)
        });
    }

    const [marcaOptions, setMarcaOptions] = useState([]);
    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [caracteristicaOptions, setCaracteristicaOptions] = useState([]);

    const defaultData = {
        modelo: '',
        anio: 0,
        precio: 0,
        marca: null,
        categoria: null,
        caracteristicas: []
    };

    const [createData, setCreateData] = useState(defaultData);

    const onInputChange = (e, field) => {
        const data = createData;
        data[`${field}`] = e.target != null ? e.target.value : e;
        setCreateData({...data});
    }

    const onEditInputChange = (e, id, field) => {
        const list = autoList;
        const index = list.findIndex(x => x.id === id);
        if(field !== 'caracteristicas')
            list[index][`${field}`] = e.target != null ? e.target.value : {id: e.value, [field]: e.label};
        else {
            list[index].caracteristicas = e.map(x => {
                return({
                    id: x.value,
                    caracteristica: x.label
                });
            })
        }
        setAutoList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = autoList.findIndex(x => x.id === id);
        const auto = autoList[index];
        const data = {
            ...auto,
            marca: auto.marca.id,
            categoria: auto.categoria.id,
            caracteristicas: auto.caracteristicas.map(x => x.id)
        };
        if(auto.modelo !== '' && auto.anio !== 0 && auto.precio !== 0 && auto.marca !== null && auto.categoria !== null && auto.caracteristicas.length > 0) {
            AutoDataAccess.update(id, data).then(() => {
                //Marca actualizada con éxito
            });
        }
    }

    const onDeleteClick = (e, id) => {
        AutoDataAccess.delete(id).then(() => {
            updateList();
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...createData,
            marca: createData.marca.value,
            categoria: createData.categoria.value,
            caracteristicas: createData.caracteristicas.map(x => x.value)
        };

        if(createData.modelo !== '' && createData.anio !== 0 && createData.precio !== 0 && createData.marca !== null && createData.categoria !== null && createData.caracteristicas.length > 0) {
            AutoDataAccess.create(data).then(() => {
                updateList();
            });
            setCreateData(defaultData);
        }
    }

    useEffect(() => {
        updateList();

        MarcaDataAccess.list().then(() => {
            setMarcaOptions(MarcaDataAccess.response.data.map(x => {
                return({
                    value: x.id,
                    label: x.marca
                });
            }));
        });

        CategoriaDataAccess.list().then(() => {
            setCategoriaOptions(CategoriaDataAccess.response.data.map(x => {
                return({
                    value: x.id,
                    label: x.categoria
                });
            }));
        });

        CaracteristicaDataAccess.list().then(() => {
            setCaracteristicaOptions(CaracteristicaDataAccess.response.data.map(x => {
                return({
                    value: x.id,
                    label: x.caracteristica
                });
            }));
        });
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de autos</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <div>
                    <input
                        className='form-input inside-container'
                        type='text'
                        placeholder='Ingrese el nombre del modelo...'
                        maxLength={50}
                        required
                        value={createData.modelo}
                        onChange={(e) => onInputChange(e, 'modelo')}
                    />
                    <input
                        className='form-input inside-container number'
                        type='number'
                        placeholder='Ingrese el año...'
                        required
                        value={createData.anio}
                        onChange={(e) => onInputChange(e, 'anio')}
                    />
                    <input
                        className='form-input inside-container number'
                        type='number'
                        placeholder='Ingrese el precio...'
                        maxLength={15}
                        required
                        value={createData.precio}
                        onChange={(e) => onInputChange(e, 'precio')}
                    />
                    <Select
                        className='form-input select inside-container'
                        placeholder='Seleccione la marca...'
                        value={createData.marca}
                        onChange={(option) => onInputChange(option, 'marca')}
                        options={marcaOptions}
                    />
                    <Select
                        className='form-input select inside-container'
                        placeholder='Seleccione la categoría...'
                        value={createData.categoria}
                        onChange={(option) => onInputChange(option, 'categoria')}
                        options={categoriaOptions}
                    />
                    <Select
                        className='form-input select inside-container'
                        placeholder='Seleccione las características...'
                        value={createData.caracteristicas}
                        onChange={(options) => onInputChange(options, 'caracteristicas')}
                        options={caracteristicaOptions}
                        isMulti
                    />
                </div>
                <div className='button-container'><button className='multi-form-button' type='submit'>Agregar</button></div>
            </form>
            <div className='grid'>
                <ul className='management-list'>
                    {autoList.map((auto) => (
                        <li key={auto.id} className='management-list-item'>
                            <div className='management-list-item-container'>
                                <input
                                    className='management-list-item-input auto'
                                    type='text'
                                    placeholder='Ingrese el nombre del modelo...'
                                    maxLength={50}
                                    required
                                    value={auto.modelo}
                                    onChange={(e) => onEditInputChange(e, auto.id,'modelo')}
                                />
                                <input
                                    className='management-list-item-input number auto'
                                    type='number'
                                    placeholder='Ingrese el año...'
                                    required
                                    value={auto.anio}
                                    onChange={(e) => onEditInputChange(e, auto.id, 'anio')}
                                />
                                <input
                                    className='management-list-item-input number auto'
                                    type='number'
                                    placeholder='Ingrese el precio...'
                                    maxLength={15}
                                    required
                                    value={auto.precio}
                                    onChange={(e) => onEditInputChange(e, auto.id, 'precio')}
                                />
                                <Select
                                    className='management-list-item-input auto select'
                                    placeholder='Seleccione la marca...'
                                    value={{value: auto.marca.id, label: auto.marca.marca}}
                                    onChange={(option) => onEditInputChange(option, auto.id, 'marca')}
                                    options={marcaOptions}
                                />
                                <Select
                                    className='management-list-item-input auto select'
                                    placeholder='Seleccione la categoría...'
                                    value={{value: auto.categoria.id, label: auto.categoria.categoria}}
                                    onChange={(option) => onEditInputChange(option, auto.id, 'categoria')}
                                    options={categoriaOptions}
                                />
                                <Select
                                    className='management-list-item-input auto select'
                                    placeholder='Seleccione las características...'
                                    value={auto.caracteristicas.map(x => {
                                        return({
                                            value: x.id,
                                            label: x.caracteristica
                                        });
                                    })}
                                    onChange={(options) => onEditInputChange(options, auto.id, 'caracteristicas')}
                                    options={caracteristicaOptions}
                                    isMulti
                                />
                            </div>
                            <div className='caracteristica-options'>
                                <button className='caracteristica-options-button'
                                        onClick={(e) => onEditClick(e, auto.id)}>Editar
                                </button>
                                <button className='caracteristica-options-button'
                                        onClick={(e) => onDeleteClick(e, auto.id)}>Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AutoManagement;