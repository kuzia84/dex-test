import React, { useState } from "react";
import { ISearch } from "../../api/dto/components.g";
import s from "./style.module.css";

export const Search: React.FC<ISearch> = ({ setSearchText }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={s.search}>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          setSearchText && setSearchText(searchValue);
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
