import { BrowserRouter } from 'react-router-dom'
import Router from './Router';
import Layout from './components/Layout';
import './App.css';


function App() {
  return (
      <BrowserRouter>
          <div className='App'>
              <Layout>
                  <Router/>
              </Layout>
          </div>
      </BrowserRouter>
  );
}

export default App;
