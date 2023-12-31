import React, { useEffect, useState,useCallback } from "react";
import styled from "styled-components";
import httpManager from "../managers/httpManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.6;
  height: 100%;
  width: 100%;
  border-right: 1px solid #dadada;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  padding: 10px;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 5px 10px;
  gap: 10px;
`;
const SearchIcon = styled.img`
  width: 28px;
  height: 28px;
`;
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;

  :hover {
    background: #ebebeb;
  }
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 12px;
`;

const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;

const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;

const MessageTime = styled.span`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  object-fit: cover;
`;
const SearchResults = styled.div`
  width: 100%;
  height: 100px;
`;

const ContactComponent = (props) => {
  const { userData, setChat, userInfo } = props;
  const otherUser =
    userData.channelUsers?.find(
      (userObj) => userObj.email !== userInfo.email
    ) || userData;
  const lastMessage =
    userData.messages && userData.messages.length
      ? userData.messages[userData.messages.length - 1]
      : {};
  return (
    <ContactItem onClick={() => setChat({ channelData: userData, otherUser })}>
      <ProfileIcon src={otherUser?.profilePic} />
      <ContactInfo>
        <ContactName>{otherUser?.name}</ContactName>
        <MessageText>{lastMessage?.text}</MessageText>
      </ContactInfo>
      <MessageTime>
        {" "}
        {lastMessage && lastMessage?.addedOn}
      </MessageTime>
    </ContactItem>
  );
};

function ContactListComponent(props) {
  const { userInfo, refreshContactList } = props;
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [contactList, setContactList] = useState([]);

  const refreshContacts = useCallback(async () => {
    const contactListData = await httpManager.getChannelList(userInfo.email);
    setContactList(contactListData.data.responseData);
    setSearchString();
    setSearchResult();
  },[userInfo.email]);

  useEffect(() => {
    refreshContacts();
  }, [refreshContactList, refreshContacts]);

  useEffect(() => {
    if (!searchString) refreshContacts();
  }, [searchString, refreshContacts])

  const onSearchTextChanged = async (searchText) => {
    setSearchString(searchText);
    const userData = await httpManager.searchUser(searchText);
    if (userData.data?.success) setSearchResult(userData.data.responseData);
  
  };

  return (
    <Container>
      <ProfileInfoDiv>
        <ProfileImage
          src={userInfo.imageUrl || "/whatsapp/profile/contactPicture.jpeg"}
        />
      </ProfileInfoDiv>
      <SearchBox>
        <SearchContainer>
          <SearchIcon src={"/whatsapp/search-icon.svg"} />
          <SearchInput
            placeholder="Search or start new chat"
            value={searchString || ''}
            onChange={(e) => onSearchTextChanged(e.target.value)}
          />
        </SearchContainer>
      </SearchBox>
      {searchResult && (
        <SearchResults>
          <ContactComponent userData={searchResult} setChat={props.setChat} />
        </SearchResults>
      )}
      {!searchResult && (contactList.map((userData,index) => (
        <ContactComponent
           key={index}
          userData={userData}
          setChat={props.setChat}
          userInfo={userInfo}
        />
      )))}
    </Container>
  );
}

export default ContactListComponent;
