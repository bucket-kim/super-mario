import StyleProvider from "./components/globalStyles/StyleProvider";
import R3FPage from "./components/pages/R3FPage/R3FPage";
import UI from "./components/pages/UI/UI";

function App() {
  return (
    <>
      <StyleProvider>
        <R3FPage />
        <UI />
      </StyleProvider>
    </>
  );
}

export default App;
