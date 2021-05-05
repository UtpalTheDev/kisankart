import { useReduce } from "./Reducer-context";
import axios from "axios";

export default function Wishlist({ Add_to_cart_button }) {
  let { wishlist, data, dispatch } = useReduce();

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

  let wishlistdata = wishlist.map((eachitem) => {
    let finddata = data.find((item) => item._id === eachitem);
    if (finddata) {
      return finddata;
    }
    return {};
  });
  console.log("wishdata de", wishlistdata);

  return (
    <>
      <h5>Wishlist</h5>
      <div className="items">
        {wishlistdata.map((item) => {
          return (
            <>
              {" "}
              <div class="cards-t1" style={{ width: "40%", maxWidth: "210px" }}>
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

                {Add_to_cart_button(
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
                    wishlist_remove_call(
                      "https://ecomm-demo.utpalpati.repl.co/wishlist",
                      { itemId: item._id }
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
    </>
  );
}
