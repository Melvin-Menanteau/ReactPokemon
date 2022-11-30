import { useDispatch } from 'react-redux';
import { toggleShowInfoPokemon } from '../../store/showInfoPokemon';
import { useState } from "react";

const Header = ({data}) => {
    const dispatch = useDispatch();
    const [showShinySprite, setShowShinySprite] = useState(false);

    const handlerClickCard = (event) => {
        if (!event.target.classList.contains('pokemonCardShinyButton'))
            dispatch(toggleShowInfoPokemon(data.id));
    }

    const handlerShowShiny = () => {
        setShowShinySprite(!showShinySprite);
    }

    return (
        <div className="pokemonCardHeader" onClick={(event) => handlerClickCard(event)}>
            <button className={`pokemonCardShinyButton ${showShinySprite ? 'shiny' : ''}`} onClick={handlerShowShiny}></button>            
            <img src={showShinySprite ? data.sprites.front_shiny : data.sprites.front_default} alt={data.name}/>
            <div className="pokemonName">{data.name}</div>            
        </div>
    )
}

export default Header;