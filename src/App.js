import './App.css';
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

/*
TODO:
  - Page de login
  - Corriger filtres
  - Corriger shiny
  - Favoris
*/

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;