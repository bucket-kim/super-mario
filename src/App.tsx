import { useState } from "react";
import StyleProvider from "./components/globalStyles/StyleProvider";
import R3FPage from "./components/pages/R3FPage/R3FPage";
import Loader from "./components/pages/UI/Loader/Loader";
import UI from "./components/pages/UI/UI";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <StyleProvider>
        {!isLoaded && <Loader onLoadingComplete={handleLoadComplete} />}
        <R3FPage />
        <UI />
      </StyleProvider>
    </>
  );
}

export default App;
