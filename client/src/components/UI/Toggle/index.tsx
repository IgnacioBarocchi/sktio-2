import React, { useState } from "react";
import { FlexBoxWithSpacing } from "../Spacing";
import { MediumText } from "../Text";
import { Input, Label, Slider } from "./ToggleElements";
interface ToggleProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  gap?: number | string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  defaultChecked = false,
  name,
  onChange,
  gap = 8,
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FlexBoxWithSpacing gap={gap}>
      <MediumText weight="bold">{label}</MediumText>
      <Label>
        <Input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          name={name}
        />
        <Slider />
      </Label>
    </FlexBoxWithSpacing>
  );
};

export default Toggle;
