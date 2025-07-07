import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export default function Home() {
  // const [users, setUsers] = useState();
  // const [form, setForm] = useState({ name: "", email: "", age: "" });
  // const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  // const [totalUsers, setTotalUsers] = useState(0);

  // useEffect(() => {
  //   fetchUsers();
  // }, [page, search]);

  // const fetchUsers = async () => {
  //   const { data } = await getUsers(page, search);
  //   console.log(data);
  //   setUsers(data?.users);
  //   setTotalUsers(data?.totalUsers);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (form._id) {
  //     await updateUser(form._id, form);
  //   } else {
  //     await createUser(form);
  //   }
  //   setForm({ name: "", email: "", age: "" });
  //   fetchUsers();
  // };

  // const handleEdit = (user) => setForm(user);

  // const handleDelete = async (id) => {
  //   await deleteUser(id);
  //   fetchUsers();
  // };

  const router = useRouter();

  const navigateToSummary = () => {
    // Navigates to '/viewSummary' when the ViewSummary button is clicked
    router.push("/viewSummary");
  };

  const navigateToDevTools = () => {
    // Navigates to '/devTools' when the Project Section button is clicked
    router.push("/devtools");
  };

  return (
    <div>
      <button onClick={navigateToSummary}>ViewSummary</button>
      <button onClick={navigateToDevTools}>Project Section</button>
    </div>
    // <div>
    //   <h1>CRUD with Next.js & Node.js</h1>
    //   <h2>Users List ({totalUsers})</h2>
    //   <div className="p-5">
    //     <button
    //       className="px-4 py-2 bg-blue-500 text-white rounded"
    //       onClick={() => router.push("/about")}
    //     >
    //       About Us
    //     </button>
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={form.name}
    //       onChange={(e) => setForm({ ...form, name: e.target.value })}
    //       // required
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={form.email}
    //       onChange={(e) => setForm({ ...form, email: e.target.value })}
    //       // required
    //     />
    //     <input
    //       type="number"
    //       placeholder="Age"
    //       value={form.age}
    //       onChange={(e) => setForm({ ...form, age: e.target.value })}
    //       // required
    //     />
    //     <button type="submit">{form._id ? "Update" : "Add"} User</button>
    //   </form>

    //   <h2 className="my-5">Search User</h2>
    //   <div className="p-5">
    //     <input
    //       type="text"
    //       placeholder="Search by name"
    //       onChange={(e) => setSearch(e.target.value)}
    //     />
    //     <button onClick={() => fetchUsers()}>Search</button>

    //     <div>
    //       {users?.map((user) => (
    //         <div key={user._id}>
    //           <span>{user.name}</span> - <span>{user.email}</span> -{" "}
    //           <span>{user.age}</span>
    //           <button onClick={() => handleEdit(user)}>Edit</button>
    //           <button onClick={() => handleDelete(user._id)}>Delete</button>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Pagination */}
    //     <button onClick={() => setPage(page - 1)} disabled={page === 1}>
    //       Prev
    //     </button>
    //     <button
    //       onClick={() => setPage(page + 1)}
    //       disabled={page * 5 >= totalUsers}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
}
