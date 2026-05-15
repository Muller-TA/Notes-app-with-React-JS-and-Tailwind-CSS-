import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../assets/Store";

function NotesList() {
  const [visible, setVisible] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await fetch(`http://localhost:3001/notes?userId=${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data;
    },
    enabled: !!user?.id,
  });

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      const res = await fetch(`http://localhost:3001/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        queryClient.invalidateQueries(["notes", user.id]);
        alert("Note deleted successfully!");
      } else {
        alert("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return <div className="text-red-500">Please login to view your notes</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
        <button
          onClick={() => queryClient.invalidateQueries(["notes", user.id])}
          className="text-gray-500 hover:text-gray-700"
        >
          Refresh
        </button>
      </div>

      {notes.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">No notes yet.</p>
          <button
            onClick={() => navigate("/notes/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Create Your First Note
          </button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {notes.slice(0, visible).map((note) => (
          <div key={note.id} className="relative group">
            <Link
              to={`/notes/${note.id}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{note.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {note.content?.substring(0, 100)}...
                  </p>
                  {note.createdAt && (
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => handleDelete(note.id, e)}
                  disabled={deletingId === note.id}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-4 disabled:opacity-50"
                >
                  {deletingId === note.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {notes.length > 0 && visible < notes.length && (
        <button
          onClick={() => setVisible(visible + 10)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Show More ({visible}/{notes.length})
        </button>
      )}
    </div>
  );
}

export default NotesList;
