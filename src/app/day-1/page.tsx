"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";


export const users = [
  {
    id: 1,
    name: "Ankit Bansal",
    designation: "Software Engineer @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHR8BPKEBLKLA6JHRK9BLQLB7L79/hr8bpkeblkla6jhrk9blqlb7l79-3082-profile.webp",
  },
  {
    id: 2,
    name: "Vaishnav Chandurkar",
    designation: "Full‑Stack Engineer @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHKK8GJ68OAPQJD2L6KRG8GREMLM/hkk8gj68oapqjd2l6krg8gremlm-profile.webp",
  },
  {
    id: 3,
    name: "Akash Bhadange",
    designation: "Co‑founder @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHDNK79BK6LA89DCMPRQGEGQOGGO/hdnk79bk6la89dcmprqgegqoggo-9038-profile.webp",
  },
  {
    id: 4,
    name: "Yogini Bende",
    designation: "Cofounder and CTO @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHA9BO68BL6LRNA2R9MD686DLDGE/ha9bo68bl6lrna2r9md686dldge-profile.webp",
  },
  {
    id: 5,
    name: "Jay Kadam",
    designation: "Product Designer @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHBAOB6BGGNQPGECB6RAQMJRNA9P/hbaob6bggnqpgecb6raqmjrna9p-5809-profile.webp",
  },
  {
    id: 6,
    name: "Ajinkya Shinde",
    designation: "Product Engineer @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UH9O6OKP8QDKOQE18KQBMGQBBBLD/h9o6okp8qdkoqe18kqbmgqbbbld-profile.webp",
  },
  {
    id: 7,
    name: "Saurabh Wankhade",
    designation: "Software Engineer Intern @ Peerlist",
    image:
      "https://dqy38fnwh4fqs.cloudfront.net/UHKKL89KJP8DEN7ID8EGLEDMGLBL/hkkl89kjp8den7id8egledmglbl-835-profile.webp",
  },
  {
    id: 8,
    name: "Smita Jirgale",
    designation: "Operations Head @ Peerlist",
    image:
      "https://lh3.googleusercontent.com/a/AAcHTtdld2PYPJqOzD9tDq-8Y1Gs8WVynLBslqT-Uf5R3g=s96-c",
  },
];


function page() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
            Peerlist Interaction Design Challenge
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
            Meet the Team of Peerlist
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={users} />
        </div>
    </div>
  );
}

export default page;
