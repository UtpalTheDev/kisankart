import React from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import kisankartlogo from "./assets/kisankartlogo.png";
import "./styles.css";
import { useReduce } from "./Reducer-context/Reducer-context";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  Products,
  ProductPage,
  User,
  Seed,
  Fertilizer,
  Pesticide,
  Wishlist,
  Home,
  Accessories,
  New,
  Sixpercent,
  Twentypercent,
  Fifteenpercent,
  Tenpercent,
  Login,
  Signup,
  NotFound,
  Cart
} from "./pages";
import { useLogin } from "./Reducer-context/LoginContext";

import {
  cart_add_call,
  cart_decrease_call,
  cart_remove_call,
  wishlist_add_call,
  wishlist_remove_call,
  cart_increase_call
} from "./api/ServerRequest";
/*---------------------APP------------------------------*/

export default function App() {
  let {
    data,
    sortBy,
    showFastDeliveryOnly,
    showInventoryAll,
    showMaterial,
    showIdealFor,
    showDiscount,
    showNew,
    cartlist,
    route,
    wishlist,
    dispatch,
    loading
  } = useReduce();
  const { isUserLogIn } = useLogin();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function getSortedData(productlist, sortBy) {
    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return productlist.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productlist].sort((a, b) => a.price - b.price);
    }
    return productlist;
  }

  function getfilteredData(
    productlist,
    {
      showFastDeliveryOnly,
      showInventoryAll,
      showMaterial,
      showIdealFor,
      showDiscount,
      showNew
    }
  ) {
    return productlist
      .filter((item) => (showInventoryAll ? item.inStock : true))
      .filter((item) => (showFastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) =>
        showIdealFor === "All" ? item.idealFor : item.idealFor === showIdealFor
      )
      .filter((item) =>
        showMaterial === "All" ? item.material : item.material === showMaterial
      )
      .filter((item) =>
        showDiscount === 0 ? item.offer : item.offer === showDiscount
      )
      .filter((item) => (showNew === false ? true : item.isnew === showNew));
  }

  let sortedData = getSortedData(data, sortBy);
  let filteredData = getfilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
    showMaterial,
    showIdealFor,
    showDiscount,
    showNew
  });

  function Add_to_cart_button(id, inStock) {
    return cartlist.reduce(
      (returnobj, item) => {
        if (item.itemId === id && item.qty !== 0) {
          return (
            <>
              <div className="added_to_cart">
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    if (isUserLogIn) {
                      if (item.qty === 1) {
                        let cartmsg = await cart_remove_call(
                          "https://kisankartbackend.herokuapp.com/cart",
                          { itemId: id },
                          dispatch
                        );
                        const notify = () => toast.warn(cartmsg);
                        notify();
                      } else {
                        let cartmsg = await cart_decrease_call(
                          "https://kisankartbackend.herokuapp.com/cart",
                          {
                            items: { itemId: id, qty: item.qty - 1 }
                          },
                          dispatch
                        );
                        const notify = () => toast.warn(cartmsg);
                        notify();
                      }
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  -
                </button>
                {item.qty}

                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    if (isUserLogIn) {
                      let cartmsg = await cart_increase_call(
                        "https://kisankartbackend.herokuapp.com/cart",
                        {
                          items: { itemId: id, qty: item.qty + 1 }
                        },
                        dispatch
                      );
                      const notify = () => toast.success(cartmsg);
                      notify();
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  +
                </button>
              </div>
            </>
          );
        }
        return returnobj;
      },
      <button
        class="cart"
        style={{
          cursor: inStock ? "pointer" : "not-allowed",
          pointerEvents: inStock ? "auto" : "none"
        }}
        onClick={async (event) => {
          event.preventDefault();
          if (isUserLogIn) {
            let cartmsg = await cart_add_call(
              "https://kisankartbackend.herokuapp.com/cart",
              {
                items: { itemId: id, qty: 1 }
              },
              dispatch
            );
            const notify = () => toast.success(cartmsg);
            notify();
          } else {
            navigate("/login", { state: { from: pathname } });
          }
        }}
      >
        {inStock ? "Add to Bag" : "Out of Stock"}
      </button>
    );
  }

  function Add_to_wishlist_button(id) {
    return wishlist.reduce(
      (returnobj, item) => {
        if (item === id) {
          return (
            <>
              <button
                class="wish"
                onClick={async (event) => {
                  event.preventDefault();
                  if (isUserLogIn) {
                    let wishlistmsg = await wishlist_remove_call(
                      "https://kisankartbackend.herokuapp.com/wishlist",
                      { itemId: id },
                      dispatch
                    );
                    const notify = () => toast.warn(wishlistmsg);
                    notify();
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <i class="fas fa-heart" style={{ color: "rgb(186, 0, 0)" }}></i>
              </button>
            </>
          );
        }
        return returnobj;
      },
      <button
        class="wish"
        onClick={async (event) => {
          event.preventDefault();
          if (isUserLogIn) {
            let wishlistmsg = await wishlist_add_call(
              "https://kisankartbackend.herokuapp.com/wishlist",
              {
                itemId: id
              },
              dispatch
            );
            const notify = () => toast.success(wishlistmsg);
            notify();
          } else {
            navigate("/login");
          }
        }}
      >
        <i class="far fa-heart"></i>
      </button>
    );
  }

  return (
    <div className="App">
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
              onClick={() => dispatch({ type: "ROUTE", payload: "cart" })}
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
              onClick={() => dispatch({ type: "ROUTE", payload: "wishlist" })}
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
              onClick={() => dispatch({ type: "ROUTE", payload: "user" })}
            >
              <i class="far fa-user"></i>
            </button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product"
          element={
            <Products
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />

        <Route
          path="/seeds"
          element={
            <Seed
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />

        <Route
          path="/fertilizers"
          element={
            <Fertilizer
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />

        <Route
          path="/pesticides"
          element={
            <Pesticide
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />

        <Route
          path="/accessories"
          element={
            <Accessories
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <Route
          path="/new-product"
          element={
            <New
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <Route
          path="/6"
          element={
            <Sixpercent
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <Route
          path="/20"
          element={
            <Twentypercent
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <Route
          path="/15"
          element={
            <Fifteenpercent
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <Route
          path="/10"
          element={
            <Tenpercent
              filteredData={filteredData}
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
        <PrivateRoute
          path="/cart"
          element={
            <Cart
              Add_to_wishlist_button={Add_to_wishlist_button}
              Add_to_cart_button={Add_to_cart_button}
            />
          }
        />
        <PrivateRoute
          path="/wishlist"
          element={<Wishlist Add_to_cart_button={Add_to_cart_button} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <PrivateRoute path="/user" element={<User />} />

        <Route
          path="/product/:productid"
          element={
            <ProductPage
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {loading && (
        <div className="loader">
          <Loader
            type="BallTriangle"
            color="green"
            height={100}
            width={100}
            timeout={1000000} //3 secs
          />
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
