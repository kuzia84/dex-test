import React, { useState } from "react";
import { ISearch } from "../../Interfaces/interfaces";
import { useAppDispatch } from "../../store/hooks";

import s from "./style.module.css";

const Search: React.FC<ISearch> = ({ setSearchText }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={s.search}>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          dispatch(setSearchText(searchValue));
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          name="search"
          id="search-input"
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
        />
      </form>
    </div>
  );
};

export default Search;
