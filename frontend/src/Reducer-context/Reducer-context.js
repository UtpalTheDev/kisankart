import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import axios from "axios";
import { useLogin } from "./LoginContext";

const Reducercontext = createContext();

export function ReducerProvider({ children }) {
  const [data, setdata] = useState([]);
  const { isUserLogIn } = useLogin();
  const [
    {
      user,
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
      loading
    },
    dispatch
  ] = useReducer(reducer, {
    user: {},
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    showMaterial: "All",
    showIdealFor: "All",
    showDiscount: 0,
    showNew: false,
    sortBy: null,
    cartlist: [],
    route: "home",
    wishlist: [],
    loading: false
  });

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: "LOAD", payload: true });
        const { data } = await axios.get(
          "https://ecomm-demo-1.utpalpati.repl.co/product"
        );

        if (isUserLogIn) {
          dispatch({ type: "LOAD", payload: true });

          const cart = await axios.get(
            "https://ecomm-demo-1.utpalpati.repl.co/cart"
          );

          const wishlist = await axios.get(
            "https://ecomm-demo-1.utpalpati.repl.co/wishlist"
          );

          dispatch({
            type: "LOAD_CART",
            payload: cart.data.items
          });
          dispatch({
            type: "LOAD_WISHLIST",
            payload: wishlist.data.items
          });
        }
        setdata(data);
        dispatch({ type: "LOAD", payload: false });
      } catch (error) {}
    })();
  }, [isUserLogIn]);
  return (
    <>
      <Reducercontext.Provider
        value={{
          data,
          user,
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
          dispatch,
          loading
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

export function reducer(state, action) {

  switch (action.type) {
    case "LOAD":
      return { ...state, loading: action.payload };

    case "USER":
      return {
        ...state,
        user: { name: action.payload.userName, email: action.payload.email }
      };
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
    case "EMPTY_CARTLIST":
      return{
        ...state,
        cartlist:[]
      }
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
    case "RESET_FILTER":
      return {...state,
        showInventoryAll: true,
        showFastDeliveryOnly: false,
        showMaterial: "All",
        showIdealFor: "All",
        showDiscount: 0,
        showNew: false,
        sortBy: null
      }   
    case "RESET":
      return {
        ...state,
        user: {},
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
      };
    default:
      return console.log("error");
  }
}
