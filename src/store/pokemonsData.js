import { createSlice } from '@reduxjs/toolkit';

const pokemonsData = createSlice({
    name: 'pokemonsData',
    initialState: [],
    reducers: {
        addPokemon(state, action) {
            console.log(action.payload);
        }
    }
});

export const { addPokemon } = pokemonsData.actions;

export default pokemonsData;