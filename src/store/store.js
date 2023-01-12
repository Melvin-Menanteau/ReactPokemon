import { configureStore } from '@reduxjs/toolkit';
import pokemonsData from './pokemonsData';
import showInfoPokemonSlice from './showInfoPokemon';

const store = configureStore({
    reducer: {
        showInfoPokemon: showInfoPokemonSlice.reducer,
        pokemonsData: pokemonsData.reducer
    }
});

export default store;