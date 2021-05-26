import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddBtn } from "../../components/addBtn/addBtn";
import { Search } from "../../components/search/search";
import { PlayerCard } from "./components/playerCard";
import { PageSizeSelect } from "../../components/selectPageSize/selectPageSize";
import { Pagination } from "../../components/pagination/pagination";
import EmptyImg from "../../assets/img/empty-player.svg";
import { EmptyBase } from "../../components/emptyBase/emptyBase";
import { playersRequestType, playersQueryType } from "../../api/dto/player.g";
import { SelectTeams } from "../../components/selectTeams/selectTeams";
import { useHistory } from "react-router";
import {
  selectPlayersData,
  selectPlayersIsLoading,
} from "../../modules/player/playerSelector";
import { fetchPlayersAsync } from "../../modules/player/playerThunk";
import { getPlayersRequest } from "../../api/urls";
import { playerLnk } from "../routes";
import { Page } from "../../components/page/page";
import { PageTop } from "../../components/page/pageTop/pageTop";
import { PageBottom } from "../../components/page/pageBottom/pageBottom";
import { CardsWrapper } from "../../components/page/cardsWrapper/cardsWrapper";
import queryString from "querystring";

export const PlayersCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const playersRedux = useAppSelector(selectPlayersData);
  const playersReduxIsLoading = useAppSelector(selectPlayersIsLoading);
  const players = playersRedux.data;
  const loadedCardsNumber = playersRedux.count;

  const [playersRequestParams, setPlayersRequestParams] =
    useState<playersRequestType>({
      requesrUrl: getPlayersRequest,
      searchText: "",
      teamIds: "",
      pageNumber: 1,
      pageSize: 6,
    });

  const setPageNumber = (pageNumber: number) => {
    setPlayersRequestParams((prevState) => ({
      ...prevState,
      pageNumber: pageNumber,
    }));
  };
  const setPageSize = (pageSize: number) => {
    setPlayersRequestParams((prevState) => ({
      ...prevState,
      pageSize: pageSize,
      pageNumber: 1,
    }));
  };
  const setSearchText = (searchText: string) => {
    setPlayersRequestParams((prevState) => ({
      ...prevState,
      searchText: searchText,
      pageNumber: 1,
    }));
  };
  const setTeamIds = (teamIds: string) => {
    setPlayersRequestParams((prevState) => ({
      ...prevState,
      teamIds: teamIds,
      pageNumber: 1,
    }));
  };

  useEffect(() => {
    const parsed: playersQueryType = queryString.parse(
      history.location.search.substr(1)
    );

    setPlayersRequestParams((prevState) => ({
      ...prevState,
      pageNumber: parsed.page ? Number(parsed.page) : prevState.pageNumber,
      pageSize: parsed.pageSize ? Number(parsed.pageSize) : prevState.pageSize,
      searchText: parsed.name ? parsed.name : prevState.searchText,
    }));

    if (parsed.teamIds) {
      const newArr = parsed.teamIds.map((item) => item);
      const newTeamIds = newArr.length
        ? "&TeamIds=" + newArr.join("&TeamIds=")
        : "";
      setPlayersRequestParams((prevState) => ({
        ...prevState,
        teamIds: newTeamIds,
      }));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPlayersAsync(playersRequestParams));
  }, [dispatch, playersRequestParams]);

  const handleClick = (id: number) => {
    history.push(`${playerLnk}?id=${id}`);
  };

  useEffect(() => {
    const path = history.location.pathname;
    const playersQuery: playersQueryType = {};

    if (playersRedux.page > 1) playersQuery.page = String(playersRedux.page);
    if (playersRedux.size !== 6)
      playersQuery.pageSize = String(playersRedux.size);
    if (playersRequestParams.searchText)
      playersQuery.name = String(playersRequestParams.searchText);
    if (playersRequestParams.teamIds)
      playersQuery.teamIds = playersRequestParams.teamIds
        .substr(9)
        .split("&TeamIds=");

    history.push({
      pathname: path,
      search: queryString.stringify(playersQuery),
    });
  }, [
    playersRedux,
    history,
    playersRequestParams.searchText,
    playersRequestParams.teamIds,
  ]);

  const playersList =
    players.length > 0 && playersReduxIsLoading === false
      ? players.map(({ name, avatarUrl, id, number, team }) => {
          return (
            <PlayerCard
              key={id}
              id={id}
              name={name}
              number={number}
              team={team}
              avatarUrl={avatarUrl}
              onClick={handleClick}
            />
          );
        })
      : "Empty";

  return (
    <Page>
      <PageTop>
        <Search setSearchText={setSearchText} />
        <SelectTeams setTeamIds={setTeamIds} />
        <AddBtn page="players" />
      </PageTop>
      {players.length > 0 && playersReduxIsLoading === false ? (
        <>
          <CardsWrapper>{playersList}</CardsWrapper>
          <PageBottom>
            <Pagination
              loadedCardsNumber={loadedCardsNumber}
              pageSize={playersRedux.size}
              pageNumber={playersRedux.page}
              onPageChange={setPageNumber}
            />
            <PageSizeSelect
              setPageSize={setPageSize}
              selctedPageSize={playersRedux.size}
            />
          </PageBottom>
        </>
      ) : (
        <EmptyBase imageUrl={EmptyImg} />
      )}
    </Page>
  );
};
