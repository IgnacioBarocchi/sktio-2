import styled from "styled-components";
import UI from "../../../constants/UI";

export const StyledForm = styled.form`
  display: flex;
  position: relative;
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2em;
  left: ${() => UI.positions.getter.imageFilePreviewLeftPosition(false)};
  padding-bottom: 1em;
`;

export const Fileinputs = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
export const StyledInput = styled.input``;

export const StyledFileInput = styled(StyledInput).attrs({
  type: "file",
  accept: "image/*",
})`
  position: relative;
  text-align: right;
  -moz-opacity: 0;
  filter: alpha(opacity: 0);
  opacity: 0;
  z-index: 2;
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;

export const FakeFile = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
`;

export const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: -1em;
  border-bottom: 1px dashed ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`;

export const Footer = styled.footer`
  position: relative;
`;
export const CancelButton = styled.button``;

export const PreviewImageContainer = styled.div`
  position: relative;
`;
export const PreviewImage = styled.img`
  border-radius: 10px;
  width: 150px;
`;

export const ActionFlag = styled.div`
  width: 100%;
  background-opacity: 0.1;
  background: ${({ theme }) => theme.background.primary};
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50%;
  text-align: center;
`;
