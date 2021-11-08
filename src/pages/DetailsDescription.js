import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "../components/UI/Card";

const DetailsDescription = () =>{
    return(
        <Row>
            <Col md={12}>
            <p><h4><b>Opis produktu</b></h4></p> 
          <Card>Rock Machine Catherine 24 VB to rower dla młodych adeptek kolarstwa, które chcą jeździć przede wszystkim szybko. Sprzyja temu cała konstrukcja modelu, a w szczególności perfekcyjnie dobrana do takich celów rama. Jej sportowa geometra rewelacyjnie sprawdza się w trakcie dynamicznego pokonywania kolejnych odcinków na trasie, a za sprawą idealnie wyważonych proporcji materiałów jest ona zarazem lekka, jak i wytrzymała. Wykorzystane w tym celu aluminium Al-6061 sprawdziło się już w modelach wyczynowych dla dorosłych kolarzy.</Card>
            </Col>
 
        </Row>
        
    )
}

export default DetailsDescription;