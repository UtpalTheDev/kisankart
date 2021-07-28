import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import offer_20 from "../assets/20_offer.png";

export function Twentypercent({
  filteredData,
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "OFFER", payload: 20 });
  }, []);
  return (
    <>
      <div className="productpage_banner">
        <img src={offer_20}  className="productpage_banner_img"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
