import { ReactComponent as TeamsImg } from "../../assets/icons/group_person_rounded.svg";
import { ReactComponent as PlayersImg } from "../../assets/icons/person_rounded.svg";
import { IMenu } from "../../api/dto/components.g";
import { playersLnk, teamsLnk } from "../../pages/routes";

export const MENU: IMenu[] = [
  {
    id: 1,
    name: "Teams",
    img: TeamsImg,
    to: teamsLnk,
  },
  {
    id: 2,
    name: "Players",
    img: PlayersImg,
    to: playersLnk,
  },
];
