import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Layout from './components/Layout';
import './App.css';


function App() {
  return (
      <BrowserRouter>
          <SnackbarProvider>
              <div className='App'>
                  <Layout>
                      <Router/>
                  </Layout>
              </div>
          </SnackbarProvider>
      </BrowserRouter>
  );
}

export default App;
