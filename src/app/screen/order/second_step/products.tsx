import styled, { css, useTheme } from "styled-components";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import React from "react";
import { MissionTemplate } from "@yper-script/react/data/entity/mission_template.entity";
import { MissionTemplateNotifier } from "@yper-script/react/app/notifiers/order/mission_template_notifier";
import { useRecoilState, useRecoilValue } from "recoil";
import { Controller, useFormContext } from "react-hook-form";

/** Images */
const checkIcon = `/img/react/order/check.svg`;

function Products() {
  const { control } = useFormContext();
  const products = useRecoilValue(MissionTemplateNotifier.provider);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Row wrap="wrap" justifyContent="start">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              value={value}
              onChange={onChange}
            />
          ))}
        </Row>
      )}
      control={control}
      name={`product`}
    />
  );
}

function Product({
  product,
  value,
  onChange,
}: {
  product: MissionTemplate;
  value: string;
  onChange;
}) {
  const theme = useTheme();
  const selected = value === product.id;

  return (
    <ProductContainer
      onClick={() => onChange(product.id)}
      selected={selected}
      locked={false}
      margin={{ top: "8px", right: "5px" }}
      padding={{ top: "4px", bottom: "4px", right: "4px", left: "4px" }}
    >
      <Row width="100%">
        <Flexible />
        <SvgPicture
          src={checkIcon}
          height="14px"
          width="14px"
          color={theme.color.success[400]}
          visibility={selected ? "visible" : "hidden"}
        />
      </Row>
      <Flexible alignItems={"center"}>
        <SvgPicture
          src={`/img/react/order/product_${product.name}.svg`}
          width="32px"
          height="32px"
        >
          <SvgPicture
            src={`/img/react/order/product_other.svg`}
            width="32px"
            height="32px"
          />
        </SvgPicture>
      </Flexible>
      <Flexible alignItems={"center"}>
        <Text textStyle={theme.textTheme.body.medium} textAlign="center">
          {product.description ?? product.name}
        </Text>
      </Flexible>
    </ProductContainer>
  );
}

export default Products;

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
    props.selected &&
    css`
      border-color: ${props => props.theme.color.success["400"]};
      background-color: ${props => props.theme.color.success["100"]};
    `}
`;
