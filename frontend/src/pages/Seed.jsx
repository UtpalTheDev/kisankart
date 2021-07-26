import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import seed_banner from "../assets/seed_banner.png";

export function Seed({
  filteredData,
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "seed" });
  }, []);
  return (
    <>
      <div style={{padding:"0 0.3rem"}}>
        <h3>Seeds</h3>
        <img src={seed_banner}  className="productpage_banner"/>
        </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
