import axios from "axios";
import authHeader from "./auth-header";
import { getUserData } from "../redux/selectors/auth";
import UserService from "./user.service";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:8080/api/tickets";


// var today = new Date(),
//   date =
//     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

class TicketService {
  
  getTickets() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  deleteTicket(ticketId) {
    return axios.delete(API_URL + "/" + ticketId, { headers: authHeader() });
  }

  createTicket(title, description, priority, specialty, status, admin_id, developer) {
    return axios.post(
      API_URL + "/" + admin_id + "/" + developer,
      {
        title,
        description,
        specialty: specialty,
        priority: priority,
        status: status,
        created_date: Date().toLocaleString()
      },
      { headers: authHeader() }
    );
  }

  getTicketById(url, ticketId) {
    return axios
      .get(url + JSON.stringify(ticketId), { headers: authHeader() })
      .then((response) => {
        // console.log(response.data)
        return response.data;
      });
  }
}

export default new TicketService();
