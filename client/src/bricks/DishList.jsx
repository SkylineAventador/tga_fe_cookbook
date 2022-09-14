import React, { useState, useMemo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {
  mdiTable,
  mdiViewGridOutline,
  mdiMagnify,
  mdiArrowCollapse,
  mdiArrowExpand,
} from "@mdi/js";

import DishTableList from "./DishTableDetail.jsx";
import DishRegularDetail from "./DishRegularDetail.jsx";

function DishList(props) {
  const [viewType, setViewType] = useState("grid");
  const [detailType, setDetailType] = useState("big");
  const isGrid = viewType === "grid";
  const isBig = detailType === "big";
  const [searchBy, setSearchBy] = useState("");

  const filteredDishList = useMemo(() => {
    return props.dishList.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(searchBy.toLocaleLowerCase());
    });
  }, [searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }
  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Dish List</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    if (currentState === "grid") return "table";
                    else return "grid";
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                {isGrid ? "Table" : "Grid"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setDetailType((currentState) => {
                    if (currentState === "big") return "small";
                    else return "big";
                  })
                }
              >
                <Icon
                  size={1}
                  path={isBig ? mdiArrowCollapse : mdiArrowExpand}
                />{" "}
                {isBig ? "Small" : "Big"}
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
        isBig ? (
          <DishRegularDetail dishList={filteredDishList} detail="big" />
        ) : (
          <DishRegularDetail dishList={filteredDishList} detail="small" />
        )
      ) : (
        <DishTableList dishList={filteredDishList} />
      )}
    </div>
  );
}

export default DishList;
