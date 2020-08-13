let getChargeState = (state: ChargeReducer.State.t, id) =>
  state->Belt.Map.String.getWithDefault(id, {data: None, error: None});

let updateCharge = (state: ChargeReducer.State.t, id, data) => {
  state->Belt.Map.String.set(id, {...state->getChargeState(id), data});
};

let updateChargeError = (state: ChargeReducer.State.t, id, error) => {
  state->Belt.Map.String.set(id, {...state->getChargeState(id), error});
};

// We use this to initialize the state.
let getState = state => {
  switch (state) {
  | None => [||]->Belt.Map.String.fromArray
  | Some(s) => s
  };
};

let receiveCharges = (state, event: Reducer.event) => {
  switch (ChargeReducer.Event.reducerTypeFromJs(event.type_)) {
  | Some(`SetCharge) => state->getState->updateCharge(event.id, event.data)
  | Some(`SetErrorForCharge) =>
    state->getState->updateChargeError(event.id, event.error)
  | _ => state->getState
  };
};

[@genType]
let default = receiveCharges;
