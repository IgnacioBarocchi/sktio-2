import { useState } from "react";
import styled from "styled-components";
import { useApplicationState } from "../../containers/Context";
import Icon from "../UI/Icon";
import { MediumText } from "../UI/Text";
import { SktioStoreState, useSktioStore } from "../../store/store";

const SystemMessage = () => {
  // const { state, dispatch } = useApplicationState();
  // const [isVisible, setIsVisible] = useState(state.systemMessage.message);

  const { messagesState2, setMessagesState2 } = useSktioStore(
    (state: SktioStoreState) => ({
      messagesState2: state.messagesState2,
      setMessagesState2: state.setMessagesState2,
    })
  );

  const [isVisible, setIsVisible] = useState(
    !!messagesState2?.system.length > 0
  );

  const handleClose = () => {
    setIsVisible(false);
    messagesState2.currentSystemMessage = null;
    setMessagesState2(messagesState2);
    // dispatch({
    //   type: "SET_SYSTEM_MESSAGE",
    //   payload: { type: null, message: null },
    // });
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
      // variant={state.systemMessage.type}
      // variant={messagesState2.currentSystemMessage.type}
      variant={"sucess"}
      isVisible={isVisible}
    >
      {/* <MediumText>{state.systemMessage.message}</MediumText> */}
      {/* <MediumText>{messagesState2.currentSystemMessage.message}</MediumText> */}
      <Icon onClick={handleClose} icon={"cancel"} size={"2x"} />
    </StyledSystemMessage>
  );
};

export default SystemMessage;
