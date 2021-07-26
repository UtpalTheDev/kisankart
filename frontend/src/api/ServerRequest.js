import axios from "axios";

export async function cart_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { itemId: payload.items.itemId, qty: payload.items.qty }
      });
      dispatch({ type: "LOAD", action: false });
      return "added to cart";
    }
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOAD", action: false });
    return "not able to add to cart";
  }
}

export async function cart_increase_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.put(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "INCREASE_IN_CART",
        payload: payload.items.itemId
      });
      dispatch({ type: "LOAD", action: false });
      return "added to cart";
    }
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOAD", action: false });
    return "not able to add to cart";
  }
}
export async function cart_decrease_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.put(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "DECREASE_IN_CART",
        payload: payload.items.itemId
      });
      dispatch({ type: "LOAD", action: false });
      return "removed from cart";
    }
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOAD", action: false });
    return "not able to remove from cart";
  }
}
export async function cart_remove_call(url, payload, dispatch) {
  console.log("payload", payload);
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_CARTLIST",
        payload: payload.itemId
      });
      dispatch({ type: "LOAD", action: false });
      return "removed from cart";
    }
  } catch (err) {
    // console.log("err", err);
    dispatch({ type: "LOAD", action: false });
    return "not able to remove from cart";
  }
}
export async function cart_empty_call(url, dispatch) {
  try {
    let response = await axios.delete(url);
    if (response.status === 200) {
      dispatch({
        type: "EMPTY_CARTLIST"
        
      });
      
    }
  } catch (err) {
    return "not able to remove from cart";
  }
}
export async function wishlist_add_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.post(url, payload);
    if (response.status === 200) {
      dispatch({
        type: "ADD_WISH",
        payload: payload.itemId
      });
      dispatch({ type: "LOAD", action: false });
      return "added to wishlist";
    }
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOAD", action: false });
    return "not able to add to wishlist";
  }
}
export async function wishlist_remove_call(url, payload, dispatch) {
  try {
    dispatch({ type: "LOAD", payload: true });
    let response = await axios.delete(url, { data: payload });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_WISH",
        payload: payload.itemId
      });
      dispatch({ type: "LOAD", action: false });
      return "removed from wishlist";
    }
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOAD", action: false });
    return "not able to remove from wishlist";
  }
}
