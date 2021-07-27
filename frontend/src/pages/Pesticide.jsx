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
     <h3>Pesticides</h3>
    <div className="productpage_banner">
       
        <img src="https://verityconsult.com.au/wp-content/uploads/2019/01/Pest-Control-Banner.jpg"  className="productpage_banner_img"/></div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
