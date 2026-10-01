import { RoleHasPermission } from './role-has-permission';

describe('RoleHasPermission', () => {
  it('should create an instance', () => {
    const directive = new RoleHasPermission();
    expect(directive).toBeTruthy();
  });
});
