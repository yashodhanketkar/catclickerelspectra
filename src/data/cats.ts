export interface cat {
  name: string;
  age: number;
  imgUrl: string;
  nickNames?: [];
}

export interface catWithID extends cat {
  id: string;
}

const Cats: cat[] = [
  {
    name: "Tabby",
    age: 5,
    imgUrl: "/",
  },
  {
    name: "Toby",
    age: 110,
    imgUrl: "/",
  },
];

// 0 to 5: Infant,
// 6 to 12: Child,
// 13 to 25: Young,
// 26 to 40: Middle-Age,
// 41 to 60: Old >61: Very Old

export const ageRange = (age: number) => {
  if (age < 5) return "Infant";
  else if (age < 12) return "Child";
  else if (age < 25) return "Young";
  else if (age < 40) return "Middle-Age";
  else if (age < 60) return "Old";
  else return "Very Old";
};

export default Cats;
