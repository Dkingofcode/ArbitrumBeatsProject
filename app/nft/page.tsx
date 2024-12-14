"use client";

import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


interface NFTDetails {
  id: string;
  title: string;
  artist: string;
  genre: string;
  licenseType: string;
  royalties: string;
  metadata: string; // Link to full metadata on IPFS or similar
  audio: string; // Audio file URL or IPFS CID
  coverArt: string; // Cover art URL or IPFS CID
  ownershipHistory: OwnershipRecord[];
}

interface OwnershipRecord {
  owner: string;
  timestamp: string;
  price: string; // Price paid for the NFT
}


type Props = {};

function Page({}: Props) {
  
  const router = useRouter();
  const { id } = router.query;

  const [nft, setNft] = useState<NFTDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchNFTDetails = async () => {
        setLoading(true);
        try {
          // Replace this with your API call or smart contract query
          const data: NFTDetails = {
            id: id as string,
            title: "Dream Melody",
            artist: "Alice Beats",
            genre: "Electronic",
            licenseType: "Exclusive",
            royalties: "10%",
            metadata: "https://example.com/metadata/123",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            coverArt: "https://via.placeholder.com/300",
            ownershipHistory: [
              {
                owner: "0x123...abc",
                timestamp: "2024-01-01 12:00:00",
                price: "0.03 ETH",
              },
              {
                owner: "0x456...def",
                timestamp: "2024-02-10 15:00:00",
                price: "0.05 ETH",
              },
            ],
          };
          setNft(data);
        } catch (error) {
          console.error("Failed to fetch NFT details: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNFTDetails();
    }
  }, [id]);

  if (loading) return <p>Loading NFT details...</p>;
  if (!nft) return <p>NFT not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{nft.title}</h1>

      {/* Cover Art and Metadata */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={nft.coverArt}
          alt={`${nft.title} cover art`}
          className="w-full sm:w-1/2 rounded-lg"
        />
        <div>
          <p className="text-sm">
            <strong>Artist:</strong> {nft.artist}
          </p>
          <p className="text-sm">
            <strong>Genre:</strong> {nft.genre}
          </p>
          <p className="text-sm">
            <strong>License Type:</strong> {nft.licenseType}
          </p>
          <p className="text-sm">
            <strong>Royalties:</strong> {nft.royalties}
          </p>
          <a
            href={nft.metadata}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View Full Metadata
          </a>
        </div>
      </div>

      {/* Audio Player */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Listen</h2>
        <audio
          controls
          className="w-full mt-2"
          preload="none"
        >
          <source src={nft.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Ownership History */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Ownership History</h2>
        <table className="w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Owner</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {nft.ownershipHistory.map((record, index) => (
              <tr key={index} className="border-t">
                <td className="border border-gray-300 p-2">{record.owner}</td>
                <td className="border border-gray-300 p-2">{record.timestamp}</td>
                <td className="border border-gray-300 p-2">{record.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page;




