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

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product"
          element={
            <Products
              filteredData={filteredData}
            />
          }
        />

        <Route
          path="/seeds"
          element={
            <Seed
              filteredData={filteredData}
            />
          }
        />

        <Route
          path="/fertilizers"
          element={
            <Fertilizer
              filteredData={filteredData}
            />
          }
        />

        <Route
          path="/pesticides"
          element={
            <Pesticide
              filteredData={filteredData}
            />
          }
        />

        <Route
          path="/accessories"
          element={
            <Accessories
              filteredData={filteredData}
            />
          }
        />
        <Route
          path="/new-product"
          element={
            <New
              filteredData={filteredData}
            />
          }
        />
        <Route
          path="/6"
          element={
            <Sixpercent
              filteredData={filteredData}
            />
          }
        />
        <Route
          path="/20"
          element={
            <Twentypercent
              filteredData={filteredData}
            />
          }
        />
        <Route
          path="/15"
          element={
            <Fifteenpercent
              filteredData={filteredData}  
            />
          }
        />
        <Route
          path="/10"
          element={
            <Tenpercent
              filteredData={filteredData}
            />
          }
        />
        <PrivateRoute
          path="/cart"
          element={
            <Cart />
          }
        />
        <PrivateRoute
          path="/wishlist"
          element={<Wishlist />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <PrivateRoute path="/user" element={<User />} />

        <Route
          path="/product/:productid"
          element={
            <ProductPage/>
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
