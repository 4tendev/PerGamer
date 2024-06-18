import getLanguage from "@/commonTsServer/getLanguage";
import React from "react";
import PersianAbbout from "./PersianAbbout";

const Page = () => {
  const lang = getLanguage().lang;
  return lang == "fa" ? <PersianAbbout /> :     <div className="container mx-auto px-4">
  <div className=" my-3">
      <header className="text-center mb-8">
          <h1 className="text-4xl font-bold ">About Us</h1>
      </header>
      <section className="">
          <h2 className="text-2xl font-semibold text-info  mb-4">Pergamer - Revolutionizing In-Game Asset Trading</h2>
          <p className="mb-4">Pergamer is a cutting-edge web application designed to facilitate the buying and selling of Steam in-game assets using cryptocurrency. Our platform empowers gamers to seamlessly trade their digital assets in a secure and efficient manner, leveraging the power of blockchain technology.</p>
          <p className="mb-4">With Pergamer, users can enjoy:</p>
          <ul className="list-disc list-inside mb-4">
              <li>Secure transactions with blockchain technology.</li>
              <li>Real-time market data for informed trading decisions.</li>
              <li>A user-friendly interface for easy navigation and asset management.</li>
              <li>Comprehensive support for various cryptocurrencies.</li>
          </ul>
          <p className="mb-4">Our mission is to provide gamers with a reliable and innovative platform where they can maximize the value of their in-game assets. By integrating cryptocurrency payments, we offer a modern solution that meets the needs of digital economy.</p>
          <p>Join Pergamer today and be part of the future of in-game asset trading.</p>
      </section>
  </div>
</div>;
};

export default Page;
