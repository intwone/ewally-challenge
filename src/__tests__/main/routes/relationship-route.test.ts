import request from 'supertest';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import app from '../../../main/app';

const memoryPersonRepository = new MemoryPersonRepository();

describe('POST /relationship', () => {
  it('should return 201 if relationship created on success', async () => {
    memoryPersonRepository.insert({
      document: '11111111111',
      name: 'any_name',
    });
    memoryPersonRepository.insert({
      document: '22222222222',
      name: 'any_name',
    });

    await request(app)
      .post('/relationship')
      .send({ document1: '11111111111', document2: '22222222222' })
      .expect(201);
  });

  it('should return 400 if some document is not provided', async () => {
    await request(app)
      .post('/relationship')
      .send({ document1: '11111111111', document2: '' })
      .expect(400);
  });

  it('should return 400 if some document has an invalid character', async () => {
    await request(app)
      .post('/relationship')
      .send({ document1: '111---111--', document2: '12345678901' })
      .expect(400);
  });

  it('should return 400 if some document length is different 11', async () => {
    await request(app)
      .post('/relationship')
      .send({ document1: '11111111111', document2: '222' })
      .expect(400);
  });

  it('should return 400 if documents to be equals', async () => {
    await request(app)
      .post('/relationship')
      .send({ document1: '09876543210', document2: '09876543210' })
      .expect(400);
  });
});

describe('GET /relationships', () => {
  it('should return 200 if load all relationships on success', async () => {
    await request(app).get('/relationships').expect(200);
  });
});
