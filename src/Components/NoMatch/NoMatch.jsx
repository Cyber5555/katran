import "../../Css/NoMatch.css";
import KatranError from "../../Assets/images/KatranError.png";

const NoMatch = () => {
  return (
    <section className="NoMatch">
      <p className="NoMatch--page__name">Error page</p>
      <p className="NoMatch--error_code">404</p>
      <img src={KatranError} alt="KatranError" className="KatranError" />
    </section>
  );
};

export default NoMatch;
