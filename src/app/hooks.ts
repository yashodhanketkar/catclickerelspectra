import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const appUseDispatch: () => AppDispatch = useDispatch;
export const appUseSelector: TypedUseSelectorHook<RootState> = useSelector;
