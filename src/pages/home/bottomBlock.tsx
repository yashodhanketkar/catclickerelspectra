const BottomBlock = (props: any) => {
  const { handleId, cats } = props;

  if (!cats || !Array.isArray(cats)) return <h1>Loading</h1>;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Cats Image gallary</h1>
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {cats.map((cat: any, i: number) => (
          <button
            onClick={() => handleId(i, cat.id, cat.age)}
            key={i}
            className="flex flex-col ring-gray-500 ring-1 w-full sm:w-1/4 md:w-1/6"
          >
            <h1 className="text-lg font-semibold px-1">{cat.name}</h1>
            <p className="px-1">No. of times clicked:{cat.age}</p>
            <img
              className="ring-1 ring-gray-700 aspect-video w-full object-cover"
              src={cat.imgUrl}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomBlock;
