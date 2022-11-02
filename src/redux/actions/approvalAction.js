import { ActionTypes } from '../constants';
import axios from 'axios';
import { toast } from "react-toastify";
import {ToastObjects} from "../../util/toastObject";

export const approval = () => () => {

	toast.success("Approval Requested", ToastObjects);	
}
