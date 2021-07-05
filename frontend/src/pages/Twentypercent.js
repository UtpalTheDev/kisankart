import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Link } from "react-router-dom";
import { Products } from "./Products";
export function Twentypercent({
  filteredData,
  Add_to_cart_button,
  Add_to_wishlist_button
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "OFFER", payload: 20 });
  }, []);
  return (
    <>
      <Products
        filteredData={filteredData}
        Add_to_cart_button={Add_to_cart_button}
        Add_to_wishlist_button={Add_to_wishlist_button}
      />
    </>
  );
}
