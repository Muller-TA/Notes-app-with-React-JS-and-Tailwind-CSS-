import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../assets/Store";

function AddNotes() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    if (!user || !user.id) {
      alert("You must be logged in to add a note");
      return;
    }

    const newNote = {
      title: data.title,
      content: data.content,
      userId: String(user.id), // تأكد أنه نص
      username: user.username,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (res.ok) {
        // إعادة تحميل النوتس عشان تظهر على طول
        queryClient.invalidateQueries(["notes", user.id]);
        reset(); // تنظيف الفورم
        navigate("/notes");
      } else {
        const error = await res.text();
        console.error("Failed to save:", error);
        alert("Failed to save note");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 my-4">Add Your Notes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-4 rounded"
        />
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Content"
          className="border p-2 w-full mb-4 rounded"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Note
        </button>
      </form>
    </div>
  );
}

export default AddNotes;
