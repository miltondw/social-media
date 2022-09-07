import React from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function Form({
  onSubmit,
  onchange,
  errors,
  values,
  loading,
  path,
}) {
  return (
    <Container>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        display="flex"
        sx={{ flexDirection: "column", width: "40%", margin: "2em auto" }}>
        <TextField
          required
          id="username"
          name="username"
          label={errors?.username ? errors?.username : "Username"}
          error={errors?.username ? true : false}
          defaultValue={values.username}
          autoComplete="current-username"
          variant="standard"
          onChange={onchange}
        />
        {path !== "/" && (
          <TextField
            required
            id="email"
            name="email"
            label={errors?.email ? errors?.email : "Email"}
            type="email"
            defaultValue={values.email}
            error={errors?.email ? true : false || errors?.empty ? true : false}
            autoComplete="current-email"
            variant="standard"
            onChange={onchange}
          />
        )}
        <TextField
          required
          id="password"
          name="password"
          label={errors?.password ? errors?.password : "Password"}
          type="password"
          defaultValue={values.password}
          autoComplete="current-password"
          variant="standard"
          onChange={onchange}
          error={errors?.password ? true : false}
        />
        {path !== "/" && (
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label={errors?.password ? errors?.password : "Confirm Password"}
            type="password"
            defaultValue={values.confirmPassword}
            autoComplete="current-password"
            variant="standard"
            onChange={onchange}
            error={errors?.password ? true : false}
          />
        )}

        {
          <LoadingButton
            loading={loading}
            loadingPosition={loading ? "start" : null}
            startIcon={loading ? <SaveIcon /> : ""}
            variant="outlined"
            type="submit"
            sx={{ width: "28%", margin: "auto", marginTop: "10px" }}>
            {path !== "/" ? "Register" : "Login"}
          </LoadingButton>
        }
        {errors && (
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {Object.values(errors).map((error) => (
              <ListItem key={error}>
                <ListItemText sx={{ color: "red" }} primary={error} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
