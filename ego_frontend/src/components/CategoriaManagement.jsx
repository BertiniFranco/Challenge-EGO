import React, {useState, useEffect} from 'react'
import CategoriaDataAccess from '../DataAccess/CategoriaDataAccess';
import '../styles/Management.css';


const CategoriaManagement = () => {
    const [categoriaList, setCategoriaList] = useState([]);

    const updateList = () => {
        CategoriaDataAccess.list().then(() => {
            setCategoriaList(CategoriaDataAccess.response.data)
        });
    }

    const [createInputValue, setCreateInputValue] = useState('');

    const onCreateInputChange = (e) => {
        setCreateInputValue(e.target.value);
    }

    const onEditInputValue = (e, id) => {
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
                //Marca actualizada con éxito
            });
        }
    }

    const onDeleteClick = (e, id) => {
        CategoriaDataAccess.delete(id).then(() => {
            updateList();
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const categoria = createInputValue;
        if(categoria !== '') {
            CategoriaDataAccess.create({'categoria': categoria}).then(() => {
                updateList();
            });
            setCreateInputValue('');
        }
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
                                onChange={(e) => onEditInputValue(e, categoria.id)}
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