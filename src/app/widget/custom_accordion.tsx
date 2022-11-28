import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

export const accordionCollapseProvider = atom<Boolean>({
  key: "accordion-collapse-notifier",
  default: false,
});

export function CustomAccordionToggle(props: { children: React.ReactNode }) {
  const [isAccordionCollapsed, setAccordionCollapse] = useRecoilState(
    accordionCollapseProvider
  );

  return (
    <div onClick={() => setAccordionCollapse(!isAccordionCollapsed)}>
      {props.children}
    </div>
  );
}

export function CustomAccordionCollapse(props: { children: React.ReactNode }) {
  const isAccordionCollapsed = useRecoilValue(accordionCollapseProvider);
  return (
    <CustomAccordionContent isCollapsed={isAccordionCollapsed}>
      {props.children}
    </CustomAccordionContent>
  );
}

interface CustomAccordionContentProps {
  isCollapsed: Boolean;
}

const CustomAccordionContent = styled.div<CustomAccordionContentProps>`
  visibility: ${(props: CustomAccordionContentProps) =>
    props.isCollapsed ? "visible" : "hidden"};
  max-height: ${(props: CustomAccordionContentProps) =>
    props.isCollapsed ? "500px" : "0"};
  transition: max-height 0.5s;
`;
