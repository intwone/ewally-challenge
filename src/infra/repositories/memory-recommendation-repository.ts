import { LoadRecommendationsRepositoryProtocol } from '../../protocols/repositories/recommendations/load-recommendations-repository-protocol';
import { relationshipsTable } from '../db/relationships-table';

export class MemoryRecommendationRepository
  implements LoadRecommendationsRepositoryProtocol
{
  async load(document: string): Promise<string[]> {
    const loadFriends = (doc: string) => {
      const friends = relationshipsTable
        .filter(
          relationship =>
            relationship.document1 === doc || relationship.document2 === doc,
        )
        .map(relationship => {
          if (relationship.document1 === doc) {
            return relationship.document2;
          }
          return relationship.document1;
        });
      return friends;
    };

    const friendsOfFriends: { friend: string; yourFriends: string[] }[] = [];
    const listFriendOfFriendNormalized: string[] = [];

    [...new Set(loadFriends(document))].forEach(friend => {
      const yourFriends = [...new Set(loadFriends(friend))].filter(
        documentFriend => documentFriend !== document,
      );
      if (yourFriends.length === 0) return;
      friendsOfFriends.push({ friend, yourFriends });
    });

    friendsOfFriends.forEach(friend => {
      listFriendOfFriendNormalized.push(friend.friend, ...friend.yourFriends);
    });

    const myFriendsList = loadFriends(document);

    const notMyFriendsList = [...new Set(listFriendOfFriendNormalized)].filter(
      friend => {
        return !myFriendsList.includes(friend);
      },
    );

    return notMyFriendsList;
  }
}
