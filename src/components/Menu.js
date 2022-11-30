const Menu = () => {
    return (
        <div id="menu">
            <div id="menuHome" className={"menuItem"}>
                <div className={"menuIcon"}/>
                <a href="/">Acceuil</a>
            </div>
            <div id="menuPokedex" className={"menuItem"}>
                <div className={"menuIcon"}/>
                <a href="/pokedex">Pokedex</a>
            </div>
            <div id="menuFavorite" className={"menuItem"}>
                <div className={"menuIcon"}/>
                <a href="/favorite">Favoris</a>
            </div>
        </div>
    )
};

export default Menu;