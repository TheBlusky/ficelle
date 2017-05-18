const items = (state = {items: [], lastUpdate:0}, action) => {
  switch (action.type) {
    case "ITEM_LIST_SUCCEEDED":
      const old_items_ids = state.items.map(item => (item.id));
      const new_items = action.items.results.filter(item => (!(item.id in old_items_ids)));
      return {items: [...state.items, ...new_items].sort((a, b) => a.created < b.created), lastUpdate: state.lastUpdate + 1};
    default:
      return state;
  }
};

export default items

