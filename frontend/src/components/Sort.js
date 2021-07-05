import { useReduce } from "../Reducer-context/Reducer-context";

export function Sort({ setshowsort }) {
  let { sortBy, dispatch } = useReduce();
  return (
    <>
      <div className="sortblock">
        <ul class="list">
          <li className="mobile-sortlist">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.1rem 0",
                background: sortBy === "PRICE_HIGH_TO_LOW" ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" });
                setshowsort((prev) => !prev);
              }}
            >
              Price high to low
            </div>
          </li>

          <li className="mobile-sortlist">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.1rem 0",
                background: sortBy === "PRICE_LOW_TO_HIGH" ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" });
                setshowsort((prev) => !prev);
              }}
            >
              Price low to high
            </div>
          </li>
          <li className="mobile-sortlist">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.1rem 0",
                background: sortBy === "null" ? "lightgrey" : ""
              }}
              onClick={() => {
                dispatch({ type: "SORT", payload: null });
                setshowsort((prev) => !prev);
              }}
            >
              Relevance
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
