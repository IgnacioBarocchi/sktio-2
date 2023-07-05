import { useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { FlexBoxWithSpacing } from "../Spacing";
import { MediumText } from "../Text";

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.tertiary};
  border: 1px solid ${({ theme }) => theme.color.lowContrast};
  border-radius: 4px;
  padding: 8px;
  font-family: Consolas, Courier New, monospace;
`;

const CodeBlock = styled.code`
  white-space: pre-wrap;
  word-break: break-all;
  color: ${({ theme }) => theme.color.primary};
`;

const CopyButton = styled.button`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.background.lowContrast};
  border: 1px solid ${({ theme }) => theme.color.lowContrast};
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

const CodeCard = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CardContainer>
      <CodeBlock>{code}</CodeBlock>
      <CopyButton onClick={handleCopyClick}>
        <FlexBoxWithSpacing gap={8}>
          <MediumText weight="bold">{copied ? "Copied!" : "Copy"}</MediumText>
          <Icon icon="copy" />
        </FlexBoxWithSpacing>
      </CopyButton>
    </CardContainer>
  );
};

export default CodeCard;
