import { useReduce } from "../Reducer-context/Reducer-context";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { useLogin } from "../Reducer-context/LoginContext";
import { wishlist_remove_call } from "../api/ServerRequest";
import { toast } from "react-toastify";
import { Add_to_cart_button} from "../components";
import emptyList from "../assets/emptyList.svg";


export function Wishlist() {
  let { wishlist, data, dispatch,cartlist } = useReduce();
  const {isUserLogIn}=useLogin();
  const navigate=useNavigate()
  const {pathname}=useLocation

  let wishlistdata = wishlist.map((eachitem) => {
    let finddata = data.find((item) => item._id === eachitem);
    if (finddata) {
      return finddata;
    }
    return {};
  });

  return (
    <>
      <div style={{paddingLeft:"0.5rem"}}><h3>Wishlist</h3></div>
      <div className="items">
        {wishlistdata.map((item) => {
          return (
            
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                style={{ width: "40%", maxWidth: "210px" }}
              >
                <div className="cards-t1">
                  <img className="cards-t1-img" src={item.image} alt={item.name} />

                  <div
                    className="title"
                    style={{
                      overflow: "hidden",
                      textOverflow: "...",
                      height: "20px"
                    }}
                  >
                    {item.name}
                  </div>
                  <div className="desc">
                    {item.inStock ? "InStock" : "Out of Stock"}
                  </div>
                  <div className="price">
                    Rs:{" "}
                    {(item.price - (item.price * item.offer) / 100).toFixed(2)}
                  </div>

                  {Add_to_cart_button(item._id, item.inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}
                  <button
                    className="cancel"
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
            
          );
        })}
      </div>
      {
        wishlistdata.length===0 &&
           <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width:"50%",
                minWidth:"150px",
                maxWidth:"300px",
                textAlign:"center"
              }}
            >
              <img src={emptyList} style={{borderRadius:"5%",width:"100%" }}/>
              Wishlist Is Empty, Move to
            <Link to="/" style={{color:"blue"}}>
            <button className="primary-button md">Home </button>
            </Link>
            </div>
      }
    </>
  );
}
