import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/User/ListUsers";

export default function User() {
    const [users, setUsers] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersApi(token).then(response => {
            setUsers(response.users);
        })
    }, [token])

    return (
        <div>
            <ListUsers users={users} />
        </div>
    )
}
