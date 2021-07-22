import { toast } from "react-toastify";

import {
  cart_add_call,
  cart_decrease_call,
  cart_remove_call,
  cart_increase_call
} from "../api/ServerRequest";

export function Add_to_cart_button(id, inStock,cartlist,dispatch,isUserLogIn,navigate,pathname) {


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
        className="cart"
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