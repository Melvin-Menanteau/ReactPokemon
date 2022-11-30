import { useSelector } from 'react-redux';
import Header from './Header';
import PokemonInfo from './PokemonInfo';

const PokemonCard = ({
    data
}) => {
    const showInfoPokemon = useSelector(state => state.showInfoPokemon.find((pokemon) => pokemon.pokemonID === data.id)?.showInfo || false);

    const style = {
        "--typeColor": `var(--${data.types[0].type.name})`
    }

    return(
        <div className={`pokemonCard`} style={style}>
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