import { initialState, reducer } from "../reducer";

describe("", () => {
  it("should start loading", () => {
    const action = { type: "REQUEST" };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it("should get all items", () => {
    const action = {
      type: "GETITEMS",
      payload: { total: 2000 }
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      getItems: action.payload,
      error: null,
      isLoading: false
    });
  });
  it("should get a array success", () => {
    const action = {
      type: "SUCCESS",
      payload: { content: "XJKFKDJKFJKFD", name: "test.pdf" }
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      successPost: [action.payload],
      error: null,
      isLoading: false
    });
  });
});
