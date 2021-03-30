import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTeamsAsync, selectTeamsData } from "../../store/getTeamsSlice";
import {
  selectTeamsFetchSuffix,
  setPageNumber,
  setPageSize,
  setSearchText,
} from "../../store/teamsFetchSuffix";

import AddBtn from "../../Components/AddBtn";
import Search from "../../Components/Search";
import TeamCard from "../../Components/TeamCard";
import SelectPageSize from "../../Components/SelectPageSize";
import Pagination from "../../Components/Pagination";
import EmptyImg from "../../img/empty-team.svg";
import EmptyBase from "../../Components/EmptyBase";
import { IFetchSuffix } from "../../Interfaces";
import { setMenuId } from "../../store/sideMenuSlise";
import { useHistory } from "react-router";
import { setId } from "../../store/selectedIdSlise";

const TeamCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const teamsRedux = useAppSelector(selectTeamsData);
  const { searchText, pageNumber, pageSize }: IFetchSuffix = useAppSelector(
    selectTeamsFetchSuffix
  );
  const teams = teamsRedux.data;

  const request = `http://dev.trainee.dex-it.ru/api/Team/GetTeams?Name=${searchText}&Page=${pageNumber}&PageSize=${pageSize}`;

  useEffect(() => {
    dispatch(fetchTeamsAsync(request));
    dispatch(setMenuId(1));
  }, [request, dispatch]);

  const loadedCardsNumber = teamsRedux.count;

  const handleClick = (id: number) => {
    dispatch(setId(id));
    history.push("/team");
  };
  return (
    <>
      <div className="page-content__top">
        <Search setSearchText={setSearchText} />
        <AddBtn />
      </div>
      {teams.length ? "" : <EmptyBase imageUrl={EmptyImg} />}
      {teams.length && (
        <>
          <div className="cards-wrapper">
            {teams.map(({ name, foundationYear, imageUrl, id }: any) => {
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

export default TeamCards;
