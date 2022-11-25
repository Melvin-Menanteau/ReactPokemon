import Menu from '../components/Menu';

const Layout = ({page}) => {
    return (
        <div id="baseLayout">
            <Menu></Menu>
            <div id="pageContainer">{page}</div>
        </div>
    )
};

export default Layout;