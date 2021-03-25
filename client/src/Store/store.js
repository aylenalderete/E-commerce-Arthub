// Importante: En este archivo se encuentran unificados el store y su respectivo reducer!

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//redux dev tool para browser
import { composeWithDevTools } from "redux-devtools-extension";

// estado inicial
const initialState = {

    //global states
    guestCart: JSON.parse(localStorage.getItem("cart")) || [],
    products: [],
    search: [],
    categories: [],
    //firebase
    urlImages: [],
    //filter states
    isOpenFilters: false,
    filteredProducts: [],
    //artist states
    usersArtists: [],
    artistsProducts: [],
    //filters states
    isActiveFilters: false,

    // Carrito

    cart: JSON.parse(localStorage.getItem('cart')) || [],

    userData: {
        id: 0,
        username: "",
        name: "",
        lastname: "",
        email: "",
        birth: "",
        type: "",
        state: "",
    },
    //carousel states
    carouselActive: 1,
    autoplay: true,
    //PopUp categories states
    isOpenCategory: false,
    isOpenDeleteCat: false,

    //log states
    isUserLogged: false,

    //Delete product state
    isOpenDeleteProd: false,

    productId: 0,

    //user orders state
    userOrders: [],

    //reviews states 
    reviewsProduct: [],
    messages: '',



    //promote/delete users
    users:[],
    promoteUser:false,
    deleteUser:false,

    //reviews states 
    reviewsProduct: [],
    messages: '',
    selectedCategories : [],


};

