import { Fragment } from "react";
import classes from "./Item.module.css";

const Item = (props) => {
  const { id, bikeName, price, bikeImage } = props.item;

  console.log(bikeImage);
  return (
    <Fragment>
      <img src={bikeImage} alt={1} />
      <p>{price}</p>
      <p>{bikeName}</p>
    </Fragment>
  );
};

export default Item;
