import {
  getLocalAccessToken,
  getLocalGUID,
  getLocalSessionId,
  getServiceApiUrl,
} from "@/utils/apiService";
import { Get, Post } from "../helper/Agent";
import { REWARD_API_PATH } from "@/constants/apiURLs";
import { EVENTS } from "@/constants/eventListeners";

interface addUserPointsInterface {
  trans_type: string;
  trans_source: string;
  user_guid: string;
}

class RewardsService {
  fetchRewards = async () => {
    const URL =
      getServiceApiUrl() + REWARD_API_PATH.FETCH_REWARDS + getLocalGUID();
    const resp = await Get(URL, false, {
      headers: {
        session_id: getLocalSessionId(),
        user_guid: getLocalGUID(),
        authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });
    return resp;
  };

  fetchLeaderboard = async () => {
    const URL = getServiceApiUrl() + REWARD_API_PATH.FETCH_LEADERBOARD;
    const resp = await Get(URL, false, {
      headers: {
        session_id: getLocalSessionId(),
        user_guid: getLocalGUID(),
        authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });
    return resp;
  };

  addUserPoints = async (data: addUserPointsInterface) => {
    const URL = getServiceApiUrl() + REWARD_API_PATH.UPDATE_USER_POINTS;
    const resp = await Post(URL, data, false, {
      headers: {
        session_id: getLocalSessionId(),
        user_guid: getLocalGUID(),
        authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });
    if (resp.status) {
      const fetchPointsEvents = new CustomEvent(EVENTS.GET_REWARD_POINTS);
      window.dispatchEvent(fetchPointsEvents);
    }
    return resp;
  };
}

export default new RewardsService();
