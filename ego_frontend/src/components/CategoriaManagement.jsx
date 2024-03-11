import React, {useState, useEffect} from 'react';
import {useSnackbar} from 'notistack';
import Notifier from './Notifier';
import CategoriaDataAccess from '../dataAccess/CategoriaDataAccess';
import '../styles/Management.css';


const CategoriaManagement = () => {
    const { enqueueSnackbar} = useSnackbar();
    const notifier = new Notifier(enqueueSnackbar);

    const [categoriaList, setCategoriaList] = useState([]);

    const updateList = () => {
        CategoriaDataAccess.list().then(() => {
            if(!CategoriaDataAccess.hasError)
                setCategoriaList(CategoriaDataAccess.response.data);
            else notifier.notifyApiError(CategoriaDataAccess);
        });
    }

    const [createInputValue, setCreateInputValue] = useState('');

    const onCreateInputChange = (e) => {
        setCreateInputValue(e.target.value);
    }

    const onEditInputChange = (e, id) => {
        const list = categoriaList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            id: id,
            categoria: e.target.value
        };
        setCategoriaList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = categoriaList.findIndex(x => x.id === id);
        const categoria = categoriaList[index].categoria;
        if(categoria !== '') {
            CategoriaDataAccess.update(id, {'categoria': categoria}).then(() => {
                if(!CategoriaDataAccess.hasError)
                    notifier.notifySuccess('Categoría actualizada con éxito.')
                else notifier.notifyApiError(CategoriaDataAccess);
            });
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    const onDeleteClick = (e, id) => {
        CategoriaDataAccess.delete(id).then(() => {
            if(!CategoriaDataAccess.hasError) {
                updateList();
                notifier.notifySuccess('Categoría eliminada con éxito.')
            }
            else notifier.notifyApiError(CategoriaDataAccess);
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const categoria = createInputValue;
        if(categoria !== '') {
            CategoriaDataAccess.create({'categoria': categoria}).then(() => {
                if(!CategoriaDataAccess.hasError) {
                    updateList();
                    notifier.notifySuccess('Categoría agregada con éxito.')
                }
                else notifier.notifyApiError(CategoriaDataAccess);
            });
            setCreateInputValue('');
        }
        else notifier.notifyInfo('Complete todos los campos.');
    }

    useEffect(() => {
        updateList();
    }, []);

    return(
        <div className='management'>
            <h1 className='management-title'>Administración de categorías</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <input
                    className='form-input'
                    type='text'
                    placeholder='Ingrese una categoría...'
                    maxLength={50}
                    required
                    value={createInputValue}
                    onChange={onCreateInputChange}
                />
                <button className='form-button options-button' type='submit'>Agregar</button>
            </form>
            <div className='grid'>
                <ul className='management-list'>
                    {categoriaList.map((categoria) => (
                        <li key={categoria.id} className='management-list-item'>
                            <input
                                className='management-list-item-input'
                                type='text'
                                maxLength={50}
                                value={categoria.categoria}
                                onChange={(e) => onEditInputChange(e, categoria.id)}
                            />
                            <div className='options'>
                                <button className='options-button' onClick={(e) => onEditClick(e, categoria.id)}>Editar</button>
                                <button className='options-button' onClick={(e) => onDeleteClick(e, categoria.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoriaManagement;