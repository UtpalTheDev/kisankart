import { useReduce } from "./Reducer-context";
import { Link } from "react-router-dom";
import { wishlist_remove_call } from "./api/ServerRequest";
import { toast } from "react-toastify";
export default function Wishlist({ Add_to_cart_button }) {
  let { wishlist, data, dispatch } = useReduce();
  let wishlistdata = wishlist.map((eachitem) => {
    let finddata = data.find((item) => item._id === eachitem);
    if (finddata) {
      return finddata;
    }
    return {};
  });

  return (
    <>
      <h5>Wishlist</h5>
      <div className="items">
        {wishlistdata.map((item) => {
          return (
            <>
              <Link
                to={`/product/${item._id}`}
                style={{ width: "40%", maxWidth: "210px" }}
              >
                <div class="cards-t1">
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
                  <button
                    class="cancel"
                    onClick={async (event) => {
                      event.preventDefault();
                      let wishlistmsg = await wishlist_remove_call(
                        "https://kisankartbackend.herokuapp.com/wishlist",
                        { itemId: item._id },
                        dispatch
                      );
                      const notify = () => toast.warn(wishlistmsg);
                      notify();
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
    </>
  );
}
