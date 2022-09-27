import axios from "axios";


const API_URL = "https://localhost:44337/api/auth/";


class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
       
        email : email,
        password : password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          
         
        }
        return response.data;
      })
      
      ;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, email, mobile, dob, gender, password) {
    return axios.post(API_URL + "signup", {
      firstname,
      lastname,
      email,
      mobile,
      dob,
      gender,
      password
  
    }).then(response => {
      window.location.replace(`http://localhost:3000/login`);
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
