"use client"
//import { Dashboard } from '@mui/icons-material'
import React from 'react'
import { useState, useEffect } from 'react';

import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  wallet: string;
}

interface NFT {
  id: string;
  title: string;
  artist: string;
  price: string;
  coverArt: string; // Cover art URL or IPFS CID
}

interface Transaction {
  id: string;
  type: "purchase" | "sale" | "royalty";
  date: string;
  amount: string;
  nftTitle?: string;
}


type Props = {}




function Page({}: Props) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [royaltyEarnings, setRoyaltyEarnings] = useState<string>("0 ETH");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          // Replace with your API call or database query
          const userProfile: UserProfile = {
            name: "Alice Beats",
            email: "alice@example.com",
            wallet: "0x123...abc",
          };
  
          const userOwnedNFTs: NFT[] = [
            {
              id: "1",
              title: "Dream Melody",
              artist: "Alice Beats",
              price: "0.05 ETH",
              coverArt: "https://via.placeholder.com/150",
            },
            {
              id: "2",
              title: "Ocean Vibes",
              artist: "Alice Beats",
              price: "0.08 ETH",
              coverArt: "https://via.placeholder.com/150",
            },
            {
                id: "3",
                title: "Rock Vibes",
                artist: "Drako Beats",
                price: "0.08 ETH",
                coverArt: "https://via.placeholder.com/150",
              },
              {
                id: "4",
                title: "Magic beats",
                artist: "harry sticks",
                price: "0.08 ETH",
                coverArt: "https://via.placeholder.com/150",
              },
              {
                id: "5",
                title: "larry sounds",
                artist: "Larry bird",
                price: "0.08 ETH",
                coverArt: "https://via.placeholder.com/150",
              },
              {
                id: "6",
                title: "Sand Vibes",
                artist: "Meth Beats",
                price: "0.08 ETH",
                coverArt: "https://via.placeholder.com/150",
              },
          ];
  
          const userTransactions: Transaction[] = [
            { id: "t1", type: "purchase", date: "2024-01-01", amount: "0.05 ETH", nftTitle: "Dream Melody" },
            { id: "t2", type: "royalty", date: "2024-02-01", amount: "0.01 ETH" },
            { id: "t3", type: "sale", date: "2024-03-01", amount: "0.08 ETH", nftTitle: "Ocean Vibes" },
          ];
  
          setProfile(userProfile);
          setOwnedNFTs(userOwnedNFTs);
          setTransactions(userTransactions);
          setRoyaltyEarnings("0.05 ETH");
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);
  
    if (loading) return <p>Loading...</p>;
  
    if (!profile) return <p>User not found</p>;
  
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
  
        {/* Profile Info */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Wallet:</strong> {profile.wallet}
          </p>
          <Link href="/profile/edit">
            <p className="text-blue-600 hover:underline mt-2 inline-block">Edit Profile</p>
          </Link>
        </div>
  
        {/* Owned NFTs */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Owned NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {ownedNFTs.map((nft) => (
              <div key={nft.id} className="bg-white p-4 rounded-lg shadow">
                <img src={nft.coverArt} alt={nft.title} className="rounded-lg mb-2" />
                <h3 className="font-semibold">{nft.title}</h3>
                <p className="text-sm">{nft.artist}</p>
                <p className="text-sm">{nft.price}</p>
                <Link href={`/nft/${nft.id}`}>
                  <p className="text-blue-600 hover:underline text-sm">View Details</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
  
        {/* Royalty Earnings */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Royalty Earnings</h2>
          <p>
            <strong>Total Earnings:</strong> {royaltyEarnings}
          </p>
          <p className="text-sm text-gray-600">
            View detailed transactions below for a breakdown.
          </p>
        </div>
  
        {/* Transaction History */}
        <div>
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Date</th>
                <th className="border border-gray-300 p-2 text-left">Amount</th>
                <th className="border border-gray-300 p-2 text-left">NFT</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="border border-gray-300 p-2 capitalize">{tx.type}</td>
                  <td className="border border-gray-300 p-2">{tx.date}</td>
                  <td className="border border-gray-300 p-2">{tx.amount}</td>
                  <td className="border border-gray-300 p-2">{tx.nftTitle || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Page;











