import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  boards: [],
  currentBoard: null,
};

// Action types
const ACTIONS = {
  SET_BOARDS: 'SET_BOARDS',
  ADD_BOARD: 'ADD_BOARD',
  UPDATE_BOARD: 'UPDATE_BOARD',
  DELETE_BOARD: 'DELETE_BOARD',
  SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
  ADD_LIST: 'ADD_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_LIST: 'DELETE_LIST',
  ADD_CARD: 'ADD_CARD',
  UPDATE_CARD: 'UPDATE_CARD',
  DELETE_CARD: 'DELETE_CARD',
  MOVE_CARD: 'MOVE_CARD',
  MOVE_LIST: 'MOVE_LIST',
};

// Reducer function
function boardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_BOARDS:
      return { ...state, boards: action.payload };
    
    case ACTIONS.ADD_BOARD:
      return { ...state, boards: [...state.boards, action.payload] };
    
    case ACTIONS.UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.id ? action.payload : board
        ),
      };
    
    case ACTIONS.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload),
      };
    
    case ACTIONS.SET_CURRENT_BOARD:
      return { ...state, currentBoard: action.payload };
    
    case ACTIONS.ADD_LIST:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? { ...board, lists: [...board.lists, action.payload.list] }
            : board
        ),
      };
    
    case ACTIONS.UPDATE_LIST:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? { ...list, ...action.payload.updates }
                    : list
                ),
              }
            : board
        ),
      };
    
    case ACTIONS.DELETE_LIST:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.filter(list => list.id !== action.payload.listId),
              }
            : board
        ),
      };
    
    case ACTIONS.ADD_CARD:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? { ...list, cards: [...list.cards, action.payload.card] }
                    : list
                ),
              }
            : board
        ),
      };
    
    case ACTIONS.UPDATE_CARD:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card =>
                          card.id === action.payload.cardId
                            ? { ...card, ...action.payload.updates }
                            : card
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    
    case ACTIONS.DELETE_CARD:
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.filter(card => card.id !== action.payload.cardId),
                      }
                    : list
                ),
              }
            : board
        ),
      };
      
    
    case ACTIONS.MOVE_CARD:
      const { sourceListId, destListId, cardId, newIndex } = action.payload;
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list => {
                  if (list.id === sourceListId) {
                    const card = list.cards.find(c => c.id === cardId);
                    return {
                      ...list,
                      cards: list.cards.filter(c => c.id !== cardId),
                    };
                  }
                  if (list.id === destListId) {
                    const sourceList = board.lists.find(l => l.id === sourceListId);
                    const card = sourceList.cards.find(c => c.id === cardId);
                    const newCards = [...list.cards];
                    newCards.splice(newIndex, 0, card);
                    return {
                      ...list,
                      cards: newCards,
                    };
                  }
                  return list;
                }),
              }
            : board
        ),
      };
    
    case ACTIONS.MOVE_LIST:
      const { boardId, sourceIndex, destIndex } = action.payload;
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === boardId
            ? {
                ...board,
                lists: arrayMove(board.lists, sourceIndex, destIndex),
              }
            : board
        ),
      };
    
    default:
      return state;
  }
}

// Helper function to move items in an array
function arrayMove(array, from, to) {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
}

// Create context
const BoardContext = createContext();

// Provider component
export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedBoards = localStorage.getItem('trello_boards');
    if (savedBoards) {
      dispatch({ type: ACTIONS.SET_BOARDS, payload: JSON.parse(savedBoards) });
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trello_boards', JSON.stringify(state.boards));
  }, [state.boards]);

  const value = {
    state,
    dispatch,
    actions: ACTIONS,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

// Custom hook to use the board context
export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
} 