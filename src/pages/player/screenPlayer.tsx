import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { ControlButtons } from "../../components/controlButtons/controlButtons";
import { PlayerInfo } from "./components/playerInfo";
import { fetchSinglePlayerAsync } from "../../modules/player/playerThunk";
import { selectSinglePlayerData } from "../../modules/player/playerSelector";
import { getPlayerRequest } from "../../api/urls";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";

export const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = new URLSearchParams(window.location.search).get("id");
  const request = getPlayerRequest + id;

  useEffect(() => {
    dispatch(fetchSinglePlayerAsync(request));
  }, [request, dispatch]);
  const singlePlayer = useAppSelector(selectSinglePlayerData);

  return (
    <Page>
      <PageItem>
        <PageItemTop bg={true}>
          <BreadCrumbs path="Players" name={singlePlayer.name} />
          <ControlButtons page="players" itemId={singlePlayer.id} />
        </PageItemTop>
        <PageItemContent bg={true}>
          <PlayerInfo />
        </PageItemContent>
      </PageItem>
    </Page>
  );
};
