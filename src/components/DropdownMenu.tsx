import {FC, ReactNode, useState} from "react";
import {useDetectClickOutside} from "react-detect-click-outside";

export const useDropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({onTriggered: () => setOpen(false)});

  const menu: FC<{name: string; children: ReactNode}> = ({name, children}) => {
    return (
      <div style={{position: "relative", display: "inline-block"}} ref={ref}>
        <button onClick={() => setOpen(!open)}>{name}</button>
        <div
          style={{
            display: open ? "flex" : "none",
            position: "absolute",
            backgroundColor: "#f1f1f1",
            minWidth: " 160px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: "1",
            flexDirection: "column",
            padding: "2px",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return {menu, close: () => setOpen(false)};
};

export const DropdownMenu: FC<{name: string; children: ReactNode}> = ({
  name,
  children,
}) => {
  return useDropDownMenu().menu({name, children});
};
