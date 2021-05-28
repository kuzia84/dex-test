import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { PlayerInfo } from "./components/playerInfo";
import {
  fetchDeletePlayerById,
  fetchSinglePlayerAsync,
} from "../../modules/player/playerThunk";
import {
  selectSinglePlayerData,
  selectSinglePlayerError,
} from "../../modules/player/playerSelector";
import { deletePlayerRequest, getPlayerRequest } from "../../api/urls";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";
import { useHistory } from "react-router";
import { newPlayerLnk, playersLnk } from "../routes";

export const Player: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = getPlayerRequest + id;

  useEffect(() => {
    dispatch(fetchSinglePlayerAsync(request));
  }, [request, dispatch]);

  const singlePlayer = useAppSelector(selectSinglePlayerData);
  const singlePlayerErrors = useAppSelector(selectSinglePlayerError);
  if (singlePlayerErrors && singlePlayerErrors.message === "Failed to fetch") {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }

  const deletePlayer = () => {
    if (window.confirm("Confirm Delete")) {
      dispatch(fetchDeletePlayerById(deletePlayerRequest + singlePlayer.id));
      history.push(playersLnk);
    } else alert("Canceled");
  };
  const updatePlayer = () => {
    history.push(`${newPlayerLnk}?id=${singlePlayer.id}`);
  };

  return (
    <Page>
      <PageItem>
        <PageItemTop bg={true}>
          <BreadCrumbs path="Players" name={singlePlayer.name} />
          <ControlButtons delete={deletePlayer} update={updatePlayer} />
        </PageItemTop>
        <PageItemContent bg={true}>
          <PlayerInfo />
        </PageItemContent>
      </PageItem>
    </Page>
  );
};
