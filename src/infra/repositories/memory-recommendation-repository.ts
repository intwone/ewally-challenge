import { LoadRecommendationsRepositoryProtocol } from '../../protocols/repositories/recommendations/load-recommendations-repository-protocol';
import { relationshipsTable } from '../db/relationships-table';

export class MemoryRecommendationRepository
  implements LoadRecommendationsRepositoryProtocol
{
  async load(cpf: string): Promise<string[]> {
    const loadFriends = (doc: string) => {
      const friends = relationshipsTable
        .filter(
          relationship =>
            relationship.cpf1 === doc || relationship.cpf2 === doc,
        )
        .map(relationship => {
          if (relationship.cpf1 === doc) {
            return relationship.cpf2;
          }
          return relationship.cpf1;
        });
      return friends;
    };

    const friendsOfFriends: { friend: string; yourFriends: string[] }[] = [];
    const listFriendOfFriendNormalized: string[] = [];

    [...new Set(loadFriends(cpf))].forEach(friend => {
      const yourFriends = [...new Set(loadFriends(friend))].filter(
        documentFriend => documentFriend !== cpf,
      );
      if (yourFriends.length === 0) return;
      friendsOfFriends.push({ friend, yourFriends });
    });

    friendsOfFriends.forEach(friend => {
      listFriendOfFriendNormalized.push(friend.friend, ...friend.yourFriends);
    });

    const myFriendsList = loadFriends(cpf);

    const notMyFriendsList = [...new Set(listFriendOfFriendNormalized)].filter(
      friend => {
        return !myFriendsList.includes(friend);
      },
    );

    return notMyFriendsList;
  }
}
