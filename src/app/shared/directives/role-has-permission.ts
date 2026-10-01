import { Directive } from '@angular/core';

@Directive({
  selector: '[appRoleHasPermission]',
})
export class RoleHasPermission {
  constructor() {}
}
