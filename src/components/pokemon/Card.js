import {useState, useEffect} from "react";
import Header from './Header';
import PokemonInfo from './PokemonInfo';

const PokemonCard = ({
    data
}) => {
    const [showInfoPokemon, setShowInfoPokemon] = useState(false);

    const handlerClickCard = () => {
        setShowInfoPokemon(!showInfoPokemon);
    }

    const borderColor = {
        borderColor: `var(--${data.types[0].type.name})`
    }

    return(
        <div className={`pokemonCard`} onClick={handlerClickCard} style={borderColor}>
            {
                showInfoPokemon ? (
                    <PokemonInfo data={data} key={data.id}></PokemonInfo>
                ) : (
                    <Header data={data} key={data.id}/>
                )
            }
        </div>
    )
};

// const PokemonCard = (props) => {
//     const [pokemonsData, setPokemonsData] = useState([]);   
//     const [search, setPokemonSearch] = useState("");

//     const getAllPokemon = () => {
//         setPokemonsData([]);
        
//         fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`)
//         .then((response) => {
//             response.json().then((data) => {
//                 let pkDatas = [];

//                 Promise.all(data.results.map((pokemon) => {
//                     return new Promise((resolve) => {
//                         getOnePokemon(pokemon.name).then((data) => {
//                             pkDatas.push(data)
//                             resolve();
//                         });
//                     });
//                 }))
//                 .then(() => {
//                     setPokemonsData(pkDatas.sort((a, b) => a.id < b.id ? -1 : 1));
//                 })
//             })
//         })
//     }

//     const getOnePokemon = (pokemonName) => {
//         return new Promise((resolve, reject) => {
//             fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//             .then((response) => {
//                 response.json().then((data) => {
//                     resolve(data);
//                 });
//             })
//             .catch((err) => {
//                 console.log(`Pokemon: ${pokemonName} Error: ${err}`);
//             });
//         });
//     }

//     useEffect(() => {
//         if (!search) getAllPokemon();
//         else getOnePokemon(search).then((res) => setPokemonsData([res]));      
//     }, [search]);

//     useEffect(() => {
//         if(pokemonsData.length) console.table(pokemonsData);
//     }, [pokemonsData])

//     return (
//         pokemonsData.map((pokemon) => {
//             return (
//                 <Header className="pokemonCard" data={pokemon} key={pokemon.id}/>
//             )
//         })
//     )
// };

export default PokemonCard;