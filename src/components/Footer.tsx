import { useState } from "react";

export default function Footer() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showContributors, setShowContributors] = useState<boolean>(false);

  const toggleContributors = () => {
    setShowContributors((prev) => !prev);
  };

  const contributors = [
    {
      avatar: "/images/contibutors/Viral.jpeg",
      name: "Viral Barot",
      role: "Product Owner",
      link: "https://www.linkedin.com/in/viral-barot-mba/",
    },
    {
      avatar: "/images/contibutors/Jennie.jpeg",
      name: "Jennie Glass",
      role: "UI/UX",
      link: "https://www.linkedin.com/in/jennie-glass-design/",
    },
    {
      avatar: "/images/contibutors/Nathan.jpeg",
      name: "Nathan Walker",
      role: "Scrum Master",
      link: "https://www.linkedin.com/in/nathan-walker-770517106/",
    },
    {
      avatar: "/images/contibutors/Maria.jpeg",
      name: "Maria Nathalie Chejin",
      role: "Shadow Scrum Master",
      link: "https://www.linkedin.com/in/marianathaliechejin/",
    },
    {
      avatar: "/images/contibutors/Ivan.jpeg",
      name: "Ivan Rebolledo",
      role: "Developer",
      link: "https://github.com/ivannissimrch",
    },
    {
      avatar: "/images/contibutors/Stef.jpeg",
      name: "Stephanie Leon",
      role: "Developer",
      link: "https://github.com/stefleon33",
    },
    {
      avatar: "/images/contibutors/Christin.jpeg",
      name: "Christin Martin",
      role: "Developer",
      link: "https://github.com/Christin-paige",
    },
    {
      avatar: "/images/contibutors/Ramon.jpeg",
      name: "Ramon Zambrano",
      role: "Developer",
      link: "https://github.com/r-alejo-z95",
    },
  ];

  return (
    <footer className="flex items-center justify-between text-sm px-8 md:px-4 py-3 w-full h-20 border-1 border-[#E5E7EB] bg-[#F9FAFB] text-gray-800 z-50">
      <section>
        <a
          className="flex items-center gap-2 hover:underline underline-offset-2"
          href="https://github.com/chingu-voyages/V55-tier2-team-24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/github-mark.png"
            alt="Github icon"
            width={30}
            height={30}
          ></img>
          <span className="hidden md:block">GitHub Repo</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </section>

      {/* Desktop */}
      <section className="hidden md:flex items-center gap-2">
        <p className="cursor-default">Contributors</p>
        <div className="flex gap-1">
          {contributors.map((contributor, index) => (
            <div key={index} className="relative">
              <img
              src={contributor.avatar}
              alt={contributor.name}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              onClick={() =>
                window.open(contributor.link, "_blank", "noopener,noreferrer")
              }
              onMouseEnter={() => setHoveredId(index)}
              onMouseLeave={() => setHoveredId(null)}
              />
              {hoveredId === index && (
              <div className="absolute bottom-full right-0 transform mb-2 px-2 py-1 bg-[#41A3C9] text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10">
                <p className="font-medium">{contributor.name}</p>
                <p className="text-gray-200 text-[10px]">
                {contributor.role}
                </p>
              </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <section className="md:hidden relative">
        <p
          className="cursor-pointer hover:text-gray-600"
          onClick={toggleContributors}
        >
          Contributors
        </p>
        {showContributors && (
          <div className="absolute bottom-full right-0 transform mb-2 px-2 py-1 text-[#41A3C9] bg-[#F9FAFB] text-xs rounded-md shadow-lg whitespace-nowrap z-60">
            <div className="flex flex-col gap-2">
              {contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-1 border-b border-gray-200 last:border-0 cursor-pointer"
                  onClick={() =>
                    window.open(contributor.link, "_blank noopener noreferrer")
                  }
                >
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-gray-400 text-[10px]">
                      {contributor.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </footer>
  );
}
