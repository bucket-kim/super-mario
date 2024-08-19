import { FC, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../../../api";

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

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch("");
  };

  return (
    <div>
      <AsyncPaginate
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
    </div>
  );
};

export default Search;
