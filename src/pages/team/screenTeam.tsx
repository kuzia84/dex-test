import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { TeamInfo } from "./components/teamInfo/teamInfo";
import { TeamRoster } from "./components/teamRoster/teamRoster";
import { deleteTeamRequest, getTeamRequest } from "../../api/urls";
import {
  fetchDeleteTeamById,
  fetchSingleTeamAsync,
} from "../../modules/team/teamThunk";
import { selectSingleTeamData } from "../../modules/team/teamSelector";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";
import { useHistory } from "react-router";
import { newTeamLnk, teamsLnk } from "../routes";

export const Team: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const requestUrl = getTeamRequest + id;
  useEffect(() => {
    dispatch(fetchSingleTeamAsync(requestUrl));
  }, [requestUrl, dispatch]);
  const singleTeam = useAppSelector(selectSingleTeamData);
  const deleteTeam = () => {
    if (window.confirm("Confirm Delete")) {
      dispatch(fetchDeleteTeamById(deleteTeamRequest + singleTeam.id));
      history.push(teamsLnk);
    } else alert("Canceled");
  };
  const updateTeam = () => {
    history.push(`${newTeamLnk}?id=${singleTeam.id}`);
  };

  return (
    <Page>
      <PageItem>
        <PageItemTop bg={true}>
          <BreadCrumbs path="Teams" name={singleTeam.name} />
          <ControlButtons delete={deleteTeam} update={updateTeam} />
        </PageItemTop>
        <PageItemContent bg={true}>
          <TeamInfo />
        </PageItemContent>
      </PageItem>
      <TeamRoster teamId={singleTeam.id} />
    </Page>
  );
};
