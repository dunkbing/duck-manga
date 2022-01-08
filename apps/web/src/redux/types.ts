import { AnyAction, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';

export type AppDispatch<A extends Action = AnyAction> = ThunkDispatch<RootState, any, A>
export type Condition<ThunkArg> = (
  arg: ThunkArg,
  api: { getState: () => RootState; extra: any }
) => boolean | undefined;
