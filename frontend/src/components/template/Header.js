import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getFromStorage, saveToStorage } from '../../utils/localStorage'

function Header({cart, setCart}) {

  const [openedDrawer, setOpenedDrawer] = useState(false)

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
            </ul>
            <h5 style={{marginRight: '10px', marginTop: '10px'}}>Howdy, {getFromStorage('firstname')}</h5>
            <a href="/cart">
              <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">{cart.reduce((sum, item) => sum+item.quantity,0)}</span>
              </button>
            </a>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={changeNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item" onClick={changeNav}>
                      Sign Up
                    </Link>
                    <Link to="/orders" className="dropdown-item" onclick={changeNav}>
                      Order History
                    </Link>
                    <li>
                    <Link to="/managehistory" className="dropdown-item" onClick={changeNav}>
                      Manage History
                    </Link>
                    </li>
                  </li>
                  <li>
                    <Link to="/manageinventory" className="dropdown-item" onClick={changeNav}>
                      Manage Inventory
                    </Link>
                  </li>
                  <li>
                    <Link to="/stores" className="dropdown-item" onClick={changeNav}>
                      Manage Stores
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item" onClick={changeNav}>
                      Settings
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <Link to="/cart">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{cart.reduce((sum, item) => sum+item.quantity,0)}</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
