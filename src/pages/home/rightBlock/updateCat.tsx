import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { catRef, db, storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

interface IProps {
  updatecat: {
    newForm: boolean;
    cat: any;
    id: number;
  };
}

export const UpdateCat = (props: IProps["updatecat"]) => {
  const { newForm, cat: mainCat, id } = props;
  const [cat, setCat] = useState(mainCat);
  const [imageUpload, setImageUpload] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const updateCat = async (e: any, id: string) => {
    const catDoc = doc(db, "Cats", id);
    const newFields = {
      id: cat.id,
      name: cat.name,
      age: Number(cat.age),
      imgUrl: imageUrl ? imageUrl : cat.imgUrl,
    };
    if (
      mainCat.age !== newFields.age ||
      mainCat.name !== newFields.name ||
      mainCat.imgUrl !== newFields.imgUrl
    ) {
      await updateDoc(catDoc, { ...newFields });
    } else alert("No changes made");
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

  let handleOnChange = (e: any) => {
    setCat({
      ...cat,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCat(mainCat);
    console.log("main cat updated");
  }, [id]);

  return (
    <div className={`${newForm ? "hidden" : ""} flex flex-col gap-2`}>
      <label htmlFor="catName">Cat Name</label>
      <input
        type={"text"}
        id="catName"
        name="name"
        value={cat.name}
        onChange={(e) => handleOnChange(e)}
        className=" w-4/5 h-8 px-2"
      />
      <label htmlFor="catImgUrl">Cat Image</label>

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

      <label htmlFor="catAge">Cat Age</label>
      <input
        type="number"
        id="catAge"
        name="age"
        value={cat.age}
        onChange={(e) => handleOnChange(e)}
        className=" w-4/5 h-8 px-2"
      />
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded text-white bg-green-500 w-1/3 sm:w-1/2 xl:w-1/3"
          onClick={(e) => updateCat(e, cat.id)}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 rounded text-white bg-red-500 w-1/3 sm:w-1/2 xl:w-1/3"
          onClick={() => {
            setCat(mainCat);
            window.location.reload();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
