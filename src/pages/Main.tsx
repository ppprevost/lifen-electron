import DropZone from "../components/DropZone";
import FolderWatcher from "../components/FolderWatcher";
import React, { useEffect, useState } from "react";
import { useDataApi } from "../App";
import LoadingOverlay from "react-loading-overlay";
import logo from "../img/logo.jpeg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackBarContent from "../components/SnackBar";

const Main = () => {
  const [{ isLoading, getItems, successPost }] = useDataApi();
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const onCloseSnackbar = () => {
    setOpenSnackBar(false);
  };
  useEffect(() => {
    if (getItems && getItems.total) {
      setOpenSnackBar(true);
      setMessage("number of entry on the server : " + getItems.total);
    }
  }, [getItems]);
  useEffect(() => {}, [successPost]);
  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Sending document(s) to the server"
    >
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            style={{ width: "100px", marginBottom: "10px" }}
            alt=""
          />
        </header>
        <section>
          <article>
            <DropZone />
          </article>
          <article>
            <FolderWatcher />
          </article>
        </section>
      </div>
      {
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={onCloseSnackbar}
        >
          <SnackBarContent message={message} />
        </Snackbar>
      }
    </LoadingOverlay>
  );
};

export default Main;
