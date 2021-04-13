import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddPlayer } from "../../components/addNewPlayer/addNewPlayer";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { PlayerTeamNameDto } from "../../api/dto/player.g";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { useEffect } from "react";
import { fetchSinglePlayerAsync } from "../../modules/player/playerThunk";
import { SelectSinglePlayerData } from "../../modules/player/playerSelector";
import { getPlayerRequest } from "../../api/requests/player";

export const AddNewPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const playerId = id ? +id : 0;
  const request = getPlayerRequest + id;
  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePlayerAsync(request));
    }
  }, [dispatch, request, id]);

  const singlePlayer: PlayerTeamNameDto = useAppSelector(
    SelectSinglePlayerData
  );

  const breadcrumbsText = playerId
    ? `Update ${singlePlayer.name}`
    : "Add new player";
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Players" name={breadcrumbsText} />
            </div>
            <div className="item__content">
              <AddPlayer playerId={playerId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
