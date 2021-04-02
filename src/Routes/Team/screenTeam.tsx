import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchSingleTeamAsync,
  SelectSingleTeamData,
} from "../../store/getTeamSlice";
import { BreadCrumbs } from "../../Components/BreadCrumbs/breadCrumbs";
import { ControlButtons } from "../../Components/ControlButtons/controlButtons";
import { newSelectedId } from "../../store/selectedIdSlice";
import { setMenuId } from "../../store/sideMenuSlice";
import { useHistory } from "react-router";
import { TeamInfo } from "../../Components/TeamInfo/teamInfo";
import { TeamRoster } from "../../Components/TeamRoster/teamRoster";
import { Sidebar } from "../../Components/Sidebar/sidebar";
import { Header } from "../../Components/Header/header";

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const singleTeam = useAppSelector(SelectSingleTeamData);
  const teamId = useAppSelector(newSelectedId);
  if (teamId === 0) {
    history.push("/teams");
  }
  const request = `http://dev.trainee.dex-it.ru/api/Team/Get?id=${teamId}`;

  useEffect(() => {
    dispatch(fetchSingleTeamAsync(request));
    dispatch(setMenuId(1));
  }, [request, dispatch]);

  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item bg">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Teams" name={singleTeam.name} />
              <ControlButtons itemId={singleTeam.id} />
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
