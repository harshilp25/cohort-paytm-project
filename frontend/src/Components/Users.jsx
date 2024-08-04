import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticationAtom } from "../atoms/authAtom";

export const Users = () => {
  const [filter, setFilter] = useState(" ");
  const token = useRecoilValue(authenticationAtom);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetcheduser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/user/bulk?filter=${filter}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setUsers(data.users);
      } catch (error) {
        console.error(
          "error come inside the user fetching effect" + error.message
        );
        return;
      }
    };

    const id = setTimeout(() => {
      console.log("insdie the timeout");
      fetcheduser();
    }, 750);

    return () => clearTimeout(id);
  }, [filter]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users?.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/payment?id=${user._id}&name=${user.lastname}`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div className="font">{user.lastname}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"send"} onclick={handleOnClick} />
      </div>
    </div>
  );
}
