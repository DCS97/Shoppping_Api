import { User, UserStore } from '../users';

const user = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have an index by id method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have method to create user', () => {
    expect(user.createUser).toBeDefined();
  });

  it('should create a user createUser method', async () => {
    const result: User = await user.createUser({
      firstName: 'user',
      lastName: 'shopping',
      password: 'user123#',
    });
    // expect(result.auth).toEqual(true);
    expect(result.id).toBeDefined();
  });
  it('should return all users using index method', async () => {
    const result: User[] = await user.index();
    expect(result).toHaveSize(1);
    expect(result[0].id).toEqual('1');
    expect(result[0].firstName).toEqual('user');
    expect(result[0].lastName).toEqual('shopping');
    expect(result[0].password).not.toEqual('user123#');
  });

  it('should return the correct user using show method', async () => {
    const id = '1';
    const result: User = await user.show(id);
    expect(result.id).toEqual(id);
    expect(result[0].firstName).toEqual('user');
    expect(result[0].lastName).toEqual('shopping');
  });
});
