class usernameBoxController {

  constructor(private AuthService: app.IAuthService) {'ngInject';}

  updateUsername(username) {
    this.AuthService.username = username;
  }
}

export const usernameBoxComponent: ng.IComponentOptions = {
  template:
    `<div class="input-group">
      <label>Post as:</label>
      <input type="text" class="form-control" placeholder="Name"
             ng-model="username" ng-change="$ctrl.updateUsername(username)">
    </div>`,
  controller: usernameBoxController
};

