import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import { useRecoilState } from "recoil";
import { inputBoxAtom } from "../atoms/inputboxAtom.js";

import { authenticationAtom } from "../atoms/authAtom.js";
export const Signup = () => {
  const [token, setToken] = useRecoilState(authenticationAtom);
  const [input, setInput] = useRecoilState(inputBoxAtom);

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: input.firstname,
          lastname: input.lastname,
          password: input.password,
        }),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(localStorage.getItem("token"));
    } catch (error) {
      console.error("inside the signup component");
      return;
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading head={"Signup"} />
          <SubHeading subHeading={"fill the below deatils to make a payment"} />
          <InputBox
            label={"firstname"}
            placeholder={"adama@gmail.com"}
            reader={input.firstname}
            onchnage={(e) =>
              setInput((input) => ({ ...input, firstname: e.target.value }))
            }
          />
          <InputBox
            label={"lastname"}
            placeholder={"surname"}
            reader={input.lastname}
            onchnage={(e) =>
              setInput((input) => ({ ...input, lastname: e.target.value }))
            }
          />
          <InputBox
            label={"passwrod"}
            placeholder={"Enter password here"}
            reader={input.password}
            onchnage={(e) =>
              setInput((input) => ({ ...input, password: e.target.value }))
            }
          />
          <div className="pt-4">
            <Button label={"Signup"} onclick={handleSignup} />
          </div>
          <BottomWarning
            Warning={"already have an account ?"}
            to={"/signin"}
            buttonText={"signin"}
          />
        </div>
      </div>
    </div>
  );
};
