import { useState } from "react";
import { catWithID } from "../../../data/cats";
import { CreateNewCat } from "./createCat";
import { UpdateCat } from "./updateCat";

const RightBlock = (props: any) => {
  const { cats, id, setCurrentID, totalCats } = props;
  const [newForm, setNewForm] = useState(false);
  const cat: catWithID = cats[id];

  if (!cat) return <h1>Loading</h1>;

  return (
    <div className="ring-1 ring-gray-500 flex flex-col gap-2 p-4 md:w-1/4">
      <button
        className="bg-blue-600 text-white rounded px-4 py-2 w-fit mb-4"
        onClick={() => setNewForm(!newForm)}
      >
        Add new cat
      </button>
      <UpdateCat newForm={newForm} cat={cat} id={id} />
      <CreateNewCat
        newForm={newForm}
        setCurrentID={setCurrentID}
        totalCats={totalCats}
        setNewForm={setNewForm}
      />
    </div>
  );
};

export default RightBlock;
