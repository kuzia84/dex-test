import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { TeamInfo } from "../../components/teamInfo/teamInfo";
import { TeamRoster } from "../../components/teamRoster/teamRoster";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { getTeamRequest } from "../../api/requests/team";
import { fetchSingleTeamAsync } from "../../modules/team/teamThunk";
import { selectSingleTeamData } from "../../modules/team/teamSelector";

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = getTeamRequest + id;
  useEffect(() => {
    dispatch(fetchSingleTeamAsync(request));
  }, [request, dispatch]);
  const singleTeam = useAppSelector(selectSingleTeamData);

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
        <TeamRoster teamId={singleTeam.id} />
      </div>
    </div>
  );
};
