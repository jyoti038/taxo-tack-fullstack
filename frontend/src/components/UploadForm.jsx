import { useState } from "react";
import { uploadCSV } from "../api";

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a CSV file");

    setLoading(true);
    try {
      const data = await uploadCSV(file);
      onUpload(data);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
    >
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </form>
  );
}
