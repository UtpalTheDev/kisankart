import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import offer_15 from "../assets/15_offer.png";

export function Fifteenpercent({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "OFFER", payload: 15 });
  }, []);
  return (
    <>
     <div className="productpage_banner">
        <img src={offer_15}  className="productpage_banner_img"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
