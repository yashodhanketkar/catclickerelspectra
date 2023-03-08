import { ageRange, catWithID } from "../../data/cats";

const CenterBlock = (props: any) => {
  const { id, cats, handleId } = props;
  const cat: catWithID = cats[id];
  if (!cat) return <h1>Loading</h1>;

  return (
    <div className="ring-1 ring-gray-500 md:w-1/2">
      <h1 className="text-lg font-semibold p-2">{cat.name}</h1>
      <p className="p-2">No. of times clicked: {cat.age}</p>
      <img
        onClick={() => handleId(id, cat.id, cat.age)}
        src={cat.imgUrl}
        className="ring-1 ring-black aspect-video w-full object-cover"
      />
      {cat.nickNames ? (
        <p className="p-2">{cat.nickNames.join(", ")}</p>
      ) : (
        <p className="p-2">{cat.name}</p>
      )}
      <p className="p-2">Grown up {ageRange(cat.age)}</p>
    </div>
  );
};

export default CenterBlock;
