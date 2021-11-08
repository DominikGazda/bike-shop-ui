import Carousel from "react-elastic-carousel";
import ItemCard from "../commons/ItemCard";

const ItemsCarousel = (props) => {
  console.log(props.items);
  return <Carousel itemsToShow={3}>
    {props.items.map((item) => (
      <ItemCard
      id = {item.id}
      name = {item.name}
      price = {item.price}
      image = {item.images[0]}
      type = {item.itemType}
      />
    ))
    }
  </Carousel>;
};

export default ItemsCarousel;
