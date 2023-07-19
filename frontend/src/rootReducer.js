const initialState = {
  mainAmount: "1",
  mainCountry: "USD",
  users: {},
  rateList: {},
};

const applyStateChanger = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AMOUNT": {
      return { ...state, mainAmount: action.payload };
    }

    case "UPDATE_MAIN_COUNTRY": {
      return { ...state, mainCountry: action.payload };
    }

    case "ADD_USER": {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.username]: { ...action.payload },
        },
      };
    }

    case "DELETE_USER": {
      const updatedUsers = { ...state.users };
      delete updatedUsers[action.payload];
      return { ...state, users: { ...updatedUsers } };
    }

    case "UPDATE_RATE_LIST": {
      return { ...state, rateList: action.payload };
    }

    case "UPDATE_MAIN_FAV": {
      const username = action.payload.username;
      const code = action.payload.code;

      return {
        ...state,
        users: {
          ...state.users,
          [username]: {
            ...state.users[username],
            fav_countries: {
              ...state.users[username].fav_countries,
              main: code,
            },
          },
        },
      };
    }

    case "UPDATE_RELATIVE_FAV": {
      const username = action.payload.username;
      const code = action.payload.code;
      let relDup = [...state.users[username].fav_countries.relatives];

      if (relDup.includes(code)) {
        const index = relDup.indexOf(code);
        relDup.splice(index, 1);
      } else {
        relDup.push(code);
      }

      return {
        ...state,
        users: {
          ...state.users,
          [username]: {
            ...state.users[username],
            fav_countries: {
              ...state.users[username].fav_countries,
              relatives: [...relDup],
            },
          },
        },
      };
    }

    default:
      return state;
  }
};

export default applyStateChanger;
