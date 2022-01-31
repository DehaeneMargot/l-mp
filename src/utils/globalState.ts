import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  activePage: "",
};

export const { useGlobalState, setGlobalState } = createGlobalState(
  initialState
);
