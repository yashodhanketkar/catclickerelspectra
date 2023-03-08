import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { catRef, storage } from "../../../lib/firebase";
import { v4 } from "uuid";
import { addDoc } from "firebase/firestore";

const initialNewCatValue = {
  name: "",
  age: 0,
  imgUrl: "",
};

interface IProps {
  createNewCat: {
    newForm: boolean;
    setCurrentID: (id: number) => void;
    totalCats: number;
    setNewForm: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const CreateNewCat = (props: IProps["createNewCat"]) => {
  const { newForm, setCurrentID, totalCats, setNewForm } = props;
  const [newCat, setNewCat] = useState(initialNewCatValue);
  const [imageUpload, setImageUpload] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const addCat = async () => {
    if (newCat.name !== "" || newCat.imgUrl !== "") {
      addDoc(catRef, {
        name: newCat.name,
        age: Number(newCat.age),
        imgUrl: imageUrl,
      });
    } else {
      alert("Please input all fields");
    }
  };

  let handleOnChage = (e: any) => {
    setNewCat({
      ...newCat,
      [e.target.name]: e.target.value,
    });
  };

  let handleImageUpload = (e: any) => {
    setImageUpload(e.target.files[0]);
  };

  let handleUpload = () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    console.log(imageUpload.name);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
    alert("Image uploded");
  };

  return (
    <div className={`${newForm ? "" : "hidden"} flex flex-col gap-2`}>
      <label htmlFor="catName">New Cat Name</label>
      <input
        type={"text"}
        id="catName"
        value={newCat.name}
        name="name"
        onChange={(e) => handleOnChage(e)}
        className=" w-4/5 h-8 px-2"
      />
      <label htmlFor="catImgUrl">New Cat Image</label>
      <div className="flex w-full h-8 px-2">
        <input
          type="file"
          id="catImgUrl"
          name="imgUrl"
          onChange={(e) => handleImageUpload(e)}
          className="w-3/4"
        />
        <button
          className="w-fit xl:w-1/4 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      <label htmlFor="catAge">New Cat Age</label>
      <input
        type="number"
        id="catAge"
        value={newCat.age}
        name="age"
        onChange={(e) => handleOnChage(e)}
        className=" w-4/5 h-8 px-2"
      />
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded text-white bg-green-500 w-1/3 sm:w-1/2 xl:w-1/3"
          onClick={() => {
            setCurrentID(totalCats - 1);
            addCat();
          }}
        >
          Submit
        </button>
        <button
          type={"reset"}
          className="px-4 py-2 rounded text-white bg-red-500 w-1/3 sm:w-1/2 xl:w-1/3"
          onClick={() => {
            setImageUpload(null);
            setImageUrl("");
            setNewCat(initialNewCatValue);
            setNewForm(!newForm);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
