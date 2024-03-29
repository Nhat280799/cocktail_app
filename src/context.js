import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(true);
  const [searchTerm,setSearchTerm] = useState("a");
  const [cocktails,setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const responsive = await fetch(`${url}${searchTerm}`);
      const data = await responsive.json();
      console.log(data);
      const {drinks} = data;
      if(drinks){
        const newCocktails = drinks.map((item) => {
            const {
              idDrink,strAlcoholic,strCategory,strDrink,strGlass,strDrinkThumb
            } = item;
            return {
              id : idDrink,
              name : strDrink ,
              category : strCategory, 
              image : strDrinkThumb,
              alcoholic : strAlcoholic ,
              glass : strGlass
            }
        })
        setCocktails(newCocktails);
      }else{
        setCocktails([]);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  },[searchTerm]);

  useEffect(() => {
    fetchCocktails();
  },[searchTerm,fetchCocktails])


  return <AppContext.Provider value={{
    loading,searchTerm,cocktails,setSearchTerm
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
