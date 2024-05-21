import { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";

import Header from "../Header";
import DishItem from "../DishItem";

import "./index.css";

const Home = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (dish) => {
    const isAlreadyExists = cartItems.find(
      (item) => item.dishId === dish.dishId
    );
    if (!isAlreadyExists) {
      const newDish = { ...dish, quantity: 1 };
      setCartItems((prev) => [...prev, newDish]);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.dishId === dish.dishId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const removeItemFromCart = (dish) => {
    const isAlreadyExists = cartItems.find(
      (item) => item.dishId === dish.dishId
    );
    if (isAlreadyExists) {
      const updatedCartItems = cartItems.map((item) =>
        item.dishId === dish.dishId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const filteredCartItems = updatedCartItems.filter(
        (item) => item.quantity > 0
      );

      setCartItems(filteredCartItems);
    }
  };

  // const removeItemFromCart = dish => {
  //   const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
  //   if (isAlreadyExists) {
  //     setCartItems(prev =>
  //       prev
  //         .map(item =>
  //           item.dishId === dish.dishId
  //             ? {...item, quantity: item.quantity - 1}
  //             : item,
  //         )
  //         .filter(item => item.quantity > 0),
  //     )
  //     setCartItems(prev.filter(item => item.quantity > 0))
  //   }
  // }

  const getUpdatesData = (tableMenuList) =>
    tableMenuList.map((eachMenu) => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map((eachDish) => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }));

  useEffect(() => {
    const fetchRestaurantApi = async () => {
      const api =
        "https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e";
      const apiResponse = await fetch(api);
      const data = await apiResponse.json();
      const updatedData = getUpdatesData(data[0].table_menu_list);
      setResponse(updatedData);
      setActiveCategoryId(updatedData[0].menuCategoryId);
      setIsLoading(false);
      setRestaurantName(data[0].restaurant_name);
    };
    fetchRestaurantApi();
  }, []);

  const onUpdateActiveCategoryId = (menuCategoryId) =>
    setActiveCategoryId(menuCategoryId);

  const renderTabMenuList = () =>
    response.map((eachCategory) => {
      const onClickHandler = () =>
        onUpdateActiveCategoryId(eachCategory.menuCategoryId);
      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? "active-tab-item"
              : ""
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-category-button">
            {eachCategory.menuCategory}
          </button>
        </li>
      );
    });
  const renderDishes = () => {
    const { categoryDishes } = response.find(
      (eachCategory) => eachCategory.menuCategoryId === activeCategoryId
    );
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map((eachDish) => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    );
  };

  const renderSpinner = () => (
    <div className="spinner-container">
      <Rings width="50" height="50" color="#000000" />
    </div>
  );

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartItems} restaurantName={restaurantName} />
      <ul className="tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  );
};

export default Home;
