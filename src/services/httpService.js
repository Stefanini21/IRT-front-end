import {store} from "../store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signOutUser } from "../redux/actions/auth";


const CREDENTIALS = {
    credentials: "same-origin"
};

export class HttpService {
    static async get(url, requestParams) {
        try {
            return await request(url, "GET", requestParams);
        } catch (e) {
            console.log("Error on GET request: ", e);
            throw e;
        }
    }

    static async post(url, requestParams) {
        try {
            return await request(url, "POST", requestParams);
        } catch (e) {
            console.log("Error on POST request: ", e);
            throw e;
        }

    }

    static async put(url, requestParams) {
        try {
            return await request(url, "PUT", requestParams);
        } catch (e) {
            console.log("Error on PUT request: ", e);
            throw e;
        }
    }

    static async delete(url, requestParams) {
        try {
            return await request(url, "DELETE", requestParams, true);
        } catch (e) {
            console.log("Error on DELETE request: ", e);
            throw e;
        }
    }

    static async postSignOut(url) {
        try {
            return await request(url, "POST", {}, true);
        } catch (e) {
            console.log("Error on POST request: ", e);
            throw e;
        }
    }

    static async getSpecialties() {
        try {
            return await request("http://localhost:8080/api/users/specialties", "GET", {})
        } catch (e) {
            throw e;
        }
    }
}

async function request(url, method = "GET", requestParams, withoutResult = false) {
    const config = {
        body: undefined,
        headers: undefined,
        method,
        CREDENTIALS,
    };

    // const dispatch = useDispatch();
    // const history = useHistory();

    let HEADERS = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const state = store.getState();
    const {userData} = state.auth;
    const token = userData?.accessToken;
    // const role = userData?.role; //role from state ???

    if (token) {
        HEADERS["Authorization"] = "Bearer " + token;
    }

    config.headers = HEADERS;

    if (method === "POST" || method === "PUT") {
        config.body = JSON.stringify(requestParams);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        // const dispatch = useDispatch();
        // const history = useHistory();
        // dispatch(signOutUser(history));
        // window.location = '/login#/login';
        return response.status;
    } 

    return !withoutResult ? await response.json() : null;
}