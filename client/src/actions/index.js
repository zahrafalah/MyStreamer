import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  DELETE_STREAM,
  FETCH_STREAMS
} from "./types";
import streams from "../apis/streams";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
//thunc functions

export const fetchStrems = () => async dispatch => {
  const response = await streams.post("/streams");
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data
  });
};
export const fetchStrem = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data
  });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  });
};
export const deletestream = id => async dispatch => {
  await streams.post(`/streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id
  });
};

//async action creator using redux thunk
export const createStream = formValues => async dispatch => {
  const response = await streams.post("/streams", formValues);
  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  });
};
