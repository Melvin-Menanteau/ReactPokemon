import { useSelector } from 'react-redux';
import BaseLayout from '../components/BaseLayout';
import PokemonCard from '../components/pokemon/Card';

const Favorite = () => {
    const favoritesPokemons = useSelector((state) =>
        state.pokemonsData.favPokemons.filter((pokemon) => pokemon.favorite)
    )

    return (
        <BaseLayout page={
            <div className="favoritesContainer">{
                favoritesPokemons.map((pokemon) => {
                    return (
                        <PokemonCard data={pokemon} key={pokemon.id}/>
                    )
                })
            }</div>            
        }/>
    )
}

export default Favorite;