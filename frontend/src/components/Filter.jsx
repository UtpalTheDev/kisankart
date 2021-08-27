import { useReduce } from "../Reducer-context/Reducer-context";

export function Filter({ setshowfilter, range, setrange }) {
  let { showInventoryAll, showFastDeliveryOnly, dispatch } = useReduce();
  return (
    <div style={{paddingTop:"2rem"}}>
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
        <div className="filter_button">
        <button
          className="primary-button lg "
          onClick={() => setshowfilter((prev) => !prev)}
        >
          Back
        </button>
        <button
          className="primary-button lg "
          onClick={() => {dispatch({type:"RESET_FILTER"}); setrange(12000)}}
        >
          Clear Filter
        </button>
        </div>

      </ul>
    </div>
  );
}
