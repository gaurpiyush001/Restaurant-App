///////////////////SUPER SIMPLE COMPONENT WHICH WILL WRAP THE OTHER COMPENENTS///////////////////
import classes from "./Card.module.css";

const Card = (props) => {
    return (
        <div className = {classes.card}>{props.children}</div>
    );
}


export default Card;