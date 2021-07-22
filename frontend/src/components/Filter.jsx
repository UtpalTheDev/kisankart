import { useReduce } from "../Reducer-context/Reducer-context";

export function Filter({ setshowfilter, range, setrange }) {
  let { showInventoryAll, showFastDeliveryOnly, dispatch } = useReduce();
  return (
    <>
      <ul className="list filterlist">
        <li>
          <input
            type="checkbox"
            checked={!showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include out of stock
        </li>
        <li>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery
        </li>
        <li style={{ paddingLeft: "0.2rem", paddingTop: "0.5rem" }}>
          Price Range
        </li>
        <li style={{ paddingLeft: "0.2rem" }}>
          {`Rs:0`}
          <input
            id="PRICE_RANGE"
            name="PRICE_RANGE"
            type="range"
            min="0"
            max="12000"
            step="10"
            value={range}
            onChange={(e) =>
              setrange((prev) => (e.target.value < 100 ? 100 : e.target.value))
            }
          />
          {`Rs${range}`}
        </li>
        <button
          className="primary-button lg filterapply"
          onClick={() => setshowfilter((prev) => !prev)}
        >
          Apply
        </button>
      </ul>
    </>
  );
}
