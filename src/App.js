import Course from "./ToDo";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [columns, setColumns] = useState([
    { field: "name", editable: true, headerName: "name", width: 250 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      editable: true,
      width: 250,
      valueFormatter: (row) => format(new Date(row?.value), "HH-MM dd.mm.yyyy"),
    },
    {
      field: "isDone",
      headerName: "Status",
      width: 250,
      valueFormatter: (row) => (row?.value ? "Done" : "Not Done"),
    },
  ]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    const storedData = localStorage.getItem("columns");
    if (storedData) {
      setColumns(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="App">
      <div>
        <Course columns={columns} />
      </div>
    </div>
  );
}

export default App;
