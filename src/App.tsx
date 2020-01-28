import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import "./App.css";
import Main from "./pages/Main";
import { initialState, reducer } from "./reducer";

export const url = "https://fhirtest.uhn.ca/baseDstu3/Binary";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const UserContext = createContext<any[]>([]);

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState({ isLoaded: false });
  // @ts-ignore
  const contextValue = useReducer(reducer, initialState);
  useEffect(() => {
    setState({ isLoaded: true });
  }, []);
  return (
    <UserContext.Provider value={contextValue}>
      {state.isLoaded && children}
    </UserContext.Provider>
  );
};

export const useDataApi = () => useContext(UserContext);

export default App;
