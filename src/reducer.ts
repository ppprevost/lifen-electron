export const initialState = {
  isLoading: false,
  getItems: {},
  error: null,
  successPost: []
};

export const reducer = (
  state: typeof initialState,
  action: { type: string; [k: string]: any }
) => {
  switch (action.type) {
    case "GETITEMS":
      return { ...state, getItems: action.payload };
    case "REQUEST":
      return { ...state, isLoading: true, error: null };
    case "SUCCESS":
      console.log(action);
      return {
        ...state,
        successPost: [...state.successPost, action.payload],
        error: null,
        isLoading: false
      };
    case "ERROR":
      return { ...state, error: action.error, isLoading: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
