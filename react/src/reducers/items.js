const items = (state = {items: [], lastUpdate:0, newItems: []}, action) => {
  switch (action.type) {
    case "ITEM_LIST_SUCCEEDED":
      const old_items_ids = state.items.map(item => (item.id));
      const new_items = action.items.results.filter(item => (!(old_items_ids.includes(item.id))));
      return {
        items: [...state.items, ...new_items].sort((a, b) => a.created < b.created),
        lastUpdate: state.lastUpdate + 1,
        newItems: new_items
      };
    case "USER_LOGOUT_SUCCEEDED":
      return {items: [], lastUpdate:0, newItems: []};
    default:
      return state;
  }
};

export default items

