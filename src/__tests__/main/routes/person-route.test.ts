import request from 'supertest';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import app from '../../../main/app';

const memoryPersonRepository = new MemoryPersonRepository();

describe('Person Routes', () => {
  beforeEach(async () => {
    memoryPersonRepository.clean();
  });

  describe('POST /person', () => {
    it('should return 201 if create person', async () => {
      await request(app)
        .post('/person')
        .send({
          document: '11111111111',
          name: 'any_name',
        })
        .expect(201);
    });

    it('should return 400 if some param is not provided', async () => {
      await request(app)
        .post('/person')
        .send({
          document: '',
          name: 'any_name',
        })
        .expect(400);
    });

    it('should return 400 if document length is different 11', async () => {
      await request(app)
        .post('/person')
        .send({
          document: '111',
          name: 'any_name',
        })
        .expect(400);
    });

    it('should return 400 if document has an invalid character', async () => {
      await request(app)
        .post('/person')
        .send({
          document: '111---@+)11',
          name: 'any_name',
        })
        .expect(400);
    });

    it('should return 409 if document already exists', async () => {
      memoryPersonRepository.insert({
        document: '11111111111',
        name: 'any_name',
      });

      await request(app)
        .post('/person')
        .send({
          document: '11111111111',
          name: 'any_name',
        })
        .expect(409);
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

  it('should return 400 if document length is different 11', async () => {
    const invalidDocument = '123';
    await request(app).get(`/person/${invalidDocument}`).expect(400);
  });

  it('should return 404 if document not exists', async () => {
    const invalidDocument = '12345678901';
    await request(app).get(`/person/${invalidDocument}`).expect(404);
  });
});

describe('DELETE /personst', () => {
  it('should return 200 if clean person on success', async () => {
    await request(app).delete(`/persons`).expect(200);
  });
});
