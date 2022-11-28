import React, { useState } from "react";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import styled, { css, useTheme } from "styled-components";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilState, useRecoilValue } from "recoil";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
import RetailpointStats from "@yper-script/react/app/screen/statistics/retailpointStats/retailpoint_stats";
// TODO import CustomDatePicker from "@yper-script/react/app/screen/statistics/date_picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ProStats from "@yper-script/react/app/screen/statistics/proStats/pro_stats";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";

/** Images */
const dropDownIcon = "/img/icon/dropdown_icon.svg";

/** Enum */
enum DashboardTypeEnum {
  pro = "pro",
  retailPoint = "retailpoint",
}

function Statistics() {
  /** Register Chart Plugins */
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const theme = useTheme();

  /** Recoil */
  const [range, setRange] = useRecoilState(StatsRangeNotifier.provider);
  const pro = useRecoilValue(CurrentProNotifier.provider);

  /** DomState */
  const [dropdown, setDropdown] = useState(true);
  const [dashboardType, setDashboardType] = useState(
    DashboardTypeEnum.retailPoint
  );

  /** Setter */
  const onChange = dates => {
    let [start, end] = dates;
    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59, 999);

    setRange({ begin: start, end: end });
  };

  const changeDashboardType = (dashboardType: DashboardTypeEnum) => {
    setDashboardType(dashboardType);
    setDropdown(!dropdown);
  };

  return (
    <Container>
      <Row>
        <Col size={1} justifyContent={"flex-start"}>
          <CustomDropdown>
            <Column>
              <Col onClick={() => setDropdown(!dropdown)} alignItems={"center"}>
                <Text
                  textStyle={theme.textTheme.title.large.copyWith({
                    color: theme.color.primary["500"],
                  })}
                >
                  {dashboardType === DashboardTypeEnum.pro
                    ? "Statistiques globales"
                    : "Statistiques de mon magasin"}
                </Text>
                {pro.settings.canAccess.advancedReportingStats && (
                  <DropdownIcon
                    className={"ml-2"}
                    open={!dropdown}
                    src={dropDownIcon}
                    alt={"dropdown_icon"}
                  />
                )}
              </Col>
            </Column>
            {pro.settings.canAccess.advancedReportingStats && (
              <CustomDropdownMenu
                hidden={dropdown}
                toggle={() => setDropdown(!dropdown)}
              >
                <CustomDropdownItem
                  onClick={() => changeDashboardType(DashboardTypeEnum.pro)}
                >
                  <Row direction={"row"} justifyContent={"flex-start"}>
                    <Col size={4} justifyContent={"flex-start"}>
                      <CustomText
                        selected={dashboardType === DashboardTypeEnum.pro}
                        textStyle={theme.textTheme.body.medium}
                      >
                        Statistiques globales
                      </CustomText>
                    </Col>
                  </Row>
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() =>
                    changeDashboardType(DashboardTypeEnum.retailPoint)
                  }
                >
                  <Row direction={"row"} justifyContent={"flex-start"}>
                    <Col size={4} justifyContent={"flex-start"}>
                      <CustomText
                        selected={
                          dashboardType === DashboardTypeEnum.retailPoint
                        }
                        textStyle={theme.textTheme.body.medium}
                      >
                        Statistiques de mon magasin
                      </CustomText>
                    </Col>
                  </Row>
                </CustomDropdownItem>
              </CustomDropdownMenu>
            )}
          </CustomDropdown>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <DateRangePicker
            value={[range.begin, range.end]}
            onChange={onChange}
            format="dd/MM/yyyy"
            clearIcon={null}
            maxDate={new Date()}
          />
        </Col>
      </Row>
      {dashboardType === DashboardTypeEnum.retailPoint ? (
        <RetailpointStats />
      ) : (
        <ProStats />
      )}
    </Container>
  );
}

export default Statistics;

/** Styled Component */
const Container = styled.div`
  max-width: 1128px;
  width: 100%;
  margin: 40px auto 64px auto;
  padding: 0 24px;
`;

// Dropdown
const CustomDropdownItem = styled(DropdownItem)`
  padding: 8px;
  &:hover {
    background-color: ${props => props.theme.color.primary["100"]};
    border-radius: 4px;
    margin: auto;
  }
`;

const CustomText = styled(Text)<{ selected: boolean }>`
  ${props =>
    props.selected &&
    css`
      font-weight: 700;
    `}
`;

const CustomDropdown = styled(Dropdown)`
  cursor: default;
`;

const DropdownIcon = styled.img<{ open: boolean }>`
  height: 7px;
  width: 13px;
  transition: all 0.2s ease;
  ${props =>
    props.open &&
    css`
      transform: rotate(180deg);
    `}
`;

const CustomDropdownMenu = styled(DropdownMenu)`
  padding: 8px;
  width: 100%;
`;
