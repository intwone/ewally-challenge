import request from 'supertest';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import app from '../../../main/app';

const memoryPersonRepository = new MemoryPersonRepository();

describe('POST /relationship', () => {
  it('should return 200 if relationship created on success', async () => {
    memoryPersonRepository.insert({
      cpf: '11111111111',
      name: 'any_name',
    });
    memoryPersonRepository.insert({
      cpf: '22222222222',
      name: 'any_name',
    });

    await request(app)
      .post('/relationship')
      .send({ cpf1: '11111111111', cpf2: '22222222222' })
      .expect(200);
  });

  it('should return 400 if some document is not provided', async () => {
    await request(app)
      .post('/relationship')
      .send({ cpf1: '11111111111', cpf2: '' })
      .expect(400);
  });

  it('should return 400 if some document has an invalid character', async () => {
    await request(app)
      .post('/relationship')
      .send({ cpf1: '111---111--', cpf2: '12345678901' })
      .expect(400);
  });

  it('should return 400 if some document length is different 11', async () => {
    await request(app)
      .post('/relationship')
      .send({ cpf1: '11111111111', cpf2: '222' })
      .expect(400);
  });

  it('should return 400 if documents to be equals', async () => {
    await request(app)
      .post('/relationship')
      .send({ cpf1: '09876543210', cpf2: '09876543210' })
      .expect(400);
  });
});

describe('GET /relationships', () => {
  it('should return 200 if load all relationships on success', async () => {
    await request(app).get('/relationships').expect(200);
  });
});
