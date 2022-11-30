import { createSlice } from '@reduxjs/toolkit';

const showInfoPokemonSlice = createSlice({
    name: 'showInfoPokemon',
    initialState: [{}],
    reducers: {
        toggleShowInfoPokemon(state, action) {
            let pokemon = state.find((pokemon) => pokemon.pokemonID === action.payload);

            if (pokemon) {
                state.forEach((pokemon) => {
                    if (pokemon.pokemonID === action.payload) {
                        pokemon.showInfo = !pokemon.showInfo;
                    }
                });
            } else {
                state.push({
                    pokemonID: action.payload,
                    showInfo: true
                });
            }
        }
    }
});

export const { toggleShowInfoPokemon } = showInfoPokemonSlice.actions;

export default showInfoPokemonSlice;