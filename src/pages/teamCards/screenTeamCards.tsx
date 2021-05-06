import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddBtn } from "../../components/addBtn/addBtn";
import { Search } from "../../components/search/search";
import { TeamCard } from "../../components/teamCard/teamCard";
import { PageSizeSelect } from "../../components/selectPageSize/selectPageSize";
import { Pagination } from "../../components/pagination/pagination";
import EmptyImg from "../../assets/img/empty-team.svg";
import { EmptyBase } from "../../components/emptyBase/emptyBase";
import { IFetchSuffix } from "../../api/dto/components.g";
import { useHistory } from "react-router";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { getTeamsRequest } from "../../api/requests/team";
import {
  selectTeamsData,
  selectTeamsFetchSuffix,
  selectTeamsIsLoading,
} from "../../modules/team/teamSelector";
import { fetchTeamsAsync } from "../../modules/team/teamThunk";
import {
  setPageNumber,
  setPageSize,
  setSearchText,
} from "../../modules/team/teamSlice";
import { teamLnk, teamsLnk } from "../routes";

export const TeamCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsReduxIsLoading = useAppSelector(selectTeamsIsLoading);
  const { searchText, pageSize }: IFetchSuffix = useAppSelector(
    selectTeamsFetchSuffix
  );
  const teams = teamsRedux.data;
  const getPageNumber =
    new URLSearchParams(window.location.search).get("Page") || 1;
  const loadedCardsNumber = teamsRedux.count;
  const pageCount = Math.ceil(loadedCardsNumber / pageSize);
  const pageNumber = pageCount >= +getPageNumber ? +getPageNumber : 1;

  const request = `${getTeamsRequest}?Name=${searchText}&Page=${pageNumber}&PageSize=${pageSize}`;
  useEffect(() => {
    dispatch(fetchTeamsAsync(request));
  }, []);
  useEffect(() => {
    dispatch(fetchTeamsAsync(request));
  }, [request, dispatch]);

  if (teamsReduxIsLoading === false) {
    if (pageCount < +getPageNumber) {
      history.push(`${teamsLnk}?Page=1`);
    }
  }

  const handleClick = (id: number) => {
    history.push(`${teamLnk}?id=${id}`);
  };
  const teamsList = teams.map(({ name, foundationYear, imageUrl, id }) => {
    return (
      <TeamCard
        key={id}
        id={id}
        name={name}
        imageUrl={imageUrl}
        foundationYear={foundationYear}
        onClick={handleClick}
      />
    );
  });
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="page-content__top">
          <Search setSearchText={setSearchText} />
          <AddBtn page="teams" />
        </div>
        {teams.length ? "" : <EmptyBase imageUrl={EmptyImg} />}
        {teams.length > 0 && (
          <>
            <div className="cards-wrapper">{teamsList}</div>
            <div className="page-content__bottom">
              <Pagination
                page="teams"
                loadedCardsNumber={loadedCardsNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageNumber={setPageNumber}
              />
              <PageSizeSelect setPageSize={setPageSize} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
