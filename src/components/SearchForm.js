import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const searchValue = React.useRef('');


  function searchCocktails(){
    setSearchTerm(searchValue.current.value);
  }

  const handleSubmit = (e) =>  {
      e.preventDefault();
  }
  return <>
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Tìm kiếm rượu</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchValue}
            onChange = {searchCocktails}
          />
        </div>
      </form>
    </section>
  </>
}

export default SearchForm
