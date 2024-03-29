import React, {useState, useEffect} from 'react';
import Select from "react-select";
import {useSnackbar} from 'notistack';
import Notifier from './Notifier';
import ModeloDataAccess from '../dataAccess/ModeloDataAccess';
import CategoriaDataAccess from '../dataAccess/CategoriaDataAccess';
import '../styles/Management.css';


const ModeloManagement = () => {
    const {enqueueSnackbar} = useSnackbar();
    const notifier = new Notifier(enqueueSnackbar);

    const [modeloList, setModeloList] = useState([]);
    const [categoriaOptions, setCategoriaOptions] = useState([]);

    const updateList = () => {
        ModeloDataAccess.list().then(() => {
            if(!ModeloDataAccess.hasError)
                setModeloList(ModeloDataAccess.response.data);
            else notifier.notifyApiError(ModeloDataAccess);
        });
    }

    const [modeloInputValue, setModeloInputValue] = useState('');
    const [categoriaInputValue, setCategoriaInputValue] = useState(null);

    const onModeloInputChange = (e) => {
        setModeloInputValue(e.target.value);
    }

    const onCategoriaInputChange = (option) => {
        setCategoriaInputValue(option);
    }

    const onEditModeloInputChange = (e, id) => {
        const list = modeloList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            ...list[index],
            modelo: e.target.value
        };
        setModeloList([...list]);
    }

    const onEditCategoriaInputChange = (option, id) => {
        const list = modeloList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            ...list[index],
            categoria: {
                id: option.value,
                categoria: option.label
            }
        };
        setModeloList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = modeloList.findIndex(x => x.id === id);
        const modelo = modeloList[index].modelo;
        const categoria = modeloList[index].categoria?.id;
        if(modelo !== '' && categoria !== null) {
            ModeloDataAccess.update(id, {'modelo': modelo, categoria: categoria}).then(() => {
                if(!ModeloDataAccess.hasError) {
                    updateList();
                    notifier.notifySuccess('Modelo actualizada con éxito.');
                }
                else notifier.notifyApiError(ModeloDataAccess);
            });
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    const onDeleteClick = (e, id) => {
        ModeloDataAccess.delete(id).then(() => {
            if(!ModeloDataAccess.hasError) {
                updateList();
                notifier.notifySuccess('Modelo eliminado con éxito.');
            }
            else notifier.notifyApiError(ModeloDataAccess);
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const modelo = modeloInputValue;
        const categoria = categoriaInputValue?.value;
        if(modelo !== '' && categoria !== undefined) {
            ModeloDataAccess.create({'modelo': modelo, categoria: categoria}).then(() => {
                if(!ModeloDataAccess.hasError) {
                    updateList();
                    notifier.notifySuccess('Modelo agregado con éxito.');
                }
                else notifier.notifyApiError(ModeloDataAccess);
            });
            setModeloInputValue('');
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    useEffect(() => {
        CategoriaDataAccess.list().then(() => {
            if(!CategoriaDataAccess.hasError) {
                setCategoriaOptions(CategoriaDataAccess.response.data.map(x => {
                    return({
                        value: x.id,
                        label: x.categoria
                    });
                }));
            }
            else notifier.notifyApiError(ModeloDataAccess);
        });
        updateList();
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de modelos</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <div className='management-form-input-container'>
                    <label className='label'>Categoría</label>
                    <Select
                        className='form-input'
                        placeholder='Seleccione la categoría...'
                        value={categoriaInputValue}
                        onChange={(option) => onCategoriaInputChange(option)}
                        options={categoriaOptions}
                    />
                    <label className='label'>Modelo</label>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Ingrese un modelo...'
                        maxLength={50}
                        required
                        value={modeloInputValue}
                        onChange={onModeloInputChange}
                    />
                </div>
                <div className='button-container'>
                    <button className='button' type='submit'>Agregar</button>
                </div>
            </form>
            <div className='management-list'>
                {modeloList.map((modelo) => (
                    <div key={modelo.id} className='management-list-item'>
                        <div className='management-list-item-container'>
                            <label className='label'>Categoría</label>
                            <Select
                                className='management-list-item-input'
                                placeholder='Seleccione la categoría...'
                                value={{value: modelo.categoria.id, label: modelo.categoria.categoria}}
                                onChange={(option) => onEditCategoriaInputChange(option, modelo.id)}
                                options={categoriaOptions}
                            />
                            <label className='label'>Modelo</label>
                            <input
                                className='management-list-item-input'
                                type='text'
                                maxLength={50}
                                value={modelo.modelo}
                                onChange={(e) => onEditModeloInputChange(e, modelo.id)}
                            />
                        </div>
                        <div className='management-list-options'>
                            <button className='management-list-options-button button' onClick={(e) => onEditClick(e, modelo.id)}>Editar</button>
                            <button className='management-list-options-button button' onClick={(e) => onDeleteClick(e, modelo.id)}>Eliminar</button>
                        </div>
                    </div>
                    ))}
                </div>
        </div>
    );
};

export default ModeloManagement;