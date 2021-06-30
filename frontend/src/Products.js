import { useState } from "react";
import { useReduce } from "./Reducer-context";
import Filter from "./Filter";
import Sort from "./Sort";
import { Link } from "react-router-dom";

export default function Products({
  filteredData,
  Add_to_cart_button,
  Add_to_wishlist_button
}) {
  let {
    wishlist,
    sortBy,
    dispatch,
    showInventoryAll,
    showFastDeliveryOnly
  } = useReduce();

  const [showsort, setshowsort] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [range, setrange] = useState(12000);

  let rangefilteredData = filteredData.filter(
    (item) => item.price <= Number(range)
  );
  console.log("sortby", sortBy);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="sort-filter">
          <button onClick={() => setshowsort((prev) => !prev)} class="xl-2">
            <i class="fas fa-sort"></i>
            Sort{" "}
          </button>
          <button onClick={() => setshowfilter((prev) => !prev)} class="xl-2">
            <i class="fas fa-filter"></i>
            Filter
          </button>
        </div>
        <div className="productgrid">
          <div className="action">
            Sort
            <ul class="list">
              <li>
                <input
                  type="radio"
                  name="sort1"
                  id="PRICE_HIGH_TO_LOW"
                  checked={sortBy === "PRICE_HIGH_TO_LOW"}
                  onClick={() => {
                    dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" });
                  }}
                />
                <label for="PRICE_HIGH_TO_LOW">Price high to low</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sort1"
                  id="PRICE_LOW_TO_HIGH"
                  checked={sortBy === "PRICE_LOW_TO_HIGH"}
                  onClick={() => {
                    dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" });
                  }}
                />
                <label for="PRICE_LOW_TO_HIGH">Price low to high</label>
              </li>
            </ul>
            Filter
            <ul class="list ">
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
            </ul>
          </div>
          <div className="items">
            {rangefilteredData.map(
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
                  to={`/product/${_id}`}
                  style={{ width: "40%", maxWidth: "210px" }}
                >
                  <div class="cards-t1">
                    <div class="ratewrapper">
                      <img class="cards-t1-img" src={image} alt={name} />
                      <div className="rate">
                        {ratings}
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                    {isnew ? <div class="cards-badge">New</div> : ""}

                    <div
                      class="title"
                      style={{
                        overflow: "hidden",
                        textOverflow: "..2.",
                        height: "20px"
                      }}
                    >
                      {name}
                    </div>
                    <div class="desc">
                      {fastDelivery ? "Fast Delivery" : "3 Days Minimum"}
                    </div>
                    <span class="cards-t1-oldprice">Rs. {price}</span>
                    <span class="cards-t1-offer">{offer}% off</span>

                    <div class="price">
                      Rs. {(price - (price * offer) / 100).toFixed(2)}
                    </div>
                    {Add_to_cart_button(_id, inStock)}
                    {Add_to_wishlist_button(_id)}
                  </div>
                </Link>
              )
            )}
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
