import { create } from 'zustand';

interface FlowState {
  currentFlowId: string | null;
  currentStepIndex: number;
  setFlow: (flowId: string) => void;
  nextStep: (choiceIndex?: number) => void;
  prevStep: () => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  currentFlowId: null,
  currentStepIndex: 0,

  setFlow: (flowId: string) => {
    set({ currentFlowId: flowId, currentStepIndex: 0 });
  },

  nextStep: (choiceIndex?: number) => {
    const { currentStepIndex } = get();
    set({ currentStepIndex: currentStepIndex + 1 });
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  reset: () => {
    set({ currentFlowId: null, currentStepIndex: 0 });
  },
}));
