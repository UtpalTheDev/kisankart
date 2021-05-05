import { useReduce } from "./Reducer-context";

export default function Sort({ setshowsort }) {
  let { sortBy, dispatch } = useReduce();
  return (
    <>
      <div className="sortblock">
        <ul class="list">
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "PRICE_HIGH_TO_LOW"}
              onClick={() => {
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" });
                setshowsort((prev) => !prev);
              }}
            />
            Price high to low
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "PRICE_LOW_TO_HIGH"}
              onClick={() => {
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" });
                setshowsort((prev) => !prev);
              }}
            />
            Price low to high
          </li>
        </ul>
      </div>
    </>
  );
}
