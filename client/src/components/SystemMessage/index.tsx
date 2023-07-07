import { useState } from "react";
import styled from "styled-components";
import Icon from "../UI/Icon";
import { useSktioStore } from "../../store/store";

const SystemMessage = () => {
  // const { state, dispatch } = useApplicationState();
  // const [isVisible, setIsVisible] = useState(state.systemMessage.message);

  const { messagesState, setMessagesState } = useSktioStore((state) => ({
    messagesState: state.messagesState,
    setMessagesState: state.setMessagesState,
  }));

  const [isVisible, setIsVisible] = useState(messagesState?.system.length > 0);

  const handleClose = () => {
    setIsVisible(false);
    messagesState.system = [];
    setMessagesState(messagesState);
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
      // TODO
      // variant={state.systemMessage.type}
      // variant={messagesState.currentSystemMessage.type}
      variant={"sucess"}
      isVisible={isVisible}
    >
      {/* // TODO */}
      {/* <MediumText>{state.systemMessage.message}</MediumText> */}
      {/* <MediumText>{messagesState.currentSystemMessage.message}</MediumText> */}
      <Icon onClick={handleClose} icon={"cancel"} size={"2x"} />
    </StyledSystemMessage>
  );
};

export default SystemMessage;
