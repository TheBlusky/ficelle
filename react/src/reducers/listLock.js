const listLock = (state = { locked: false }, action) => {
  switch (action.type) {
    case "LISTLOCK_LOCK":
      return { locked: true };
    case "LISTLOCK_UNLOCK":
      return { locked: false };
    default:
      return state;
  }
};

export default listLock
