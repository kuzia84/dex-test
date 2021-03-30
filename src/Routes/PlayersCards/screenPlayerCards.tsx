import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPlayersAsync,
  selectPlayersData,
} from "../../store/getPlayersSlice";
import {
  selectPlayersFetchSuffix,
  setPageNumber,
  setPageSize,
  setSearchText,
} from "../../store/playersFetchSuffix";

import AddBtn from "../../Components/AddBtn/addBtn";
import Search from "../../Components/Search/search";
import PlayerCard from "../../Components/PlayerCard/playerCard";
import SelectPageSize from "../../Components/SelectPageSize/selectPageSize";
import Pagination from "../../Components/Pagination/pagination";
import EmptyImg from "../../img/empty-player.svg";
import EmptyBase from "../../Components/EmptyBase/emptyBase";
import { IFetchSuffix } from "../../Interfaces/interfaces";
import SelectTeams from "../../Components/SelectTeams/selectTeams";
import { setId } from "../../store/selectedIdSlise";
import { useHistory } from "react-router";
import { setMenuId } from "../../store/sideMenuSlise";

const PlayersCards: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const playersRedux = useAppSelector(selectPlayersData);
  const {
    searchText,
    pageNumber,
    pageSize,
    teamIds,
  }: IFetchSuffix = useAppSelector(selectPlayersFetchSuffix);

  const players = playersRedux.data;

  const request = `http://dev.trainee.dex-it.ru/api/Player/GetPlayers?Name=${searchText}${teamIds}&Page=${pageNumber}&PageSize=${pageSize}`;

  useEffect(() => {
    dispatch(fetchPlayersAsync(request));
    dispatch(setMenuId(2));
  }, [request, dispatch]);
  const loadedCardsNumber = playersRedux.count;
  const handleClick = (id: number) => {
    dispatch(setId(id));
    history.push("/player");
  };

  return (
    <>
      <div className="page-content__top">
        <Search setSearchText={setSearchText} />
        <SelectTeams />
        <AddBtn />
      </div>
      {players.length ? "" : <EmptyBase imageUrl={EmptyImg} />}
      {players.length && (
        <>
          <div className="cards-wrapper">
            {players.map(({ name, avatarUrl, id, number, team }: any) => {
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
            })}
          </div>
          <div className="page-content__bottom">
            <Pagination
              loadedCardsNumber={loadedCardsNumber}
              pageNumber={pageNumber}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
            <SelectPageSize setPageSize={setPageSize} />
          </div>
        </>
      )}
    </>
  );
};

export default PlayersCards;
