import './index.scss'

const Search = ({value, searchHandler}) => {
  return (
    <div class='wrap'>
      <div class='search'>
        <input
          type='text'
          class='searchTerm'
          value={value}
          onChange={(e) => searchHandler(e.target.value)}
          placeholder='Search player by username...'
        />
      </div>
    </div>
  );
};

export default Search;
