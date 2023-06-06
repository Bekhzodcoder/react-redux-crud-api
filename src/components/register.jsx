import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../ui/input";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "../slice/auth";
import AuthService from "../service/auth";
import {ValidationError} from './index'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassport] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = {
      username: name,
      email,
      password,
    };
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user));
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  useEffect(()=>{
    if(loggedIn) navigate('/')
  }, [loggedIn])

  return (
    <main className="form-signin text-center w-50 m-auto mt-5">
      <form>
        <img
          className="mb-4"
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <ValidationError />

        <Input
          label={"Username"}
          state={name}
          type={"text"}
          setState={setName}
        />
        <Input
          label={"Email address"}
          type={"email"}
          state={email}
          setState={setEmail}
        />
        <Input
          label={"Passport"}
          type={"password"}
          state={password}
          setState={setPassport}
        />

        <button
          className="w-100 btn btn-lg btn-primary mt-2"
          disabled={isLoading}
          onClick={registerHandler}
          type="submit"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </main>
  );
};

export default Register;
