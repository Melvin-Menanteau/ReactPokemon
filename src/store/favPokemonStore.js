import { createSlice } from '@reduxjs/toolkit';

const favPokemonSlice = createSlice({
    name: 'favPokemon',
    initialState: [],
    reducers: {
        toggleFavoritePokemon(state, action) {
            let pokemon = state.find((pokemon) => pokemon.pokemonID === action.payload);

            if (pokemon) {
                state.forEach((pokemon) => {
                    if (pokemon.pokemonID === action.payload) {
                        pokemon.favorite = !pokemon.favorite;
                    }
                });
            } else {
                state.push({
                    pokemonID: action.payload,
                    favorite: true
                });
            }
        }
    }
});

export const { toggleFavoritePokemon } = favPokemonSlice.actions;

export default favPokemonSlice;