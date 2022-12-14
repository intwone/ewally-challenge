import request from 'supertest';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import app from '../../../main/app';

const memoryPersonRepository = new MemoryPersonRepository();

describe('Person Routes', () => {
  beforeEach(async () => {
    memoryPersonRepository.clean();
  });

  describe('POST /person', () => {
    it('should return 200 if create person', async () => {
      await request(app)
        .post('/person')
        .send({
          cpf: '11111111111',
          name: 'any_name',
        })
        .expect(200);
    });

    it('should return 400 if some param is not provided', async () => {
      await request(app)
        .post('/person')
        .send({
          cpf: '',
          name: 'any_name',
        })
        .expect(400);
    });

    it('should return 400 if document has an invalid character', async () => {
      await request(app)
        .post('/person')
        .send({
          cpf: '111---@+)11',
          name: 'any_name',
        })
        .expect(400);
    });

    it('should return 400 if document already exists', async () => {
      memoryPersonRepository.insert({
        cpf: '11111111111',
        name: 'any_name',
      });

      await request(app)
        .post('/person')
        .send({
          cpf: '11111111111',
          name: 'any_name',
        })
        .expect(400);
    });
  });
});

describe('GET /persons', () => {
  it('should return 200 if load all persons on success', async () => {
    await request(app).get('/persons').expect(200);
  });
});

describe('GET /persons/:document', () => {
  it('should return 200 if load person by document on success', async () => {
    const existentDocument = '11111111111';
    await request(app).get(`/person/${existentDocument}`).expect(200);
  });

  it('should return 404 if document not exists', async () => {
    const invalidDocument = '12345678901';
    await request(app).get(`/person/${invalidDocument}`).expect(404);
  });
});

describe('DELETE /clean', () => {
  it('should return 200 if clean person and relationship on success', async () => {
    await request(app).delete(`/clean`).expect(200);
  });
});
