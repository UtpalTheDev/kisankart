import { useEffect } from "react";
import { useReduce } from "./Reducer-context";
import { Link } from "react-router-dom";
import Product from "./Products";
export default function New({
  filteredData,
  Add_to_cart_button,
  Add_to_wishlist_button
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: true });
  }, []);
  return (
    <>
      <Product
        filteredData={filteredData}
        Add_to_cart_button={Add_to_cart_button}
        Add_to_wishlist_button={Add_to_wishlist_button}
      />
    </>
  );
}
