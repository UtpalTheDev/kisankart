import { useReduce } from "./Reducer-context";

export default function Filter({ setshowfilter, range, setrange }) {
  let {
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly,
    dispatch
  } = useReduce();
  return (
    <>
      <ul class="list filterlist">
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
        <li>
          <label htmlFor="PRICE_RANGE"> Price Range </label>
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
          {`Rs0-Rs${range}`}
        </li>
        <button
          class="primary-button lg filterapply"
          onClick={() => setshowfilter((prev) => !prev)}
        >
          Apply
        </button>
      </ul>
    </>
  );
}
