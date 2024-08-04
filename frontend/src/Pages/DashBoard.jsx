import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";

export const DashBoard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"1000"} />
        <Users />
      </div>
    </div>
  );
  // }
};
