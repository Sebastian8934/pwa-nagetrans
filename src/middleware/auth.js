 import config from "config/config.json";
 import axios from "axios";

 const login = async (username,password) => {
    const body = { user:username,password:password }
    return await new Promise((resolve, reject) => {
      axios
        .post(config.devUrl+'auth/login', body)
        .then((res) => {
          if(res.data.status === "OK"){
            resolve({ code: 200, data: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
          resolve({ code: 400, message: err });
        });
    });
};

export default { login }


