import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

const RELEVANT_EXTENSIONS = [".java"];

const RELEVANT_PATH_PARTS = ["/src/main/java/com/"];

const PATH =
  "/home/lucca/Schreibtisch/repos/PirateManagement/service-spring-abstract";

export interface CodebaseFileEntry {
  path: string;
  content: string;
}

export const useFileEntries = () => {
  const [entries, setEntries] = useState<CodebaseFileEntry[]>([]);
  useEffect(() => {
    invoke("read_files", {
      path: PATH,
      extensions: RELEVANT_EXTENSIONS,
      pathParts: RELEVANT_PATH_PARTS,
    }).then((val) => setEntries(val as CodebaseFileEntry[]));
  }, []);
  return entries;
};
