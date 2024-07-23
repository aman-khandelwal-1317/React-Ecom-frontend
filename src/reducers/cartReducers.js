import { CART_ADD_ITEM, CART_REMOVE_ITEM , 
  CART_SAVE_LOCAL_STORAGE, INCREASE_QUANTITY, DECREASE_QUANTITY,ORDER_SUCCESSFUL} from '../constants/cartConstants';

const initialCartState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? { ...x, quantity: x.quantity + item.quantity } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

      case CART_SAVE_LOCAL_STORAGE:
        return {
          ...state,
          cartItems: action.payload
        };

        case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case ORDER_SUCCESSFUL: 
    return {...state,cartItems : []};
    
    default:
      return state;
  }
};
