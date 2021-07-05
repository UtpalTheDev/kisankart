import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
export function Fertilizer({
  filteredData,
  Add_to_cart_button,
  Add_to_wishlist_button
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "fertilizer" });
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
