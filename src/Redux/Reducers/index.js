import {
  LOGIN_USER,
  USER_LOGOUT,
  GET_ADDRESSES,
  ADD_ADDRESS
} from "../Constants/action-types";

const initialState = {
  user: null,
  showLoginModal: false,
  addresses: []
};
function rootReducer(state = initialState, action) {
  if (action.type === LOGIN_USER) {
    let user = action.payload;
    let addresses = [];
    if (user !== null) {
      let addr = {
        label: "Home: ",
        addr1: user.addr1 !== null ? user.addr1 + "," : "",
        addr2: user.addr2 !== null ? user.addr2 + "," : "",
        city: user.city !== null ? user.city + "," : "",
        pincode: user.pincode !== null ? user.pincode + "," : "",
        state: user.state !== null ? user.state + "," : "",
        country: user.country !== null ? user.country + "," : "",
        landmark: typeof user.landmark !== undefined ? user.landmark : ""
      };
      addresses = [...state.addresses, addr];
    }
    return Object.assign({}, state, {
      user,
      addresses
    });
  }
  if (action.type === GET_ADDRESSES) {
    let addrs = action.payload;
    let addresses = [...state.addresses];
    if (addrs !== null) {
      addrs.map(i => {
        let addr = {
          label: i.label !== null ? i.label : "Alt. Address ",
          addr1: i.addr1 !== null ? i.addr1 : "",
          addr2: i.addr2 !== null ? i.addr2 : "",
          city: i.city !== null ? i.city : "",
          pincode: i.pincode !== null ? i.pincode : "",
          state: i.state !== null ? i.state : "",
          country: i.country !== null ? i.country : "",
          landmark: typeof i.landmark !== undefined ? i.landmark : ""
        };
        addresses.push(addr);
      });
    }
    return Object.assign({}, state, {
      addresses
    });
  }
  if (action.type === ADD_ADDRESS) {
    let addr = action.payload;
    let addresses = [...state.addresses];
    if (addr !== null) {
      addresses.push(addr);
    }
    return Object.assign({}, state, {
      addresses
    });
  }
  if (action.type === USER_LOGOUT) {
    return Object.assign({}, state, {
      user: null,
      addresses: []
    });
  }
  return state;
}

export default rootReducer;
