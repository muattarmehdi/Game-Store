import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "3a79bc0cbfcd47f69a2cbdab333a8ab8",
  },
});
