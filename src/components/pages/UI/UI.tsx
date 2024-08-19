import datas from "../../../datas";
import ButtonInfos from "./ButtonInfos/ButtonInfos";
import Search from "./Search/Search";
import UIStyleContainer from "./UIStyleContainer";
const UI = () => {
  const handleOnSearchChange = (
    searchData: string | number | readonly string[] | undefined,
  ) => {
    console.log(searchData);
  };

  return (
    <UIStyleContainer>
      {/* search UI */}
      <Search onSearchChange={handleOnSearchChange} />
      {/* Stage Info UI */}
      {datas.map((data, index) => (
        <ButtonInfos data={data} key={index} />
      ))}
    </UIStyleContainer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UI;
