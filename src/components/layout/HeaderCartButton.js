import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useDispatch, useSelector } from "react-redux";

const HeaderCartButton = (props) => {
  const itemsAmount = useSelector((state) => state.items.itemsCounter);
  console.log(itemsAmount);

  return (
    <button className={classes.button} onClick={props.onShowModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
