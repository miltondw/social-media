import React from "react";
import {
  TextField,
  Box,
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Alerts from "../Atom/Alerts";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Form({
  onSubmit,
  onchange,
  errors,
  values,
  loading,
  path,
  handleClickShowPassword,
  showPassword,
}) {
  const errorValues = Object.values(errors);

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
        <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="password">
            {errors?.password ? errors?.password : "Password"}
          </InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={onchange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={errors?.password ? errors?.password : "Password"}
          />
        </FormControl>
        {path !== "/" && (
          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirmPassword">
              {errors?.confirmPassword
                ? errors?.confirmPassword
                : "Confirm Password"}
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={onchange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    onClick={handleClickShowPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={
                errors?.confirmPassword
                  ? errors?.confirmPassword
                  : "Confirm Password"
              }
            />
          </FormControl>
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

        {errors && <Alerts type="error" errorValues={errorValues} />}
      </Box>
    </Container>
  );
}
