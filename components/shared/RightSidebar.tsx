import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "../cards/CommunityCard";

export default async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;
  const users = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  const communities = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested communities
        </h3>
        <section>
          <div className="mt-7 flex flex-col gap-9">
            {communities.communities.length === 0 ? (
              <p className="no-result">No Communities</p>
            ) : (
              <>
                {communities.communities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    id={community.id}
                    name={community.name}
                    username={community.username}
                    imgUrl={community.image}
                    bio={community.bio}
                    members={community.members}
                  />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <section>
          <div className="mt-7 flex flex-col gap-9">
            {users.users.length === 0 ? (
              <p className="no-result">No Users</p>
            ) : (
              <>
                {users.users.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    imgUrl={user.image}
                    personType="User"
                  />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
