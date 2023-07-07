import { useEffect, useState } from "react";
// @ts-ignore
const UserActivityManager = ({ children }) => {
  const [userIsActive, setUserIsActive] = useState(true);
  // const { dispatch } = useApplicationState();
  useEffect(() => {
    console.count("use UserActivityManager");
    const handleMouseMove = () => setUserIsActive(true);
    const handleBlur = () => setUserIsActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("focus", handleMouseMove);
    window.addEventListener("blur", handleBlur);
    // todo
    // dispatch({
    //   type: "SET_USER_SESSION",
    //   payload: { userIsActive },
    // });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("focus", handleMouseMove);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return children(userIsActive);
};

export default UserActivityManager;
