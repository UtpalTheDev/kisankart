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
    <div style={{padding:"0 0.3rem"}}>
        <h3>Pesticides</h3>
        <img src="https://verityconsult.com.au/wp-content/uploads/2019/01/Pest-Control-Banner.jpg"  className="productpage_banner"/></div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
