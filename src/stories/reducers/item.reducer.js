const actionTypes = Object.freeze({
  SET_ITEM: 'SET_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  CLEAR_ITEM: 'CLEAR_ITEM',
  HYDRATE_ITEM: 'HYDRATE_ITEM'
})

export default function itemReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_ITEM:
      return { ...action.payload };

    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        ...action.payload,
        item_json: { ...state.item_json, ...action.payload.item_json }
      };

    case actionTypes.CLEAR_ITEM:
      return {};

    case actionTypes.HYDRATE_ITEM:
      return hydrateItem(action.payload);

    default:
      return state;
  }
};

function setItem(payload) {
  // sets item, replacing existing
  return { type: actionTypes.SET_ITEM, payload }
}

function updateItem(payload) {
  // adds {key: value} pair(s) to existing item object
  return { type: actionTypes.UPDATE_ITEM, payload }
}

function clearitem(payload) {
  // removes all properties in item, returns empty object
  return { type: actionTypes.CLEAR_ITEM, payload }
}

function hydrateItem(payload) {
  return (payload);
}

export const itemActions = {
  setItem,
  updateItem,
  clearitem,
  hydrateItem
}