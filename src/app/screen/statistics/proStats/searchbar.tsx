import React, { useRef } from "react";
import { Col, Row } from "@yper-script/react/app/widget/generic";
import styled, { useTheme } from "styled-components";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonSecondary } from "@yper-script/react/app/widget/button";
import "react-bootstrap-typeahead/css/Typeahead.css";

/** Images */
const resetIcon = "/img/icon/synchronize_icon.svg";
const searchIcon = "/img/icon/search_icon.svg";

function Searchbar() {
  const theme = useTheme();
  const typeaheadRef = useRef(null);

  /** Recoil */
  const selection = useRecoilValue(ProRetailpointsNotifier.provider);
  const setRpList = useSetRecoilState(ProRetailpointsNotifier.retailPointList);
  const resetList = useResetRecoilState(
    ProRetailpointsNotifier.retailpointListProvider
  );

  if (selection.state == "loading") {
    return <CustomLoader />;
  } else if (selection.state == "hasError") {
    return <></>;
  }

  /** Setters */
  const resetValue = () => {
    typeaheadRef.current.clear();
    resetList();
  };

  return (
    <Filter direction={"row"}>
      <Col size={4}>
        <Form>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            placeholder="Rechercher un point de vente"
            options={selection.contents.data}
            onChange={selected => {
              if (selected.length === 0) {
                resetList();
              } else {
                let ids = [];
                selected.forEach(select => {
                  ids.push(select["id"]);
                });
                setRpList(ids);
              }
            }}
            ref={typeaheadRef}
            renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
              <>
                <InputContainer
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Icon src={searchIcon} alt={"search_icon"} />
                  <CustomInput
                    {...inputProps}
                    ref={input => {
                      inputRef(input);
                      referenceElementRef(input);
                    }}
                  />
                </InputContainer>
              </>
            )}
          />
        </Form>
      </Col>
      <Col size={1}>
        <Reset onClick={() => resetValue()}>
          <Text textStyle={theme.textTheme.label.medium}>Réinitialiser</Text>
          <Icon className={"ml-1"} src={resetIcon} alt={"reset_icon"} />
        </Reset>
      </Col>
    </Filter>
  );
}

export default Searchbar;

/** Styled Component */
export const Filter = styled(Row)`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 8px;
  padding: 10px;
  margin-top: 30px;

  .rbt {
    .dropdown-item {
      padding: 8px;
      color: ${props => props.theme.color.primary["400"]};

      &:hover {
        background-color: ${props => props.theme.color.information["100"]};
        color: ${props => props.theme.color.primary["400"]};
        font-weight: normal;
      }
    }
  }
`;

const InputContainer = styled(Row)`
  height: 41px;
  border: 1px solid #dce3e8;
  border-radius: 2px;
  padding: 0 10px;
  width: 100%;
  background-color: ${props => props.theme.color.grayscale["000"]};

  &&:focus-within {
    border: 1px solid ${props => props.theme.color.information["400"]};
  }

  &&:hover {
    border: 1px solid ${props => props.theme.color.information["400"]};
  }
`;

const CustomInput = styled.input`
  border: none;
  padding: 0 0 0 7px;
  height: auto;
  &&:focus-visible {
    outline: none;
  }
`;

const Reset = styled(ButtonSecondary)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
