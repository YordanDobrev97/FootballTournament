import './index.scss'

const Search = ({ value, searchHandler, placeholderValue }) => {
  return (
    <div class='wrap'>
      <div class='search'>
        <input
          type='text'
          class='searchTerm'
          value={value}
          onChange={(e) => searchHandler(e.target.value)}
          placeholder={placeholderValue}
        />
      </div>
    </div>
  );
};

export default Search;
