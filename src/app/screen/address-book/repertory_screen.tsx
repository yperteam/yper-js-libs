import React from "react";
import {
  Column,
  Container,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import ContactList from "./contact-list";
import ContactDetails from "./contact-details";

const addCircleSolidIcon = "/img/react/icon/ic_add_circle_solid.svg";
const chevronRightIcon = "/img/react/icon/ic_chevron_right.svg";

function Repertory() {
  const theme = useTheme();

  return (
    <Spacing margin={{ top: "40px" }}>
      <Container>
        <Row>
          <Column alignItems="start">
            <Flexible alignItems="center">
              <SvgPicture
                src={chevronRightIcon}
                color={theme.color.secondary["400"]}
                width="15px"
                height="15px"
              />
              <Text
                textStyle={theme.textTheme.headline.small.copyWith({
                  color: theme.color.primary["400"],
                })}
              >
                Carnet d'adresses
              </Text>
            </Flexible>
          </Column>
          <Column alignItems="end">
            <ButtonPrimary>
              <SvgPicture
                src={addCircleSolidIcon}
                color={theme.color.grayscale["000"]}
                width="15px"
                height="15px"
                margin={{ right: "10px" }}
              />
              <Text>Ajouter une adresse</Text>
            </ButtonPrimary>
          </Column>
        </Row>
        <Spacing margin={{ top: "30px" }}>
          <ContentWrapper>
            <Column size={2} justifyContent="flex-start">
              <ContactList />
            </Column>
            <Column size={3} justifyContent="initial">
              <ContactDetails />
            </Column>
          </ContentWrapper>
        </Spacing>
      </Container>
    </Spacing>
  );
}

const ContentWrapper = styled(Row)`
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0px 2px 20px 0px
    ${props => props.theme.color.primary["400"] + "1a"};
`;

export default Repertory;
