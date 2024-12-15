export function ValueProposition() {
  const cards = [
    {
      title: "Is Cybersecurity Important?",
      description:
        "Especially in cybersecurity, a team is only as strong as its weakest link. An untrained employee can become an entry point for malicious data or miss key security protocols. ExhaleGuard helps companies educate all employees to strengthen security and prevent threats.",
      image: "/value-propositions-images/question-mark-shield.svg",
    },
    {
      title: "Why ExhaleGuard?",
      description:
        "Our easy-to-learn courses cover essential cybersecurity practices, giving your team a solid foundation—even if they have no prior experience. Making sure everyone in the team is on the same page.",
      image: "/value-propositions-images/head-wheel.svg",
    },
    {
      title: "Security Frameworks?",
      description:
        "Complex security frameworks like CIS 18, NIST, and ISO 27000 are designed for larger organizations and dedicated security teams, often making them costly and out of reach for many small to medium businesses. At XhaleGuard, we bridge that gap—empowering your team with essential skills and insights while introducing you to these frameworks as part of our course.",
      image: "/value-propositions-images/documentation.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mt-16">
      {cards.map((card, index) => (
        <div key={index} className="rounded-lg p-6 text-center md:text-left">
          <div className="flex justify-center mb-4">
            <img
              src={card.image}
              alt={`${card.title} Logo`}
              className=" h-32 w-80 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
