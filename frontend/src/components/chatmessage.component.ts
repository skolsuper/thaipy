export const chatMessageComponent: ng.IComponentOptions = {
  template:
    `<div class="user-info text-muted">
      {{ $ctrl.message.username }}
      <span class="timestamp">
        {{ $ctrl.message.timestamp | humanizeAgo }}
      </span>
    </div>
    <div class="message">
      {{ $ctrl.message.message }}
    </div>`,
  bindings: {
    message: '<',
  },
};
