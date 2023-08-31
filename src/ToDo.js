import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuid } from "uuid";

function Course(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [checkboxSelection, setCheckboxSelection] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  function addOption() {
    if (selectedRows) {
      const today = new Date();

      const newName = { id: uuid(), name: name, date: today, isDone: false };

      setData((oldArray) => [...oldArray, newName]);
      setName("");
    }
  }

  function deleteOption() {
    if (selectedRows) {
      const updatedOptions = data.filter(
        (item) =>
          !selectedRows?.some((selectedItem) => selectedItem.id === item.id)
      );

      setData(updatedOptions);

      setSelectedRows(null);
    }
  }

  function addDone() {
    const today = new Date();

    const updatedOptions = data.map((item) => {
      if (selectedRows?.some((selectedItem) => selectedItem.id === item.id)) {
        return {
          ...item,
          isDone: true,
          date: today,
        };
      }
      return item;
    });

    setData(updatedOptions);

    setSelectedRows(null);
  }

  return (
    <div>
      <div align="center">
        <Input
          align="center"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type something"
          error={!name}
        />

        <Button onClick={addOption} disabled={!name}>
          Add
        </Button>
        <Button disabled={!checkboxSelection} onClick={() => addDone()}>
          Done
        </Button>
        <Button onClick={() => deleteOption()}>Delete</Button>
      </div>

      <div align="center">
        <h1>To Do List</h1>

        <DataGrid
          rows={data}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[5, 10]}
          isRowSelectable={(params) => params.row.isDone === false}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);

            const selectedRowData = data.filter((row) =>
              selectedIDs.has(row.id.toString())
            );

            setSelectedRows(selectedRowData);

            if (selectedRowData.length > 0) {
              setCheckboxSelection(true);
            } else {
              setCheckboxSelection(false);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Course;
