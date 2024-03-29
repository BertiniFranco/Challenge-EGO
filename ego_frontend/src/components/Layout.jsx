import {NavLink} from 'react-router-dom';
import '../styles/Layout.css';


const Layout = ({children}) => {
    return (
        <div className='layout'>
            <header className='header'>
                <nav className='navbar'>
                    <NavLink to={'/'} className='navbar-link'>
                        Auto
                    </NavLink>
                    <NavLink to={'/caracteristica'} className='navbar-link'>
                        Característica
                    </NavLink>
                    <NavLink to={'/categoria'} className='navbar-link'>
                        Categoría
                    </NavLink>
                    <NavLink to={'/modelo'} className='navbar-link'>
                        Modelo
                    </NavLink>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;