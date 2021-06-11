import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from "../../../api/auth";
import { getActionsApi } from "../../../api/action";
import ListActions from "../../../components/Admin/Actions/ListActions";

export default function Action() {
    const [actions, setActions] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        getActionsApi(token).then(response => {
            setActions(response.actions);
        })
    }, [token]);

    return (
        <div>
            <ListActions actions={actions} />
        </div>
    )
}
