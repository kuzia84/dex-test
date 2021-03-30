import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMenuId } from "../../store/sideMenuSlise";
import AddPlayer from "../../Components/AddNewPlayer/addNewPlayer";
import BreadCrumbs from "../../Components/BreadCrumbs/breadCrumbs";
import { SelectSinglePlayerData } from "../../store/getPlayerSlise";
import { PlayerTeamNameDto } from "../../Interfaces/interfaces";

const AddNewPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const singlePlayer: PlayerTeamNameDto = useAppSelector(
    SelectSinglePlayerData
  );
  useEffect(() => {
    dispatch(setMenuId(2));
  }, []);
  const breadcrumbsText = singlePlayer.id
    ? `Update ${singlePlayer.name}`
    : "Add new player";
  return (
    <div className="item">
      <div className="item__wrapper">
        <div className="item__top">
          <BreadCrumbs path="Players" name={breadcrumbsText} />
        </div>
        <div className="item__content">
          <AddPlayer />
        </div>
      </div>
    </div>
  );
};

export default AddNewPlayer;
