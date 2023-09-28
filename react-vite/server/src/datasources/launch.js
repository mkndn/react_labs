import { RESTDataSource } from "@apollo/datasource-rest";

class LaunchAPI extends RESTDataSource {
  baseURL = "https://api.spacexdata.com/v5/";

  async getLaunches() {
    return this.get("launches");
  }

  async getLaunchById(id) {
    return this.get(`launches/${id}`);
  }
}

export default LaunchAPI;
