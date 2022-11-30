import { configureStore } from '@reduxjs/toolkit';
import pokemonsData from './pokemonsData';
import showInfoPokemonSlice from './showInfoPokemon';
import favPokemonSlice from './favPokemonStore';

const store = configureStore({
    reducer: {
        showInfoPokemon: showInfoPokemonSlice.reducer,
        favPokemon: favPokemonSlice.reducer,
        pokemonsData: pokemonsData.reducer
    }
});

export default store;