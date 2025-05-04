import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
export function Pesticide({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "pesticide" });
  }, []);
  return (
    <>
     <div style={{paddingLeft:"1rem"}}><h3>Pesticides</h3></div>
    <div className="productpage_banner">
       
        <img src="https://res.cloudinary.com/patiutpal/image/upload/v1741189114/kisankart/pesticides-banner_hp9ig1.png"  className="productpage_banner_img"/></div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
