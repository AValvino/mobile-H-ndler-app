import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { ARRIVAL_INDEX, MINUTES_PER_STEP, NOTIFY_INDEX, TICK_INTERVAL_MS } from '../data/route';

const AppContext = createContext(null);

const initialState = {
  positionIndex: 0,
  isTourRunning: false,
  hasArrived: false,
  notifiedProximity: false,
  orders: [],
  notifications: [],
  disruption: null,
  ratings: [],
};

let idCounter = 1;
function nextId() {
  return idCounter++;
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_TOUR':
      return {
        ...state,
        positionIndex: 0,
        isTourRunning: true,
        hasArrived: false,
        notifiedProximity: false,
      };
    case 'RESET_TOUR':
      return {
        ...state,
        positionIndex: 0,
        isTourRunning: false,
        hasArrived: false,
        notifiedProximity: false,
      };
    case 'TICK': {
      if (!state.isTourRunning || state.hasArrived) return state;
      const nextIndex = Math.min(state.positionIndex + 1, ARRIVAL_INDEX);
      let notifications = state.notifications;
      let notifiedProximity = state.notifiedProximity;
      let isTourRunning = state.isTourRunning;
      let hasArrived = state.hasArrived;

      if (nextIndex >= NOTIFY_INDEX && !notifiedProximity && nextIndex < ARRIVAL_INDEX) {
        const minutesLeft = Math.max(1, Math.round((ARRIVAL_INDEX - nextIndex) * MINUTES_PER_STEP));
        notifications = [
          ...notifications,
          { id: nextId(), text: `Der Händler kommt in ca. ${minutesLeft} Minuten in deine Straße 🚐`, kind: 'proximity' },
        ];
        notifiedProximity = true;
      }

      if (nextIndex >= ARRIVAL_INDEX) {
        notifications = [
          ...notifications,
          { id: nextId(), text: 'Der Händler ist jetzt da! 🍞', kind: 'arrival' },
        ];
        isTourRunning = false;
        hasArrived = true;
      }

      return {
        ...state,
        positionIndex: nextIndex,
        notifications,
        notifiedProximity,
        isTourRunning,
        hasArrived,
      };
    }
    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.id),
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [
          {
            id: nextId(),
            productName: action.productName,
            quantity: action.quantity,
            unit: action.unit,
            binding: action.binding,
            createdAt: new Date(),
            pickedUp: false,
          },
          ...state.orders,
        ],
      };
    case 'MARK_PICKED_UP':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, pickedUp: true } : o
        ),
      };
    case 'ADD_RATING':
      return {
        ...state,
        ratings: [
          {
            id: nextId(),
            orderId: action.orderId,
            productName: action.productName,
            stars: action.stars,
            comment: action.comment,
            createdAt: new Date(),
          },
          ...state.ratings,
        ],
      };
    case 'SET_DISRUPTION':
      return {
        ...state,
        disruption: { id: nextId(), text: action.text, createdAt: new Date() },
      };
    case 'CLEAR_DISRUPTION':
      return { ...state, disruption: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (state.isTourRunning && !state.hasArrived) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, TICK_INTERVAL_MS);
      return () => clearInterval(intervalRef.current);
    }
  }, [state.isTourRunning, state.hasArrived]);

  const etaMinutes = Math.max(0, Math.round((ARRIVAL_INDEX - state.positionIndex) * MINUTES_PER_STEP));
  const averageRating = state.ratings.length
    ? state.ratings.reduce((sum, r) => sum + r.stars, 0) / state.ratings.length
    : 0;

  const value = {
    ...state,
    etaMinutes,
    averageRating,
    startTour: () => dispatch({ type: 'START_TOUR' }),
    resetTour: () => dispatch({ type: 'RESET_TOUR' }),
    dismissNotification: (id) => dispatch({ type: 'DISMISS_NOTIFICATION', id }),
    addOrder: (order) => dispatch({ type: 'ADD_ORDER', ...order }),
    setDisruption: (text) => dispatch({ type: 'SET_DISRUPTION', text }),
    clearDisruption: () => dispatch({ type: 'CLEAR_DISRUPTION' }),
    markPickedUp: (orderId) => dispatch({ type: 'MARK_PICKED_UP', orderId }),
    addRating: (rating) => dispatch({ type: 'ADD_RATING', ...rating }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp muss innerhalb von AppProvider verwendet werden');
  return ctx;
}
