import { ActionTypes } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastObjects } from "../../util/toastObject";

export const approval = () => () => {
  toast.success("Approval Requested", ToastObjects);
};

// export const createApproval = (reqData) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_CREATE_REQUEST });

//     const response = await axios.post(`orders/`, reqData);

//     const responseData = response.data;

//     if (!responseData.status) {
//       toast.error(responseData.message, ToastObjects);
//     } else {
//       toast.success(responseData.message, ToastObjects);
//       dispatch({ type: ORDER_CREATE_SUCCESS, payload: responseData });
//       dispatch({ type: CLEAR_CART_ITEM });
//       localStorage.removeItem("cartItems");
//     }
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }

//     toast.error(message, ToastObjects);

//     dispatch({
//       type: ORDER_CREATE_FAIL,
//       payload: message,
//     });
//   }
// };
