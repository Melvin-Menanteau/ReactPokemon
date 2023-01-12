import { useDispatch, useSelector } from 'react-redux';
import { toggleShowInfoPokemon } from '../../store/showInfoPokemon';
import { toggleFavoritePokemon } from '../../store/pokemonsData';
import { useState } from "react";

const Header = ({data}) => {
    const dispatch = useDispatch();
    const [showShinySprite, setShowShinySprite] = useState(false);

    const isFavorite = useSelector(state => state.pokemonsData.favPokemons.find((pokemon) => pokemon.id === data.id)?.favorite || false);

    const handlerClickCard = (event) => {
        if (!event.target.classList.contains('pokemonCardShinyButton'))
            dispatch(toggleShowInfoPokemon(data.id));
    }

    const handlerShowShiny = () => {
        setShowShinySprite(!showShinySprite);
    }

    const handlerFavoritePokemon = () => {
        dispatch(toggleFavoritePokemon(data));
    }

    return (
        <div className="pokemonCardHeader">
            <button className={`pokemonFavoriteButton ${isFavorite ? 'favorite' : ''}`} onClick={handlerFavoritePokemon}></button>
            <button className={`pokemonCardShinyButton ${showShinySprite ? 'shiny' : ''}`} onClick={handlerShowShiny}></button>            
            <img onClick={(event) => handlerClickCard(event)} src={showShinySprite ? data.sprites.front_shiny : data.sprites.front_default} alt={data.name}/>
            <div className="pokemonName">{data.name}</div>            
        </div>
    )
}

export default Header;