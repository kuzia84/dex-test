import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IPlayerAddData,
  IPlayerAddInputs,
  NewPlayerDto,
} from "../../Interfaces";
import { fetchAddPlayer } from "../../store/addPlayerSlise";
import {
  fetchPlayerPositionsAsync,
  SelectPlayerPositionsData,
  SelectPlayerPositionsIsLoading,
} from "../../store/getPlayerPositionsSlice";
import { SelectSinglePlayerData } from "../../store/getPlayerSlise";
import {
  fetchTeamsAsync,
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../store/getTeamsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { newSelectedId } from "../../store/selectedIdSlise";
import InputGroup from "../InputGroup";
import SelectGroup from "../SelectGroup";

const AddPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchPlayerPositionsAsync(
        "http://dev.trainee.dex-it.ru/api/Player/GetPositions"
      )
    );
    dispatch(fetchTeamsAsync("http://dev.trainee.dex-it.ru/api/Team/GetTeams"));
  }, [dispatch]);
  const selectedId = useAppSelector(newSelectedId);
  const singlePlayer = useAppSelector(SelectSinglePlayerData);
  const playerPositionIsLoading = useAppSelector(
    SelectPlayerPositionsIsLoading
  );
  const playerPositions = useAppSelector(SelectPlayerPositionsData);
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

  const {
    control,
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useForm<IPlayerAddInputs>();

  const setTeamDataValues = () => {
    setValue("playerName", singlePlayer.name);
    setValue("playerHeight", singlePlayer.height);
    setValue("playerWeight", singlePlayer.weight);
    setValue("playerBirthday", singlePlayer.birthday);
    setValue("playerNumber", singlePlayer.number);
  };

  useEffect(() => {
    if (selectedId !== 0) {
      setTeamDataValues();
    }
  }, [selectedId]);

  const onSubmit = (data: IPlayerAddData) => {
    const addPlayerData: NewPlayerDto = {
      name: data.playerName,
      number: data.playerNumber,
      position: data.playerPosition.value,
      team: data.playerTeam.value,
      birthday: data.playerBirthday,
      height: data.playerHeight,
      weight: data.playerWeight,
      avatarUrl: data.playerPhoto[0].name,
    };
    dispatch(fetchAddPlayer(addPlayerData));
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

export default AddPlayer;
