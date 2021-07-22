import { useReduce } from "../Reducer-context/Reducer-context";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="round-category">
        <Link to="seeds" className="Link">
          <div>
            <div className="round-img">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jj12xIqw1qxhI1oxVJo1CAHaHa%26pid%3DApi&f=1"
                alt="seeds"
              />
            </div>
            Seeds
          </div>
        </Link>

        <Link to="fertilizers" className="Link">
          <div>
            <div className="round-img">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.BVTE833H8QNL4ITF_duqqAAAAA%26pid%3DApi&f=1"
                alt="fertilizers"
              />
            </div>
            Fertilizers
          </div>
        </Link>

        <Link to="pesticides" className="Link">
          <div>
            {" "}
            <div className="round-img">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Q7zt0mC6Djg3KRkAtEhqIAHaHa%26pid%3DApi&f=1"
                alt="pesticides"
              />
            </div>
            Pesticides
          </div>
        </Link>

        <Link to="accessories" className="Link">
          {" "}
          <div>
            {" "}
            <div className="round-img">
              <img
                src="http://3.bp.blogspot.com/-fqclgZepv6E/VieyKaBK1fI/AAAAAAAAAHI/EJw2uVrDo4U/s1600/20981075-Gardening-tools-isolated-on-white-background-Garden-equipment-silhouette-set--Stock-Vector.jpg"
                alt="machinery"
              />
            </div>
            Accessories
          </div>
        </Link>
      </div>
      <Link to="/new-product" className="Link">
        {" "}
        <div className="responsive-img">
          <img
            alt="banner"
            src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/29/a48772c8-cdb9-4ee7-a83e-1961320854901617038432656-Ugadi-Desktop-MainBanner.jpg"
          />
        </div>
      </Link>

      <div className="percentage-category">
        <Link to="/20" className="Link">
          <div>20% Off</div>
        </Link>

        <Link to="/15" className="Link">
          <div>15% Off</div>
        </Link>

        <Link to="/10" className="Link">
          <div>10% Off</div>
        </Link>
        <Link to="/6" className="Link">
          <div>6% Off</div>
        </Link>
      </div>
    </>
  );
}
