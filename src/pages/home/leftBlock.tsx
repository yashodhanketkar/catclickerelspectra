import { useEffect } from "react";

const LeftBlock = (props: any) => {
  const { handleId, cats } = props;
  if (!cats) return <h1>Loading</h1>;
  if (!Array.isArray(cats)) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col w-32 ring-1 ring-gray-600 md:w-1/6 md:h-fit">
      {cats.map((cat: any, i: number) => (
        <button
          onClick={() => handleId(i, cat.id, cat.age)}
          className="inline-flex ring-1 ring-gray-500"
          key={i}
        >
          <div className="w-3/4 m-1">{cat.name}</div>
          <div className="w-1/4 m-1 rounded-full bg-gray-600 text-white text-center">
            {cat.age}
          </div>
        </button>
      ))}
    </div>
  );
};

export default LeftBlock;
