import React, {useState, useEffect} from 'react'
import ModeloDataAccess from '../dataAccess/ModeloDataAccess';
import CategoriaDataAccess from '../dataAccess/CategoriaDataAccess';
import '../styles/Management.css';
import Select from "react-select";


const ModeloManagement = () => {
    const [modeloList, setModeloList] = useState([]);
    const [categoriaOptions, setCategoriaOptions] = useState([]);

    const updateList = () => {
        ModeloDataAccess.list().then(() => {
            setModeloList(ModeloDataAccess.response.data)
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

    const onEditInputChange = (e, id) => {
        const list = modeloList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            id: id,
            modelo: e.target.value
        };
        setModeloList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = modeloList.findIndex(x => x.id === id);
        const modelo = modeloList[index].modelo;
        const categoria = modeloList[index].categoria.value;
        if(modelo !== '') {
            ModeloDataAccess.update(id, {'modelo': modelo, categoria: categoria}).then(() => {
               //Marca actualizada con éxito
            });
        }
    }

    const onDeleteClick = (e, id) => {
        ModeloDataAccess.delete(id).then(() => {
            updateList();
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const modelo = modeloInputValue;
        const categoria = categoriaInputValue.value;
        if(modelo !== '') {
            ModeloDataAccess.create({'modelo': modelo, categoria: categoria}).then(() => {
                updateList();
            });
            setModeloInputValue('');
        }
    }

    useEffect(() => {
        CategoriaDataAccess.list().then(() => {
            setCategoriaOptions(CategoriaDataAccess.response.data.map(x => {
                return({
                    value: x.id,
                    label: x.categoria
                });
            }));
        });
        updateList();
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de modelos</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <Select
                    className='form-input select inside-container'
                    placeholder='Seleccione la categoría...'
                    value={categoriaInputValue}
                    onChange={(option) => onCategoriaInputChange(option)}
                    options={categoriaOptions}
                />
                <input
                    className='form-input'
                    type='text'
                    placeholder='Ingrese un modelo...'
                    maxLength={50}
                    required
                    value={modeloInputValue}
                    onChange={onModeloInputChange}
                />
                <button className='form-button options-button' type='submit'>Agregar</button>
            </form>
            <div className='grid'>
                <ul className='management-list'>
                {modeloList.map((modelo) => (
                        <li key={modelo.id} className='management-list-item'>
                            <Select
                                className='management-list-item-input auto select'
                                placeholder='Seleccione la categoría...'
                                value={{value: modelo.categoria.id, label: modelo.categoria.categoria}}
                                onChange={(option) => onEditInputChange(option, modelo.id, 'categoria')}
                                options={categoriaOptions}
                            />
                            <input
                                className='management-list-item-input'
                                type='text'
                                maxLength={50}
                                value={modelo.modelo}
                                onChange={(e) => onEditInputChange(e, modelo.id)}
                            />
                            <div className='options'>
                                <button className='options-button' onClick={(e) => onEditClick(e, modelo.id)}>Editar</button>
                                <button className='options-button' onClick={(e) => onDeleteClick(e, modelo.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ModeloManagement;