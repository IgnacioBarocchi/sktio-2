// wrapper to handle its color

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.secondary};
`;
export default Icon;
