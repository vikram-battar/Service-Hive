const register = async (formData) => {
    setLoader(true);
    // console.log("formData", formData, validateInput(formData));
    if (validateInput(formData)) {
      const url = config.endpoint + "/auth/register";
      console.log(loader);
      try {
        await axios
          .post(url, {
            username: formData.username,
            password: formData.password,
          })
          .then((resp) => {
            setLoader(false);
            enqueueSnackbar("Registered success ");
            console.log(resp);
          })
          .catch((err) => {
            setLoader(false);

            // if (err.inclue("400")){
            enqueueSnackbar("Username is already taken");
            // }console.log(err);
          });
      } catch (e) {
        setLoader(false);

        enqueueSnackbar("Username is already taken");
      }
    } else {
      setLoader(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is a required field");
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters");
    }
    if (data.password === "") {
      enqueueSnackbar("Password is a required field");
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters");
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match");
    }
    if (
      data.username !== "" &&
      data.username.length >= 6 &&
      data.password !== "" &&
      data.password.length >= 6 &&
      data.password === data.confirmPassword
    ) {
      return true;
    }
    return false;
  };
  const [hasHiddenAuthButtons, setHasHiddenAuthButtons] = useState(false);
useEffect(()=>{
  setHasHiddenAuthButtons(false)
})
// if (window.location.href[window.location.href.length-1] === ("/")){
//   setHasHiddenAuthButtons(true)
// }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const uName = (e) => setUsername(e.target.value);
  const pass = (e) => setPassword(e.target.value);
  const cPass = (e) => setConfirmPassword(e.target.value);
  const formData = {
    username,
    password,
    confirmPassword,
  };