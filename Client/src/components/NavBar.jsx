import { NavLink } from "react-router-dom";

function NavBar () {
    return (
        <nav className="nav-tabs">
            <ul className="ul-nav">
                <li className="my-tabs">
                    <NavLink to="/home" >Home </NavLink>
                </li>
                <li className="my-tabs">
                    <NavLink to="/add_toy" > Add New Toy </NavLink>
                </li>
                <li className="my-tabs">
                    <NavLink to="/mission" >Mission </NavLink>
                </li> 
            </ul>
        </nav>
    )
}
export default NavBar;
