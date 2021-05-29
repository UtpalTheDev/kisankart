import axios from "axios";
import { useReduce } from "./Reducer-context";
import { Link } from "react-router-dom";

export default function Cart({ Add_to_wishlist_button, Add_to_cart_button }) {
  let { cartlist, data, dispatch } = useReduce();

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
  return (
    <>
      <h5>Cart</h5>

      <div className="items">
        {cartdata
          .filter((item) => item.qty > 0)
          .map((item) => {
            return (
              <>
                <Link
                  to={`/${item._id}`}
                  style={{ width: "40%", maxWidth: "210px" }}
                >
                  <div class="cards-t1">
                    <img
                      class="cards-t1-img"
                      src={item.image}
                      alt={item.name}
                    />

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
                      {(item.price - (item.price * item.offer) / 100).toFixed(
                        2
                      )}
                    </div>

                    {Add_to_cart_button(item._id, item.inStock)}

                    {Add_to_wishlist_button(item._id)}

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
                </Link>
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
