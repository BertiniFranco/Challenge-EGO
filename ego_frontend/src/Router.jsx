import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AutoManagement from './components/AutoManagement';
import ModeloManagement from './components/ModeloManagement';
import CaracteristicaManagement from './components/CaracteristicaManagement';
import CategoriaManagement from './components/CategoriaManagement';


const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AutoManagement />}/>
                <Route path='/caracteristica/' element={<CaracteristicaManagement />}/>
                <Route path='/categoria/' element={<CategoriaManagement />}/>
                <Route path='/modelo/' element={<ModeloManagement />}/>
            </Routes>
        </div>
    );
};

export default Router;
