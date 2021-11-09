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

  getDeveloperId(developers_username) {
      let url = "http://localhost:8080/api/users/"
      return UserService.getUserByUsername(url, developers_username);
  }

  deleteTicket(ticketId) {
    return axios.delete(API_URL + "/" + ticketId, { headers: authHeader() });
  }

  createTicket(title, description, priority, specialty, status, developer) {
    return axios.post(
      API_URL,
      {
        title,
        description,
        ticket_priority: priority,
        ticket_specialty: specialty,
        ticket_status: status,
        //creator_id: currentUserData.id,
        developer_id: this.getDeveloperId(developer, ),
        created_date: Date().toLocaleString() 
      },
      { headers: authHeader() }
    );
  }

  getUTicketById(url, ticketId) {
    return axios
      .get(url + JSON.stringify(ticketId), { headers: authHeader() })
      .then((response) => {
        // console.log(response.data)
        return response.data;
      });
  }
}

export default new TicketService();
