import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { useRecoilState } from "recoil";
import { inputBoxAtom } from "../atoms/inputboxAtom";
import { useNavigate } from "react-router-dom";
import { authenticationAtom } from "../atoms/authAtom";

export const Signin = () => {
  const [token, setToken] = useRecoilState(authenticationAtom);
  const [input, setInput] = useRecoilState(inputBoxAtom);

  const onhandleInput = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: input.firstname,
          password: input.password,
        }),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(localStorage.getItem("token"));
    } catch (error) {
      console.error("error comes " + error.message);
      return;
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading head={"Signin"} />
          <SubHeading
            subHeading={"fill the below details to make a transaction "}
          />
          <InputBox
            label={"firstname"}
            placeholder={"adam@gmail.com"}
            reader={input.firstname}
            onchnage={(e) =>
              setInput((input) => ({ ...input, firstname: e.target.value }))
            }
          />
          <InputBox
            label={"password"}
            reader={input.password}
            placeholder={""}
            onchnage={(e) =>
              setInput((input) => ({ ...input, password: e.target.value }))
            }
          />
          <div className="pt-4">
            <Button label={"Signin"} onclick={onhandleInput} />
          </div>
          <BottomWarning
            warning={"Signup"}
            to={"/signup"}
            buttonText={"SignUp"}
          />
        </div>
      </div>
    </div>
  );
};
