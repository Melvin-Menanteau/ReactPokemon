const PokemonInfo = ({data}) => {
    return (
        <div className="pokemonInfo">
            <div className="pokemonInfoNS">
                <div className="pokemonName">{data.name}</div>
                <div className="pokemonInfoType">{
                    data.types.map(({type}) => {return type.name}).join('-')
                }</div>
            </div>
            <div className="pokemonInfoStats">{
                data.stats.map(({base_stat, stat}) => {
                    return [
                        <div>{stat.name || ''}</div>,
                        <div>{base_stat || 0}</div>
                    ]
                })
            }</div>
        </div>
    )
};

export default PokemonInfo;