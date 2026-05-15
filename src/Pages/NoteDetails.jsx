import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function NoteDetails() {
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () =>
      fetch(`http://localhost:3001/notes/${id}`).then((res) => res.json()),
  });

  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  if (isError) return <p className="text-red-500">Something went wrong!</p>;
  if (!note) return <p className="text-gray-600">Note not found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
      <Link
        to="/notes"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Notes
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{note.title}</h1>
      <p className="text-gray-600">{note.content || note.body}</p>
      {note.username && (
        <p className="text-sm text-gray-400 mt-4">By: {note.username}</p>
      )}
    </div>
  );
}

export default NoteDetails;