//reducer
const reducer = function (state = initialState, action) {

    switch (action.type) {
      //aca crear los switch cases de cada action
      case "GET_PRODUCT_REVIEWS":
        return {
          ...state,
          reviewsProduct: action.payload,
        };
      case "ADD_PRODUCT_REVIEW":
        return {
          ...state,
          messages: action.payload,
        };

      // case 'DELETE_PRODUCT_REVIEW':
      //     return {
      //         ...state,
      //         messages action.payload
      //     }

      // case 'UPDATE_PRODUCT_REVIEW':
      //     return {
      //         ...state,

      //     }

      case "GET_PRODUCTS":
        if (state.filteredProducts.length > 0 && !state.search[0]) {
          return {
            ...state,
            filteredProducts: action.payload,
          };
        }
        return {
          ...state,
          search: action.payload,
        };

      case "GET_INITIAL_PRODUCTS":
        return {
          ...state,
          products: action.payload,
        };

      case "SET_URL_IMAGES":
        return {
          ...state,
          urlImages: action.payload,
        };

      case "GET_CATEGORIES":
        return {
          ...state,
          categories: action.payload,
        };

      case "SET_FILTERS":
        return {
          ...state,
          filteredProducts: action.payload,
        };

      case "SHOW_FILTERS":
        return {
          ...state,
          isOpenFilters: action.payload,
        };

      case "SIGN_OUT":
        return {
          ...state,
          userData: {
            id: 0,
            username: "",
            name: "",
            lastname: "",
            email: "",
            birth: "",
            type: "",
            state: "",
          },
          shoppingCart: [],
        };

      case "GET_USER_PRODUCTS":
        return {
          ...state,
          products: action.payload,
        };

      case "GET_USERS_ARTISTS":
        return {
          ...state,
          usersArtists: action.payload,
        };

      case "GET_ARTISTS_PRODUCTS":
        return {
          ...state,
          artistsProducts: action.payload,
        };

      case "CLEAR_URL_IMAGES":
        return {
          ...state,
          urlImages: [],
        };

      case "SEARCH_FILTERS":
        if (state.search[0]) {
          let searchF = state.search.filter((f) =>
            f.categories.find((x) => x.name === action.payload)
          );
          if (!searchF[0]) {
            searchF = "void";
          }
          return {
            ...state,
            search: searchF,
          };
        }

        return {
          ...state,
        };

      case "SIGN_IN":
        if (action.payload.auth === true)
          return {
            ...state,
            userData: action.payload.user,
          };
        else
          return {
            ...state,
          };

      case "SIGN_IN_REFRESH":
        return {
          ...state,
          userData: action.payload,
        };

      case "MOVE_CAROUSEL":
        if (action.payload === "next" && state.carouselActive < 3) {
          return {
            ...state,
            carouselActive: state.carouselActive + 1,
          };
        }

        if (action.payload === "prev" && state.carouselActive > 1) {
          return {
            ...state,
            carouselActive: state.carouselActive - 1,
          };
        }

        if (action.payload === "next" && state.carouselActive === 3) {
          return {
            ...state,
            carouselActive: 1,
          };
        }

        if (action.payload === "prev" && state.carouselActive === 1) {
          return {
            ...state,
            carouselActive: 3,
          };
        }

      case "AUTOPLAY":
        return {
          ...state,
          autoplay: action.payload,
        };

      case "IS_USER_LOGGED":
        return {
          ...state,
          isUserLogged: action.payload,
        };

      case "POP_UP_CATEGORY":
        return {
          ...state,
          isOpenCategory: action.payload,
        };

      case "POP_UP_DELETE_CATEGORY":
        return {
          ...state,
          isOpenDeleteCat: action.payload,
        };
      case "POP_UP_DELETE_PRODUCT":
        return {
          ...state,
          isOpenDeleteProd: action.payload,
        };

      case "GET_USER_ORDER":
        return {
          ...state,
          shoppingCart: action.payload,
        };

      case "PRODUCT_ID":
        return {
          ...state,
          productId: action.payload,
        };

      case "GET_USER_ORDERS":
        return {
          ...state,
          userOrders: action.payload,
        };

      case "DELETE_USER_ORDER":
        return {
          ...state,
        };

      case "ADD_TO_CART":
        return {
          ...state,
        };
      case "CHANGE_QUANTITY":
        return {
          ...state,
        };
      case "DELETE_USER_ORDER_All":
        return {
          ...state,
          shoppingCart: action.payload,
        };

      case "RESET_CAROUSEL":
        return {
          ...state,
          carouselActive: 1,
        };
      case "ACTIVE_FILTERS":
        return {
          ...state,
          isActiveFilters: action.payload,
        };

      case "GET_ALL_USERS":
        return {
          ...state,
          users: action.payload,
        };

      case "POP_UP_PROMOTE_USER":
        return {
          ...state,
          promoteUser: action.payload,
        };

      case "POP_UP_DELETE_USER":
        return {
          ...state,
          deleteUser: action.payload,
        };

      case "ADD_ITEM_POPUP":
        if (action.payload) {
          var array = [...state.selectedCategories];
          array.push(action.payload);
        } else {
          console.log("no deberia entrar aca");
          var array = [];
        }
        return {
          ...state,
          selectedCategories: array,
        };

      case "DELETE_ITEM_POPUP":
        return {
          ...state,
          selectedCategories: [
            ...state.selectedCategories.filter((n) => n != action.payload),
          ],
        };

         // Cart
         case "ADD_ITEM":
          // let index = state.cart.indexOf(action.payload)
          const found = state.cart.find((f) => f.product.id_product === action.payload.product.id_product)
          if (!found) {
              return {
                  ...state,
                  cart: [...state.cart, action.payload]
              }
          } else {
              return {
                  ...state,
                  cart: state.cart.map(p => {
                      if (p.product.id_product === action.payload.product.id_product) {
                          p = action.payload
                      }
                      return p
                  })
              }
          }

      case 'REDUCE_QUANTITY':

          let change = state.cart.map(c => {
              if (action.payload === c.product.id_product && c.quantity > 1) {
                  c.quantity -= 1
                  c.subTotal = c.quantity * c.product.price
              }
              return c
          })
          localStorage.setItem('cart', JSON.stringify(change))

          return {
              ...state,
              cart: change
          }

      case 'DELETE_ITEM':
          let filter = state.cart.filter(f => action.payload !== f.product.id_product)
          localStorage.setItem('cart', JSON.stringify(filter));
          return {
              ...state,
              cart: filter
          }

      case 'EMPTY_CART':
          localStorage.setItem('cart', JSON.stringify([]));
          return {
              ...state,
              cart: []
          }

      default:
        return state;
    }

};

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
