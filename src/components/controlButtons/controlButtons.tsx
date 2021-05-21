import { ReactComponent as Pen } from "../../assets/icons/create.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import s from "./style.module.css";
import { IControlButtonsProps } from "../../api/dto/components.g";

export const ControlButtons: React.FC<IControlButtonsProps> = (props) => {
  const handleDeleteButton = () => {
    props.delete();
  };

  const handleUpdateButton = () => {
    props.update();
  };

  return (
    <div className={s.buttons}>
      <button>
        <Pen onClick={handleUpdateButton} />
      </button>
      <button>
        <Delete onClick={handleDeleteButton} />
      </button>
    </div>
  );
};
