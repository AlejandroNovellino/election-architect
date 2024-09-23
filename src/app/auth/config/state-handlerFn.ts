import { StateHandlerService } from '../services/stateHandler.service';

export const stateHandlerFn = (stateHandler: StateHandlerService) => {
  return () => {
    return stateHandler.initStateHandler();
  };
};
