import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { PlayerInfo } from "../../components/playerInfo/playerInfo";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { fetchSinglePlayerAsync } from "../../modules/player/playerThunk";
import { SelectSinglePlayerData } from "../../modules/player/playerSelector";

export const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = `http://dev.trainee.dex-it.ru/api/Player/Get?id=${id}`;

  useEffect(() => {
    dispatch(fetchSinglePlayerAsync(request));
  }, [request, dispatch]);
  const singlePlayer = useAppSelector(SelectSinglePlayerData);

  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item bg">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Players" name={singlePlayer.name} />
              <ControlButtons page="players" itemId={singlePlayer.id} />
            </div>
            <div className="item__content">
              <PlayerInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
