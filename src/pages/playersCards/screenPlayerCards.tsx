import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddBtn } from "../../components/addBtn/addBtn";
import { Search } from "../../components/search/search";
import { PlayerCard } from "./components/playerCard";
import { PageSizeSelect } from "../../components/selectPageSize/selectPageSize";
import { Pagination } from "../../components/pagination/pagination";
import EmptyImg from "../../assets/img/empty-player.svg";
import { EmptyBase } from "../../components/emptyBase/emptyBase";
import { IFetchSuffix } from "../../api/dto/components.g";
import { SelectTeams } from "../../components/selectTeams/selectTeams";
import { useHistory } from "react-router";
import {
  selectPlayersData,
  selectPlayersFetchSuffix,
  selectPlayersIsLoading,
} from "../../modules/player/playerSelector";
import { fetchPlayersAsync } from "../../modules/player/playerThunk";
import {
  setPageNumber,
  setPageSize,
  setSearchText,
} from "../../modules/player/playerSlice";
import { getPlayersRequest } from "../../api/requests/player";
import { playerLnk, playersLnk } from "../routes";
import { Page } from "../../components/page/page";
import { PageTop } from "../../components/page/pageTop/pageTop";
import { PageBottom } from "../../components/page/pageBottom/pageBottom";
import { CardsWrapper } from "../../components/page/cardsWrapper/cardsWrapper";

export const PlayersCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { searchText, pageSize, teamIds }: IFetchSuffix = useAppSelector(
    selectPlayersFetchSuffix
  );
  const playersRedux = useAppSelector(selectPlayersData);
  const playersReduxIsLoading = useAppSelector(selectPlayersIsLoading);
  const players = playersRedux.data;
  const getPageNumber =
    new URLSearchParams(window.location.search).get("Page") || 1;
  const loadedCardsNumber = playersRedux.count;
  const pageCount = Math.ceil(loadedCardsNumber / pageSize);
  const pageNumber = pageCount >= +getPageNumber ? +getPageNumber : 1;

  const request = `${getPlayersRequest}?Name=${searchText}${teamIds}&Page=${pageNumber}&PageSize=${pageSize}`;
  useEffect(() => {
    dispatch(fetchPlayersAsync(request));
  }, []);
  useEffect(() => {
    dispatch(fetchPlayersAsync(request));
  }, [request, dispatch]);

  if (playersReduxIsLoading === false) {
    if (pageCount < +getPageNumber) {
      history.push(`${playersLnk}?Page=1`);
    }
  }

  const handleClick = (id: number) => {
    history.push(`${playerLnk}?id=${id}`);
  };

  const playersList = players.map(({ name, avatarUrl, id, number, team }) => {
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
  });
  return (
    <Page>
      <PageTop>
        <Search setSearchText={setSearchText} />
        <SelectTeams />
        <AddBtn page="players" />
      </PageTop>
      {players.length ? "" : <EmptyBase imageUrl={EmptyImg} />}
      {players.length > 0 && (
        <>
          <CardsWrapper>{playersList}</CardsWrapper>
          <PageBottom>
            <Pagination
              page="players"
              loadedCardsNumber={loadedCardsNumber}
              pageNumber={pageNumber}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
            <PageSizeSelect setPageSize={setPageSize} />
          </PageBottom>
        </>
      )}
    </Page>
  );
};
