import React from "react";
import ReactPaginate from "react-paginate";
import { IPagination } from "../../api/dto/components.g";
import s from "./style.module.css";

export const Pagination: React.FC<IPagination> = ({
  loadedCardsNumber,
  pageSize,
  onPageChange,
  pageNumber = 1,
}) => {
  const handleClick = (data: { selected: number }) => {
    onPageChange && onPageChange(data.selected + 1);
  };

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
      // onPageChange={(selectedItem: { selected: number }) => {
      //   history.push(path + (selectedItem.selected + 1));
      // }}
      onPageChange={handleClick}
      containerClassName={s.pagination}
      // subContainerClassName={"pages pagination"}
      activeClassName={s.active}
      forcePage={pageNumber - 1}
    />
  );
};
