import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function getOnePokemon (pokemonName) {
    return new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            console.error(`Erreur lors de la récupération des données pour le Pokemon: ${pokemonName} (${err})`);
        });
    });
}

const fetchAllPokemons = createAsyncThunk(
    'pokemonsData/fetchAllPokemons',
    async () => {
        let allPokemonsRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0');
        let allPokemonsData = await allPokemonsRes.json();

        let allPokemons = [];

        await Promise.all(allPokemonsData.results.map((pokemon) => {
            return new Promise((resolve) => {
                getOnePokemon(pokemon.name).then((data) => {
                    allPokemons.push(data);
                    resolve();
                });
            });
        }));

        allPokemons.sort((a, b) => a.id < b.id ? -1 : 1);

        return allPokemons;
    }
);

const getFavoritesPokemons = createAsyncThunk(
    'pokemonsData/getFavoritesPokemons',
    async () => {
        let ls = JSON.parse(localStorage.getItem('ReactPokemon_FavoritesPokemons'));

        if (!ls || !(Array.isArray(ls))) ls = [];

        return ls;
    }
)

const initialState = {
    pokemons: [],
    favPokemons: [],
    loading: false
}

const pokemonsData = createSlice({
    name: 'pokemonsData',
    initialState: initialState,
    reducers: {
        toggleFavoritePokemon(state, action) {
            let pokemon = state.pokemons.find((pokemon) => pokemon.id === action.payload.id);

            if (pokemon.favorite)
                pokemon.favorite = false;
            else
                pokemon.favorite = true;

            let ls = JSON.parse(localStorage.getItem('ReactPokemon_FavoritesPokemons'));

            if (ls.find((p) => p.id === pokemon.id)) {
                let pkmFav = ls.find((p) => p.id === pokemon.id);

                pkmFav.favorite = !pkmFav.favorite;
                state.favPokemons.find((p) => p.id === pokemon.id).favorite = pkmFav.favorite;
            } else {
                ls.push({...action.payload, favorite: true});
                state.favPokemons.push({...action.payload, favorite: true});
            }

            localStorage.setItem('ReactPokemon_FavoritesPokemons', JSON.stringify(ls));
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllPokemons.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getFavoritesPokemons.fulfilled, (state, action) => {
                state.favPokemons = action.payload;
            })
    }
});

export const { toggleFavoritePokemon } = pokemonsData.actions;
export { fetchAllPokemons, getFavoritesPokemons }

export default pokemonsData;