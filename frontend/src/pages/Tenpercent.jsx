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
      <div style={{padding:"0 0.3rem"}}>
        <img src={offer_10}  className="productpage_banner"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
