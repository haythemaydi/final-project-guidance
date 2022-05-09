import { useState } from "react";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import DropDownBoxes from "../../components/common/DropDownBoxes";
import SocialMediaIcons from "../../components/common/SocialMediaIcons";
import GoBackToLogin from "../../components/common/GoBackToLogin";
import "./register.scss";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    selectedRole: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().min(2).max(50).label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).max(10).label("Password"),
    selectedRole: Joi.string().required(),
  };

  const { username, selectedRole, email, password } = data;
  const options = { abortEarly: false };

  const validate = () => {
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const scm = { [name]: schema[name] };
    const { error } = Joi.validate(obj, scm);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const details = { ...data };
    details[input.name] = input.value;
    setData(details, errors);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    //call the server and navigate the use to different pages
    console.log("Submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="register-center">
        <form className="register-border" onSubmit={handleSubmit}>
          <div className="text-logo">
            <h1>Guidance</h1>
          </div>
          <div className="register-text">
            <p>Sign up and make newcomers's life easier in your city </p>
          </div>
          {/* <SocialMediaIcons /> */}
          <div className="form-group">
            <Input
              name="username"
              value={username}
              error={errors.username}
              onChange={handleChange}
            />
          </div>
          <DropDownBoxes
            name="selectedRole"
            value={selectedRole}
            error={errors.selectedRole}
            onChange={handleChange}
          />
          <Input
            name="email"
            value={email}
            error={errors.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            value={password}
            error={errors.password}
            onChange={handleChange}
          />
          <button disabled={validate()} className="btn btn-primary">
            Register
          </button>
        </form>
        <GoBackToLogin />
      </div>
    </motion.div>
  );
};

export default Register;
