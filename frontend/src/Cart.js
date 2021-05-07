import axios from "axios";
import { useReduce } from "./Reducer-context";

export default function Cart({
  Add_to_wishlist_button,
  Add_to_cart_button,
  add
}) {
  let { cartlist, data, dispatch } = useReduce();
  // console.log("add to", Add_to_wishlist_button);
  // console.log("cartdata", cartlist);

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
  async function cart_delete_call(url, payload) {
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

  let cartdata = cartlist.map((eachitem) => {
    let finddata = data.find((item) => item._id === eachitem.itemId);
    if (finddata) {
      return { ...finddata, qty: eachitem.qty };
    }
    return {};
  });
  //console.log("cartdata de", cartdata);
  return (
    <>
      <h5>Cart</h5>

      <div className="items">
        {cartdata
          .filter((item) => item.qty > 0)
          .map((item) => {
            return (
              <>
                <div
                  class="cards-t1"
                  style={{ width: "40%", maxWidth: "210px" }}
                >
                  <img class="cards-t1-img" src={item.image} alt={item.name} />

                  <div
                    class="title"
                    style={{
                      overflow: "hidden",
                      textOverflow: "...",
                      height: "20px"
                    }}
                  >
                    {item.name}
                  </div>
                  <div class="desc">
                    {item.inStock ? "InStock" : "Out of Stock"}
                  </div>
                  <div class="price">
                    Rs:{" "}
                    {(item.price - (item.price * item.offer) / 100).toFixed(2)}
                  </div>

                  {Add_to_cart_button(item._id, item.inStock)}

                  {Add_to_wishlist_button(
                    item._id,
                    item.name,
                    item.image,
                    item.price,
                    item.productName,
                    item.inStock,
                    item.level,
                    item.fastDelivery,
                    item.isnew,
                    item.ratings,
                    item.offer
                  )}

                  <button
                    class="cancel"
                    onClick={() => {
                      cart_delete_call(
                        "https://ecomm-demo.utpalpati.repl.co/cart",
                        {
                          itemId: item._id
                        }
                      );
                    }}
                  >
                    X
                  </button>
                </div>
              </>
            );
          })}
      </div>
      <div className="checkout">
        <div>
          {`Total Price- Rs. ${cartdata
            .reduce(
              (total, prod) =>
                total +
                prod.qty * (prod.price - (prod.price * prod.offer) / 100),
              0
            )
            .toFixed(2)}`}
        </div>
        <div>
          <button class="primary-button lg">Checkout</button>
        </div>
      </div>
    </>
  );
}
