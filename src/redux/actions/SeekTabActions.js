import { API, BASE_URL } from "../constants";

export const CheckPollExistsApi = (payload, checkPollExistsApiResponse) => {
  fetch(BASE_URL + API.CHECK_POLLS_EXISTS, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": payload.token,
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      checkPollExistsApiResponse(responseData);
    })
    .catch((error) => {
      checkPollExistsApiResponse(error);
    });
};

export const GetPollsApi = (payload, getPollsApiResponse) => {
    fetch(BASE_URL + API.GET_POLLS, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": payload.token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        getPollsApiResponse(responseData);
      })
      .catch((error) => {
        getPollsApiResponse(error);
      });
  }
;

export const VoteOnPollApi = (payload, voteOnPollApiResponse) => {
  fetch(BASE_URL + API.VOTE_ON_POLL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": payload.token,
    },
    body: payload.data,
  })
    .then((response) => response.json())
    .then((responseData) => {
      voteOnPollApiResponse(responseData);
    })
    .catch((error) => {
      voteOnPollApiResponse(error);
    });
};


export const SearchSeekApi = (payload, searchSeekApiResponse) => {
  fetch(BASE_URL + API.SEARCH_SEEK, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      // "Authorization": payload.token,
    },
    body: payload.data,
  })
    .then((response) => response.json())
    .then((responseData) => {
      searchSeekApiResponse(responseData);
    })
    .catch((error) => {
      searchSeekApiResponse(error);
    });
};

