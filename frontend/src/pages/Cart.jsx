import { useReduce } from "../Reducer-context/Reducer-context";
import { useLogin } from "../Reducer-context/LoginContext";
import { Link,useNavigate,useLocation } from "react-router-dom";
import {useState} from "react"
import emptyCart from "../assets/emptyCart.svg";
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
              
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  style={{ width: "40%", maxWidth: "210px" }}
                >
                  <div className="cards-t1">
                    <img
                      className="cards-t1-img"
                      src={item.image}
                      alt={item.name}
                    />

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
                      {(item.price - (item.price * item.offer) / 100).toFixed(
                        2
                      )}
                    </div>

                    {Add_to_cart_button(item._id, item.inStock,cartlist,dispatch,isUserLogIn,navigate,pathname)}

                    {Add_to_wishlist_button(item._id,wishlist,dispatch,isUserLogIn,navigate,pathname)}

                    <button
                      className="cancel"
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
              
            );
          })}
      </div>
      { cartdata.length>0 &&
      <div className="checkout">
        <div>
          {`Total Price- Rs. ${checkOutPrice}`}
        </div>
        <div>
          <button className="primary-button lg" onClick={()=>setModal(true)}>Checkout</button>
        </div>
        <div style={{display:modal? `flex`:`none`, position:"fixed", top:0, width:"100vw", height:"100vh", background:"white",alignItems:"center", justifyContent:"center" }}>
          <div  style={{width:"100%",maxWidth: "700px",
    minWidth: "400px" }}>
            {modal && <Payment price={checkOutPrice} setModal={setModal}/>}</div>
        
        </div>
      </div>
      }
      {
        cartdata.length===0 && 
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
            <img src={emptyCart} style={{borderRadius:"5%",width:"100%" }}/>
            Cart Is Empty, Move to
            <Link to="/" style={{color:"blue"}}> Home Page</Link>
          </div>
      }
    </>
  );
}
