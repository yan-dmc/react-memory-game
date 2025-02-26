import { Link } from "react-router-dom";
import "../style.css";
import "./menu.css";
import logo from "../images/0gamelogo.png";

const Menu = () => {
  return (
    <>
      <figure>
         <img src={logo} alt="logo" />
      </figure>
     
      <div className="buttonContainer">
        <Link to={"/game-start"}>
          <button>
            <span>Play</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export { Menu };
