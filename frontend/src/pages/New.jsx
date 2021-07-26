import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import new_banner from "../assets/new_banner.png";

export function New({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "MATERIAL", payload: "All" });
    dispatch({ type: "NEW", payload: true });
  }, []);
  return (
    <>
      <div style={{padding:"0 0.3rem"}}>
        <h3>Seeds</h3>
        <img src={new_banner}  className="productpage_banner"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
