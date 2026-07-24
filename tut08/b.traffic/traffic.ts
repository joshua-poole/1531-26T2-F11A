type States = 'RED' | 'YELLOW' | 'GREEN';
type Actions = 'CAR_WAITING' | 'NO_CAR_WAITING' | 'WAIT_COMPLETE' | 'EMERGENCY';

interface Light {
  state: States
}

let light: Light = {
  state: "RED"
}

export function updateLight(action: Actions) {
  const currentState = getState();
  if (currentState == "RED") {
    if (action == "CAR_WAITING") {
      light.state = "GREEN";
    } else {
      throw new Error(`Action ${action} invalid for state ${currentState}`)
    }
  } else if (currentState == "YELLOW") {
    if (action === "WAIT_COMPLETE") {
      light.state = "RED";
    } else if (action === "EMERGENCY") {
      light.state = "RED";
    } else {
      throw new Error(`Action ${action} invalid for state ${currentState}`);
    }
  } else if (currentState == "GREEN") {
    if (action === "NO_CAR_WAITING") {
      light.state = "YELLOW";
    } else if (action === "EMERGENCY") {
      light.state = "RED";
    } else {
      throw new Error(`Action ${action} invalid for state ${currentState}`);
    }
  }
}


// Functions for test suite

/**
 * Resets the state of the traffic lights back to RED
 */
export function reset() {
  light.state = "RED";
}

/**
 * Returns the current state of the traffic light
 */
export function getState() {
  return light.state;
}