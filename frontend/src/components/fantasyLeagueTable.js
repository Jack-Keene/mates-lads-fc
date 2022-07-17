import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const FantasyLeagueTable = ({ stats, league }) => {
  const [tableData, setTableData] = useState({
    headers: [],
    data: [],
  });
  const [direction, setDirection] = useState(false);
  const [sortColHead, setSortColHead] = useState("Goals");

  const flattenTable = (stats) => {
    if (league !== "All") {
      stats = stats.filter(
        (stat) => stat.fixture && stat.fixture.league === league
      );
    }
    const players = stats.reduce(
      (acc, curr) => (
        acc[curr.playerName]
          ? acc[curr.playerName].push(curr)
          : (acc[curr.playerName] = [curr]),
        acc
      ),
      {}
    );

    const playerTable = [];

    for (const player in players) {
      const playerObj = {
        id: players[player][0].player._id,
        playerName: player,
        stats: {},
      };
      // console.log(players[player][0].player._id);
      const playerReduce = players[player].reduce(
        (acc, curr) => (
          acc[curr.stat] ? ++acc[curr.stat] : (acc[curr.stat] = 1), acc
        ),
        {}
      );
      playerObj.stats = playerReduce;
      playerTable.push(playerObj);
      console.log(playerObj);
    }

    const data = [];
    const headers = ["Player", "Apps", "Goals", "Assists"];

    for (const { id, playerName, stats } of playerTable) {
      data.push({
        id,
        Player: playerName,
        Apps: stats.Appearance,
        Assists: stats.Assist,
        Goals: stats.Goal,
      });
    }
    return { headers: headers, data: data };
  };

  const sortCol = (col) => {
    const newTableData = {
      ...tableData,
      data: [...tableData.data],
    };
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
    const flattenedTable = flattenTable(stats);
    setTableData(flattenedTable);
    console.log(flattenedTable);
  }, [stats, league]);

  return (
    <Table>
      <thead>
        <tr>
          {tableData.headers.map((header) => (
            <th key={header} onClick={() => sortCol(header)}>
              {header}
              {sortColHead === header && (
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
              <td key={headerIdx}>
                <Link to={`/players/${row["id"]}`} className='link'>
                  {row[header]}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default FantasyLeagueTable;
