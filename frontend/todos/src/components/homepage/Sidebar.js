"use client";
import { Home, ListTodo } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">📋 Todo App</h2>
      <ul className="space-y-4">
        <li
          onClick={() => router.push("/")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Welcome</span>
        </li>
        <li
          onClick={() => router.push("/todo")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
        >
          <ListTodo className="w-5 h-5" />
          <span>Danh sách công việc</span>
        </li>
      </ul>
    </div>
  );
}
