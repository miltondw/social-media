import React from "react";
import {
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
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  AccountCircle,
  Password,
} from "@mui/icons-material";

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
        <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="username">
            {errors?.username ? errors?.username : "Username"}
          </InputLabel>
          <OutlinedInput
            error={errors?.username && true}
            id="username"
            name="username"
            type="text"
            value={values.username}
            onChange={onchange}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="current-email"
                  onClick={handleClickShowPassword}
                  edge="start">
                  <AccountCircle />
                </IconButton>
              </InputAdornment>
            }
            label={errors?.username ? errors?.username : "Username"}
          />
        </FormControl>
        {path !== "/" && (
          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="email">
              {errors?.email ? errors?.email : "Email"}
            </InputLabel>
            <OutlinedInput
              error={errors?.email && true}
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={onchange}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="current-email"
                    onClick={handleClickShowPassword}
                    edge="start">
                    <EmailOutlined />
                  </IconButton>
                </InputAdornment>
              }
              label={errors?.email ? errors?.email : "Email"}
            />
          </FormControl>
        )}
        <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="password">
            {errors?.password ? errors?.password : "Password"}
          </InputLabel>
          <OutlinedInput
            error={errors?.password && true}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={onchange}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="current-email"
                  onClick={handleClickShowPassword}
                  edge="start">
                  <Password />
                </IconButton>
              </InputAdornment>
            }
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
              error={errors?.password && true}
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
