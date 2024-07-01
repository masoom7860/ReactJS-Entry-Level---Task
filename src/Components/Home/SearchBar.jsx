import React, {useContext} from 'react'
import { ProductContext } from '../ContextApi/ProductContext';
function SearchBar() {
  const {searchList} = useContext(ProductContext);
  const searchInList = (e) => {
    console.log(e);
    let a = setTimeout(() => {
      searchList(e.target.value);
    }, 50);
    return () => {
      clearTimeout(a);
    }
  }
  return (
    <div>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search Product" aria-label="Username" aria-describedby="basic-addon1" onKeyUp={searchInList}/>
        <span className="input-group-text" id="basic-addon1">Search</span>
      </div>
    </div>
  )
}

export default SearchBar