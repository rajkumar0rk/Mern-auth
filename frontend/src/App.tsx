import { Button } from "@/components/ui/button";
import useThemeStore from "./store/theme";

function App() {
  const { theme, changeTheme } = useThemeStore();
  return (
    <>
      <Button onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
        {theme}
      </Button>
    </>
  );
}

export default App;
