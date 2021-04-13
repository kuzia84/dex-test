import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ITeamAddData, ITeamAddInputs, NewTeamDto } from "../../api/dto/team.g";
import { addImageRequest } from "../../api/requests/images";
import { fetchAddTeam, selectAddTeamError } from "../../core/addTeamSlice";
import {
  SelectSingleTeamData,
  SelectSingleTeamIsLoading,
} from "../../core/getTeamSlice";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  fetchUpdateTeamById,
  SelectUpdateTeamByIdError,
} from "../../core/updateTeamById";
import { InputGroup } from "../inputGroup/iInputGroup";
import cameraImg from "../../assets/icons/add_a_photo_24px_rounded.svg";

interface ITeamAdd {
  teamId: number;
}

export const AddTeam: React.FC<ITeamAdd> = ({ teamId }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const selectedId = teamId ? teamId : 0;
  const singleTeam = useAppSelector(SelectSingleTeamData);
  const singleTeamIsLoading = useAppSelector(SelectSingleTeamIsLoading);
  const addTeamError = useAppSelector(selectAddTeamError);
  const updateTeamError = useAppSelector(SelectUpdateTeamByIdError);

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
  } = useForm<ITeamAddInputs>();
  const setTeamDataValues = () => {
    // setValue("teamPhoto", singleTeam.imageUrl);
    setValue("teamName", singleTeam.name);
    setValue("teamDivision", singleTeam.division);
    setValue("teamConference", singleTeam.conference);
    setValue("teamFoundation", singleTeam.foundationYear);
  };

  useEffect(() => {
    if (selectedId !== 0 && singleTeamIsLoading === false) {
      setTeamDataValues();
    }
  }, [selectedId, singleTeamIsLoading]);
  const [bgImage, setBgImage] = useState(cameraImg);
  const watchFile = watch("teamPhoto");
  useEffect(() => {
    if (selectedId !== 0) {
      setBgImage(singleTeam.imageUrl);
    }
    if (watchFile && watchFile.length) {
      setBgImage(URL.createObjectURL(watchFile[0]));
    }
  }, [selectedId, singleTeam.imageUrl, watchFile]);

  const handleFileChange = () => {
    const file = watchFile[0];
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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => makeUrl(data));
  };
  let imageUrl = "";
  const makeUrl = (data: string) => {
    return (imageUrl = `http://dev.trainee.dex-it.ru${data}`);
  };

  const onSubmit = (data: ITeamAddData) => {
    if (selectedId !== 0) {
      const updateTeamData: NewTeamDto = {
        name: data.teamName,
        foundationYear: data.teamFoundation,
        division: data.teamDivision,
        conference: data.teamConference,
        imageUrl: imageUrl,
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
        imageUrl: imageUrl,
      };
      dispatch(fetchAddTeam(addTeamData));
      if (addTeamError) {
        console.log("addTeamError: ", addTeamError);
      } else {
        history.push("/teams");
      }
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
            handleFileChange={handleFileChange}
            imageUrl={bgImage}
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
