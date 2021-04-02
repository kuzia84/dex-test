import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMenuId } from "../../store/sideMenuSlice";
import { AddTeam } from "../../Components/AddNewTeam/addNewTeam";
import { BreadCrumbs } from "../../Components/BreadCrumbs/breadCrumbs";
import { SelectSingleTeamData } from "../../store/getTeamSlice";
import { Sidebar } from "../../Components/Sidebar/sidebar";
import { Header } from "../../Components/Header/header";

export const AddNewTeam: React.FC = () => {
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
    <div className="page">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="item">
          <div className="item__wrapper">
            <div className="item__top">
              <BreadCrumbs path="Teams" name={breadcrumbsText} />
            </div>
            <div className="item__content">
              <AddTeam />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
