import {useState} from 'react'
import './index.css'

const DishItem = props => {
  const [count, updateCount] = useState(0)
  const {dishDetails, addItemToCart, removeItemFromCart} = props
  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const onIncrementQuantity = () => {
    updateCount(prev => prev + 1)
    addItemToCart(dishDetails)
  }
  const onDecrementQuantity = () => {
    if (count > 0) {
      updateCount(prev => prev - 1)
      removeItemFromCart(dishDetails)
    }
  }
  // const getQuantity = () => {
  //   const cartItem = cartItems.find(item => item.dishId === dishId)
  //   return cartItem ? cartItem.quantity : 0
  // }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button type="button" className="button" onClick={onDecrementQuantity}>
        -
      </button>
      <p className="quantity">{count}</p>
      <button type="button" className="button" onClick={onIncrementQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <>
        <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
          <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
        </div>
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-currency-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability && renderControllerButton()}
          {!dishAvailability && (
            <p className="not-availability-text">Not available</p>
          )}
          {addonCat.length !== 0 && (
            <p className="add-on-availability-text">Customizations available</p>
          )}
        </div>
      </>
      <>
        <p className="dish-calories">{dishCalories} calories</p>
        <img className="dish-image" alt={dishName} src={dishImage} />
      </>
    </li>
  )
}
export default DishItem
