import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddTeam } from "../../components/addNewTeam/addNewTeam";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import {
  fetchSingleTeamAsync,
  SelectSingleTeamData,
} from "../../core/getTeamSlice";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { useEffect } from "react";

export const AddNewTeam: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const teamId = id ? +id : 0;
  const request = `http://dev.trainee.dex-it.ru/api/Team/Get?id=${id}`;
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTeamAsync(request));
    }
  }, [dispatch, request, id]);
  const singleTeam = useAppSelector(SelectSingleTeamData);
  const breadcrumbsText = teamId ? `Update ${singleTeam.name}` : "Add new team";
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Teams" name={breadcrumbsText} />
            </div>
            <div className="item__content">
              <AddTeam teamId={teamId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
