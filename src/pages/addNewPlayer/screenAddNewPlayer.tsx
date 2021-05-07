import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { AddPlayer } from "./components/addNewPlayer";
import { BreadCrumbs } from "../../components/breadCrumbs/breadCrumbs";
import { PlayerTeamNameDto } from "../../api/dto/player.g";
import { useEffect } from "react";
import { fetchSinglePlayerAsync } from "../../modules/player/playerThunk";
import { selectSinglePlayerData } from "../../modules/player/playerSelector";
import { getPlayerRequest } from "../../api/requests/player";
import { Page } from "../../components/page/page";
import { PageItem } from "../../components/page/pageItem/pageItem";
import { PageItemTop } from "../../components/page/pageItem/pageItemTop/pageItemTop";
import { PageItemContent } from "../../components/page/pageItem/pageItemContent/pageItemContent";

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
    selectSinglePlayerData
  );

  const breadcrumbsText = playerId
    ? `Update ${singlePlayer.name}`
    : "Add new player";
  return (
    <Page>
      <PageItem>
        <PageItemTop>
          <BreadCrumbs path="Players" name={breadcrumbsText} />
        </PageItemTop>
        <PageItemContent>
          <AddPlayer playerId={playerId} />
        </PageItemContent>
      </PageItem>
    </Page>
  );
};
