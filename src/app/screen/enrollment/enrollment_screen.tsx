import React from "react";
import styled, { useTheme } from "styled-components";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonSecondary } from "@yper-script/react/app/widget/button";

/** Images */
const yperLogo = "/img/react/enrollment/yper_logo.svg";
const enrollImg = "/img/react/enrollment/enroll_img.png";

function EnrollmentScreen(props: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <EnrollmentRow alignItems={"start"}>
      <EnrollmentContainer>
        <Column
          margin={{ top: "45px", bottom: "45px", left: "80px", right: "80px" }}
        >
          <Row
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={{ bottom: "80px" }}
          >
            <img src={yperLogo} alt={"Yper logo"} />
            <ButtonSecondary>
              <Text textStyle={theme.textTheme.label.small}>
                Besoin d'aide ?
              </Text>
            </ButtonSecondary>
          </Row>
          {props.children}
        </Column>
      </EnrollmentContainer>
      <EnrollImage img={enrollImg} />
    </EnrollmentRow>
  );
}

export default EnrollmentScreen;

const EnrollImage = styled(Flexible)<any>`
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: auto hidden;
  background-position: center;
`;

const EnrollmentContainer = styled(Flexible)`
  overflow-y: scroll;
  height: 100%;
  max-width: 50%;
`;

const EnrollmentRow = styled(Row)`
  height: 100vh;
`;
