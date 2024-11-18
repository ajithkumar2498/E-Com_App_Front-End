import { toast } from "react-toastify";
import SummaryAPI from "../common";

const DeleteUser = async (userId, token, fetchAllUsers) => {

  try {
    const response = await fetch(`${SummaryAPI.deleteUser.url}/${userId}`, {
      method: SummaryAPI.deleteUser.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message || "User deleted successfully");
      fetchAllUsers(); // Refresh the users list after successful deletion
    } else {
      toast.error(data.message || "Failed to delete user");
    }
  } catch (error) {
    toast.error(error.message || "An error occurred while deleting the user");
  }
};

export default DeleteUser;
