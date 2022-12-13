import request from 'supertest';
import app from '../../../main/app';

describe('GET /recommendations/:document', () => {
  it('should return 200 if relationship created on success', async () => {
    await request(app).get('/recommendations/11111111111').expect(200);
  });

  it('should return 400 if some document is not provided', async () => {
    await request(app).get(`/recommendations/${null}`).expect(400);
  });

  it('should return 400 if some document has an invalid character', async () => {
    await request(app).get('/recommendations/1111-11111').expect(400);
  });

  it('should return 400 if some document length is different 11', async () => {
    await request(app).get('/recommendations/1111111111111').expect(400);
  });
});
