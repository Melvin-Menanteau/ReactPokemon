import './App.css';
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Favorite from "./pages/Favorite";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { fetchAllPokemons, getFavoritesPokemons } from './store/pokemonsData';

function App() {
  useEffect(() => {
    store.dispatch(fetchAllPokemons());
    store.dispatch(getFavoritesPokemons());
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;