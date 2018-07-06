// Copyright 2015-2018 calculette-rh.com

export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
