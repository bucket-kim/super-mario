import { FC, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../../../api";
import SearchStyleContainer from "./SearchStyleContainer";

interface SearchProps {
  onSearchChange: (searchData: string) => void;
}

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<string>("");

  const loadOptions = async (inputValue: string, { page }: any) => {
    try {
      const geoResponse = await fetch(
        `${GEO_API_URL}/cities?&namePrefix=${inputValue}&page=${page}`,
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
            hasMore: response.length >= 1,
            additional: {
              page: inputValue ? 2 : page + 1,
            },
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
      borderRadius: "5px",
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 2px #007cf8" : null,
      outline: "none",
      width: "14rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3699FF" : null,
      color: state.isFocused ? "black" : null,
      outline: "none",
    }),
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch("");
  };

  return (
    <SearchStyleContainer>
      <AsyncPaginate
        styles={customStyles}
        key={JSON.stringify(search)}
        value={search || ""}
        placeholder="Search for City"
        onChange={handleOnChange}
        debounceTimeout={600}
        additional={{ page: 1 }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        loadOptions={loadOptions}
      />
    </SearchStyleContainer>
  );
};

export default Search;
