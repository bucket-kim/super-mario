import gsap from "gsap";
import { FC, useEffect, useRef, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { shallow } from "zustand/shallow";
import { GEO_API_URL, geoApiOptions } from "../../../../api";
import { useGlobalState } from "../../../State/useGlobalState";
import SearchStyleContainer from "./SearchStyleContainer";

interface SearchProps {
  onSearchChange: (searchData: string) => void;
}

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<string>("");

  const searchRef = useRef<HTMLDivElement>(null);

  const { showSearch, setShowSearch } = useGlobalState((state) => {
    return {
      showSearch: state.showSearch,
      setShowSearch: state.setShowSearch,
    };
  }, shallow);

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
      borderRadius: "5px",
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 2px #007cf8" : null,
      outline: state.isFocused && null,
      width: "16rem",
      height: "3rem",
      fontSize: "1rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "transparent",
      color: state.isFocused ? "black" : null,
      outline: "none",
    }),
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch("");
    setShowSearch(false);
  };

  useEffect(() => {
    if (!searchRef.current) return;
    if (showSearch) {
      gsap.to(searchRef.current, {
        scale: 1,
        duration: 0.2,
        visibility: "visible",
        overwrite: true,
      });
    } else {
      gsap.to(searchRef.current, {
        scale: 0,
        duration: 0.2,
        overwrite: true,
        onComplete: () => {
          if (!searchRef.current) return;
          searchRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [showSearch]);

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
