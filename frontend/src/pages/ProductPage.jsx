import { useParams } from "react-router-dom";
import { useReduce } from "../Reducer-context/Reducer-context";
import { useLogin } from "../Reducer-context/LoginContext";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Add_to_cart_button, Add_to_wishlist_button } from "../components";
export function ProductPage() {
  const { productid } = useParams();
  const { data,dispatch,cartlist, wishlist } = useReduce();
  let navigate = useNavigate();
  const {pathname}=useLocation();
  const {isUserLogIn}=useLogin()
  let productobj;
  if (data.length > 0) {
    productobj = data.find((item) => item._id === productid);
  }
  useEffect(() => {
    productobj === undefined && navigate("/*", { replace: true });
  }, []);
  return (
    <>
      {data.length > 0 && productobj !== undefined && (
        <div>
          <div className="productpage-wrapper">
            <div className="productpage-image">
              <img src={productobj.image} alt="productimg" />
              <div className="productpage-addwish">
                {Add_to_wishlist_button(productobj._id,wishlist,dispatch,isUserLogIn,navigate,pathname)}
              </div>
            </div>

            <div className="productpage-details">
              <div className="productpage-name">
                {productobj.name.toLowerCase()}
              </div>
              <div className="productpage-ratings">★{productobj.ratings}</div>

              <div className="productpage-mrp">
                Product MRP: <span>₹{productobj.price}</span>
              </div>
              <div className="productpage-sellingprice">
                Selling Price:{" "}
                <span>
                  ₹
                  {(
                    productobj.price -
                    (productobj.price * productobj.offer) / 100
                  ).toFixed(2)}
                </span>
              </div>
              {productobj.offer > 0 && (
                <div className="productpage-offer">
                  Offer
                  <span>{` - ${productobj.offer}% off`}</span>
                </div>
              )}
              <div className="productpage-action">
                <div className="productpage-addcart">
                  {Add_to_cart_button(productobj._id, productobj.inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}
                </div>
              </div>
            </div>
          </div>

          <div className="productpage-similar">
            <div className="productpage-similar-header">Similar Items</div>
            <div className="productpage-similar-items">
              {data
                .filter(
                  (item) =>
                    item.idealFor === productobj.idealFor &&
                    item._id !== productobj._id
                )
                .map(
                  ({
                    _id,
                    name,
                    image,
                    price,
                    inStock,
                    fastDelivery,
                    isnew,
                    ratings,
                    offer
                  }) => {
                    return (
                      <>
                        <Link
                          key={_id}
                          to={`/product/${_id}`}
                          style={{ width: "40%", maxWidth: "210px" }}
                        >
                          <div className="cards-t1">
                            <div className="ratewrapper">
                              <img
                                className="cards-t1-img"
                                src={image}
                                alt={name}
                              />
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
                              {fastDelivery
                                ? "Fast Delivery"
                                : "3 Days Minimum"}
                            </div>
                            <span className="cards-t1-oldprice">Rs. {price}</span>
                            <span className="cards-t1-offer">{offer}% off</span>

                            <div className="price">
                              Rs. {(price - (price * offer) / 100).toFixed(2)}
                            </div>
                            {Add_to_cart_button(_id, inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}
                            {Add_to_wishlist_button(_id, wishlist,dispatch,isUserLogIn,navigate,pathname)}
                          </div>
                        </Link>
                      </>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
