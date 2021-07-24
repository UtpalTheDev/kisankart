import { useEffect } from "react";
import { useReduce } from "../Reducer-context/Reducer-context";
import { Products } from "./Products";
export function Accessories({
  filteredData
}) {
  let { dispatch } = useReduce();
  useEffect(() => {
    dispatch({ type: "OFFER", payload: 0 });
    dispatch({ type: "NEW", payload: false });
    dispatch({ type: "MATERIAL", payload: "accesories" });
  }, []);
  return (
    <>
      <div style={{padding:"0 0.3rem"}}>
        <h3>Accessories</h3>
        <img src="https://thumbs.dreamstime.com/b/gardening-background-garden-hand-tools-summer-flowers-plant-gray-stone-background-top-view-place-text-banner-67778756.jpg"  className="productpage_banner"/>
      </div>
      <Products
        filteredData={filteredData}
      />
    </>
  );
}
