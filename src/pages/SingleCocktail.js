import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading,setLoading] = React.useState(true);
  const [cocktail,setCocktail] = React.useState(null);

  React.useEffect(() =>{
    setLoading(true);
    async function  getCocktails(){
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data);
        if(data.drinks){
            const {
              strDrink: name,
              idDrink : id,
              strDrinkThumb : image,
              strAlcoholic : info,
              strCategory : category,
              strGlass : glass,
              strInstructions: instructions,
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
            } = data.drinks[0];
            const slug = [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
            ];
            const newCocktails = {
              id,image,info,category,glass,instructions,name,slug
            };
            setCocktail(newCocktails);
        }else{
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktails();
  }
  ,[id]);

  if(loading){
    return <Loading />
  }

  if(!cocktail){
    return <h2>Không tồn tại sản phẩm</h2>
  }else{
   const   { id,image,info,category,glass,instructions,name , slug} = cocktail;
  

  return (
    <section className='section cocktail-section'>
    <Link to='/' className='btn btn-primary'>
      back home
    </Link>
    <h2 className='section-title'>{name}</h2>
    <div className='drink'>
      <img src={image} alt={name}></img>
      <div className='drink-info'>
        <p>
          <span className='drink-data'>name :</span> {name}
        </p>
        <p>
          <span className='drink-data'>category :</span> {category}
        </p>
        <p>
          <span className='drink-data'>info :</span> {info}
        </p>
        <p>
          <span className='drink-data'>glass :</span> {glass}
        </p>
        <p>
          <span className='drink-data'>instructons :</span> {instructions}
        </p>
        <p>
          <span className='drink-data'>ingredients :</span>
          {slug.map((item, index) => {
            return item ? <span key={index}> {item}</span> : null
          })}
        </p>
      </div>
    </div>
  </section>
  )
}
}
export default SingleCocktail
