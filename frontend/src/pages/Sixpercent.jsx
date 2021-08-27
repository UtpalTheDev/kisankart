import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import offer_6 from "../assets/6_offer.png";

export function Sixpercent({
  filteredData,
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "OFFER", payload: 6 });
  }, []);
  return (
    <>
      <div className="productpage_banner">
        <img src={offer_6}  className="productpage_banner_img"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
