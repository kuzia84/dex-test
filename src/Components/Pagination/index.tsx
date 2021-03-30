import React from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch } from "../../store/hooks";
import { IPagination } from "../../Interfaces";
import s from "./style.module.css";

const Pagination: React.FC<IPagination> = ({
  loadedCardsNumber,
  pageSize,
  pageNumber,
  setPageNumber,
}) => {
  const dispatch = useAppDispatch();

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
      onPageChange={(selectedItem: { selected: number }) =>
        dispatch(setPageNumber(selectedItem.selected + 1))
      }
      containerClassName={s.pagination}
      // subContainerClassName={"pages pagination"}
      activeClassName={s.active}
      forcePage={pageNumber - 1}
    />
  );
};

export default Pagination;
