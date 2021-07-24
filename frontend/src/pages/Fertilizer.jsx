import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
import fertilizer_banner from "../assets/fertilizer_banner.png";

export function Fertilizer({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "fertilizer" });
  }, []);
  return (
    <>
    <div style={{padding:"0 0.3rem"}}>
        <h3>Fertilizers</h3>
        <img src={fertilizer_banner}  className="productpage_banner"/></div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
//"https://www.fertilizerseurope.com/wp-content/uploads/2019/08/banner-picture-fertilizer-regulation-e1565796152289.jpg"