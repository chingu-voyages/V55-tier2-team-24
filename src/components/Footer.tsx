export default function Footer() {
    return (
      <footer className="absolute bottom-0 flex items-center text-white text-sm px-2 py-3 w-full h-20 border-t-1 border-gray-400">
        <section className="w-[70%] m-3">
            <a
            className="flex  gap-x-2 hover:underline underline-offset-2"
            href="https://github.com/chingu-voyages/V55-tier2-team-24"
            >
            <img
                src="/images/githubIcon.svg"
                alt="Github icon"
                width={20}
                height={20}
                className="bg-gray-100 rounded p-1"
            /> 
            GitHub Repo
            </a>
        </section>
        <section className="w-[30%] flex justify-end items-center">
            <p>
                Contributors: 
            </p>
            <div className="flex">
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
               <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
                <img
                    src="https://placehold.co/200"
                    alt="Placeholder contributor icons"
                    width={20}
                    height={20}
                    className="h-full rounded-full m-1"
                />
            </div>
        </section>
      </footer>
    );
  }