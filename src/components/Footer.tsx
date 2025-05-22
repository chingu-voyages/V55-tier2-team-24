export default function Footer() {
  return (
    <footer className=" bg-blue-100 flex items-center p-4 justify-center gap-2 w-full">
      <a
        className=""
        href="https://github.com/chingu-voyages/V55-tier2-team-24"
      >
        <img
          src="images/githubIcon.svg"
          alt="github icon"
          width={25}
          height={25}
        />
      </a>
      <p className="flex justify-center">
        ©2025 Resource helper. All Rights Reserved
      </p>
    </footer>
  );
}
