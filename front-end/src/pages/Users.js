import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import UsersList from "../components/UsersList";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../shared/hooks/http-hook";
import "./Users.css";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const usersPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const searchChangeHandler = (event) => {
    event.preventDefault();
    const search = event.target.value.toLowerCase();
    if (search === "") {
      setFilteredUsers(loadedUsers);
    } else {
      setFilteredUsers(
        loadedUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search) ||
            user.username.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        )
      );
      setItemOffset(0);
    }
  };

  const endOffset = itemOffset + usersPerPage;
  const currentUsers = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://randomuser.me/api/?nat=us,br&page=1&results=50&seed=abc`
          // `https://randomuser.me/api/?nat=us,br&page=${currentPage}&results=50&seed=abc`
        );

        const data = responseData.results;
        const loadedU = [];

        for (const key in data) {
          const age = data[key].dob.age;
          loadedU.push({
            key: data[key].id.value,
            id: data[key].id.value,
            age: age ? age : "No info about",
            email: data[key].email,
            name:
              data[key].name.title +
              " " +
              data[key].name.first +
              " " +
              data[key].name.last,
            username: data[key].login.username,
            image: data[key].picture.thumbnail,
          });
        }

        setLoadedUsers(loadedU);
        setFilteredUsers(loadedU);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="center">
        <input
          className="search"
          placeholder="Busque por um nome, email ou username"
          type="search"
          onChange={searchChangeHandler}
        />
      </div>
      {!isLoading && filteredUsers && (
        <div className="users-pagination">
          <UsersList items={currentUsers} />
          <ReactPaginate
            className="pagination"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-number"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-number"
            nextClassName="page-number"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
      {/* {!isLoading && loadedUsers && <UsersList items={loadedUsers} />} */}
    </React.Fragment>
  );
};

export default Users;
