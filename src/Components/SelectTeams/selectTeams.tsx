import React, { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  fetchTeamsAsync,
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../core/getTeamsSlice";
import { ITeamSelectOptions, TeamDto } from "../../api/dto/team.g";

import s from "./style.module.css";
import { setTeamIds } from "../../modules/player/playerSlice";

export const SelectTeams: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTeamsAsync("http://dev.trainee.dex-it.ru/api/Team/GetTeams"));
  }, [dispatch]);
  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsIsLoading = useAppSelector(selectTeamsIsLoading);
  const teams = teamsRedux.data;
  let teamSelectOptions: ITeamSelectOptions[] = [];
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#FF768E",
        primary: "#C60E2E",
      },
    };
  };
  const colourStyles = {
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        fontSize: "14px",
        lineHeight: "24px",
        padding: "6px 12px",

        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "#C60E2E"
          : isFocused
          ? "#FF768E"
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? "white"
          : isFocused
          ? "white"
          : "#9C9C9C",
        cursor: isDisabled ? "not-allowed" : "default",
        ":not(:last-child)": {
          borderBottom: "1px solid #D1D1D1",
        },
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "#E4163A",
        borderRadius: "4px",
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#fff",
      fontSize: "14px",
      lineHeight: "19px",
      paddingLeft: "4px",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#fff",
      ":hover": {
        backgroundColor: "#E4163A",
        color: "#fff",
        cursor: "pointer",
      },
    }),
  };

  const animatedComponents = makeAnimated();
  if (teamsIsLoading === false) {
    teamSelectOptions = teams.map((item: TeamDto) => ({
      value: item.id,
      label: item.name,
    }));
  }

  return (
    <div className={s.reactSelectContainer}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        classNamePrefix="select-teams"
        theme={customTheme}
        options={teamSelectOptions}
        styles={colourStyles}
        onChange={(data: any) => {
          const newArr = data.map((item: ITeamSelectOptions) => item.value);
          const newRequest = newArr.length
            ? "&TeamIds=" + newArr.join("&TeamIds=")
            : "";
          dispatch(setTeamIds(newRequest));
        }}
      />
    </div>
  );
};
