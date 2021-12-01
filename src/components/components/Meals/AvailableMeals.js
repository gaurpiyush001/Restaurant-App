import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

//Now, this hardcoded data would be fetched from firebase database
/*
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];*/

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect( () => {
    const fetchMeals = async () => {
      //setIsLoading(true);
      const response = await fetch('https://react-http-61968-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok) {//statusCode
        throw new Error('Something went wrong!!');
      }

      const responseData = await response.json();//Response will be an object

      const loadedMeals = [];

      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(err => {
        setIsLoading(false);
        setHttpError(err.message);
    });

  }, []);

  if(isLoading){
    return (
      <section className={classes.MealsLoading}><p>Fetching Data</p></section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  //This is a helper constant
  const mealsList = meals.map((meals) => (
    <MealItem
      id={meals.id}
      key={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  //console.log(mealsList);
  return (
    <section className={classes.meals}>
      <Card>
        {/* {DUMMY_MEALS.map((meals) => {
          <MealItem
            name={meals.name}
            description={meals.description}
            price={meals.price}
            key={meals.id}
          />;
        })} */}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
