import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import fertilizer_banner from "../assets/fertilizer_banner.png";

export function Fertilizer({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "fertilizer" });
  }, []);
  return (
    <>
    <h3>Fertilizers</h3>
    <div className="productpage_banner">
        <img src={fertilizer_banner}  className="productpage_banner_img"/></div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
