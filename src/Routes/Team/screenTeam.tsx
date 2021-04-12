import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  fetchSingleTeamAsync,
  SelectSingleTeamData,
} from "../../core/getTeamSlice";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { TeamInfo } from "../../components/teamInfo/teamInfo";
import { TeamRoster } from "../../components/teamRoster/teamRoster";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = `http://dev.trainee.dex-it.ru/api/Team/Get?id=${id}`;
  useEffect(() => {
    dispatch(fetchSingleTeamAsync(request));
  }, [request, dispatch]);
  const singleTeam = useAppSelector(SelectSingleTeamData);

  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item bg">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Teams" name={singleTeam.name} />
              <ControlButtons page="teams" itemId={singleTeam.id} />
            </div>
            <div className="item__content">
              <TeamInfo />
            </div>
          </div>
        </div>
        <TeamRoster />
      </div>
    </div>
  );
};
