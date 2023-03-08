import { useState, useEffect } from "react";
import Cats, { cat } from "../data/cats";

export const useCats = () => {
  const [cats, setCats] = useState<cat[]>();
  useEffect(() => {
    setCats([...Cats]);
  }, []);

  return cats;
};
