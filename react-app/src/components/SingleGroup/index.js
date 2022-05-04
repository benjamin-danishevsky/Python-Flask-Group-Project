import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import EditGroupForm from "../SingleGroupEdit/EditForm";
import './SingleGroup.css'

const SingleGroup = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const groups = useSelector(state => state.groups[id]);

  console.log("GROUPS", groups)
  const ownerId = groups?.owner_id;
  console.log(ownerId)
  console.log('OWNER', sessionUser)

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(groupActions.loadGroupThunk(id))
  }, [dispatch, id])
  console.log("HELLLLOOOOOOOO")

  return (
    <>
      <div>
        <div className="group_header">
        <div className="header_left">
          <img className="header_img" src={groups?.background_img} alt={groups?.name}/>
        </div>
        <div className="header_right">
          <h1>{groups?.name}</h1>
          <p>{groups?.city}, {groups?.state}</p>
            {sessionUser?.id === ownerId && (
              <>
              <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                {showEditForm && <EditGroupForm />}
              </>
            )}
        </div>
        <div>
          <button onClick={() => history.push(`/groups/${id}/calendar`)}>Group's Event Calendar</button>
        </div>
      </div>
      <div>
        {groups?.description}
      </div>
    </div>
    </>
  )
}

export default SingleGroup;
