import supertest from 'supertest';

import app from '../../server';
import { UserData } from '../../models/users';

const request = supertest(app);

describe('User Handler', () => {
  const userData: UserData = {
    userLogin: 'usertester',
    firstName: 'User',
    lastName: 'Tests',
    password: 'password123',
  };

  let token: string,
    userId: number = 1;

  it('should require authorization on every endpoint', (done) => {
    request.get('/users').then((res) => {
      expect(res.status).toBe(401);
      done();
    });

    request.get(`/users/${userId}`).then((res) => {
      expect(res.status).toBe(401);
      done();
    });

    request
      .put(`/users/${userId}`)
      .send({
        firstName: userData.firstName + 'test',
        lastName: userData.lastName + 'test',
      })
      .then((res) => {
        expect(res.status).toBe(401);
        done();
      });

  });

  it('gets the create endpoint', (done) => {
    request
      .post('/users/create')
      .send(userData)
      .then((res) => {
        const { body, status } = res;
        token = body;

        expect(status).toBe(200);
        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request
      .get('/users')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the show endpoint', (done) => {
    request
      .get(`/users/${userId}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the auth endpoint', (done) => {
    request
      .post('/users/auth')
      .send({
        userLogin: userData.userLogin,
        password: userData.password,
      })
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
