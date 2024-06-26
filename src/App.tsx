import StyleProvider from "./components/globalStyles/StyleProvider";
import R3FPage from "./components/pages/R3FPage/R3FPage";

function App() {
  return (
    <>
      <StyleProvider>
        <R3FPage />
      </StyleProvider>
    </>
  );
}

export default App;
