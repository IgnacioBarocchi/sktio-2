import { useState } from "react";
import styled from "styled-components";
import { useApplicationState } from "../../containers/Context";
import Icon from "../UI/Icon";
import { MediumText } from "../UI/Text";

const SystemMessage = () => {
  const { state, dispatch } = useApplicationState();
  const [isVisible, setIsVisible] = useState(state.systemMessage.message);

  const handleClose = () => {
    setIsVisible(false);
    dispatch({
      type: "SET_SYSTEM_MESSAGE",
      payload: { type: null, message: null },
    });
  };

  if (!isVisible) {
    return null;
  }

  const StyledSystemMessage = styled.div<{
    variant: string;
    isVisible: boolean;
  }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${({ theme, variant }) => theme.color[variant]};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  `;

  return (
    <StyledSystemMessage
      variant={state.systemMessage.type}
      isVisible={isVisible}
    >
      <MediumText>{state.systemMessage.message}</MediumText>
      <Icon onClick={handleClose} icon={"cancel"} size={"2x"} />
    </StyledSystemMessage>
  );
};

export default SystemMessage;
