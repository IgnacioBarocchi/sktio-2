import React, { useState } from "react";
import { StyledInput, StyledInputWithButton } from "../UI/Input";
import { FlexBoxWithSpacing } from "../UI/Spacing";
import { BigText, MediumText } from "../UI/Text";
import {
  Button,
  CheckboxField,
  CheckboxLabel,
  FormContainer,
  FormField,
  Label,
  Option,
  Select,
  TokenInput,
} from "./RoomFormElements";

interface RoomFormData {
  room: string;
  token: string;
  acceptMedia: boolean;
  acceptLinks: boolean;
  maxUsers: number;
  region: string;
  isPrivate: boolean;
}

const RoomForm = () => {
  const [formData, setFormData] = useState<RoomFormData>({
    room: "",
    token: Array(8).fill(" ").join(""),
    acceptMedia: false,
    acceptLinks: false,
    maxUsers: 2,
    region: "argentina",
    isPrivate: false,
  });

  const handleTokenEvent = (values: string[]) => {
    setFormData({ ...formData, token: values.join("") });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // @ts-ignore
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = formData.isPrivate
      ? "http://localhost:8585/api/rooms/private"
      : "http://localhost:8585/api/rooms/public";
    const data = JSON.stringify(formData);
    console.log(data);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create room");
        }
        const successMessage = formData.isPrivate
          ? "Private room created successfully"
          : "Public room created successfully";
        // alert("chore add to system messages: " + successMessage);
        setFormData({
          room: "",
          token: Array(8).fill(" ").join(""),
          acceptMedia: false,
          acceptLinks: false,
          maxUsers: 2,
          region: "argentina",
          isPrivate: false,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <Label>
          <BigText>Room</BigText>
        </Label>
        <StyledInputWithButton
          buttons={[
            {
              icon: "arrow-turn-down",
              onClick: () => {
                alert("Please");
              },
            },
          ]}
          inputPlaceholder={Math.floor(Math.random() * 1_000)
            .toString()
            .padStart(3, "0")}
          value={formData.room}
          maxTextLength={18}
          handleInputOnChange={handleInputChange}
        />
      </FormField>
      {formData.isPrivate && (
        <FormField>
          <Label>
            <BigText>Token</BigText>
          </Label>
          <TokenInput
            name="input6"
            val={formData.token}
            onChange={handleTokenEvent}
          />
        </FormField>
      )}
      <FlexBoxWithSpacing gap={"space-between"}>
        <FormField>
          <CheckboxField>
            <StyledInput
              type="checkbox"
              name="acceptMedia"
              checked={formData.acceptMedia}
              onChange={handleInputChange}
            />
            <CheckboxLabel>
              <MediumText>Accept Media</MediumText>
            </CheckboxLabel>
          </CheckboxField>
        </FormField>
        <FormField>
          <CheckboxField>
            <StyledInput
              type="checkbox"
              name="acceptLinks"
              checked={formData.acceptLinks}
              onChange={handleInputChange}
            />
            <CheckboxLabel>
              <MediumText>Accept Links</MediumText>
            </CheckboxLabel>
          </CheckboxField>
        </FormField>
      </FlexBoxWithSpacing>
      <FlexBoxWithSpacing gap={"space-between"}>
        <FormField>
          <Label>
            <MediumText>Max Users</MediumText>
          </Label>
          <StyledInput
            type="number"
            name="maxUsers"
            value={formData.maxUsers}
            min={2}
            max={10}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>
            <MediumText>Region</MediumText>
          </Label>
          <Select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          >
            <Option value="argentina">Argentina</Option>
            <Option value="brazil">Brazil</Option>
            <Option value="chile">Chile</Option>
          </Select>
        </FormField>
      </FlexBoxWithSpacing>
      <FormField>
        <CheckboxField>
          <StyledInput
            type="checkbox"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleInputChange}
          />
          <CheckboxLabel>
            <MediumText>
              <MediumText>Private Room</MediumText>
            </MediumText>
          </CheckboxLabel>
          {/* 
          <Toggle
            gap={8}
            defaultChecked={formData.isPrivate}
            name={"PrivateRoom"}
            label={"Private Room"}
            onChange={handleInputChange}
          />
        */}
        </CheckboxField>
      </FormField>
      <Button type="submit">
        <BigText textType="success">
          {formData.isPrivate ? "Create Private Room" : "Create Public Room"}
        </BigText>
      </Button>
    </FormContainer>
  );
};

export default RoomForm;
