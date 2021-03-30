import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ITeamAddData,
  ITeamAddInputs,
  NewTeamDto,
} from "../../Interfaces/interfaces";
import { fetchAddTeam } from "../../store/addTeamSlise";
import { SelectSingleTeamData } from "../../store/getTeamSlise";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { newSelectedId } from "../../store/selectedIdSlise";
import { fetchUpdateTeamById } from "../../store/updateTeamById";
import InputGroup from "../InputGroup/iInputGroup";

const AddNewTeam: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(newSelectedId);
  const singleTeam = useAppSelector(SelectSingleTeamData);

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useForm<ITeamAddInputs>();
  const setTeamDataValues = () => {
    setValue("teamName", singleTeam.name);
    setValue("teamDivision", singleTeam.division);
    setValue("teamConference", singleTeam.conference);
    setValue("teamFoundation", singleTeam.foundationYear);
  };

  useEffect(() => {
    if (selectedId !== 0) {
      setTeamDataValues();
    }
  }, []);

  const onSubmit = (data: ITeamAddData) => {
    if (selectedId !== 0) {
      const updateTeamData: NewTeamDto = {
        name: data.teamName,
        foundationYear: data.teamFoundation,
        division: data.teamDivision,
        conference: data.teamConference,
        imageUrl: data.teamPhoto[0].name,
        id: selectedId,
      };
      dispatch(fetchUpdateTeamById(updateTeamData));
    } else {
      const addTeamData: NewTeamDto = {
        name: data.teamName,
        foundationYear: data.teamFoundation,
        division: data.teamDivision,
        conference: data.teamConference,
        imageUrl: data.teamPhoto[0].name,
      };
      dispatch(fetchAddTeam(addTeamData));
    }

    reset();
  };
  return (
    <form className="form-add" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <div className="form-image">
          <InputGroup
            type="file"
            inputName="teamPhoto"
            errorText="Select team's image"
            register={register}
            required
            errors={errors}
          />
        </div>
      </div>
      <div className="form-col">
        <div className="form-info">
          <InputGroup
            label="Name"
            inputName="teamName"
            errorText="Enter team name"
            register={register}
            required
            errors={errors}
          />
          <InputGroup
            label="Division"
            inputName="teamDivision"
            errorText="Enter team division"
            register={register}
            required
            errors={errors}
          />
          <InputGroup
            label="Conference"
            inputName="teamConference"
            errorText="Enter team conference"
            register={register}
            required
            errors={errors}
          />
          <InputGroup
            label="Year of foundation"
            inputName="teamFoundation"
            errorText="Enter year of foundation"
            register={register}
            required
            errors={errors}
          />
          <div className="form-row buttons">
            <div className="form-col">
              <input type="reset" value="Cancel" className="btn-text" />
            </div>
            <div className="form-col">
              <input type="submit" value="Save" className="btn" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewTeam;
