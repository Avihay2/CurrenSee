const updateMainAmount = (amount) => {
  return {
    type: "UPDATE_AMOUNT",
    payload: amount,
  };
};

const updateMainCountry = (name) => {
  return {
    type: "UPDATE_MAIN_COUNTRY",
    payload: name,
  };
};

const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

const deleteUser = (username) => {
  return {
    type: "DELETE_USER",
    payload: username,
  };
};

const updateRateList = (data) => {
  return {
    type: "UPDATE_RATE_LIST",
    payload: data,
  };
};

const updateMainFav = (code, username) => {
  return {
    type: "UPDATE_MAIN_FAV",
    payload: {
      code: code,
      username: username,
    },
  };
};

const updateRelativeFav = (code, username) => {
  return {
    type: "UPDATE_RELATIVE_FAV",
    payload: {
      code: code,
      username: username,
    },
  };
};

export {
  updateMainAmount,
  updateMainCountry,
  addUser,
  deleteUser,
  updateRateList,
  updateMainFav,
  updateRelativeFav,
};
