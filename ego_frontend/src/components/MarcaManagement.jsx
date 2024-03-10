import React, {useState, useEffect} from 'react'
import MarcaDataAccess from '../DataAccess/MarcaDataAccess';
import '../styles/Management.css';


const MarcaManagement = () => {
    const [marcaList, setMarcaList] = useState([]);

    const updateList = () => {
        MarcaDataAccess.list().then(() => {
            setMarcaList(MarcaDataAccess.response.data)
        });
    }

    const [createInputValue, setCreateInputValue] = useState('');

    const onCreateInputChange = (e) => {
        setCreateInputValue(e.target.value);
    }

    const onEditInputValue = (e, id) => {
        const list = marcaList;
        const index = list.findIndex(x => x.id === id);
        list[index] = {
            id: id,
            marca: e.target.value
        };
        setMarcaList([...list]);
    }

    const onEditClick = (e, id) => {
        const index = marcaList.findIndex(x => x.id === id);
        const marca = marcaList[index].marca;
        if(marca !== '') {
            MarcaDataAccess.update(id, {'marca': marca}).then(() => {
               //Marca actualizada con éxito
            });
        }
    }

    const onDeleteClick = (e, id) => {
        MarcaDataAccess.delete(id).then(() => {
            updateList();
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const marca = createInputValue;
        if(marca !== '') {
            MarcaDataAccess.create({'marca': marca}).then(() => {
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
            <h1 className='management-title'>Administración de marcas</h1>
            <form className='management-form' onSubmit={onFormSubmit}>
                <input
                    className='form-input'
                    type='text'
                    placeholder='Ingrese una marca...'
                    maxLength={50}
                    required
                    value={createInputValue}
                    onChange={onCreateInputChange}
                />
                <button className='form-button options-button' type='submit'>Agregar</button>
            </form>
            <div className='grid'>
                <ul className='management-list'>
                {marcaList.map((marca) => (
                        <li key={marca.id} className='management-list-item'>
                            <input
                                className='management-list-item-input'
                                type='text'
                                maxLength={50}
                                value={marca.marca}
                                onChange={(e) => onEditInputValue(e, marca.id)}
                            />
                            <div className='options'>
                                <button className='options-button' onClick={(e) => onEditClick(e, marca.id)}>Editar</button>
                                <button className='options-button' onClick={(e) => onDeleteClick(e, marca.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MarcaManagement;