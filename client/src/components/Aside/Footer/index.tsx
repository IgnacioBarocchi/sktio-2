import Icon from "../../UI/Icon";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { BigText, SmallText } from "../../UI/Text";
import {
  FeaturesContainer,
  FooterContainer,
  ToggleButton,
} from "./FooterElements";
import { signal } from "@preact/signals-react";
const Footer = () => {
  const isOpen = signal<boolean>(false);

  const toggleFooter = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <FooterContainer>
      <FeaturesContainer isOpen={isOpen.value}>
        <ToggleButton onClick={toggleFooter}>
          <Icon icon={isOpen.value ? "wrench" : "code-branch"} size="2x" />
        </ToggleButton>

        <FlexBoxWithSpacing gap={18}>
          <Icon icon={"puzzle-piece"} size="2x" />
          <BigText>Plugins</BigText>
        </FlexBoxWithSpacing>

        <FlexBoxWithSpacing gap={18}>
          <Icon icon={"wrench"} size="2x" />
          <BigText>Updates</BigText>
        </FlexBoxWithSpacing>

        <FlexBoxWithSpacing gap={18}>
          <Icon icon={"code-branch"} size="2x" />
          <BigText>
            <a href="https://github.com/IgnacioBarocchi/Sktio">Repository</a>
          </BigText>
        </FlexBoxWithSpacing>

        <SmallText>Created by Ignacio Barocchi</SmallText>
      </FeaturesContainer>
    </FooterContainer>
  );
};

export default Footer;
