import { Row, Col } from "react-bootstrap";
import ReviewCard from "../commons/ReviewCard";

const DUMMY_REVIEWS = [
  {
    id: '1',
    name: 'Dominik Gazda',
    opinion: 'Szybka sprawna wysyłka i profesjonalna obsługa. Polecam wszystkim użytkownikom!',
    image: './../../assets/bike.png'
  },
  {
    id: '2',
    name: 'Jan Kowalski',
    opinion: 'Bardzo dobry niezawodny sklep. Pomimo tego, że otrzymałem niekompletne zamówienie, bardzo szybko dostałem potrzebne części.',
    image: './../../assets/bike.png'
  },
  {
    id: '3',
    name: 'Marcin Drel',
    opinion: 'Polecam szybko sprawnie i bez problemu. Wszystko jak na zdjęciach. Z czystym sumieniem mogę polecić ten sklep',
    image: './../../assets/bike.png'
  }
]

const Reviews = () => {

    return (
      <Row>
      {DUMMY_REVIEWS.map((test) => (
        <Col md={4}>
        <ReviewCard 
              id={test.id}
              name={test.name}
              opinion={test.opinion}
              image={test.image}
             />
          </Col>
      ))}
    </Row>
    );
      // <Row style={{alignItems: "center"}}>
      //   <Col md={4}>
      //     <ReviewCard 
      //       id={test.id}
      //       name={test.name}
      //       opinion={test.opinion}
      //       image={test.image}
      //     />
      //   </Col>
      //   <Col md={4}>
      //   <ReviewCard 
      //       id={test.id}
      //       name={test.name}
      //       opinion={test.opinion}
      //       image={test.image}
      //     />
      //   </Col>
      //   <Col md={4}>
      //   <ReviewCard 
      //       id={test.id}
      //       name={test.name}
      //       opinion={test.opinion}
      //       image={test.image}
      //     />
      //   </Col>
      
}

export default Reviews;