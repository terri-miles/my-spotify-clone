import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

function StateProvider( {children, initialState, reducer} ) {
    return <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
}

export const useStateProvider = () => useContext(StateContext);

export default StateProvider

