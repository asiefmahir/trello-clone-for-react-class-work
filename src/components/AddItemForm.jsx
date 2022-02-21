import { icons } from "../assets";

function AddItemForm({
  listForm,
  submitHandler,
  title,
  onChangeHandler,
  setEditMode,
}) {
  const createHandler = (e) => {
    if (title !== "") {
      submitHandler(e);
    } else {
      alert(`Please Provide a Valid Title for the list`);
    }
  };
  return (
    <div
      className="form-container"
    >
      <div className="form-card">
        <form onSubmit={(e) => createHandler(e)}>
          <textarea
            autoFocus
            placeholder={
              listForm ? "Enter the list title" : "Enter a title for this task"
            }
            value={title}
            onChange={onChangeHandler}
            className="form-textarea"
            name=""
            id=""
            cols="30"
            rows="2"
          ></textarea>
        </form>
      </div>
      <div className="button-container">
        <button
          className="add-button"
          onClick={(e) => {
            
            // e.stopPropagation();
            createHandler(e);
          }}
        >
          {listForm ? "Add list" : "Add task"}
        </button>
        <img
          onClick={(e) => {
            // e.stopPropagation();
            setEditMode(false)
          }}
          className="form-icon"
          src={icons.crossIcon}
          alt=""
        />
      </div>
    </div>
  );
}

export default AddItemForm;
