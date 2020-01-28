import React, {createContext, FunctionComponent, useContext, useEffect, useReducer, useState} from 'react';
import './App.css';
import DropZone from './components/DropZone';
import logo from "./img/logo.jpeg";
//import FolderWatcher from "./components/FolderWatcher"

export const url = "https://fhirtest.uhn.ca/baseDstu3/Binary";

const App: React.FC = () => {
  return (
      <AppProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} style={{width:'100px', marginBottom:'10px'}} alt="" />
          </header>
          <section>
            <article>
              <DropZone/>
            </article>
            <article>
              {/*<FolderWatcher />*/}
            </article>
          </section>
        </div>

      </AppProvider>
  );
}

const initialState = {
  isLoading:false,
  getItems:{entry:[]},
  error:null,
  successPost:null,
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "GETITEMS":
      return {...state, getItems: action.payload}
    case "REQUEST":
      return {...state, isLoading:true, error:false}
    case "SUCCESS":
      console.log(action)
      return {...state, successPost:action.payload, error:null, isLoading:false}
    case "ERROR":
      return {...state, error:action.error}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserContext = createContext<any>([]);

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

export const useDataApi=()=> useContext(UserContext)

export default App;
