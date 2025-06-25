import { useState } from "react";

export default function CommentForm({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <textarea
        className="w-full border p-2 rounded text-sm"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Viết bình luận..."
      />
      <button
        className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm"
        onClick={() => {
          if (value.trim()) {
            onSubmit(value.trim());
            setValue("");
          }
        }}
      >
        Gửi
      </button>
    </div>
  );
}