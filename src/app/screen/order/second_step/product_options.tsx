import styled, { css, useTheme } from "styled-components";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { Tooltip } from "@yper-script/react/app/widget/tooltip";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import React from "react";
import { useTranslation } from "react-i18next";
import { capitalizeText } from "@yper-script/react/app/widget/helper/capitalize_text";
import { Option } from "@yper-script/react/data/entity/mission_template.entity";
import { MissionTemplateNotifier } from "@yper-script/react/app/notifiers/order/mission_template_notifier";
import { useRecoilValue } from "recoil";
import { Controller, useFormContext } from "react-hook-form";

/** Images */
const checkIcon = `/img/react/order/check.svg`;
const infoIcon = "/img/react/icon/ic_information_circle_full.svg";
const lockIcon = "/img/react/icon/ic_lock.svg";

function ProductOptions() {
  const { watch, control } = useFormContext();
  const productId = watch("product");
  const template = useRecoilValue(
    MissionTemplateNotifier.templateProvider(productId)
  );

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Row wrap="wrap" justifyContent="start">
          {template.option.map(option => (
            <Option
              key={option.name}
              option={option}
              value={value}
              onChange={onChange}
            />
          ))}
        </Row>
      )}
      control={control}
      name={`options`}
    />
  );
}

function Option({
  option,
  value,
  onChange,
}: {
  option: Option;
  value: string[];
  onChange;
}) {
  const theme = useTheme();
  const { t } = useTranslation([], {
    keyPrefix: "options",
  });
  const selected = option.forced || value.some(o => o == option.name);

  return (
    <>
      <ProductContainer
        data-tip={option.forced ? `tooltip-${option.name}` : null}
        onClick={() => {
          if (!option.forced) {
            if (value.some(o => o == option.name)) {
              onChange(value.filter(o => o != option.name));
            } else {
              onChange([...value, option.name]);
            }
          }
        }}
        selected={selected}
        locked={option.forced}
        margin={{ top: "8px", right: "5px" }}
        padding={{ top: "4px", bottom: "4px", right: "4px", left: "4px" }}
      >
        <Row width="100%">
          <Flexible />
          <SvgPicture
            src={option.forced ? lockIcon : checkIcon}
            height="14px"
            width="14px"
            color={theme.color.success[400]}
            visibility={selected || option.forced ? "visible" : "hidden"}
          />
        </Row>
        <Flexible alignItems={"center"}>
          <SvgPicture
            src={`/img/react/order/option_${option.name}.svg`}
            width="32px"
            height="32px"
          />
        </Flexible>
        <Flexible alignItems={"center"}>
          <Text textStyle={theme.textTheme.body.medium} textAlign="center">
            {capitalizeText(t(option.name))}
          </Text>
        </Flexible>
      </ProductContainer>
      {option.forced && (
        <Tooltip place="bottom" maxWidth="120px">
          <Column alignItems="start">
            <Row alignItems="center">
              <SvgPicture
                src={infoIcon}
                color={theme.color.information[400]}
                height="17px"
                width="17px"
              />
              <Text
                margin={{ left: "6px" }}
                textStyle={theme.textTheme.title.small.copyWith({
                  color: theme.color.grayscale["000"],
                })}
              >
                Option obligatoire
              </Text>
            </Row>
            <Text
              textAlign="start"
              margin={{ left: "23px" }}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.grayscale["000"],
              })}
            >
              Vous avez choisi une caractéristique de produit impliquant une
              option obligatoire.
            </Text>
          </Column>
        </Tooltip>
      )}
    </>
  );
}

export default ProductOptions;

const ProductContainer = styled(Column)<any>`
  border: 1px solid ${props => props.theme.color.primary["200"]};
  border-radius: 5px;
  min-height: 108px;
  width: 98px;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.color.success["400"]};
  }

  ${props =>
    (props.selected || props.locked) &&
    css`
      border-color: ${props => props.theme.color.success["400"]};
      background-color: ${props => props.theme.color.success["100"]};
    `}
`;
