import React from "react";
import axios from "axios";

import kisankartlogo from "./assets/kisankartlogo.png";
import "./styles.css";
import { useReduce } from "./Reducer-context";
import { Route, Routes, Link } from "react-router-dom";

import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Home from "./Home";
import Seed from "./Seed";
import Fertilizer from "./Fertilizer";
import Pesticide from "./Pesticide";
import Accesories from "./Accesories";
import New from "./New";
import Sixpercent from "./Sixpercent";
import Twentypercent from "./Twentypercent";
import Fifteenpercent from "./Fifteenpercent";
import Tenpercent from "./Tenpercent";
import ProductPage from "./ProductPage";
/*---------------------APP------------------------------*/

export default function App() {
  //console.log(state.sort,state.product);
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
    dispatch
  } = useReduce();

  console.log("widhlist", data);

  function getSortedData(productlist, sortBy) {
    //console.log("ll",sortBy);
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
    // console.log(">", showDiscount);
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

  //  console.log("state.sortby", sortBy);

  let sortedData = getSortedData(data, sortBy);
  let filteredData = getfilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
    showMaterial,
    showIdealFor,
    showDiscount,
    showNew
  });
  // console.log("lll", filteredData);
  // console.log("l", showDiscount);
  async function cart_add_call(url, payload) {
    try {
      let response = await axios.post(url, payload);
      if (response.status === 200) {
        dispatch({
          type: "ADD_TO_CART",
          payload: { itemId: payload.items.itemId, qty: payload.items.qty }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function cart_increase_call(url, payload) {
    try {
      let response = await axios.put(url, payload);
      if (response.status === 200) {
        dispatch({
          type: "INCREASE_IN_CART",
          payload: payload.items.itemId
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function cart_decrease_call(url, payload) {
    try {
      let response = await axios.put(url, payload);
      if (response.status === 200) {
        dispatch({
          type: "DECREASE_IN_CART",
          payload: payload.items.itemId
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function cart_remove_call(url, payload) {
    console.log("payload", payload);
    try {
      let response = await axios.delete(url, { data: payload });
      if (response.status === 200) {
        dispatch({
          type: "REMOVE_FROM_CARTLIST",
          payload: payload.itemId
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  }
  function Add_to_cart_button(id, inStock) {
    return cartlist.reduce(
      (returnobj, item) => {
        if (item.itemId === id && item.qty !== 0) {
          return (
            <>
              <div className="added_to_cart">
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    if (item.qty === 1) {
                      cart_remove_call(
                        "https://ecomm-demo.utpalpati.repl.co/cart",
                        { itemId: id }
                      );
                    } else {
                      cart_decrease_call(
                        "https://ecomm-demo.utpalpati.repl.co/cart",
                        {
                          items: { itemId: id, qty: item.qty - 1 }
                        }
                      );
                    }
                  }}
                >
                  -
                </button>
                {item.qty}

                <button
                  onClick={(event) => {
                    event.preventDefault();

                    cart_increase_call(
                      "https://ecomm-demo.utpalpati.repl.co/cart",
                      {
                        items: { itemId: id, qty: item.qty + 1 }
                      }
                    );
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
        onClick={(event) => {
          event.preventDefault();

          cart_add_call("https://ecomm-demo.utpalpati.repl.co/cart", {
            items: { itemId: id, qty: 1 }
          });
        }}
      >
        {inStock ? "Add to Bag" : "Out of Stock"}
      </button>
    );
  }

  async function wishlist_add_call(url, payload) {
    try {
      let response = await axios.post(url, payload);
      if (response.status === 200) {
        dispatch({
          type: "ADD_WISH",
          payload: payload.itemId
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function wishlist_remove_call(url, payload) {
    try {
      let response = await axios.delete(url, { data: payload });
      if (response.status === 200) {
        dispatch({
          type: "REMOVE_WISH",
          payload: payload.itemId
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  function Add_to_wishlist_button(id) {
    return wishlist.reduce(
      (returnobj, item) => {
        if (item === id) {
          return (
            <>
              <button
                class="wish"
                onClick={(event) => {
                  event.preventDefault();
                  wishlist_remove_call(
                    "https://ecomm-demo.utpalpati.repl.co/wishlist",
                    { itemId: id }
                  );
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
        onClick={(event) => {
          event.preventDefault();
          wishlist_add_call("https://ecomm-demo.utpalpati.repl.co/wishlist", {
            itemId: id
          });
        }}
      >
        <i class="far fa-heart"></i>
      </button>
    );
  }

  return (
    <>
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

          <button
            class="icon-button lg"
            onClick={() => dispatch({ type: "ROUTE", payload: "user" })}
          >
            <i class="far fa-user"></i>
          </button>
        </div>
      </div>
      {console.log(route)}

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
          path="/accesories"
          element={
            <Accesories
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
        <Route
          path="/cart"
          element={
            <Cart
              Add_to_wishlist_button={Add_to_wishlist_button}
              Add_to_cart_button={Add_to_cart_button}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<Wishlist Add_to_cart_button={Add_to_cart_button} />}
        />
        <Route
          path="/:productid"
          element={
            <ProductPage
              Add_to_cart_button={Add_to_cart_button}
              Add_to_wishlist_button={Add_to_wishlist_button}
            />
          }
        />
      </Routes>
    </>
  );
}
