import { ReactComponent as TeamsImg } from "../../shared/icons/group_person_rounded.svg";
import { ReactComponent as PlayersImg } from "../../shared/icons/person_rounded.svg";
import { IMenu } from "../../api/dto/components.g";
export const MENU: IMenu[] = [
  {
    id: 1,
    name: "Teams",
    img: TeamsImg,
    to: "/teams",
  },
  {
    id: 2,
    name: "Players",
    img: PlayersImg,
    to: "/players",
  },
];
