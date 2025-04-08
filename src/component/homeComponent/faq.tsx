import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What is Moonly?",
    answer:
      "Moonly is a lightning-fast, mobile-first decentralized trading platform built on Solana. It unifies token discovery, analysis, trading, and portfolio management into a single seamless experience—designed especially for power users. With the lowest DEX trading fees in the Solana ecosystem, Moonly is your all-in-one solution for on-chain trading.",
  },
  {
    question: "What do I need to start using Moonly?",
    answer:
      "All you need is a Solana wallet—like Phantom or Backpack—to connect and start trading instantly. There’s no KYC, no centralized custody. Your assets remain in your control at all times.",
  },
  {
    question: "What exchanges are integrated with Moonly?",
    answer:
      "Moonly aggregates liquidity from top Solana DEXes including Jupiter, Raydium, Orca, Phoenix, Lifinity, Fluxbeam, and more—ensuring best-price execution across platforms with CLI-speed trading.",
  },
  {
    question: "What are the risks?",
    answer:
      "As with all DeFi trading, risks include market volatility, smart contract vulnerabilities, and scam tokens. Moonly reduces these risks with real-time analytics, an advanced token safety dashboard (13+ parameters), and secure wallet-based trading.",
  },
  {
    question: "Why should I trust Moonly?",
    answer:
      "Moonly is built by a team of seasoned Solana developers, designers, and traders who have deep roots in the web3 ecosystem. We’re committed to transparency, user empowerment, and delivering the best on-chain trading experience. Our platform is built to be secure, efficient, and community-driven.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    console.log("inside");
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[80vw] flex gap-4 mx-auto flex-col mt-8">
      {faqs.map((faq, index) => (
        <div
          key={"faq" + index}
          className="border border-[#323232] rounded-lg cursor-pointer hover:border-[#BDBDBD] transition-all"
          onClick={() => toggleFAQ(index)}
        >
          {/* Question Row */}
          <div className="flex justify-between items-center px-4 py-4">
            <p className="font-Inter text-[18px] text-[#BDBDBD]">
              {faq.question}
            </p>
            <div
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              <Image
                src={openIndex === index ? "minus.svg" : "add.svg"}
                alt="toggle"
                width={16}
                height={16}
                priority
              />
            </div>
          </div>

          {/* Answer Section (Show only when open) */}
          {openIndex === index && (
            <div className="px-4 pb-4 text-[#888888] text-left text-[16px] font-Inter">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
