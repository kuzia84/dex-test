import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  IPlayerAddData,
  IPlayerAddInputs,
  NewPlayerDto,
} from "../../../api/dto/player.g";
import {
  selectAddPlayerError,
  selectPlayerPositionsData,
  selectPlayerPositionsIsLoading,
  selectSinglePlayerData,
  selectSinglePlayerIsLoading,
  selectUpdatePlayerByIdError,
} from "../../../modules/player/playerSelector";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import { InputGroup } from "../../../components/inputGroup/iInputGroup";
import { SelectGroup } from "../../../components/selectGroup/selectGroup";
import {
  fetchAddPlayer,
  fetchPlayerPositionsAsync,
  fetchUpdatePlayerById,
} from "../../../modules/player/playerThunk";
import { playerPostionsRequest } from "../../../api/urls";
import { getTeamsRequest } from "../../../api/urls";
import { fetchTeamsAsync } from "../../../modules/team/teamThunk";
import {
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../../modules/team/teamSelector";
import { addImageRequest } from "../../../api/urls";
import { playersLnk } from "../../routes";
import { Button } from "../../../components/button/button";
import { AddForm } from "../../../components/addForm/addForm";
import { AddFormCol } from "../../../components/addForm/addFormCol/addFormCol";
import { AddFormImage } from "../../../components/addForm/addFormImage/addFormImage";
import { AddFormInfo } from "../../../components/addForm/addFormInfo/addFormInfo";
import { AddFormRow } from "../../../components/addForm/addFormRow/addFormRow";
import { AddFormRowCol } from "../../../components/addForm/addFormRowCol/addFormRowCol";

interface IPlayerAdd {
  playerId: number;
}

export const AddPlayer: React.FC<IPlayerAdd> = ({ playerId }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchPlayerPositionsAsync(playerPostionsRequest));
    dispatch(fetchTeamsAsync(getTeamsRequest));
  }, [dispatch]);
  const selectedId = playerId ? playerId : 0;
  const singlePlayerIsLoading = useAppSelector(selectSinglePlayerIsLoading);
  const singlePlayer = useAppSelector(selectSinglePlayerData);
  const playerPositionIsLoading = useAppSelector(
    selectPlayerPositionsIsLoading
  );
  const playerPositions = useAppSelector(selectPlayerPositionsData);
  const playerPositionOptions = playerPositions.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsIsLoading = useAppSelector(selectTeamsIsLoading);
  const teamsOptions = teamsRedux.data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const addPlayerError = useAppSelector(selectAddPlayerError);
  const updatePlayerError = useAppSelector(selectUpdatePlayerByIdError);

  const { control, register, handleSubmit, errors, reset, setValue, watch } =
    useForm<IPlayerAddInputs>();

  function setTeamDataValues() {
    setValue("playerName", singlePlayer.name);
    setValue("playerHeight", singlePlayer.height);
    setValue("playerWeight", singlePlayer.weight);
    setValue("playerBirthday", singlePlayer.birthday);
    setValue("playerNumber", singlePlayer.number);
  }
  const positionDefaultValue = selectedId !== 0 ? singlePlayer.position : "";
  let positionDefaultValueIndex = -1;
  playerPositionOptions.forEach((item, index) => {
    if (item.label === positionDefaultValue) {
      positionDefaultValueIndex = index;
    }
  });

  const teamDefaultValue = selectedId !== 0 ? singlePlayer.teamName : "";
  let teamDefaultValueIndex = -1;
  teamsOptions.forEach((item, index) => {
    if (item.label === teamDefaultValue) {
      teamDefaultValueIndex = index;
    }
  });

  const birthdayDefaultValue = selectedId !== 0 ? singlePlayer.birthday : "";

  useEffect(() => {
    if (selectedId !== 0 && singlePlayerIsLoading === false) {
      setTeamDataValues();
    }
  }, [singlePlayerIsLoading, selectedId]);

  const [bgImage, setBgImage] = useState("");
  const watchFile = watch("playerPhoto");
  useEffect(() => {
    if (selectedId !== 0) {
      setBgImage(`http://dev.trainee.dex-it.ru${singlePlayer.avatarUrl}`);
    }
    if (watchFile && watchFile.length) {
      setBgImage(URL.createObjectURL(watchFile[0]));
    }
  }, [selectedId, singlePlayer.avatarUrl, watchFile]);

  const sendData = (url: string, data: IPlayerAddData) => {
    if (selectedId) {
      const updatePlayerData: NewPlayerDto = {
        name: data.playerName,
        number: data.playerNumber,
        position: data.playerPosition.value,
        team: data.playerTeam.value,
        birthday: data.playerBirthday,
        height: data.playerHeight,
        weight: data.playerWeight,
        avatarUrl: url,
        id: selectedId,
      };
      dispatch(fetchUpdatePlayerById(updatePlayerData));
      if (updatePlayerError) {
        console.log("updatePlayerError: ", updatePlayerError);
      } else {
        history.push(playersLnk);
      }
    } else {
      const addPlayerData: NewPlayerDto = {
        name: data.playerName,
        number: data.playerNumber,
        position: data.playerPosition.value,
        team: data.playerTeam.value,
        birthday: data.playerBirthday,
        height: data.playerHeight,
        weight: data.playerWeight,
        avatarUrl: url,
      };
      dispatch(fetchAddPlayer(addPlayerData));
      if (addPlayerError) {
        console.log("addPlayerError: ", addPlayerError);
      } else {
        history.push(playersLnk);
      }
    }
  };

  let isRequired = singlePlayer.avatarUrl ? false : true;

  const onSubmit = (data: IPlayerAddData) => {
    if (data.playerPhoto[0] || isRequired) {
      const file = data.playerPhoto[0];
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
      const url = singlePlayer.avatarUrl;
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
            inputName="playerPhoto"
            errorText="Select player's image"
            register={register}
            required
            isRequired={isRequired}
            errors={errors}
            imageUrl={bgImage}
          />
        </AddFormImage>
      </AddFormCol>
      <AddFormCol>
        <AddFormInfo>
          <InputGroup
            label="Name"
            inputName="playerName"
            errorText="Enter player name"
            register={register}
            required
            errors={errors}
          />
          {playerPositionIsLoading ? (
            "Loading"
          ) : (
            <SelectGroup
              label="Position"
              selectName="playerPosition"
              errorText="This field is required"
              errors={errors}
              register={register}
              options={playerPositionOptions}
              control={control}
              defaultValueIndex={positionDefaultValueIndex}
            />
          )}
          {teamsIsLoading ? (
            "Loading"
          ) : (
            <SelectGroup
              label="Team"
              selectName="playerTeam"
              errorText="This field is required"
              errors={errors}
              register={register}
              options={teamsOptions}
              control={control}
              defaultValueIndex={teamDefaultValueIndex}
            />
          )}
          <AddFormRow>
            <AddFormRowCol>
              <InputGroup
                type="number"
                label="Height (cm)"
                inputName="playerHeight"
                errorText="Enter player height"
                register={register}
                required
                errors={errors}
              />
            </AddFormRowCol>
            <AddFormRowCol>
              <InputGroup
                type="number"
                label="Weight (kg)"
                inputName="playerWeight"
                errorText="Enter player weight"
                register={register}
                required
                errors={errors}
              />
            </AddFormRowCol>
          </AddFormRow>
          <AddFormRow>
            <AddFormRowCol>
              <InputGroup
                label="Birthday"
                type="datetime-local"
                inputName="playerBirthday"
                errorText="Enter player birthday"
                register={register}
                required
                errors={errors}
                defaultValue={birthdayDefaultValue}
              />
            </AddFormRowCol>
            <AddFormRowCol>
              <InputGroup
                type="number"
                label="Number"
                inputName="playerNumber"
                errorText="Enter player number"
                register={register}
                required
                errors={errors}
              />
            </AddFormRowCol>
          </AddFormRow>
          <AddFormRow>
            <AddFormRowCol>
              <Button
                textBtn={true}
                type="reset"
                handleClick={() => {
                  history.push(playersLnk);
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
