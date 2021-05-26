import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddBtn } from "../../components/addBtn/addBtn";
import { Search } from "../../components/search/search";
import { TeamCard } from "./components/teamCard";
import { PageSizeSelect } from "../../components/selectPageSize/selectPageSize";
import { Pagination } from "../../components/pagination/pagination";
import EmptyImg from "../../assets/img/empty-team.svg";
import { EmptyBase } from "../../components/emptyBase/emptyBase";
import { teamsRequestType, teamsQueryType } from "../../api/dto/team.g";
import { useHistory } from "react-router";
import { getTeamsRequest } from "../../api/urls";
import {
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../modules/team/teamSelector";
import { fetchTeamsAsync } from "../../modules/team/teamThunk";
import { teamLnk } from "../routes";
import { Page } from "../../components/page/page";
import { PageTop } from "../../components/page/pageTop/pageTop";
import { PageBottom } from "../../components/page/pageBottom/pageBottom";
import { CardsWrapper } from "../../components/page/cardsWrapper/cardsWrapper";
import queryString from "querystring";

export const TeamCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsReduxIsLoading = useAppSelector(selectTeamsIsLoading);
  const teams = teamsRedux.data;
  const loadedCardsNumber = teamsRedux.count;

  const [teamsRequestParams, setTeamRequestParams] = useState<teamsRequestType>(
    {
      requesrUrl: getTeamsRequest,
      searchText: "",
      pageNumber: 1,
      pageSize: 6,
    }
  );

  const setPageNumber = (pageNumber: number) => {
    setTeamRequestParams((prevState) => ({
      ...prevState,
      pageNumber: pageNumber,
    }));
  };
  const setPageSize = (pageSize: number) => {
    setTeamRequestParams((prevState) => ({
      ...prevState,
      pageSize: pageSize,
      pageNumber: 1,
    }));
  };
  const setSearchText = (searchText: string) => {
    setTeamRequestParams((prevState) => ({
      ...prevState,
      searchText: searchText,
      pageNumber: 1,
    }));
  };

  useEffect(() => {
    const parsed: teamsQueryType = queryString.parse(
      history.location.search.substr(1)
    );

    setTeamRequestParams((prevState) => ({
      ...prevState,
      pageNumber: parsed.page ? Number(parsed.page) : prevState.pageNumber,
      pageSize: parsed.pageSize ? Number(parsed.pageSize) : prevState.pageSize,
      searchText: parsed.name ? parsed.name : prevState.searchText,
    }));
  }, []);

  useEffect(() => {
    dispatch(fetchTeamsAsync(teamsRequestParams));
  }, [teamsRequestParams, dispatch]);

  const handleClick = (id: number) => {
    history.push(`${teamLnk}?id=${id}`);
  };

  useEffect(() => {
    const path = history.location.pathname;
    const playersQuery: teamsQueryType = {};

    if (teamsRedux.page > 1) playersQuery.page = String(teamsRedux.page);
    if (teamsRedux.size !== 6) playersQuery.pageSize = String(teamsRedux.size);
    if (teamsRequestParams.searchText)
      playersQuery.name = String(teamsRequestParams.searchText);

    history.push({
      pathname: path,
      search: queryString.stringify(playersQuery),
    });
  }, [teamsRedux, history, teamsRequestParams.searchText]);

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
    <Page>
      <PageTop>
        <Search setSearchText={setSearchText} />
        <AddBtn page="teams" />
      </PageTop>
      {teams.length > 0 && teamsReduxIsLoading === false ? (
        <>
          <CardsWrapper>{teamsList}</CardsWrapper>
          <PageBottom>
            <Pagination
              loadedCardsNumber={loadedCardsNumber}
              pageSize={teamsRedux.size}
              pageNumber={teamsRedux.page}
              onPageChange={setPageNumber}
            />
            <PageSizeSelect
              setPageSize={setPageSize}
              selctedPageSize={teamsRedux.size}
            />
          </PageBottom>
        </>
      ) : (
        <EmptyBase imageUrl={EmptyImg} />
      )}
    </Page>
  );
};
