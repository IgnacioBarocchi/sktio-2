import styled from "styled-components";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

export const STabs = styled(Tabs).attrs((props: { tabIndex?: string }) => ({
  tabIndex: props.tabIndex,
}))`
  outline: none;
`;

export const STabList = styled(TabList).attrs({ tabsrole: "TabList" })`
  list-style-type: none;
  padding: 4px;
  display: flex;
  margin: 0;
  outline: none;

  width: 100%;
  justify-content: space-evenly;
`;

// background: ${({ theme }) => theme.background.primary};
export const STab = styled(Tab).attrs({ tabsrole: "Tab" })`
  margin-right: 4px;
  padding: 4px;
  user-select: none;
  cursor: pointer;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.color.primary};
  font-weight: 800;
  &.is-selected {
    border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  }

  &:focus {
    outline: none;
  }
`;

export const STabPanel = styled(TabPanel).attrs({ tabsrole: "TabPanel" })`
  display: none;
  min-height: 40vh;
  padding: 4px;
  outline: none;

  &.is-selected {
    display: block;
  }
`;
