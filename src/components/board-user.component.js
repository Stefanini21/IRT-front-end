// import React, {Component} from "react";
//
// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
//
// export default class BoardUser extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             content: "",
//             firstName: "",
//             lastName: "",
//             username: "",
//             email: "",
//             token: "",
//             gender: "",
//             authorities: "",
//             id: "",
//         };
//     }
//
//     componentDidMount() {
//         UserService.getUserBoard().then(
//             response => {
//                 this.setState({
//                     content: JSON.stringify(response.data),
//                     firstName: response.data.firstName,
//                     lastName: response.data.lastName,
//                     username: response.data.username,
//                     email: response.data.email,
//                     gender: response.data.gender,
//                     token: response.data.accessToken,
//                     authorities: response.data.authorities,
//                     id: response.data.id
//                 });
//             },
//             error => {
//                 this.setState({
//                     content: error.toString()
//                 });
//
//                 if (error.response && error.response.status === 401) {
//                     EventBus.dispatch("logout");
//                 }
//             }
//         );
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <div className="main-body">
//
//                     <div className="row gutters-sm">
//                         <div className="col-md-4 mb-3">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="d-flex flex-column align-items-center text-center">
//                                         <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
//                                              className="rounded-circle" width="150"/>
//                                         <div className="mt-3">
//                                             <h4>{this.state.firstName} {this.state.lastName}</h4>
//                                             <p className="text-secondary mb-1">{this.state.username}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-8">
//                             <div className="card mb-3">
//                                 <div className="card-body">
//
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <h6 className="mb-0">Id</h6>
//                                         </div>
//                                         <div className="col-sm-9 text-secondary">
//                                             {this.state.id}
//                                         </div>
//                                     </div>
//
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <h6 className="mb-0">Full Name</h6>
//                                         </div>
//                                         <div className="col-sm-9 text-secondary">
//                                             {this.state.firstName} {this.state.lastName}
//                                         </div>
//                                     </div>
//
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <h6 className="mb-0">Email</h6>
//                                         </div>
//                                         <div className="col-sm-9 text-secondary">
//                                             {this.state.email}
//                                         </div>
//                                     </div>
//
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <h6 className="mb-0">Gender</h6>
//                                         </div>
//                                         <div className="col-sm-9 text-secondary">
//                                             {this.state.gender}
//                                         </div>
//                                     </div>
//
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <h6 className="mb-0">Authorities</h6>
//                                         </div>
//                                         <div className="col-sm-9 text-secondary">
//                                             {this.state.authorities}
//                                         </div>
//                                     </div>
//
//                                 </div>
//                             </div>
//
//                         </div>
//                     </div>
//
//                 </div>
//             </div>
//         );
//     }
// }
