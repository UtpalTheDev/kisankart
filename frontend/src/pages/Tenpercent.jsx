import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import offer_10 from "../assets/10_offer.png";

export function Tenpercent({
  filteredData,
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "OFFER", payload: 10 });
  }, []);
  return (
    <>
      <div className="productpage_banner">
        <img src={offer_10}  className="productpage_banner_img"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
