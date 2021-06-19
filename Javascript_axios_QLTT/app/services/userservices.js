function UserServices() {
  this.list = [];

  this.themND = function (nd) {
    this.list.push(nd);
  };

  this.getListUserApi = function () {
    return axios({
      url: "https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/teachers",
      method: "GET",
    });
  };
  this.addUserApi = function (user) {
    return axios({
      url: "https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/teachers",
      method: "POST",
      data: user,
    });
  };
  this.deleteUserApi = function (id) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/teachers/${id}`,
      method: "DELETE",
    });
  };
  this.getUserByIdApi = function (id) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/teachers/${id}`,
      method: "GET",
    });
  };
  this.updateUserApi = function (user) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/teachers/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
