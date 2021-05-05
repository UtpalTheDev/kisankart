import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import faker from "faker";
import axios from "axios";
const Reducercontext = createContext();

export function ReducerProvider({ children }) {
  const [data, setdata] = useState([]);

  //console.log("42", data);
  const [
    {
      sortBy,
      showFastDeliveryOnly,
      showInventoryAll,
      showMaterial,
      showIdealFor,
      showDiscount,
      showNew,
      cartlist,
      route,
      wishlist
    },
    dispatch
  ] = useReducer(reducer, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    showMaterial: "All",
    showIdealFor: "All",
    showDiscount: 0,
    showNew: false,
    sortBy: null,
    cartlist: [],
    route: "home",
    wishlist: []
  });

  useEffect(() => {
    (async function () {
      //const { data } = await axios.get("/api/products");
      const { data } = await axios.get(
        "https://ecomm-demo.utpalpati.repl.co/product"
      );
      // console.log("product data", data);

      const cart = await axios.get("https://ecomm-demo.utpalpati.repl.co/cart");
      //console.log("cart data", cart.data.items);

      const wishlist = await axios.get(
        "https://ecomm-demo.utpalpati.repl.co/wishlist"
      );
      //console.log("wishlist data", wishlist.data.items);

      dispatch({
        type: "LOAD_CART",
        payload: cart.data.items
      });
      dispatch({
        type: "LOAD_WISHLIST",
        payload: wishlist.data.items
      });
      setdata(data);
    })();
  }, []);
  return (
    <>
      <Reducercontext.Provider
        value={{
          data,
          sortBy,
          showFastDeliveryOnly,
          showInventoryAll,
          showMaterial,
          showIdealFor,
          showDiscount,
          showNew,
          cartlist,
          route,
          wishlist,
          dispatch
        }}
      >
        {children}
      </Reducercontext.Provider>
    </>
  );
}

export function useReduce() {
  return useContext(Reducercontext);
}

function reducer(state, action) {
  //console.log("reducer fn");

  switch (action.type) {
    case "ROUTE":
      return { ...state, route: action.payload };
    case "IDEAL":
      return { ...state, showIdealFor: action.payload };
    case "MATERIAL":
      return { ...state, showMaterial: action.payload };
    case "SORT":
      return {
        ...state,
        sortBy: action.payload
      };
    case "NEW":
      return {
        ...state,
        showNew: action.payload
      };
    case "OFFER":
      return {
        ...state,
        showDiscount: action.payload
      };
    case "TOGGLE_INVENTORY":
      return {
        ...state,
        showInventoryAll: !state.showInventoryAll
      };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

    case "ADD_TO_CART":
      return { ...state, cartlist: [...state.cartlist, action.payload] };

    case "INCREASE_IN_CART":
      return {
        ...state,
        cartlist: state.cartlist.map((item) => {
          if (item.itemId === action.payload) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        })
      };

    case "DECREASE_IN_CART":
      if (
        state.cartlist.find((item) => item.itemId === action.payload).qty === 1
      ) {
        console.log("in del");
        return {
          ...state,
          cartlist: state.cartlist.filter(
            (item) => item.itemId !== action.payload
          )
        };
      }

      return {
        ...state,
        cartlist: state.cartlist.map((item) => {
          if (item.itemId === action.payload) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
      };

    case "REMOVE_FROM_CARTLIST":
      return {
        ...state,
        cartlist: state.cartlist.filter(
          (item) => item.itemId !== action.payload
        )
      };

    case "ADD_WISH":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_WISH":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item !== action.payload)
      };

    case "LOAD_CART":
      return {
        ...state,
        cartlist: action.payload
      };

    case "LOAD_WISHLIST":
      return {
        ...state,
        wishlist: action.payload
      };
    default:
      return console.log("error");
  }
}

async function deleting(url, payload) {
  return await axios.delete(url, payload);
}
