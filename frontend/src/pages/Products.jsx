import { useState } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { useLogin } from "../Reducer-context/LoginContext";
import { Filter, Sort } from "../components";
import noItems from "../assets/noItem.svg";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { Add_to_cart_button,Add_to_wishlist_button } from "../components";

export function Products({
  filteredData
}) {
  let {
    sortBy,
    dispatch,
    showInventoryAll,
    showFastDeliveryOnly,
    cartlist,
    wishlist
  } = useReduce();
  const {isUserLogIn}=useLogin()
  const [showsort, setshowsort] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [range, setrange] = useState(12000);
  const navigate=useNavigate()
  const {pathname}=useLocation()
  let rangefilteredData = filteredData.filter(
    (item) => item.price <= Number(range)
  );

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="sort-filter">
          <button onClick={() => setshowsort((prev) => !prev)} className="xl-2">
            <i className="fas fa-sort"></i>
            Sort{" "}
          </button>
          <button onClick={() => setshowfilter((prev) => !prev)} className="xl-2">
            <i className="fas fa-filter"></i>
            Filter
          </button>
        </div>
        <div className="productgrid">
          <div className="action">
            Sort
            <ul className="list">
              <li>
                <input
                  type="radio"
                  name="sort1"
                  id="PRICE_HIGH_TO_LOW"
                  checked={sortBy === "PRICE_HIGH_TO_LOW"}
                  onChange={() => {
                    dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" });
                  }}
                />
                <label htmlFor="PRICE_HIGH_TO_LOW">Price high to low</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sort1"
                  id="PRICE_LOW_TO_HIGH"
                  checked={sortBy === "PRICE_LOW_TO_HIGH"}
                  onChange={() => {
                    dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" });
                  }}
                />
                <label htmlFor="PRICE_LOW_TO_HIGH">Price low to high</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sort1"
                  id="Relevance"
                  checked={sortBy === null}
                  onChange={() => {
                    dispatch({ type: "SORT", payload: null });
                  }}
                />
                <label htmlFor="Relevance">Relevance</label>
              </li>
            </ul>
            Filter
            <ul className="list ">
              <li>
                <input
                  type="checkbox"
                  checked={!showInventoryAll}
                  onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
                />
                Include out of stock
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={showFastDeliveryOnly}
                  onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
                />
                Fast Delivery
              </li>
              <li>Price Range</li>
              <li>
                {`Rs:0`}
                <input
                  id="PRICE_RANGE"
                  name="PRICE_RANGE"
                  type="range"
                  min="0"
                  max="12000"
                  step="10"
                  value={range}
                  onChange={(e) =>
                    setrange((prev) =>
                      e.target.value < 100 ? 100 : e.target.value
                    )
                  }
                />
                {`Rs:${range}`}
              </li>
              <li>
                <button className="primary-button md" style={{marginLeft:"0"}} onClick={()=>{dispatch({type:"RESET_FILTER"}); setrange(12000)}}>Clear Filter</button>
              </li>
            </ul>
          </div>
          <div className="items" style={{position:"relative"}}>
            {rangefilteredData.length>0 ? rangefilteredData.map(
              ({
                _id,
                name,
                image,
                price,
                inStock,
                fastDelivery,
                offer,
                ratings,
                isnew
              }) => (
                <Link
                  key={_id}
                  to={`/product/${_id}`}
                  style={{ width: "40%", maxWidth: "210px" }}
                >
                  <div className="cards-t1">
                    <div className="ratewrapper">
                      <img className="cards-t1-img" src={image} alt={name} />
                      <div className="rate">
                        {ratings}
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    {isnew ? <div className="cards-badge">New</div> : ""}

                    <div
                      className="title"
                      style={{
                        overflow: "hidden",
                        textOverflow: "..2.",
                        height: "20px"
                      }}
                    >
                      {name}
                    </div>
                    <div className="desc">
                      {fastDelivery ? "Fast Delivery" : "3 Days Minimum"}
                    </div>
                    <span className="cards-t1-oldprice">Rs. {price}</span>
                    <span className="cards-t1-offer">{offer}% off</span>

                    <div className="price">
                      Rs. {(price - (price * offer) / 100).toFixed(2)}
                    </div>
                    {Add_to_cart_button(_id, inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}
                    {Add_to_wishlist_button(_id,wishlist,dispatch,isUserLogIn,navigate,pathname)}
                  </div>
                </Link>
              )
            )
          : <div
          className="gray lg"
          style={{
            width:"250px",
            textAlign:"center"
          }}
        >
          <img src={noItems} style={{borderRadius:"5%",width:"100%" }}/>
          Sorry, We Dont Have Any Matching Data!
          <button className="primary-button md"
          onClick={()=>{dispatch({type:"RESET_FILTER"}); setrange(12000)}}
          >
            Clear Filter</button>
        </div>
          }
          </div>
        </div>
        <div
          className="sortpopup"
          style={{ display: showsort ? "block" : "none" }}
        >
          <Sort setshowsort={setshowsort} />
        </div>
        <div
          className="filterpopup"
          style={{ display: showfilter ? "block" : "none" }}
        >
          {showfilter ? (
            <Filter
              setshowfilter={setshowfilter}
              range={range}
              setrange={setrange}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
