import styled, { css, useTheme } from "styled-components";
import {
  Column,
  Flexible,
  Row,
  Expanded,
} from "@yper-script/react/app/widget/generic";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import React from "react";
import { TransportType } from "@yper-script/react/data/entity/mission.entity";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { MissionTemplateNotifier } from "@yper-script/react/app/notifiers/order/mission_template_notifier";

/** Images */
const check_icon = `/img/react/order/check.svg`;

const prebookId = window.location.pathname.split("/")[3];

function TransportTypeCheck({ type }: { type: TransportType }) {
  const theme = useTheme();
  const { t } = useTranslation([], {
    keyPrefix: "transport_types",
  });
  const product_icon = `/img/react/order/transport_type_${type}.svg`;
  const { watch, setValue } = useFormContext();
  const selected = watch("transportType");
  const selectedTemplate = useRecoilValue(
    PrebookNotifier.templateProvider(prebookId)
  );
  const isLocked =
    selectedTemplate?.transportType.find(t => t.name == type) == null;
  return (
    <ProductContainer
      onClick={isLocked ? null : () => setValue("transportType", type)}
      selected={selected == type}
      locked={isLocked}
      justifyContent="center"
      alignItems="center"
      margin={{ top: "8px", right: "5px" }}
      padding={{ top: "4px", bottom: "4px", right: "8px", left: "8px" }}
    >
      {isLocked && (
        <AbsoluteText
          textAlign="center"
          textStyle={theme.textTheme.label.medium}
        >
          Indisponible pour ce type de produit
        </AbsoluteText>
      )}
      <Row width="100%">
        <Expanded />
        <SvgPicture
          height="13px"
          width="13px"
          visibility={selected == type ? "visible" : "hidden"}
          src={check_icon}
        />
      </Row>
      <OpacityFlexible locked={isLocked} alignItems={"center"}>
        <SvgPicture height="40px" width="40px" src={product_icon} />
      </OpacityFlexible>
      <OpacityFlexible locked={isLocked} alignItems={"center"}>
        <Text textStyle={theme.textTheme.body.medium} textAlign="center">
          {t(type)}
        </Text>
      </OpacityFlexible>
    </ProductContainer>
  );
}

export default TransportTypeCheck;

const ProductContainer = styled(Column)<{ selected: boolean; locked: boolean }>`
  border: 1px solid ${props => props.theme.color.primary["200"]};
  border-radius: 5px;
  min-height: 108px;
  width: 98px;
  position: relative;
  cursor: ${props => (props.locked ? "not-allowed" : "pointer")};

  ${props =>
    !props.locked &&
    css`
      &:hover {
        border-color: props.theme.color.success[ "400" ];
      }
    `}

  ${props =>
    props.locked &&
    css`
      background-color: ${props => props.theme.color.grayscale["100"]};
    `}

  ${props =>
    props.selected &&
    !props.locked &&
    css`
      border-color: ${props => props.theme.color.success["400"]};
      background-color: ${props => props.theme.color.success["100"]};
    `}
`;

const AbsoluteText = styled(Text)`
  position: absolute;
  width: 100%;
`;

const OpacityFlexible = styled(Flexible)<{ locked: boolean }>`
  opacity: ${props => (props.locked ? 0.3 : 1)};
`;
