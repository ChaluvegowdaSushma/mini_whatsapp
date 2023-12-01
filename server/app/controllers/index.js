import { sendResponse, sendError } from "../../utility";
import { contactsList } from "./mockData";

module.exports = {
  getChannelList: async (req, res) => {
    const channelList = contactsList;
    sendResponse(res, channelList, "Channel list fetched", true, 200);
  },

  searchUser: async (req, res) => {
    const requestData = req.query;
    let result = null;
    contactsList.forEach((contact) => {
      if (contact.name.toLowerCase().startsWith(requestData.email.toLowerCase())) {
        result = contact;
      }
    })
    if (!result) return sendError(res, {}, "No user found!");
    sendResponse(res, result, "User found successfully", true, 200);
  },

};
