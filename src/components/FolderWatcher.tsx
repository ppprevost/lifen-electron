import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { extname } from "path";
import { useFetch } from "../hooks";
import { url } from "../App";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
let chokidar = window.require("chokidar");
let electronFs = window.require("fs");

interface pdfFilesInterface {
  content: string;
  name: string;
}

const FolderWatcher = () => {
  const [{ isLoading }, doFetch] = useFetch({
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "text/plain"
    }
  });
  const [count, setCount] = useState(0);
  const [pdfFilesWatch, setPdfFile] = useState<pdfFilesInterface[]>([]);
  const pdfRef = useRef<any>([]);
  function StartWatcher(path: string) {
    let pdfFiles: pdfFilesInterface[] = [];
    let watcher = chokidar.watch(path, {
      ignored: /[\/\\]\./,
      persistent: true
    });
    console.log(path);
    function onWatcherReady() {
      console.info(
        "From here can you check for real changes, the initial scan has been completed."
      );
    }
    watcher
      .on("add", function(path: string) {
        setCount(count + 1);
        console.log("File", path, "has been added");
        if (
          electronFs.statSync(path).size < 2000000 &&
          extname(path) === ".pdf"
        ) {
          let body = electronFs.readFileSync(path);
          pdfFiles.push({ content: body.toString("base64"), name: path });
          pdfRef.current = [...pdfFiles];
          setPdfFile(pdfRef.current);
          doFetch(url, { content: body.toString("base64"), name: path }, false);
        }
      })
      .on("change", function(path: string, stats: any) {
        console.log("File", path, stats, "has been changed");
      })
      .on("unlink", function(path: string) {
        console.log("File", path, "has been removed");
        const index = pdfFiles.findIndex(elem => elem.name === path);
        pdfFiles.splice(index, 1);
        pdfRef.current = [...pdfFiles];
        console.log(pdfRef.current);
        setPdfFile(pdfRef.current);
      })
      .on("error", function(error: string) {
        console.log("Error happened", error);
      })
      .on("ready", onWatcherReady)
      .on("raw", function(event: Event, path: string, details: any) {
        // This event should be triggered everytime something happens.
        console.log("Raw event info:", event, path, details);
      });
  }
  useEffect(() => {
    StartWatcher("./FHIR");
  }, []);
  return (
    <>
      <h2>FHIR directory</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        {pdfFilesWatch.length <= 0 && (
          <p>No Pdf are available in the FHIR directory</p>
        )}
        {pdfFilesWatch.map(pdfFile => {
          return (
            <div
              style={{
                marginBottom: "15px",
                padding: "5px",
                width: "23%",
                height: "100px",
                overflow: "scroll",
                overflowWrap: "break-word",
                border: "1px solid grey"
              }}
              key={pdfFile.name}
            >
              <PdfIcon color={"error"} />
              <p>{pdfFile.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FolderWatcher;
