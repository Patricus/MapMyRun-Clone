import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllTickets } from "../../store/tickets";
import { getAllBookmarks } from "../../store/bookmarks";
import styled from "styled-components";
import { Modal } from "../Global/Elements/Modal";
import EditUserForm from "../auth/EditUserForm";
import DeleteUserModal from "../auth/DeleteUser";
import BookmarksPanel from "./BookmarkPanel";
import UserPanel from "./UserPanel";
import TicketPanel from "./TicketPanel";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const ticketsState = useSelector((state) => state.tickets);
  const tickets = Object.values(ticketsState);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    dispatch(getAllTickets(user.id));
  }, [dispatch, user]);

  const updateUserModal = async () => {
    setShowUpdateUserModal(true);
  };

  const deleteUserModal = async () => {
    setShowConfirmDeleteModal(true);
  };

  if (!user) return <Redirect to={"/"} />;
  if (user) {
    return (
      <main>
        {showUpdateUserModal && (
            <Modal onClose={() => setShowUpdateUserModal(false)}>
              <EditUserForm />
            </Modal>
          )}
          {showConfirmDeleteModal && (
            <Modal onClose={() => setShowConfirmDeleteModal(false)}>
              <DeleteUserModal setShowConfirmDeleteModal={setShowConfirmDeleteModal} />
            </Modal>
          )}
        <BookmarksPanel />
        <UserPanel user={user} tickets={tickets} />
        <TicketPanel tickets={tickets}/>
        <div>
          <button onClick={updateUserModal}>Update User Account</button>
          <button onClick={deleteUserModal}>Delete User Account</button>
        </div>
      </main>
    );
  }
}

export default Dashboard;
