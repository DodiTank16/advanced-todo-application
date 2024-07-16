import { Tilt } from "react-tilt";
import BackgroundImage from "../assets/images/Login_background.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/authAction";
import InputField from "../components/InputField";

type Props = {};

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.0, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    // dispatch(loginUser());
    navigate("/");

    // setCookie("token", token, 1)
  };
  return (
    <div
      style={{
        backgroundImage: `url(./assets/images/Login_background.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <Tilt
        options={defaultOptions}
        style={{
          boxShadow: "0 48px 60px 0 rgba(2,14,26,.24)",
          transformStyle: "preserve-3d",
        }}>
        <div
          className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            transform: "translateZ(50px)",
          }}>
          <Tilt className="h-[300px] w-[500px]">
            <div
              className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full font-sans"
              style={{ boxShadow: " 0 0 100px 0 rgba(0, 0, 0, .45)" }}>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form action="" method="post">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    // value={formik.}  //implement formik
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="text-blue-600 form-checkbox"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  onClick={handleLogin}>
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </Tilt>
        </div>
      </Tilt>
    </div>
  );
};

export default Login;
