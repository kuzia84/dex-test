import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { TeamInfo } from "./components/teamInfo/teamInfo";
import { TeamRoster } from "./components/teamRoster/teamRoster";
import { getTeamRequest } from "../../api/requests/team";
import { fetchSingleTeamAsync } from "../../modules/team/teamThunk";
import { selectSingleTeamData } from "../../modules/team/teamSelector";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = getTeamRequest + id;
  useEffect(() => {
    dispatch(fetchSingleTeamAsync(request));
  }, [request, dispatch]);
  const singleTeam = useAppSelector(selectSingleTeamData);

  return (
    <Page>
      <PageItem>
        <PageItemTop bg={true}>
          <BreadCrumbs path="Teams" name={singleTeam.name} />
          <ControlButtons page="teams" itemId={singleTeam.id} />
        </PageItemTop>
        <PageItemContent bg={true}>
          <TeamInfo />
        </PageItemContent>
      </PageItem>
      <TeamRoster teamId={singleTeam.id} />
    </Page>
  );
};
