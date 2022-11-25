import { type } from "@testing-library/user-event/dist/type";
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

    const style = {
        "--typeColor": `var(--${data.types[0].type.name})`
    }

    return(
        <div className={`pokemonCard`} onClick={handlerClickCard} style={style}>
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

export default PokemonCard;