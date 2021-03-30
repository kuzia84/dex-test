import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMenuId } from "../../store/sideMenuSlise";
import AddNewTeam from "../../Components/AddNewTeam";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { SelectSingleTeamData } from "../../store/getTeamSlise";

const AddNewPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const singleTeam = useAppSelector(SelectSingleTeamData);
  console.log("singleTeam: ", singleTeam);
  useEffect(() => {
    dispatch(setMenuId(1));
  }, [dispatch]);
  const breadcrumbsText = singleTeam.id
    ? `Update ${singleTeam.name}`
    : "Add new team";
  return (
    <div className="item">
      <div className="item__wrapper">
        <div className="item__top">
          <BreadCrumbs path="Teams" name={breadcrumbsText} />
        </div>
        <div className="item__content">
          <AddNewTeam />
        </div>
      </div>
    </div>
  );
};

export default AddNewPlayer;
