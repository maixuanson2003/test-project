"use client";
import TodoCard from "@/components/todolist/TodoCard";
import Pagination from "@/components/todolist/Pagination";
import { useRouter } from "next/navigation";
import {
  fetchAllTodos,
  fetchFilteredTodos,
  deleteTodo,
} from "@/service/todoService";
import { useEffect, useState } from "react";

export default function Todo() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchTodos = async (pageNumber = 1, status = "all") => {
    setLoading(true);
    setError("");

    try {
      let data;
      if (status === "all") {
        data = await fetchAllTodos(pageNumber);
      } else {
        data = await fetchFilteredTodos(pageNumber, status);
      }

      setTodos(data.data || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
    } catch (err) {
      setError("Không thể lấy danh sách công việc.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(page, statusFilter);
  }, [page, statusFilter]);

  const handleUpdate = (todo) => {
    router.push(`/todo/update?id=${todo.id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá công việc này?")) return;
    try {
      await deleteTodo(id);
      fetchTodos(page, statusFilter);
    } catch (err) {
      setError("Không thể xoá công việc.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium">Lọc trạng thái:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border rounded px-3 py-1"
          >
            <option value="all">Tất cả</option>
            <option value="true">✅ Hoàn thành</option>
            <option value="false">❌ Chưa hoàn thành</option>
          </select>
        </div>
        <h1 className="text-2xl font-bold">📋 Danh sách công việc</h1>
        <button
          onClick={() => router.push("/todo/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          ➕ Tạo mới
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="space-y-4">
            {todos?.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={() => handleDelete(todo.id)}
                onUpdate={() => handleUpdate(todo)}
              />
            ))}
          </div>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
