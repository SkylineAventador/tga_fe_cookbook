import React from "react";
import Table from "react-bootstrap/Table";

function DishTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Dish ID</th>
        </tr>
      </thead>
      <tbody>
        {props.dishList.map((dish) => {
          const dishDescTruncated = dish.description ? dish.description.substring(0, 50) : "No Description";
          return (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dishDescTruncated}...</td>
              <td>{dish.id}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default DishTableList;
