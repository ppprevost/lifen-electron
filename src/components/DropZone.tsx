import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudUploadDone from "@material-ui/icons/CloudDone";
import CircularProgress from "@material-ui/core/CircularProgress";
import "typeface-roboto";
//import { useFetch } from "../hooks";
//import Snackbar from "@material-ui/core/Snackbar";
//import SnackBarContent from "./SnackBar";
//import { url } from "../App";

const styles = withStyles({
  "@keyframes progress": {
    "0%": {
      backgroundPosition: "0 0"
    },
    "100%": {
      backgroundPosition: "-70px 0"
    }
  },
  dropZone: {
    position: "relative",
    margin: "10px 10px",
    minHeight: "250px",
    backgroundSize: "cover",
    opacity: 0.95,
    backgroundColor: "#F0F0F0",
    border: "dashed",
    borderColor: "#C8C8C8",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  stripes: {
    border: "solid",
    backgroundImage:
      "repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)",
    animation: "progress 2s linear infinite !important",
    backgroundSize: "150% 100%"
  },
  rejectStripes: {
    border: "solid",
    backgroundImage:
      "repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)",
    animation: "progress 2s linear infinite !important",
    backgroundSize: "150% 100%"
  },
  dropzoneTextStyle: {
    textAlign: "center"
  },
  uploadIconSize: {
    width: 51,
    height: 51,
    color: "#909090"
  },
  dropzoneParagraph: {
    fontSize: 24
  }
});

const DropZone = ({
  classes,
  dropZoneText,
  acceptedFiles,
  maxSize,
  maxSizeText
}: any) => {
  const [maxSizeValue, setMaxSizeText] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [fileData, setFileData] = useState<File | null>(null);
  const [content, setContent] = useState<string | null>(null);
 /* const [{ successPost, error, getItems, isLoading }, doFetch] = useFetch({
    method: "POST",
    headers: {
      Accept: fileData && fileData.type,
      "Content-Type": fileData && fileData.type
    },
    body: JSON.stringify({ name: fileData && fileData.name, content })
  });*/
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      setMaxSizeText(true);
    }
    if (acceptedFiles.length) {
      setDisabled(true);
    }
    acceptedFiles.forEach((file: File) => {
      setMaxSizeText(false);
      setFileData(file);
      const reader = new FileReader();
      console.log(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = event => {
        if (event.target) {
          let binaryData = event.target.result as string;
          //doFetch(url, { content: binaryData, name: file.name }, true);
          setContent(binaryData);
        }
      };
      reader.readAsDataURL(file);
    });
    // Do something with the files
  }, []);
  const accept = acceptedFiles.join(",");
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept, maxSize, disabled });

  const onCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  /*useEffect(() => {
    if (getItems && getItems.entry.length) {
      setOpenSnackBar(true);
      setMessage("number of entry on the server : " + getItems.entry.length);
    }
  }, [getItems]);*/

  const manageDragClass = () => {
    if (!isDragAccept && !isDragReject && !isDragActive) {
      return classes.dropZone;
    }
    if (isDragAccept) {
      return classnames(classes.dropZone, classes.stripes);
    }
    if (isDragReject) {
      return classnames(classes.rejectStripes);
    }
  };

  return (
    <div className={manageDragClass()} {...getRootProps()}>
      <input disabled={disabled} {...getInputProps()} />
      <div className={classes.dropzoneTextStyle}>
        <p className={classes.dropzoneParagraph}>{dropZoneText}</p>
        {!fileData && <CloudUploadIcon className={classes.uploadIconSize} />}
      </div>
      {maxSizeValue ? (
        maxSizeText
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : fileData ? (
        <p>{fileData.name}</p>
      ) : (
        <p>
          Drag 'n' drop some files here, click to select files, or add it
          directly to the FHIR directory
        </p>
      )}
      {/*{fileData && successPost.name === fileData.name && (
        <p>
          <CloudUploadDone /> Upload Success!
        </p>
      )}
      {error && <p>An error occured with the server</p>}*/}
      {/*{isLoading && <CircularProgress />}*/}
      {/*<Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={onCloseSnackbar}
      >
        <SnackBarContent message={message} />
      </Snackbar>*/}
    </div>
  );
};

DropZone.defaultProps = {
  acceptedFiles: ["application/pdf"],
  dropZoneText: "Medical File Area Upload",
  maxSizeText: "Cannot upload this files. Please use another one",
  showPreviewsInDropzone: true,
  clearOnUnmount: true,
  initialFiles: [],
  maxSize: 2000000
};

export default styles(DropZone);
