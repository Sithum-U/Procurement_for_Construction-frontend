import {OrderConstants} from "../constants";
const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL} = OrderConstants;
const { APPROVAL_CREATE_REQUEST, APPROVAL_CREATE_SUCCESS, APPROVAL_CREATE_FAIL} = ApprovalConstants;

// Order Create
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Approval Create
export const approvalCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVAL_CREATE_REQUEST:
      return { loading: true };
    case APPROVAL_CREATE_SUCCESS:
      return { loading: false, success: true, approval: action.payload };
    case APPROVAL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};