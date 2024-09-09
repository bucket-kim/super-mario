import { FC, useRef, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../../../api";
import SearchStyleContainer from "./SearchStyleContainer";

interface SearchProps {
  onSearchChange: (searchData: string) => void;
}

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<string>("");

  const searchRef = useRef<HTMLDivElement>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const geoResponse = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions,
      )
        .then((res) => res.json())
        .then((response) => {
          return {
            options: response.data.map((city: any) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name} ${city.countryCode}`,
              };
            }),
          };
        });

      return geoResponse;
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "1rem",
      border: "none",
      boxShadow: state.isFocused && null,
      outline: state.isFocused && null,
      // background: "transparent",
      width: window.innerWidth <= 440 ? "14rem" : "22rem",
      height: window.innerWidth <= 440 ? "2rem" : "3rem",
      padding: "0rem .5rem",
      fontSize: "1rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "transparent",
      borderRadius: "1rem",
      color: "black",
      boxShadow: state.isFocused && null,
      outline: state.isFocused && "none",
    }),
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch("");
  };

  return (
    <SearchStyleContainer ref={searchRef}>
      <AsyncPaginate
        className="search-content"
        styles={customStyles}
        key={JSON.stringify(search)}
        value={search || ""}
        placeholder="Search your city!"
        onChange={handleOnChange}
        debounceTimeout={600}
        loadOptions={loadOptions}
      />
    </SearchStyleContainer>
  );
};

export default Search;
