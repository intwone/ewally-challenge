import { RelationshipProtocol } from '../../protocols/models/relationship-model-protocol';

export const relationshipsTable = [
  {
    cpf1: '11111111111',
    cpf2: '22222222222',
  },
  {
    cpf2: '33333333333',
    cpf1: '11111111111',
  },
  {
    cpf2: '44444444444',
    cpf1: '11111111111',
  },
  {
    cpf1: '22222222222',
    cpf2: '33333333333',
  },
  {
    cpf1: '22222222222',
    cpf2: '88888888888',
  },
  {
    cpf1: '88888888888',
    cpf2: '55555555555',
  },
  {
    cpf1: '88888888888',
    cpf2: '99999999999',
  },
  {
    cpf1: '22222222222',
    cpf2: '99999999999',
  },
] as RelationshipProtocol[];
