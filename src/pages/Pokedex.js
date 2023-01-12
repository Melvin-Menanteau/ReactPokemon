import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from '../components/pokemon/Card';
import BaseLayout from '../components/BaseLayout';

const Pokedex = () => {
    const pokemons = useSelector(state => state.pokemonsData.pokemons);
    const [search, setPokemonSearch] = useState("");
    const [initOk, setInitOk] = useState(false);
    const [typesData, setTypesData] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);

    const getAllTypes = () => {
        fetch(`https://pokeapi.co/api/v2/type`)
        .then((response) => {
            response.json().then((typesList) => {
                typesList = typesList.results;

                /* Recuperer les icones des types */
                fetch('https://pokebuildapi.fr/api/v1/types').then((response) => {
                    response.json().then((dataTypesIcon) => {
                        let typesData = [];

                        dataTypesIcon.forEach((typeIcon) => {
                            typesData.push({
                                name: typesList.find((type) => type.name === typeIcon.englishName).name,
                                iconURL: typeIcon.image
                            });
                        });

                        setTypesData(typesData);
                    });
                });
            })
        })
    }
    
    const handlerTypeFilter = (type) => {
        if (type === 'reset') {
            setTypeFilter([]);
        } else if (typeFilter.includes(type)) {
            let temp = typeFilter;

            temp.splice(typeFilter.indexOf(type), 1);
            setTypeFilter(typeFilter.splice(typeFilter.indexOf(type), 1))
        } else {
            setTypeFilter([...typeFilter, type]);
        }
    }

    const init = () => {
        if (initOk) return;

        getAllTypes();
        setInitOk(true);
    }

    init();

    return (
        <BaseLayout page={
            <div>
                <div id="pokemonFilterContainer">
                    <input id="pokemonSearchBar" list="pokemonNamesDatalist" type="text" placeholder="Chercher Pokémon" onChange={(e) => setPokemonSearch(e.target.value)}/>
                    <div id="pokemonFilterTypesContainer">{
                        [...typesData, {name: 'reset'}].map((type) => {
                            return (
                                <button
                                    key={type.name}
                                    className={
                                        `pokemonTypeFilterButton ${type.name === 'reset' ? 'reset' : ''} ${typeFilter.includes(type.name) ? 'active' : ''}`
                                    }
                                    style={{
                                        backgroundImage: `url(${type.iconURL})`,
                                        borderColor: `var(--${type.name})`
                                    }}
                                    onClick={() => {handlerTypeFilter(type.name)}}
                                >{type.name === 'reset' ? 'Effacer' : ''}</button>
                            )
                        })
                    }</div>
                </div>
                <div className="pokedexContainer">{
                    pokemons.filter((pokemon) => {
                        return ((
                                search.length === 0 ||
                                pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            ) && (
                                typeFilter.every((filteredType) => (pokemon.types.map(({type}) => type.name)).includes(filteredType)) ||
                                typeFilter.length === 0
                            )
                        );
                    }).map((pokemon) => {
                        return (
                            <PokemonCard data={pokemon} key={pokemon.id}/>
                        )
                    })
                }</div>
            </div>
        }/>
    )
}

export default Pokedex;