let editMode = false;
let selectedItemId = "";

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addButton");
  const submitButton = document.querySelector("#submitButton");
  const editButtons = document.querySelectorAll("#editButton");
  const deleteButtons = document.querySelectorAll("#deleteButton");
  const itemCodeInput = document.querySelector("#itemCodeInput");
  const itemTitleInput = document.querySelector("#itemTitleInput");
  const itemDescriptionInput = document.querySelector("#itemDescriptionInput");
  const itemPriceInput = document.querySelector("#itemPriceInput");

  addButton.addEventListener("click", () => {
    editMode = false;
    itemCodeInput.value = "";
    itemTitleInput.value = "";
    itemDescriptionInput.value = "";
    itemPriceInput.value = "";
    $("#modal").modal("show");
  });

  submitButton.addEventListener("click", () => {
    const item = {
      code: itemCodeInput.value,
      title: itemTitleInput.value,
      description: itemDescriptionInput.value,
      price: itemPriceInput.value,
    };

    console.log(item);
    if (editMode) {
      axios
        .patch(`/items/${selectedItemId}`, item)
        .then((response) => {
          $("#modal").modal("hide");
          const editedItem = response.data;
          console.log("ITEM: ", editedItem);

          const row = document.getElementById(selectedItemId);

          row.querySelector("#itemCode").textContent = editedItem.code;
          row.querySelector("#itemTitle").textContent = editedItem.title;
          row.querySelector("#itemDescription").textContent = editedItem.description;
          row.querySelector("#itemPrice").textContent = editedItem.price;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/items", item)
        .then((response) => {
          $("#modal").modal("hide");

          const tbody = document.querySelector("#tbody");
          const newRowHTML = response.data;

          tbody.insertAdjacentHTML("beforeend", newRowHTML);

          bindDeleteButton(tbody.lastChild.querySelector("#deleteButton"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const bindEditButtons = (buttons) => {
    buttons.forEach((button) => bindEditButton(button));
  };

  const bindEditButton = (button) => {
    button.addEventListener("click", () => {
      editMode = true;
      $("#modal").modal("show");

      selectedItemId = button.getAttribute("itemid");
      const row = document.getElementById(selectedItemId);

      itemCodeInput.value = row.querySelector("#itemCode").textContent;
      itemTitleInput.value = row.querySelector("#itemTitle").textContent;
      itemDescriptionInput.value = row.querySelector("#itemDescription").textContent;
      itemPriceInput.value = row.querySelector("#itemPrice").textContent;
    });
  };

  const bindDeleteButtons = (buttons) => {
    buttons.forEach((button) => bindDeleteButton(button));
  };

  const bindDeleteButton = (button) => {
    button.addEventListener("click", () => {
      id = button.getAttribute("itemid");
      axios
        .delete(`/items/${id}`)
        .then((item) => {
          const row = document.getElementById(id);
          row.parentElement.removeChild(row);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  bindDeleteButtons(deleteButtons);
  bindEditButtons(editButtons);
});
