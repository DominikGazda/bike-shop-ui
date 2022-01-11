import { useLocation } from "react-router";
import { useHistory } from "react-router";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import SelectInput from "./../components/commons/SelectInput";
import apiSpec from "../api/apiSpec";
import axios from "axios";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ImageUploadPreviewContent from "../components/ImageUploadPreviewComponent";

const AddBike = () => {
  const location = useLocation();
  const history = useHistory();

  const type = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const [brakeName, setBrakeName] = useState([]);
  const [driveName, setDriveName] = useState([]);
  const [frameName, setFrameName] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fileObjects, setFileObjects] = useState(null);

  //refs
  const markRef = useRef(null);
  const bikeTypeRef = useRef(null);
  const colorRef = useRef(null);
  const genderRef = useRef(null);
  const brakeRef = useRef(null);
  const driveRef = useRef(null);
  const frameRef = useRef(null);
  //errors
  const [selectError, setSelectError] = useState("");
  const jwt = useSelector((state) => state.userLogin.jwt);
  let filesUploaded = [];
  let fileObj = [];
  let fileArray = [];

  const AddItemSchema = Yup.object().shape({
    name: Yup.string().required("Pole nazwa jest wymagane"),
    description: Yup.string().required("Opis nie może być pusty"),
    price: Yup.string().required("Podaj cenę"),
    quantity: Yup.string().required("Podaj ilość towaru"),
    bikeCode: Yup.string().required("Podaj kod roweru"),
  });

  const fetchBrakes = useCallback(async () => {
    const response = await axios({
      url: apiSpec.BIKE_PARTS_NAMES.url,
      method: apiSpec.BIKE_PARTS_NAMES.operation,
    });
    const data = response.data;
    setBrakeName(data.brakeNames);
    setDriveName(data.driveNames);
    setFrameName(data.frameNames);
  });

  useEffect(() => {
    fetchBrakes();
  }, []);

  const addBikeApi = async function (bikeToSave, files, file) {
    const formData = new FormData();

    Object.keys(bikeToSave).forEach((key) => {
      formData.append(key, bikeToSave[key]);
    });

    for (let i = 0; i < file?.length; i++) {
      console.log(files[0][i]);
      console.log(files[0][1]);

      formData.append(`image${i}`, files[0][i]);
    }

    try {
      const response = await axios({
        method: apiSpec.ADD_BIKE.operation,
        url: apiSpec.ADD_BIKE.url,
        headers: {
          // "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
        data: formData,
      });
      const data = response.data;
      history.push("/login");
      console.log("Dobre dane zmieniam stronę");
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    filesUploaded.push(event.target.files[0]);
    setFiles(filesUploaded);
    console.log(files);
  };

  const uploadMultipleFiles = (e) => {
    fileObj?.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFile(fileArray);
    setFileObjects(fileObj);
  };
  return (
    <div style={{ width: "100%" }}>
      <Formik
        initialValues={{}}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={AddItemSchema}
        onSubmit={(values, { validate, errors }) => {
          setSelectError("");

          if (markRef.current.innerText.length == 1) {
            setSelectError("Wybierz markę");
            return;
          }
          if (bikeTypeRef.current.innerText.length == 1) {
            setSelectError("Wybierz rodzaj roweru");
            return;
          }
          if (colorRef.current.innerText.length == 1) {
            setSelectError("Wybierz kolor");
            return;
          }
          if (genderRef.current.innerText.length == 1) {
            setSelectError("Wybierz płeć");
            return;
          }
          if (brakeRef.current.innerText.length == 1) {
            setSelectError("Wybierz hamulec");
            return;
          }
          if (driveRef.current.innerText.length == 1) {
            setSelectError("Wybierz napęd");
            return;
          }
          if (frameRef.current.innerText.length == 1) {
            setSelectError("Wybierz ramę");
            return;
          }

          const bikeToSave = {
            ...values,
            mark: markRef.current.innerText,
            bikeType: bikeTypeRef.current.innerText,
            color: colorRef.current.innerText,
            genderType: genderRef.current.innerText,
            brake: brakeRef.current.innerText,
            drive: driveRef.current.innerText,
            frame: frameRef.current.innerText,
            itemAmount: values.quantity,
            itemType: "BIKES",
          };

          addBikeApi(bikeToSave, fileObjects, file);
        }}
      >
        {({ errors, onSubmit }) => (
          <Card
            style={{
              height: "30%",
              width: "100%",
              marginTop: "4%",
              marginLeft: "0%",
              borderRadius: "25px",
              padding: "1%",
            }}
          >
            <h1>Dodaj rower</h1>
            <Form>
              <div className="form-group">
                <label>Nazwa</label>
                {errors.name ? (
                  <Field
                    name="name"
                    className="form-control"
                    placeholder={errors.name}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <Field name="name" className="form-control" />
                )}
                <label>Opis</label>
                {errors.description ? (
                  <Field
                    name="description"
                    className="form-control"
                    placeholder={errors.description}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <Field name="description" className="form-control" />
                )}
              </div>
              <label>Cena</label>
              {errors.price ? (
                <Field
                  name="price"
                  className="form-control"
                  placeholder={errors.price}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="price" className="form-control" />
              )}
              <label>Ilość</label>
              {errors.quantity ? (
                <Field
                  name="quantity"
                  className="form-control"
                  placeholder={errors.quantity}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="quantity" className="form-control" />
              )}
              <label>Kod roweru</label>
              {errors.bikeCode ? (
                <Field
                  name="bikeCode"
                  className="form-control"
                  placeholder={errors.bikeCode}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field
                  name="bikeCode"
                  className="form-control"
                  placeholder="Kod roweru"
                />
              )}
              <SelectInput
                description="Marka"
                items={["Kands", "Merida", "Cannondale", "Trek", "Kross"]}
                ref={markRef}
              />
              <SelectInput
                description="Typ roweru"
                items={[
                  "BMX",
                  "Crossowe",
                  "Elektryczne",
                  "Górskie MTB",
                  "Gravele i przełajowe",
                  "Miejskie",
                  "Trekkingowe",
                ]}
                ref={bikeTypeRef}
              />
              <SelectInput
                description="Kolor"
                items={[
                  "Czarny",
                  "Biały",
                  "Czerwony",
                  "Zielony",
                  "Srebrny",
                  "Pomarańczowy",
                  "Niebieski",
                ]}
                ref={colorRef}
              />
              <br />
              <SelectInput
                description="Płeć"
                items={["Kobieta", "Mężczyzna"]}
                name="gender"
                ref={genderRef}
              />
              <SelectInput
                description="Hamulec"
                items={brakeName}
                ref={brakeRef}
              />
              <SelectInput
                description="Napęd"
                items={driveName}
                ref={driveRef}
              />
              <SelectInput
                description="Rama"
                items={frameName}
                ref={frameRef}
              />

              {!!selectError && <p class="alert alert-danger">{selectError}</p>}
              <br />
              <label>Zdjęcia</label>
              <div className="form-group multi-preview">
                {file?.map((url) => (
                  <img
                    src={url}
                    alt="..."
                    style={{ height: "30%", width: "30%" }}
                  />
                ))}
              </div>

              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={uploadMultipleFiles}
                  multiple
                />
              </div>
              <br />
              <Button type="submit" style={{ marginRight: "16%" }}>
                Dodaj rower
              </Button>
              <br />
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
};
export default AddBike;
