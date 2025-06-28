import "./style.scss";
import { useEffect, useState, useCallback } from "react";
import loginImage from "@/assets/images/login.jpg";
import logo from "@/assets/images/loginlogo.png";
//********************************************** */
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";
import OtpInput from "react-otp-input";
//********************************************** */
import { Message } from "@/libs/utils/message";
import localstorage from "@core/storageService";
import Timer from "@/components/timer/timer";
//********************************************** */
import { useForm } from "react-hook-form";
import { useSubmit, useNavigate } from "react-router-dom";
//********************************************** */
import { otpSend, otpLogin, passwordLogin } from "@services/authService.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState("otp");
  const [otp, setOtp] = useState("");
  const [reload, setReload] = useState(false);
  const [timeStatus, setTimeStatus] = useState(false);
  const [timerCount, setTimerCount] = useState(120);

  const changeStep = useCallback((newStep) => {
    setStep(newStep);
  }, []);

  const handelChangeOtp = useCallback((value) => {
    setOtp(value);
  }, []);

  const checkTimerRemaining = (leftTime) => {
    if (leftTime) setTimeStatus(true);
    else if (reload) setReload(true);
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "otp" ? "password" : "otp");
    setStep(1);
  };

  const resendNewCode = useCallback(async () => {
    setReload(true);
    setTimeStatus(false);
    const modelLoginWithMobileNumber = {
      username: getValues().username,
    };
    await loginWithMobileNumber(modelLoginWithMobileNumber);
  }, [getValues]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed)
      return (
        <Button onClick={() => changeStep(1)} className="resend-mobile-number">
          دریافت مجدد
        </Button>
      );
    else {
      return (
        <span className="timer-counter persian-number">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const autoLogin = async (data) => {
    try {
      await otpLogin(data).then((response) => {
        saveUserInfo(response.data);
        // const { token, ...userInfo } = response.data;
        // localstorage.setToken(response.data.token);
        // localstorage.setUser(userInfo);
        // navigate("/");
        // //  navigate("/profile");
      });
    } catch (error) {
      Message("error", "کد پیامکی وارد شده صحیح نمی باشد");
    }
  };

  const loginWithPassword = async (data) => {
    try {
      await passwordLogin(data).then((response) => {
        saveUserInfo(response.data);
        // const { token, ...userInfo } = response.data;
        // localstorage.setToken(response.data.token);
        // localstorage.setUser(userInfo);
        // navigate("/");
      });
    } catch (error) {
      Message("error", "نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const saveUserInfo = (data) => {
    try {
      const { token, ...userInfo } = data;
      localstorage.setToken(data.token);
      localstorage.setUser(userInfo);
      navigate("/");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const loginWithMobileNumber = useCallback(async (data) => {
    try {
      await otpSend(data).then((response) => {
        if (response.status === 200) changeStep(2);
      });
    } catch (error) {
      Message("error", "خطایی رخ داده است ، مجددا تلاش نمایید");
    }
  }, []);
  /* #endregion */

  /* #region otpLogin */
  const onSubmit = async (data) => {
    console.log(data, "data");
    // await loginWithMobileNumber(data);

    if (loginMethod === "otp") await loginWithMobileNumber(data);
    else await loginWithPassword(data);
  };
  /* #endregion */

  useEffect(() => {
    if (otp.length === 4) {
      console.log("send oooooo");
      const model = {
        username: getValues().username,
        otp,
      };
      autoLogin(model);
    }
  }, [otp, getValues]);

  const renderStepElement2 = () => {
    return step === 1 ? (
      <section className="login-first-step">
        <section className="title-insert-mobile-number">
          برای ورود یا ثبت نام شماره موبایل را وارد کنید
        </section>
        <section className="step-one">
          <section className="wrapper-mobile-number">
            <TextField
              label="شماره موبایل"
              variant="outlined"
              size="small"
              className="mobile-number-input persian-number"
              type="number"
              name="username"
              {...register("username", {
                required: true,
                minLength: 11,
                maxLength: 11,
                validate: {
                  checkLength: (value) => value.length === 11,
                  matchPattern: (value) =>
                    /^(00989|\+989|09)(\d{9})$/gm.test(value),
                },
              })}
            />
          </section>
          {errors.username && errors.username.type === "required" && (
            <p className="error-validation">شماره موبایل اجباری است</p>
          )}
          {errors.username &&
            (errors.username.type === "minLength" ||
              errors.username.type === "maxLength") && (
              <p className="error-validation persian-number">
                شماره موبایل باید 11 رقم باشد
              </p>
            )}
          {errors.username && errors.username.type === "matchPattern" && (
            <p className="error-validation">شماره موبایل وارد شده معتبر نیست</p>
          )}
          <Button type="submit" variant="contained" className="get-code">
            دریافت کد
          </Button>
        </section>
      </section>
    ) : (
      <section className="login-first-step">
        <section className="insert-otp-code">
          <section className="otp-send-to-mobile-number">
            کد تایید برای شماره
            <span className="mobile-number persian-number">
              {getValues().username}
            </span>
            ارسال شد .
          </section>
          <section
            onClick={() => changeStep(1)}
            className="edit-mobile-number pointer"
          >
            ویرایش شماره
          </section>
        </section>

        <section className="step-one">
          <section className="wrapper-mobile-number">
            <TextField
              label="شماره موبایل"
              variant="outlined"
              size="small"
              className="mobile-number-input"
              type="number"
              disabled
            />
          </section>
          <section
            className={`timer-resend-code ${
              timeStatus ? "timer-end-time" : "timer-counter-time"
            }`}
          >
            {timeStatus && (
              <Button
                onClick={() => resendNewCode()}
                className="resend-mobile-number"
              >
                دریافت مجدد کد
              </Button>
            )}

            <Timer
              time={timerCount}
              countingTime={checkTimerRemaining}
              reload={reload}
            />
          </section>
          <section className="wrapper-otp">
            <OtpInput
              containerStyle="otp-container"
              inputStyle="otp-fields"
              inputType="number"
              shouldAutoFocus={true}
              numInputs={4}
              value={otp}
              onChange={handelChangeOtp}
              renderInput={(props) => <input {...props} />}
            />
          </section>
        </section>
      </section>
    );
  };

  const renderStepElement = () => {
    if (loginMethod === "password") {
      return (
        <section className="login-first-step">
          <section className="title-insert-mobile-number">
            ورود با شماره موبایل و رمز عبور
          </section>
          <section className="step-one">
            <section>
              <TextField
                label="شماره موبایل"
                variant="outlined"
                size="small"
                className="mobile-number-input"
                type="number"
                sx={{
                  width: "100%",
                  marginBottom: "10px",
                }}
                {...register("username", {
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                  validate: {
                    checkLength: (value) => value.length === 11,
                    matchPattern: (value) =>
                      /^(00989|\+989|09)(\d{9})$/gm.test(value),
                  },
                })}
              />
              {errors.username && errors.username.type === "required" && (
                <p className="error-validation">شماره موبایل اجباری است</p>
              )}
              {errors.username &&
                (errors.username.type === "minLength" ||
                  errors.username.type === "maxLength") && (
                  <p className="error-validation persian-number">
                    شماره موبایل باید 11 رقم باشد
                  </p>
                )}
              {errors.username && errors.username.type === "matchPattern" && (
                <p className="error-validation">
                  شماره موبایل وارد شده معتبر نیست
                </p>
              )}
            </section>

            <section>
              <TextField
                label="رمز عبور"
                variant="outlined"
                size="small"
                className="password-input"
                type="password"
                sx={{
                  width: "100%",
                }}
                {...register("password", { required: true })}
              />

              {errors.password && errors.password.type === "required" && (
                <p className="error-validation">رمز عبور اجباری است</p>
              )}
            </section>
            <Button type="submit" variant="contained" className="get-code">
              ورود
            </Button>
          </section>
        </section>
      );
    }
    return step === 1 ? (
      <section className="login-first-step">
        <section className="title-insert-mobile-number">
          برای ورود یا ثبت نام شماره موبایل را وارد کنید
        </section>
        <section className="step-one">
          <section className="wrapper-mobile-number">
            <TextField
              label="شماره موبایل"
              variant="outlined"
              size="small"
              className="mobile-number-input persian-number"
              type="number"
              name="username"
              {...register("username", {
                required: true,
                minLength: 11,
                maxLength: 11,
                validate: {
                  checkLength: (value) => value.length === 11,
                  matchPattern: (value) =>
                    /^(00989|\+989|09)(\d{9})$/gm.test(value),
                },
              })}
            />
          </section>
          {errors.username && errors.username.type === "required" && (
            <p className="error-validation">شماره موبایل اجباری است</p>
          )}
          {errors.username &&
            (errors.username.type === "minLength" ||
              errors.username.type === "maxLength") && (
              <p className="error-validation persian-number">
                شماره موبایل باید 11 رقم باشد
              </p>
            )}
          {errors.username && errors.username.type === "matchPattern" && (
            <p className="error-validation">شماره موبایل وارد شده معتبر نیست</p>
          )}
          <Button type="submit" variant="contained" className="get-code">
            دریافت کد
          </Button>
        </section>
      </section>
    ) : (
      <section className="login-first-step">
        <section className="insert-otp-code">
          <section className="otp-send-to-mobile-number">
            کد تایید برای شماره
            <span className="mobile-number persian-number">
              {getValues().username}
            </span>
            ارسال شد .
          </section>
          <section
            onClick={() => changeStep(1)}
            className="edit-mobile-number pointer"
          >
            ویرایش شماره
          </section>
        </section>

        <section className="step-one">
          <section className="wrapper-mobile-number">
            <TextField
              label="شماره موبایل"
              variant="outlined"
              size="small"
              className="mobile-number-input"
              type="number"
              disabled
            />
          </section>
          <section
            className={`timer-resend-code ${
              timeStatus ? "timer-end-time" : "timer-counter-time"
            }`}
          >
            {timeStatus && (
              <Button
                onClick={() => resendNewCode()}
                className="resend-mobile-number"
              >
                دریافت مجدد کد
              </Button>
            )}

            <Timer
              time={timerCount}
              countingTime={checkTimerRemaining}
              reload={reload}
            />
          </section>
          <section className="wrapper-otp">
            <OtpInput
              containerStyle="otp-container"
              inputStyle="otp-fields"
              inputType="number"
              shouldAutoFocus={true}
              numInputs={4}
              value={otp}
              onChange={handelChangeOtp}
              renderInput={(props) => <input {...props} />}
            />
          </section>
        </section>
      </section>
    );
  };

  return (
    <section className="login-page">
      <section className="login-page__right-element">
        <section className="wrapper-inner-login-elemnt">
          <section className="hero-logo">
            <img className="logo" src={logo} alt="" />
          </section>
          {/* <form onSubmit={handleSubmit(onSubmit)}>{renderStepElement()}</form> */}
          <form onSubmit={handleSubmit(onSubmit)}>{renderStepElement()}</form>
          <Button
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
            variant="outlined"
            className="toggle-method"
            onClick={toggleLoginMethod}
          >
            {loginMethod === "otp" ? "ورود با رمز عبور" : "ورود با کد پیامکی"}
          </Button>
        </section>
      </section>
      <section className="login-page__left-element">
        <img className="login-cover-image" src={loginImage} alt="" />
      </section>
    </section>
  );
};

export default Login;
