import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchSinglePlayerAsync,
  SelectSinglePlayerData,
} from "../../store/getPlayerSlice";
import { BreadCrumbs } from "../../Components/BreadCrumbs/breadCrumbs";
import { ControlButtons } from "../../Components/ControlButtons/controlButtons";
import { newSelectedId } from "../../store/selectedIdSlice";
import { setMenuId } from "../../store/sideMenuSlice";
import { useHistory } from "react-router";
import { PlayerInfo } from "../../Components/PlayerInfo/playerInfo";
import { Sidebar } from "../../Components/Sidebar/sidebar";
import { Header } from "../../Components/Header/header";

export const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const singlePlayer = useAppSelector(SelectSinglePlayerData);
  const playerId = useAppSelector(newSelectedId);
  if (playerId === 0) {
    history.push("/players");
  }
  const request = `http://dev.trainee.dex-it.ru/api/Player/Get?id=${playerId}`;

  useEffect(() => {
    dispatch(fetchSinglePlayerAsync(request));
    dispatch(setMenuId(2));
  }, [request, dispatch]);

  return (
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item bg">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Players" name={singlePlayer.name} />
              <ControlButtons itemId={singlePlayer.id} />
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
