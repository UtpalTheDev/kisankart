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
     <h3>Seeds</h3>
      <div className="productpage_banner">
        
        <img src={seed_banner}  className="productpage_banner_img"/>
        </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
