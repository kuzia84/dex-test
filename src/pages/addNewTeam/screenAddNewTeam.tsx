import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddTeam } from "./components/addNewTeam";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { useEffect } from "react";
import { getTeamRequest } from "../../api/urls";
import { fetchSingleTeamAsync } from "../../modules/team/teamThunk";
import {
  selectSingleTeamData,
  selectSingleTeamError,
} from "../../modules/team/teamSelector";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";

export const AddNewTeam: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const teamId = id ? +id : 0;
  const request = getTeamRequest + id;
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTeamAsync(request));
    }
  }, [dispatch, request, id]);
  const singleTeam = useAppSelector(selectSingleTeamData);
  const singleTeamErrors = useAppSelector(selectSingleTeamError);
  if (singleTeamErrors && singleTeamErrors.message === "Failed to fetch") {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }
  const breadcrumbsText = teamId ? `Update ${singleTeam.name}` : "Add new team";
  return (
    <Page>
      <PageItem>
        <PageItemTop>
          <BreadCrumbs path="Teams" name={breadcrumbsText} />
        </PageItemTop>
        <PageItemContent>
          <AddTeam teamId={teamId} />
        </PageItemContent>
      </PageItem>
    </Page>
  );
};
