import { FC, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../../../api";

interface SearchProps {
  onSearchChange: (
    searchData: string | number | readonly string[] | undefined,
  ) => void;
}

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >(undefined);

  const loadOptions = async (inputValue: string, options: unknown[]) => {
    try {
      const optionEnd = options.length;

      const geoResponse = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}&offset=${optionEnd}`,
        geoApiOptions,
      )
        .then((res) => res.json())
        .then((res) => {
          return {
            options: res.data.map((city: any) => {
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

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        value={search || ""}
        placeholder="Search for City"
        onChange={handleOnChange}
        debounceTimeout={600}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
