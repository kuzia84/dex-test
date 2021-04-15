import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  IPlayerAddData,
  IPlayerAddInputs,
  NewPlayerDto,
} from "../../api/dto/player.g";
import {
  selectAddPlayerError,
  selectPlayerPositionsData,
  selectPlayerPositionsIsLoading,
  selectSinglePlayerData,
  selectSinglePlayerIsLoading,
  selectUpdatePlayerByIdError,
} from "../../modules/player/playerSelector";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { InputGroup } from "../inputGroup/iInputGroup";
import { SelectGroup } from "../selectGroup/selectGroup";
import {
  fetchAddPlayer,
  fetchPlayerPositionsAsync,
  fetchUpdatePlayerById,
} from "../../modules/player/playerThunk";
import { playerPostionsRequest } from "../../api/requests/player";
import { getTeamsRequest } from "../../api/requests/team";
import { fetchTeamsAsync } from "../../modules/team/teamThunk";
import cameraImg from "../../assets/icons/add_a_photo_24px_rounded.svg";
import {
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../modules/team/teamSelector";
import { addImageRequest } from "../../api/requests/images";

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
  let playerPosition: any = [];
  if (playerPositions.length > 2) {
    playerPosition = playerPositions.map((item: string) => {
      return {
        value: item,
        label: item,
      };
    });
  }
  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsIsLoading = useAppSelector(selectTeamsIsLoading);
  const teams = teamsRedux.data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const addPlayerError = useAppSelector(selectAddPlayerError);
  const updatePlayerError = useAppSelector(selectUpdatePlayerByIdError);

  const {
    control,
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
  } = useForm<IPlayerAddInputs>();

  function setTeamDataValues() {
    setValue("playerName", singlePlayer.name);
    setValue("playerHeight", singlePlayer.height);
    setValue("playerWeight", singlePlayer.weight);
    setValue("playerBirthday", singlePlayer.birthday);
    setValue("playerNumber", singlePlayer.number);
  }

  useEffect(() => {
    if (selectedId !== 0 && singlePlayerIsLoading === false) {
      setTeamDataValues();
    }
  }, [singlePlayerIsLoading, selectedId]);

  const [bgImage, setBgImage] = useState(cameraImg);
  const watchFile = watch("playerPhoto");
  useEffect(() => {
    if (selectedId !== 0) {
      setBgImage(`http://dev.trainee.dex-it.ru${singlePlayer.avatarUrl}`);
    }
    if (watchFile && watchFile.length) {
      setBgImage(URL.createObjectURL(watchFile[0]));
    }
  }, [selectedId, singlePlayer.avatarUrl, watchFile]);

  const onSubmit = (data: IPlayerAddData) => {
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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((url) => {
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
            history.push("/players");
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
            history.push("/players");
          }
        }
      });
    reset();
  };

  return (
    <form className="form-add" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <div className="form-image">
          <InputGroup
            type="file"
            inputName="playerPhoto"
            errorText="Select player's image"
            register={register}
            required
            errors={errors}
            imageUrl={bgImage}
          />
        </div>
      </div>
      <div className="form-col">
        <div className="form-info">
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
              options={playerPosition}
              control={control}
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
              options={teams}
              control={control}
            />
          )}
          <div className="form-row">
            <div className="form-col">
              <InputGroup
                type="number"
                label="Height (cm)"
                inputName="playerHeight"
                errorText="Enter player height"
                register={register}
                required
                errors={errors}
              />
            </div>
            <div className="form-col">
              <InputGroup
                type="number"
                label="Weight (kg)"
                inputName="playerWeight"
                errorText="Enter player weight"
                register={register}
                required
                errors={errors}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <InputGroup
                label="Birthday"
                type="date"
                inputName="playerBirthday"
                errorText="Enter player birthday"
                register={register}
                required
                errors={errors}
              />
            </div>
            <div className="form-col">
              <InputGroup
                type="number"
                label="Number"
                inputName="playerNumber"
                errorText="Enter player number"
                register={register}
                required
                errors={errors}
              />
            </div>
          </div>
          <div className="form-row buttons">
            <div className="form-col">
              <input
                type="reset"
                value="Cancel"
                className="btn-text"
                onClick={() => {
                  history.push("/players");
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
