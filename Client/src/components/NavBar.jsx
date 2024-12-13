import { Link } from "react-router-dom";

function NavBar () {
    return (
        <nav className="nav-tabs">
            <ul className="ul-nav">
                <li className="my-tabs"><Link to="/home" >Home </Link></li>

                <li className="my-tabs"><Link to="/add_new_toy" >Add New Toy</Link></li>

                <li className="my-tabs"><Link to="/mission" >Mission</Link></li> 
            </ul>
        </nav>
    )
}
export default NavBar;
