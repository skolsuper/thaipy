export const chatMessageComponent: ng.IComponentOptions = {
  template:
    `<div class="user-info text-muted">
      {{ $ctrl.message.username }}
      <div class="timestamp">
        {{ $ctrl.message.timestamp | humanizeAgo }}
      </div>
    </div>
    <div class="message">
      {{ $ctrl.message.message }}
    </div>`,
  bindings: {
    message: '<',
  },
};
