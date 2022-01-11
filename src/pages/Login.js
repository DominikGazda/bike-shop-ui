import React, { Fragment } from "react";
import { Card, TextField } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router";
import apiSpec from "../api/apiSpec";
import { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SinginSchema = Yup.object().shape({
  login: Yup.string()
    .required("Pole login jest wymagane")
    .min(2, ({ min }) => `Pole musi zawierać ${min} znaki`),
  password: Yup.string().required("Hasło nie może być puste"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [errorMessage, setErrormessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Metoda uwierzytelniająca użytkownika
  const fetchApi = useCallback(async ({ login, password }) => {
    try {
      setIsLoading(true);
      /*Wysłanie zapytania do serwera. Odpowiedź zapisana w zmiennej response*/
      const response = await axios({
        method: apiSpec.LOGIN.operation,
        url: apiSpec.LOGIN.url,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: login,
          password,
        },
      });
      /*przypisanie danych w formacie JSON z odpowiedzi
      do zmiennej data*/
      const data = response.data;
      /*
      sprawdzenie roli użytkownika
      */
      const isAdmin = jwt_decode(data).authorities.map((auth) => {
        if (auth.authority === "ROLE_ADMIN") {
          return true;
        } else {
          return false;
        }
      })[0];
      /*
      Zalogowanie użytkownika na stronie jeżeli nie wystąpią błędy
      */
      dispatch({
        type: "LOGIN",
        login,
        password,
        isLoggedIn: true,
        isAdmin,
        jwt: data,
      });
      setIsLoading(false);
    } catch (error) {
      /*
      Jeżeli nie uwierzytelniono użytkownika serwer zwraca
      odpowiedź ze statusem 403
      */
      if (error.response.status === 403) {
        /*
          W przypadku braku uwierzytelnienia wyświetla się odpowiedni
          komunikat
        */
        setErrormessage("Niepoprawny login, lub hasło. Spróbuj ponownie");
        setOpen(true);
      }
    }
  });

  return (
    <Fragment>
      <center>
        <h1 style={{ marginTop: "2.7%" }}>Logowanie użytkownika</h1>
      </center>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SinginSchema}
        onSubmit={(values, { validate }) => {
          console.log({ ...values });
          fetchApi(values);
        }}
      >
        {({ errors }) => (
          <Card
            style={{
              height: "30%",
              width: "30%",
              marginTop: "4%",
              marginLeft: "35%",
              borderRadius: "25px",
              padding: "1%",
              border: "2px",
            }}
          >
            <Form>
              <div className="form-group">
                <label>Login</label>
                {errors.login ? (
                  <Field
                    name="login"
                    className="form-control"
                    placeholder={errors.login}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <Field
                    name="login"
                    className="form-control"
                    placeholder="Login"
                  />
                )}
                <label>Hasło</label>
                {errors.password ? (
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder={errors.password}
                    style={{ borderColor: "red" }}
                  />
                ) : (
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Hasło"
                  />
                )}
              </div>
              <br />
              <Button type="submit" style={{ marginRight: "16%" }}>
                Zaloguj
              </Button>
              <Link to="register">
                <Button>Zrejestruj</Button>
              </Link>
            </Form>
          </Card>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        style={{ zIndex: "2" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          style={{ zIndex: "1000", position: "relative" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default Login;
