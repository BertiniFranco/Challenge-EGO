import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MarcaManagement from '../src/components/MarcaManagement';
import CaracteristicaManagement from './components/CaracteristicaManagement';
import CategoriaManagement from './components/CategoriaManagement';


const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/caracteristica/' element={<CaracteristicaManagement />}/>
                <Route path='/categoria/' element={<CategoriaManagement />}/>
                <Route path='/marca/' element={<MarcaManagement />}/>
            </Routes>
        </div>
    );
};

export default Router;
