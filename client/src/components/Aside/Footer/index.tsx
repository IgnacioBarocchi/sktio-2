import { useState } from "react";
import styled from "styled-components";
import Icon from "../../UI/Icon";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { BigText, SmallText } from "../../UI/Text";

const FooterContainer = styled.footer`
  padding: 0.5rem;
  border-top: 1px solid white;
  background: purple;
  height: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

const FeaturesContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
`;
// height: ${({ isOpen }) => {
//   console.log("a");
//   return isOpen ? "25vh" : "10px !important";
// }};
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FooterContainer>
      <FeaturesContainer isOpen={isOpen}>
        <ToggleButton onClick={toggleFooter}>
          <Icon
            icon={isOpen ? "wrench" : "code-branch"} //"arrow-up-to-line" : "arrow-down-to-line"
            size="2x"
          />
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
// import Icon from "../../UI/Icon";
// import { FlexBoxWithSpacing } from "../../UI/Spacing";
// import { BigText, SmallText } from "../../UI/Text";
// const Footer = () => {
//   return (
//     <footer
//       style={{ height: "25vh", padding: ".5rem", borderTop: "1px solid white" }}
//     >
//       <FlexBoxWithSpacing gap={18}>
//         <Icon icon={"puzzle-piece"} size="2x" />
//         <BigText>Plugins</BigText>
//       </FlexBoxWithSpacing>

//       <FlexBoxWithSpacing gap={18}>
//         <Icon icon={"wrench"} size="2x" />
//         <BigText>Updates</BigText>
//       </FlexBoxWithSpacing>

//       <FlexBoxWithSpacing gap={18}>
//         <Icon icon={"code-branch"} size="2x" />
//         <BigText>
//           <a href="https://github.com/IgnacioBarocchi/Sktio">Repository</a>
//         </BigText>
//       </FlexBoxWithSpacing>

//       <SmallText>Created by Ignacio Barocchi</SmallText>
//     </footer>
//   );
// };

// export default Footer;
