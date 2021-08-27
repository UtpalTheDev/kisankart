import { reducer } from "./Reducer-context/Reducer-context";
/*-------------cartlist test------*/
describe("reducer cartlist test", () => {
  it("should add to cart when a value is added", () => {
    const initialState = {
      cartlist: []
    };
    const addToCart = {
      type: "ADD_TO_CART",
      payload: {
        itemId: "1234",
        qty: 1
      }
    };

    let state = reducer(initialState, addToCart);
    expect(state).toEqual({
      cartlist: [{ itemId: "1234", qty: 1 }]
    });
    const addToCart2 = {
      type: "ADD_TO_CART",
      payload: {
        itemId: "1235",
        qty: 1
      }
    };

    state = reducer(state, addToCart2);
    expect(state).toEqual({
      cartlist: [
        { itemId: "1234", qty: 1 },
        { itemId: "1235", qty: 1 }
      ]
    });
  });
  it("should remove one item from cart", () => {
    const initialState = {
      cartlist: [
        { itemId: "1234", qty: 1 },
        { itemId: "1235", qty: 1 }
      ]
    };
    const removeFromCart = {
      type: "REMOVE_FROM_CARTLIST",
      payload: "1234"
    };

    let state = reducer(initialState, removeFromCart);
    expect(state).toEqual({
      cartlist: [{ itemId: "1235", qty: 1 }]
    });
  });
  it("should increase one quantity of the specific item in cart", () => {
    const initialState = {
      cartlist: [
        { itemId: "1234", qty: 1 },
        { itemId: "1235", qty: 1 }
      ]
    };
    const increaseQuantityInCart = {
      type: "INCREASE_IN_CART",
      payload: "1234"
    };

    let state = reducer(initialState, increaseQuantityInCart);
    expect(state).toEqual({
      cartlist: [
        { itemId: "1234", qty: 2 },
        { itemId: "1235", qty: 1 }
      ]
    });
  });
  it("should decrease one quantity of the specific item in cart", () => {
    const initialState = {
      cartlist: [
        { itemId: "1234", qty: 2 },
        { itemId: "1235", qty: 1 }
      ]
    };
    const deccreaseQuantityInCart = {
      type: "DECREASE_IN_CART",
      payload: "1234"
    };

    let state = reducer(initialState, deccreaseQuantityInCart);
    expect(state).toEqual({
      cartlist: [
        { itemId: "1234", qty: 1 },
        { itemId: "1235", qty: 1 }
      ]
    });
  });
});
/*----------wishlist test-----------*/
describe("reducer wishlist test", () => {
  it("should add to wishlist when value is added ", () => {
    const initialState = {
      wishlist: []
    };
    const addToWishlist = {
      type: "ADD_WISH",
      payload: "1234"
    };
    let state = reducer(initialState, addToWishlist);
    expect(state).toEqual({
      wishlist: ["1234"]
    });
  });
  it("should remove from wishlist", () => {
    const initialState = {
      wishlist: ["1234", "12345"]
    };
    const removeFromWishlist = {
      type: "REMOVE_WISH",
      payload: "1234"
    };
    let state = reducer(initialState, removeFromWishlist);
    expect(state).toEqual({
      wishlist: ["12345"]
    });
  });
});
