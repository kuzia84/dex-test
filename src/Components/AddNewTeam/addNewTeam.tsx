import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ITeamAddData, ITeamAddInputs, NewTeamDto } from "../../api/dto/team.g";
import { addImageRequest } from "../../api/requests/images";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { InputGroup } from "../inputGroup/iInputGroup";
import {
  selectAddTeamError,
  selectSingleTeamData,
  selectSingleTeamIsLoading,
  selectUpdateTeamByIdError,
} from "../../modules/team/teamSelector";
import {
  fetchAddTeam,
  fetchUpdateTeamById,
} from "../../modules/team/teamThunk";
import { oneTeamReset } from "../../modules/team/teamSlice";

interface ITeamAdd {
  teamId: number;
}

export const AddTeam: React.FC<ITeamAdd> = ({ teamId }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const selectedId = teamId ? teamId : 0;
  const singleTeam = useAppSelector(selectSingleTeamData);
  const singleTeamIsLoading = useAppSelector(selectSingleTeamIsLoading);
  const addTeamError = useAppSelector(selectAddTeamError);
  const updateTeamError = useAppSelector(selectUpdateTeamByIdError);

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
  } = useForm<ITeamAddInputs>();

  const setTeamDataValues = () => {
    setValue("teamName", singleTeam.name);
    setValue("teamDivision", singleTeam.division);
    setValue("teamConference", singleTeam.conference);
    setValue("teamFoundation", singleTeam.foundationYear);
  };

  useEffect(() => {
    if (selectedId === 0) {
      dispatch(oneTeamReset);
    }
    if (selectedId !== 0 && singleTeamIsLoading === false) {
      setTeamDataValues();
    }
  }, [selectedId, singleTeamIsLoading]);
  const [bgImage, setBgImage] = useState("");
  const watchFile = watch("teamPhoto");
  useEffect(() => {
    if (selectedId !== 0) {
      setBgImage(`http://dev.trainee.dex-it.ru${singleTeam.imageUrl}`);
    }
    if (watchFile && watchFile.length) {
      setBgImage(URL.createObjectURL(watchFile[0]));
    }
  }, [selectedId, singleTeam.imageUrl, watchFile]);

  const sendData = (url: string, data: ITeamAddData) => {
    if (selectedId !== 0) {
      const updateTeamData: NewTeamDto = {
        name: data.teamName,
        foundationYear: data.teamFoundation,
        division: data.teamDivision,
        conference: data.teamConference,
        imageUrl: url,
        id: selectedId,
      };
      dispatch(fetchUpdateTeamById(updateTeamData));
      if (updateTeamError) {
        console.log("updateTeamError: ", updateTeamError);
      } else {
        history.push("/teams");
      }
    } else {
      const addTeamData: NewTeamDto = {
        name: data.teamName,
        foundationYear: data.teamFoundation,
        division: data.teamDivision,
        conference: data.teamConference,
        imageUrl: url,
      };
      dispatch(fetchAddTeam(addTeamData));
      if (addTeamError) {
        console.log("addTeamError: ", addTeamError);
      } else {
        history.push("/teams");
      }
    }
  };

  const isRequired = singleTeam.imageUrl ? false : true;

  const onSubmit = (data: ITeamAddData) => {
    if (data.teamPhoto[0] || isRequired) {
      const file = data.teamPhoto[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      window
        .fetch(addImageRequest, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          body: dataForm,
        })
        .then((response) => {
          return response.json();
        })
        .then((url) => {
          sendData(url, data);
        });
    }
    if (!isRequired) {
      const url = singleTeam.imageUrl;
      sendData(url, data);
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
            imageUrl={bgImage}
            isRequired={isRequired}
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
            type="number"
            label="Year of foundation"
            inputName="teamFoundation"
            errorText="Enter year of foundation"
            register={register}
            required
            errors={errors}
          />
          <div className="form-row buttons">
            <div className="form-col">
              <input
                type="reset"
                value="Cancel"
                className="btn-text"
                onClick={() => {
                  history.push("/teams");
                }}
              />
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
