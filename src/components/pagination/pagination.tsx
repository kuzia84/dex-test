import React from "react";
import ReactPaginate from "react-paginate";
import { IPagination } from "../../api/dto/components.g";
import s from "./style.module.css";
import { useHistory } from "react-router";

export const Pagination: React.FC<IPagination> = ({
  page,
  loadedCardsNumber,
  pageSize,
  pageNumber,
}) => {
  const history = useHistory();
  let path = "";
  if (page === "teams") {
    path = `/teams?Page=`;
  }
  if (page === "players") {
    path = `/players?Page=`;
  }

  const pageCount = Math.ceil(loadedCardsNumber / pageSize);
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(selectedItem: { selected: number }) => {
        history.push(path + (selectedItem.selected + 1));
      }}
      containerClassName={s.pagination}
      // subContainerClassName={"pages pagination"}
      activeClassName={s.active}
      forcePage={pageNumber - 1}
    />
  );
};
