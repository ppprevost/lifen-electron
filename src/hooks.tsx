import { useEffect, useState } from "react";
import { useDataApi } from "./App";

interface Options {
  method?: string;
  body?: string;
  headers: any;
}

export function useFetch<T>(options = {} as Options) {
  const [url, setUrl] = useState("");
  const [body, setBody] = useState(undefined);
  const [getAllItems, setGetAllItems] = useState(false);
  const setPostUrl = (url: string, body?: any, getAllItems = true) => {
    setBody(body);
    setGetAllItems(getAllItems);
    return setUrl(url);
  };
  const [state, dispatch] = useDataApi();
  useEffect(() => {
    const asyncFetch = async () => {
      try {
        if (url) {
          dispatch({ type: "REQUEST" });
          const fetched = await fetch(url, {
            ...options,
            body: JSON.stringify(body)
          });
          const fetchItems = await fetch(url);

          if (fetched.status >= 400 || fetchItems.status >= 400) {
            throw new Error(await fetched.text());
          }
          const fetchItemsResponse = await fetchItems.json();

          dispatch({ type: "GETITEMS", payload: fetchItemsResponse });

          const responsed = await fetched.json();
          dispatch({ type: "SUCCESS", payload: responsed });
        }
      } catch (e) {
        if (e.message) {
          dispatch({ type: "ERROR" }, { error: e.message });
        }
        dispatch({ type: "ERROR", error: e });
      }
    };
    asyncFetch();
  }, [url, body]);
  return [state, setPostUrl];
}
