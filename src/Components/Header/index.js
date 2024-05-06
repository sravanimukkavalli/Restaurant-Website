import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cartItems, restaurantName} = props
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const renderCartIcon = () => (
    <div className="cart-item-container">
      <AiOutlineShoppingCart size={30} />
      <div className="cart-count-badge">
        <p className="cart-count">{getCartItemsCount()}</p>
      </div>
    </div>
  )
  return (
    <div className="header-container nav-header">
      <h1 className="logo-heading">{restaurantName}</h1>
      <div className="my-orders-cart-container">
        <p className="my-orders-text">My Orders</p>
        {renderCartIcon()}
      </div>
    </div>
  )
}
export default Header
