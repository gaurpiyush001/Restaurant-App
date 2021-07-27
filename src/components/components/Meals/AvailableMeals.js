import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

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
];

const AvailableMeals = () => {
  //This is a helper constant
  const mealsList = DUMMY_MEALS.map((meals) => <MealItem id={meals.id} key={meals.id} name={meals.name} description={meals.description} price={meals.price}/>);

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
        <ul>
        {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
