import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  ITeamAddData,
  ITeamAddInputs,
  NewTeamDto,
} from "../../../api/dto/team.g";
import { addImageRequest } from "../../../api/urls";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import { InputGroup } from "../../../components/inputGroup/iInputGroup";
import {
  selectAddTeamError,
  selectSingleTeamData,
  selectSingleTeamIsLoading,
  selectUpdateTeamByIdError,
} from "../../../modules/team/teamSelector";
import {
  fetchAddTeam,
  fetchUpdateTeamById,
} from "../../../modules/team/teamThunk";
import { oneTeamReset } from "../../../modules/team/teamSlice";
import { teamsLnk } from "../../routes";
import { Button } from "../../../components/button/button";
import { AddForm } from "../../../components/addForm/addForm";
import { AddFormCol } from "../../../components/addForm/addFormCol/addFormCol";
import { AddFormImage } from "../../../components/addForm/addFormImage/addFormImage";
import { AddFormInfo } from "../../../components/addForm/addFormInfo/addFormInfo";
import { AddFormRow } from "../../../components/addForm/addFormRow/addFormRow";
import { AddFormRowCol } from "../../../components/addForm/addFormRowCol/addFormRowCol";

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

  const { register, handleSubmit, errors, reset, setValue, watch } =
    useForm<ITeamAddInputs>();

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
        history.push(teamsLnk);
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
        history.push(teamsLnk);
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
    <AddForm onSubmit={handleSubmit(onSubmit)}>
      <AddFormCol>
        <AddFormImage>
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
        </AddFormImage>
      </AddFormCol>
      <AddFormCol>
        <AddFormInfo>
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
          <AddFormRow>
            <AddFormRowCol>
              <Button
                textBtn={true}
                type="reset"
                handleClick={() => {
                  history.push("/teams");
                }}
              >
                Cancel
              </Button>
            </AddFormRowCol>
            <AddFormRowCol>
              <Button type="submit">Save</Button>
            </AddFormRowCol>
          </AddFormRow>
        </AddFormInfo>
      </AddFormCol>
    </AddForm>
  );
};
