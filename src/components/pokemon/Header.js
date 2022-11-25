import {useState, useEffect} from "react";

const Header = ({data}) => {
    const [showShinySprite, setShowShinySprite] = useState(false);

    const handlerShowShiny = () => {
        setShowShinySprite(!showShinySprite);
    }

    // TODO button -> svg
    return (
        <div className="pokemonCardHeader">
            <button className={`pokemonCardShinyButton ${showShinySprite ? 'shiny' : ''}`} onClick={handlerShowShiny}></button>
            <img src={showShinySprite ? data.sprites.front_shiny : data.sprites.front_default} alt="test"/>
            <div className="pokemonName">{data.name}</div>
        </div>
    )
}

export default Header;