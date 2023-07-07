import { useState } from "react";
import { MediaType } from "../../../@types/Message/Message";
import { useApplicationState } from "../../../containers/Context";
import convertBase64 from "../../../lib/convertBase64";
import { SEND_MESSAGE_EVENT } from "../../../lib/socketEvents";
import Icon from "../../UI/Icon";
import { MediumText } from "../../UI/Text";
import {
  ActionFlag,
  ButtonsContainer,
  CancelButton,
  FakeFile,
  Fileinputs,
  Footer,
  Preview,
  PreviewImage,
  PreviewImageContainer,
  StyledButton,
  StyledFileInput,
  StyledForm,
} from "./MediaUploaderElements";

// @ts-ignore
const MediaUploader = ({ socket }: { socket: Socket }) => {
  // const {
  //   state: { session },
  //   dispatch,
  // } = useApplicationState();
  const [imageBase64, setImageBase64] = useState<string>("");

  const [hoverState, setHoverState] = useState({
    isHoveringSubmit: false,
    isHoveringCancel: false,
  });

  const handleMouseOver = (
    buttonName: "isHoveringSubmit" | "isHoveringCancel"
  ) => {
    setHoverState({ ...hoverState, [buttonName]: true });
  };

  const handleMouseOut = (
    buttonName: "isHoveringSubmit" | "isHoveringCancel"
  ) => {
    setHoverState({ ...hoverState, [buttonName]: false });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const media: MediaType = { type: "image", src: imageBase64 };
    socket.emit(SEND_MESSAGE_EVENT, {
      // media: message,
      media,
      room: session.room,
      userId: session.userId,
      userColor: session.userColor,
      userColorIndex: session.userColorIndex,
      userAlias: session.userAlias,
    });

    dispatch({
      type: "UPDATE_MESSAGING_DATA_STATE",

      payload: {
        sent: {
          text: "",
          media,
          isSent: true,
        },
      },
    });

    setImageBase64("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {imageBase64 ? (
        <Preview>
          <PreviewImageContainer>
            <PreviewImage src={imageBase64} />
            {hoverState.isHoveringCancel || hoverState.isHoveringSubmit ? (
              <ActionFlag>
                <MediumText>
                  {hoverState.isHoveringCancel ? "cancel" : "submit"}
                </MediumText>
              </ActionFlag>
            ) : null}
          </PreviewImageContainer>
          <Footer>
            <ButtonsContainer>
              <StyledButton
                onMouseOver={() => handleMouseOver("isHoveringSubmit")}
                onMouseOut={() => handleMouseOut("isHoveringSubmit")}
                type="submit"
              >
                <Icon icon={"circle-check"} size={"2x"} />
              </StyledButton>
              <StyledButton
                onMouseOver={() => handleMouseOver("isHoveringCancel")}
                onMouseOut={() => handleMouseOut("isHoveringCancel")}
                onClick={() => setImageBase64("")}
              >
                <Icon icon={"cancel"} size={"2x"} />
              </StyledButton>
            </ButtonsContainer>
          </Footer>
        </Preview>
      ) : (
        <Fileinputs>
          <StyledFileInput
            onChange={async (event) => {
              const image = event.target.files?.[0] || null;
              if (!image) return;
              setImageBase64(await convertBase64(image));
            }}
          />
          <FakeFile>
            {/* <input /> */}
            <Icon size={"2x"} icon={"image"} />
          </FakeFile>
        </Fileinputs>
      )}
    </StyledForm>
  );
};

export default MediaUploader;
