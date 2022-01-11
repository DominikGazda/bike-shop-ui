import { useLocation } from "react-router";
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
import { useHistory } from "react-router";

const AddWorkshop = () => {
  const location = useLocation();
  const type = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const [workshopType, setWorkshopType] = useState("TOOLS");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fileObjects, setFileObjects] = useState(null);
  const history = useHistory();
  //refs
  const markRef = useRef(null);
  const bikeTypeRef = useRef(null);
  const colorRef = useRef(null);
  const pumpTypeRef = useRef(null);
  const pumpValveRef = useRef(null);
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
    productCode: Yup.string().required("Podaj kod roweru"),
  });

  const handleWorkshopTypeChange = (e) => {
    setWorkshopType(e.target.value);
  };

  const addWorkshopApi = async function (workshopToSave, files, file) {
    const formData = new FormData();

    Object.keys(workshopToSave).forEach((key) => {
      formData.append(key, workshopToSave[key]);
    });

    for (let i = 0; i < file?.length; i++) {
      formData.append(`image${i}`, files[0][i]);
    }

    try {
      const response = await axios({
        method: apiSpec.ADD_WORKSHOP.operation,
        url: apiSpec.ADD_WORKSHOP.url,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        data: formData,
      });
      const data = response.data;
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
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
          if (colorRef.current.innerText.length == 1) {
            setSelectError("Wybierz kolor");
            return;
          }

          let workshopTypeModified = "";

          if (workshopType === "TOOLS") workshopTypeModified = "Narzędzia";
          if (workshopType === "RACKS") workshopTypeModified = "Stojaki";
          if (workshopType === "MAINTENANCE")
            workshopTypeModified = "Konserwacja";

          const workshopToSave = {
            ...values,
            mark: markRef.current.innerText,
            workshopType: workshopTypeModified,
            color: colorRef.current.innerText,
            itemType: "WORKSHOP",
          };
          addWorkshopApi(workshopToSave, fileObjects, file);
        }}
      >
        {({ errors }) => (
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
            <h1>Dodaj do warsztatu</h1>
            <Form>
              <div className="form-group">
                <label>Typ części</label>
                <select
                  name="workshop"
                  id="workshop"
                  onChange={handleWorkshopTypeChange}
                >
                  <option value="TOOLS">Narzędzia</option>
                  <option value="RACKS">Stojaki</option>
                  <option value="MAINTENANCE">Konserwacja</option>
                </select>
                <br />

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
              <label>Kod produktu</label>
              {errors.productCode ? (
                <Field
                  name="productCode"
                  className="form-control"
                  placeholder={errors.productCode}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="productCode" className="form-control" />
              )}
              <label>Waga</label>
              {errors.weight ? (
                <Field
                  name="weight"
                  className="form-control"
                  placeholder={errors.weight}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="weight" className="form-control" />
              )}
              <label>Pojemność</label>
              {errors.capacity ? (
                <Field
                  name="capacity"
                  className="form-control"
                  placeholder={errors.capacity}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="capacity" className="form-control" />
              )}
              <label>Użycia</label>
              {errors.usages ? (
                <Field
                  name="usages"
                  className="form-control"
                  placeholder={errors.usages}
                  style={{ borderColor: "red" }}
                />
              ) : (
                <Field name="usages" className="form-control" />
              )}

              <SelectInput
                description="Marka"
                items={["Kands", "Merida", "Cannondale", "Trek", "Kross"]}
                ref={markRef}
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
                ]}
                ref={colorRef}
              />
              <br />
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
                Dodaj akcesoria
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
};
export default AddWorkshop;
