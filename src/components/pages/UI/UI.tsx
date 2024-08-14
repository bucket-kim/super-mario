import datas from "../../../datas";
import ButtonInfos from "./ButtonInfos/ButtonInfos";
import UIStyleContainer from "./UIStyleContainer";
const UI = () => {
  return (
    <UIStyleContainer>
      {datas.map((data) => (
        <ButtonInfos data={data} />
      ))}
    </UIStyleContainer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UI;
