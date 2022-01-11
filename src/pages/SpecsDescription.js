import { Card, Col, Row } from "react-bootstrap";
import { Cpu } from "react-bootstrap-icons";

const SpecsDescription = (props) => {
  const item = props.item;
  const type = props.type;
  console.log(type);

  if (type === "parts") {
    if (item.bikePartsType === "BRAKE") {
      switch (item.brakeType) {
        case "HYDRAULIC":
          item.brakeType = "Hamulce hydrauliczne";
          break;
        case "MECHANICAL":
          item.brakeType = "Hamulce mechaniczne";
          break;
        case "VBRAKE":
          item.brakeType = "Hamulce typu V-BRAKE";
          break;
        case "ROLLER":
          item.brakeType = "Hamulce rolkowe";
          break;
        case "UBRAKE":
          item.brakeType = "Hamulce typu U-BRAKE";
          break;
        case "TORPEDO":
          item.brakeType = "Hamulec torpedo";
          break;
      }
    }
  }

  if (type === "accessories") {
    if (item.accessoriesType === "PUMP") {
      switch (item.valveType) {
        case "BIKE":
          item.valveType = "Pompka rowerowa";
          break;
        case "CAR":
          item.valveType = "Pompka samochodowa";
          break;
      }

      switch (item.pumpType) {
        case "HAND":
          item.pumpType = "Pompka ręczna";
          break;
        case "AUTOMATIC":
          item.pumpType = "Pompka automatyczna";
          break;
      }
    }
  }

  if (type === "bikes") {
    return (
      <Card>
        <Row style={{ fontSize: "1.5rem" }}>
          <Col>
            Kod produktu: <b>{item.bikeCode}</b>
          </Col>
          <Col>
            Typ roweru: <b>{item.bikeType}</b>
          </Col>
        </Row>
        <br />
        <Row style={{ fontSize: "1.5rem" }}>
          <Col>
            Płeć: <b>{item.genderType === "MALE" ? "Mężczyzna" : "Kobieta"}</b>
          </Col>
          <Col>
            Hamulec: <b>{item.brake?.name}</b>
          </Col>
        </Row>
        <br />
        <Row style={{ fontSize: "1.5rem" }}>
          <Col>
            Napęd: <b>{item.drive?.name}</b>
          </Col>
          <Col>
            Rama: <b>{item.frame?.name}</b>
          </Col>
        </Row>
      </Card>
    );
  }

  if (type === "parts") {
    if (item.bikePartsType === "BRAKE") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Rodzaj hamulców: <b>{item.brakeType}</b>
            </Col>
            <Col>
              Długość linki: <b>{item.cableLength + " mm"}</b>
            </Col>
          </Row>
        </Card>
      );
    }
    if (item.bikePartsType === "DRIVE") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Pasujące kasety: <b>{item.cassette}</b>
            </Col>
            <Col>
              Stopniowanie: <b>{item.gradation}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Ilość rzędów <b>{item.rowsCount}</b>
            </Col>
          </Row>
        </Card>
      );
    }
    if (item.bikePartsType === "FRAME") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Rozmiar ramy: <b>{item.frameSize + "'"}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
  }
  if (type === "accessories") {
    if (item.accessoriesType === "BAGS") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Pojemność: <b>{item.capacity + " l"}</b>
            </Col>
            <Col>
              Wymiary: <b>{item.dimensions}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Możliwość szybkiego montażu:{" "}
              <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
            <Col>
              Sposób montażu: <b>{item.installation}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Wodoodporny:<b> {item.waterproof ? "TAK" : "NIE"}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
    if (item.accessoriesType === "PUMP") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Pompka na nabój: <b>{item.catridge === true ? "TAK" : "NIE"}</b>
            </Col>
            <Col>
              Pompka ma manometer:{" "}
              <b>{item.manometer === true ? "TAK" : "NIE"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Maksymalne ciśnienie: <b>{item.maxPressure + " b"}</b>
            </Col>
            <Col>
              Typ pompki: <b>{item.pumpType}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Przeznaczenie pompki:<b> {item.valveType}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
    if (item.accessoriesType === "FENDERS") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Szybki montaż: <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
            <Col>
              Rozmiar błotnika: <b>{item.fenderSize}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Materiał: <b>{item.material}</b>
            </Col>
            <Col>
              Zestaw montażowy: <b>{item.montage}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Rozmiar koła: <b> {item.wheelSize}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
    if (item.accessoriesType === "BAGS") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Waga <b>{item.weight + " gram"}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Szybki montaż: <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
            <Col>
              Rozmiar błotnika: <b>{item.fenderSize}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Materiał: <b>{item.material}</b>
            </Col>
            <Col>
              Zestaw montażowy: <b>{item.montage}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Rozmiar koła: <b> {item.wheelSize}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
  }
  if (type === "workshop") {
    if (item.workshopType === "MAINTENANCE") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Użycia: <b>{item.usages}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Szybki montaż: <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
    if (item.workshopType === "RACKS") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Użycia: <b>{item.usages}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Szybki montaż: <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
    if (item.workshopType === "TOOLS") {
      return (
        <Card>
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Kod produktu: <b>{item.productCode}</b>
            </Col>
            <Col>
              Użycia: <b>{item.usages}</b>
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: "1.5rem" }}>
            <Col>
              Szybki montaż: <b>{item.fastMontage === true ? "TAK" : "NIE"}</b>
            </Col>
          </Row>
          <br />
        </Card>
      );
    }
  }
};
export default SpecsDescription;
