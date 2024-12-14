import { useState } from "react";
import axios from "axios";

interface Metadata {
  title: string;
  artist: string;
  genre: string;
  coverArt?: File;
  audioFile?: File;
}

export default function MusicNFTForm() {
  const [metadata, setMetadata] = useState<Metadata>({
    title: "",
    artist: "",
    genre: "",
  });
  const [coverArtCID, setCoverArtCID] = useState<string | null>(null);
  const [audioFileCID, setAudioFileCID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMetadata({ ...metadata, [name]: value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setMetadata({ ...metadata, [name]: files[0] });
    }
  };

  const uploadToIPFS = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer YOUR_PINATA_API_JWT`,
      },
    });
    return data.IpfsHash;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload cover art to IPFS
      if (metadata.coverArt) {
        const coverArtCid = await uploadToIPFS(metadata.coverArt);
        setCoverArtCID(coverArtCid);
      }

      // Upload audio file to IPFS
      if (metadata.audioFile) {
        const audioFileCid = await uploadToIPFS(metadata.audioFile);
        setAudioFileCID(audioFileCid);
      }

      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files: ", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Mint Your Music NFT</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={metadata.title}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={metadata.artist}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={metadata.genre}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="coverArt" className="block text-sm font-medium">Cover Art</label>
          <input
            type="file"
            id="coverArt"
            name="coverArt"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="audioFile" className="block text-sm font-medium">Audio File</label>
          <input
            type="file"
            id="audioFile"
            name="audioFile"
            accept="audio/*"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Mint NFT"}
        </button>
      </form>

      <div className="mt-4">
        {coverArtCID && <p>Cover Art CID: {coverArtCID}</p>}
        {audioFileCID && <p>Audio File CID: {audioFileCID}</p>}
      </div>
    </div>
  );
}
