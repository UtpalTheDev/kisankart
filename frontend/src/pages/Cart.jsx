import { useReduce } from "../Reducer-context/Reducer-context";
import { useLogin } from "../Reducer-context/LoginContext";
import { Link,useNavigate,useLocation } from "react-router-dom";
import {useState} from "react"
import { cart_remove_call } from "../api/ServerRequest";
import { toast } from "react-toastify";
import { Add_to_cart_button,Add_to_wishlist_button } from "../components";
import {Payment} from "../Payment/Payment"
export function Cart() {
  let { cartlist, data, dispatch,wishlist } = useReduce();
  const navigate=useNavigate()
  const {pathname}=useLocation()
  const {isUserLogIn}=useLogin()
  const [modal,setModal]=useState(false)
  
  let cartdata = cartlist.map((eachitem) => {
    let finddata = data.find((item) => item._id === eachitem.itemId);
    if (finddata) {
      return { ...finddata, qty: eachitem.qty };
    }
    return {};
  });

  const checkOutPrice=cartdata
  .reduce(
    (total, prod) =>
      total +
      prod.qty * (prod.price - (prod.price * prod.offer) / 100),
    0
  )
  .toFixed(2);
  return (
    <>
    <div style={{paddingLeft:"0.5rem"}}><h3>Cart</h3></div>
      

      <div className="items">
        {cartdata
          .filter((item) => item.qty > 0)
          .map((item) => {
            return (
              <>
                <Link
                  to={`/product/${item._id}`}
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

                    {Add_to_cart_button(item._id, item.inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}

                    {Add_to_wishlist_button(item._id,wishlist,dispatch,isUserLogIn,navigate,pathname)}

                    <button
                      class="cancel"
                      onClick={async (event) => {
                        event.preventDefault();
                        let cartmsg = await cart_remove_call(
                          "https://kisankartbackend.herokuapp.com/cart",
                          {
                            itemId: item._id
                          },
                          dispatch
                        );
                        const notify = () => toast.warn(cartmsg);
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
      <div className="checkout">
        <div>
          {`Total Price- Rs. ${checkOutPrice}`}
        </div>
        <div>
          <button class="primary-button lg" onClick={()=>setModal(true)}>Checkout</button>
        </div>
        <div style={{display:modal? `flex`:`none`, position:"fixed", top:0, width:"100vw", height:"100vh", background:"white",alignItems:"center", justifyContent:"center" }}>
          <div  style={{width:"100%",maxWidth: "700px",
    minWidth: "400px" }}>
            {modal && <Payment price={checkOutPrice} setModal={setModal}/>}</div>
        
        </div>
      </div>
    </>
  );
}
