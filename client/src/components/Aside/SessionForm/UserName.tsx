import { FC, useContext } from "react";
import { ThemeContext } from "styled-components";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { BigText } from "../../UI/Text";
import { UserCircle } from "../../Message/MessageElements";
import { SessionState } from "../../../@types/Session";

const UserName: FC<{
  userId: SessionState["userId"];
  userColorIndex: SessionState["userColorIndex"];
}> = ({ userId, userColorIndex }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <FlexBoxWithSpacing gap={8}>
      <BigText weight="bold">User ID:</BigText>
      <BigText weight="bolder">{userId}</BigText>
      <UserCircle color={themeContext?.userColors[userColorIndex]} />
    </FlexBoxWithSpacing>
  );
};

export default UserName;
