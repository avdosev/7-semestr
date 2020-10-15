import {applyMiddleware, compose, createStore} from "redux";
import createRootReducer from "./reducers";
import logger from "redux-logger";


const middlewares = [logger ];

const rootReducerWithRouter = createRootReducer()
export type RootStore = ReturnType<typeof rootReducerWithRouter>

export const store = compose()(createStore)(rootReducerWithRouter);


