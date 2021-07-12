import {Link} from "react-router-dom"
import kisankartlogo from "../assets/kisankartlogo.png";

export function Navbar({cartlist,wishlist}){

    return(
        <div className="ecom-navbar">
        <Link to="/">
          <div className="logo">
            <img src={kisankartlogo} alt="logo" />
            <span>KisanKart</span>
          </div>
        </Link>
        <div class="navbar">
          <Link to="/cart">
            <button
              class="icon-button lg"
            >
              <i class="fas fa-shopping-cart"></i>
              {cartlist.filter((item) => item.qty !== 0).length > 0 ? (
                <div class="icon-badge">
                  {cartlist
                    .filter((item) => item.qty !== 0)
                    .reduce((total, item) => total + item.qty, 0)}
                </div>
              ) : (
                ""
              )}
            </button>
          </Link>

          <Link to="/wishlist">
            <button
              class="icon-button lg"
            >
              <i class="far fa-heart"></i>
              {wishlist.length > 0 ? (
                <div class="icon-badge">{wishlist.length}</div>
              ) : (
                ""
              )}
            </button>
          </Link>
          <Link to="/user">
            <button
              class="icon-button lg"
            >
              <i class="far fa-user"></i>
            </button>
          </Link>
        </div>
      </div>
    )
}