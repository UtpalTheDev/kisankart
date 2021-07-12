
import {useLogin} from "../Reducer-context/LoginContext"
import { useReduce } from "../Reducer-context/Reducer-context";
import { toast } from "react-toastify";

import {
    wishlist_add_call,
    wishlist_remove_call,
  } from "../api/ServerRequest";

export function Add_to_wishlist_button(id,wishlist,dispatch,isUserLogIn,navigate,pathname) {
    // const {isUserLogIn}=useLogin()
    // const {dispatch,wishlist}=useReduce()
    
    return wishlist.reduce(
      (returnobj, item) => {
        if (item === id) {
          return (
            <>
              <button
                class="wish"
                onClick={async (event) => {
                  event.preventDefault();
                  if (isUserLogIn) {
                    let wishlistmsg = await wishlist_remove_call(
                      "https://kisankartbackend.herokuapp.com/wishlist",
                      { itemId: id },
                      dispatch
                    );
                    const notify = () => toast.warn(wishlistmsg);
                    notify();
                  } else {
                    navigate("/login");
                  }
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
        onClick={async (event) => {
          event.preventDefault();
          if (isUserLogIn) {
            let wishlistmsg = await wishlist_add_call(
              "https://kisankartbackend.herokuapp.com/wishlist",
              {
                itemId: id
              },
              dispatch
            );
            const notify = () => toast.success(wishlistmsg);
            notify();
          } else {
            navigate("/login");
          }
        }}
      >
        <i class="far fa-heart"></i>
      </button>
    );
  }