import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col  gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((acti) => (
              <Link key={acti._id} href={`/thread/${acti.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={acti.author.image}
                    alt="Profile Image"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {acti.author.name}
                    </span>
                    Replied on your Thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-1">No Activity Yet</p>
        )}
      </section>
    </section>
  );
}
