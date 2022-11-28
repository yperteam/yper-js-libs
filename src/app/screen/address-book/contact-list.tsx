import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Input } from "@yper-script/react/app/widget/input";
import { Text } from "@yper-script/react/app/widget/mixins";
import { Column, Spacing } from "../../widget/generic";
import { FavoriteAddressNotifier } from "@yper-script/react/app/notifiers/pro/favorite_address_notifier";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ContactList() {
  const theme = useTheme();
  const repertory = useRecoilValue(FavoriteAddressNotifier.provider);
  const setSelectedId = useSetRecoilState(FavoriteAddressNotifier.selectedId);

  return (
    <Wrapper>
      <Input placeholder="Rechercher par nom, adresse ou numéro de téléphone" />
      <ul>
        {repertory.contents.map((contact, index) => (
          <Item
            className={`${index === 0 ? "active" : ""}`}
            key={contact.id}
            onClick={event => {
              const classNames = event.currentTarget.className
                .split(" ")
                .map(name => "." + name);
              let className = "";
              classNames.forEach(name => {
                className = className + name;
              });
              const elements = document.querySelectorAll(className);
              elements.forEach(el => {
                el.classList.remove("active");
              });
              if (!event.currentTarget.classList.contains("active")) {
                event.currentTarget.classList.add("active");
                setSelectedId(contact.id);
              }
            }}
          >
            <Spacing
              padding={{
                top: "8px",
                bottom: "8px",
                left: "12px",
                right: "12px",
              }}
            >
              <Text
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary["400"],
                })}
              >
                {contact.firstname} {contact.lastname}
              </Text>
              <Text
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                {contact.address.formattedAddress}
              </Text>
            </Spacing>
          </Item>
        ))}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled(Column)`
  border-right: solid 1px ${props => props.theme.color.grayscale["200"]};
`;

const Item = styled.li`
  border-top: solid 1px ${props => props.theme.color.grayscale["200"]};
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: solid 1px ${props => props.theme.color.grayscale["200"]};
  }
  &:hover,
  &.active {
    cursor: pointer;
    background-color: ${props => props.theme.color.secondary["100"]};
  }
`;

export default ContactList;
