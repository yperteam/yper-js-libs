import styled from "styled-components";
import { Row } from "./generic";

export const MainCard = styled.div`
  box-shadow: 0 2px 20px 0 rgb(0 0 0 / 10%);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 5px;
`;

export const CardHeader = styled.div`
  width: 100%;
  color: ${props => props.theme.color.primary["400"]};
  font-weight: bold;
  font-family: "manrope", sans-serif;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  align-items: center;
`;

export const CardTitle = styled(Row)`
  display: flex;
  flex-direction: row;
  i {
    font-size: 20px;
    background-color: ${props => props.theme.color.primary["100"]};
    border-radius: 50%;
    padding: 10px;
    color: #36506c;
  }
  span {
    font-size: 1.15em;
    margin: 0 0 0 1.4ex;
    display: flex;
    font-family: "manrope", sans-serif;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;

export const CardAction = styled.div`
  cursor: pointer;
`;

export const CardBody = styled.div`
  padding: 0;
`;

export const CardFooter = styled(Row)`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
`;
