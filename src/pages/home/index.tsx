import { addDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { catRef, db } from "../../lib/firebase";
import BottomBlock from "./bottomBlock";
import CenterBlock from "./centerBlock";
import LeftBlock from "./leftBlock";
import RightBlock from "./rightBlock";

const Home = () => {
  const [cats, setCats] = useState({});
  const [currentID, setCurrentID] = useState(0);
  const [totalCats, setTotalCats] = useState(0);

  const updateCat = async (id: string, age: number) => {
    const userDoc = doc(db, "Cats", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  let handleId = (i: number, id: string, age: number) => {
    updateCat(id, age);
    setCurrentID(i);
    console.log(id);
  };

  useEffect(() => {
    const getCats = async () => {
      const data = await getDocs(catRef);
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (newData !== cats) {
        setCats(newData);
        setTotalCats(newData.length);
      }
    };
    getCats();
  }, [currentID, cats]);

  if (!cats) return <h1>Loading</h1>;

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row pb-4 border-b-2 border-gray-500">
        <LeftBlock handleId={handleId} cats={cats} />
        <CenterBlock handleId={handleId} id={currentID} cats={cats} />
        <RightBlock
          id={currentID}
          totalCats={totalCats}
          cats={cats}
          setCurrentID={setCurrentID}
        />
      </div>
      <BottomBlock handleId={handleId} cats={cats} />
    </>
  );
};

export default Home;
