import Icon from "@mdi/react";
import { Modal, Button, Form } from "react-bootstrap";
import { mdiPencilPlusOutline } from "@mdi/js";
import { useState } from "react";
import styles from "../css/recipeCreation.module.css";

function RecipeCreationModal(props) {
  const emptyIngredient = () => {
    return { id: "", amount: 0, unit: "" };
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const setIngredientField = (inputName, val, index) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      newData.ingredients[index][inputName] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const addEmptyIngredient = () => {
    const newFormData = {
      ...formData,
      ingredients: [...formData.ingredients, emptyIngredient()],
    };
    setFormData(newFormData);
  };

  function removeIngredient(index) {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);

    const newFormData = {
      ...formData,
      ingredients: newIngredients,
    };
    setFormData(newFormData);
  }

//   function createThumbnails(){
//     for (let index = 0; index < 3; index++) {
//         return addEmptyIngredient();
//     }
//   }

  const [isModalShown, setShow] = useState(false);

  //Sorting obtained ingredients by Czech (default) alphabet.
  const sortedIngredientList = props.ingredientList.sort((a, b) => {
    return a.name.localeCompare(b.name, "cs");
  });

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  // function to create new line of input group to add ingredient
  const ingredienceInputGroup = (ingredient, index) => {
    return (
      <div key={index} className={"d-flex justify-content-center gap-1"}>
        <Form.Group className="mb-1 w-75" controlId="ingredients">
          <Form.Label>Ingredient name</Form.Label>
          <Form.Select
            value={ingredient.id}
            onChange={(e) => setIngredientField("id", e.target.value, index)}
          >
            <option></option>
            {sortedIngredientList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={ingredient.amount}
            onChange={(e) =>
              setIngredientField("amount", parseInt(e.target.value), index)
            }
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="unit">
          <Form.Label>Unit</Form.Label>
          <Form.Control
            value={ingredient.unit}
            onChange={(e) => setIngredientField("unit", e.target.value, index)}
          />
        </Form.Group>

        <Button
          style={{
            height: "50%",
            backgroundColor: "#E23D28",
            marginTop: "auto",
            marginBottom: ".25rem",
          }}
          onClick={() => removeIngredient(index)}
        >
          X
        </Button>
      </div>
    );
  };

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Recipe Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="rc_form" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="recipeName">
              <Form.Label>Recipe name</Form.Label>
              <Form.Control type="text" placeholder="Enter recipe name here" />
            </Form.Group>

            <Form.Group controlId="recipeDescription">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                //Preventing input filed become too high, in case of need, there is a scroll bar.
                style={{ maxHeight: "256px" }}
                as="textarea"
                placeholder="Enter recipe instructions here"
              />
            </Form.Group>

            {addEmptyIngredient}
            {formData.ingredients.map((ing, index) => {
              return ingredienceInputGroup(ing, index);
            })}

            <Button style={{ marginTop: "1rem" }} onClick={addEmptyIngredient}>
              Add
            </Button>

            <div className={"d-flex justify-content-between mt-5"}>
              <Button
                variant="danger"
                size="md"
                className="w-25"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="success"
                type="submit"
                size="md"
                className="w-25"
              >
                Create recipe
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Button variant="outline-success" onClick={handleShowModal}>
        <Icon path={mdiPencilPlusOutline} size={1} />
        Create dish
      </Button>
    </>
  );
}

export default RecipeCreationModal;
