import { createContext } from "react";

interface SnackBarContextType {
  showSnackBar: (message: string, severity: "success" | "error") => void;
}

const SnackBarContext = createContext<SnackBarContextType>({
  showSnackBar: () => {},
});

export default SnackBarContext;
