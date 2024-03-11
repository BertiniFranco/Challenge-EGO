import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useSnackbar} from 'notistack';
import Notifier from './Notifier';
import AutoDataAccess from '../dataAccess/AutoDataAccess';
import ModeloDataAccess from '../dataAccess/ModeloDataAccess';
import CaracteristicaDataAccess from '../dataAccess/CaracteristicaDataAccess';
import '../styles/Management.css';


const AutoManagement = () => {
    const {enqueueSnackbar} = useSnackbar();
    const notifier = new Notifier(enqueueSnackbar);

    const [autoList, setAutoList] = useState([]);

    const updateList = () => {
        AutoDataAccess.list().then(() => {
            if(!AutoDataAccess.hasError)
                setAutoList(AutoDataAccess.response.data);
            else notifier.notifyApiError(AutoDataAccess);
        });
    }

    const [modeloOptions, setModeloOptions] = useState([]);
    const [caracteristicaOptions, setCaracteristicaOptions] = useState([]);

    const defaultData = {
        anio: '',
        precio: '',
        modelo: null,
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
            anio: Number(auto.anio),
            precio: Number(auto.precio),
            modelo: auto.modelo?.id,
            caracteristicas: auto.caracteristicas.map(x => x.id)
        };
        if(auto.anio !== undefined && auto.anio !== '' && auto.precio !== undefined && auto.precio !== '' && auto.modelo !== undefined && auto.caracteristicas.length > 0) {
            AutoDataAccess.update(id, data).then(() => {
                if(!AutoDataAccess.hasError)
                   notifier.notifySuccess('Auto actualizado con éxito.');
                else notifier.notifyApiError(AutoDataAccess);
            });
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    const onDeleteClick = (e, id) => {
        AutoDataAccess.delete(id).then(() => {
            if(!AutoDataAccess.hasError) {
                updateList();
                notifier.notifySuccess('Auto eliminado con éxito.');
            }
            else notifier.notifyApiError(AutoDataAccess);
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...createData,
            anio: Number(createData.anio),
            precio: Number(createData.precio),
            modelo: createData.modelo?.value,
            caracteristicas: createData.caracteristicas.map(x => x.value)
        };
        if(createData.anio !== undefined && createData.anio !== '' && createData.precio !== undefined && createData.precio !== '' && createData.modelo !== undefined && createData.categoria !== null && createData.caracteristicas.length > 0) {
            AutoDataAccess.create(data).then(() => {
                if(!AutoDataAccess.hasError) {
                    updateList();
                    notifier.notifySuccess('Auto agregado con éxito.');
                }
                else notifier.notifyApiError(AutoDataAccess);
            });
            setCreateData(defaultData);
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    useEffect(() => {
        updateList();

        ModeloDataAccess.list().then(() => {
            if(!AutoDataAccess.hasError) {
                setModeloOptions(ModeloDataAccess.response.data.map(x => {
                    return({
                        value: x.id,
                        label: x.modelo
                    });
                }));
            }
            else notifier.notifyApiError(AutoDataAccess);
        });

        CaracteristicaDataAccess.list().then(() => {
            if(!AutoDataAccess.hasError) {
                setCaracteristicaOptions(CaracteristicaDataAccess.response.data.map(x => {
                    return({
                        value: x.id,
                        label: x.caracteristica
                    });
                }));
            }
            else notifier.notifyApiError(AutoDataAccess);
        });
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de autos</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <div>
                    <Select
                        className='form-input select inside-container'
                        placeholder='Seleccione el modelo...'
                        value={createData.modelo}
                        onChange={(option) => onInputChange(option, 'modelo')}
                        options={modeloOptions}
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
                                <Select
                                    className='management-list-item-input auto select'
                                    placeholder='Seleccione la marca...'
                                    value={{value: auto.modelo.id, label: auto.modelo.modelo}}
                                    onChange={(option) => onEditInputChange(option, auto.id, 'modelo')}
                                    options={modeloOptions}
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