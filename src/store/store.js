import { configureStore } from '@reduxjs/toolkit';
import showInfoPokemonSlice from './showInfoPokemon';

const store = configureStore({
    reducer: {
        showInfoPokemon: showInfoPokemonSlice.reducer
    }
});

export default store;