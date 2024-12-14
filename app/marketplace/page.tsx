"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NFT {
  id: string;
  title: string;
  artist: string;
  price: string;
  thumbnail: string; // URL or IPFS CID for thumbnail image
  audio: string; // URL or IPFS CID for the audio file
}

export default function Page() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulated fetch function to retrieve NFTs
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        // Replace with your API call or blockchain query
        const data: NFT[] = [
          {
            id: "1",
            title: "Dream Melody",
            artist: "Alice Beats",
            price: "0.05 ETH",
            thumbnail: "https://via.placeholder.com/150",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            id: "2",
            title: "Bassline Groove",
            artist: "DJ Max",
            price: "0.07 ETH",
            thumbnail: "https://via.placeholder.com/150",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
        ];
        setNfts(data);
      } catch (error) {
        console.error("Failed to fetch NFTs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const handlePurchase = (nft: NFT) => {
    alert(`Buying ${nft.title} by ${nft.artist} for ${nft.price}`);
    // Add purchase logic here (e.g., interacting with a smart contract)
    
  
};

  if (loading) return <p>Loading NFTs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">NFT Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="border rounded-lg p-4 shadow-sm">
            <Image
              src={nft.thumbnail}
              alt={`${nft.title} thumbnail`}
              width={150}
              height={150}
              className="rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{nft.title}</h2>
            <p className="text-sm text-gray-600">Artist: {nft.artist}</p>
            <p className="text-sm text-gray-800 font-bold">{nft.price}</p>

            {/* Music Player */}
            <audio
              controls
              className="w-full mt-2"
              preload="none" // To avoid unnecessary bandwidth usage
            >
              <source src={nft.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <button
              onClick={() => handlePurchase(nft)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
