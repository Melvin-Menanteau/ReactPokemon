import {useEffect, useState} from "react";
import PokemonCard from '../components/pokemon/Card';
import BaseLayout from '../components/BaseLayout';

const Pokedex = () => {
    const [pokemonsData, setPokemonsData] = useState([]);   
    const [search, setPokemonSearch] = useState("");
    const [initOk, setInitOk] = useState(false);
    const [typesData, setTypesData] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);

    const getAllPokemon = () => {
        setPokemonsData([]);
        
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`)
        .then((response) => {
            response.json().then((data) => {
                let pkDatas = [];

                Promise.all(data.results.map((pokemon) => {
                    return new Promise((resolve) => {
                        getOnePokemon(pokemon.name).then((data) => {
                            pkDatas.push(data)
                            resolve();
                        });
                    });
                }))
                .then(() => {
                    setPokemonsData(pkDatas.sort((a, b) => a.id < b.id ? -1 : 1));
                })
            })
        })
    }

    const getOnePokemon = (pokemonName) => {
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
            setTypeFilter(typeFilter.splice(typeFilter.indexOf(type), 1))
        } else {
            setTypeFilter([...typeFilter, type]);
        }
    }

    const init = () => {
        if (initOk) return;

        getAllPokemon();
        getAllTypes();
        setInitOk(true);
    }

    init();

    return (
        <BaseLayout page={
            <div>
                <div id="pokemonFilterContainer">
                    <input id="pokemonSearchBar" type="text" placeholder="Chercher Pokémon" onChange={(e) => setPokemonSearch(e.target.value)}/>
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
                                >{type.name === 'reset' ? 'Reset' : ''}</button>
                            )
                        })
                    }</div>
                </div>
                <div className="pokedexContainer">{
                    pokemonsData.filter((pokemon) => {
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