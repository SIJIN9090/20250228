import React from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import styled from "styled-components";

function CommonTable({ bbsList, columns, linkPrefix }) {
  const data = React.useMemo(() => bbsList, [bbsList]);
  const columnData = React.useMemo(
    () =>
      columns.map((col) => ({
        Header: col.label,
        accessor: col.field,
        Cell: ({ value, row }) =>
          col.link ? (
            <Link to={`${linkPrefix}/${row.original.id}`}>{value}</Link>
          ) : (
            value
          ),
      })),
    [columns, linkPrefix]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data,
    });

  return (
    <TableContainer>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 0 140px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  th,
  td {
    padding: 10px;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
    text-align: left;
  }

  tbody tr:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

export default CommonTable;
