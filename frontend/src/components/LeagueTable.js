import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const LeagueTable = ({ table, sort }) => {
  const [tableData, setTableData] = useState({
    headers: [],
    data: [],
    display: [],
  });
  const [direction, setDirection] = useState(false);
  const [sortColHead, setSortColHead] = useState("Pts");

  const flattenTable = (table) => {
    const data = [];
    const headers = ["Team", "P", "W", "L", "D", "F", "A", "GD", "Pts"];
    const display = [
      "",
      "",
      "d-none d-sm-table-cell",
      "d-none d-sm-table-cell",
      "d-none d-md-table-cell",
      "d-none d-md-table-cell",
      "d-none d-md-table-cell",
      "",
      "",
    ];

    for (const {
      team,
      won,
      lost,
      played,
      drawn,
      against,
      goalDifference,
      points,
    } of table) {
      data.push({
        Team: team.name,
        P: played,
        W: won,
        L: lost,
        D: drawn,
        F: goalDifference + against,
        A: against,
        GD: goalDifference,
        Pts: points,
      });
    }
    return { headers: headers, data: data, display: display };
  };

  const sortCol = (col) => {
    if (!sort) {
      return;
    }
    const newTableData = {
      ...tableData,
      data: [...tableData.data],
    };
    // const index = tableData.headers.indexOf(col);
    setDirection(!direction);
    setSortColHead(col);
    sortData(newTableData.data, col);
    setTableData(newTableData);
  };

  const sortData = (data, key) => {
    data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) return direction ? -1 : 1;
      if (valueA > valueB) return direction ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    const flattenedTable = flattenTable(table);
    setTableData(flattenedTable);
  }, [table]);

  useEffect(() => {
    if (tableData.data.length > 0) {
      console.log(sortColHead);
      sortCol(sortColHead);
    }
  }, [sortColHead, tableData.data.length]);

  return (
    <Table>
      <thead>
        <tr>
          {tableData.headers.map((header) => (
            <th
              className={tableData.display[tableData.headers.indexOf(header)]}
              key={header}
              onClick={() => sort && sortCol(header)}>
              {header}
              {sort && sortColHead === header && (
                <i
                  className={`p-1 fa-solid fa-arrow-${
                    direction ? "down" : "up"
                  }`}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.data.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {tableData.headers.map((header, headerIdx) => (
              <td
                key={headerIdx}
                className={
                  tableData.display[tableData.headers.indexOf(header)]
                }>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default LeagueTable;
