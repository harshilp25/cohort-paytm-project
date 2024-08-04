import { Link } from "react-router-dom";

export function BottomWarning({ Warning, to, buttonText }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>don't have an account ? </div>{" "}
      <Link className="pointer underline pl-1 cursor-pointer font-bold" to={to}>
        {buttonText}
      </Link>{" "}
    </div>
  );
}
